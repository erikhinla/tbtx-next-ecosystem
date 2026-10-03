#!/usr/bin/env node
/*
 * Hermes social matrix renderer for TBTX, BBAI and BBM.
 *
 * Usage:
 *   node hermes/render.cjs [--brand tbtx,bbai] [--platform x,linkedin] [--template quote]
 *                          [--data hermes/content.sample.json] [--out hermes/out]
 *                          [--defaults] [--html] [--offline] [--list] [--help]
 *
 * Builds one HTML card per (content item x platform) and screenshots it to PNG with
 * puppeteer (preferred) or playwright. If neither is installed it writes the HTML files
 * and tells you to run `npm i -D puppeteer`. Always writes <out>/manifest.json.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const { createRequire } = require('module');

const HERE = __dirname;
const ROOT = path.resolve(HERE, '..');

function parseArgs(argv) {
  const opts = { brand: 'all', platform: 'all', template: 'all', data: null, out: path.join(HERE, 'out'), defaults: false, html: false, offline: false, list: false, help: false, config: path.join(HERE, 'templates.json') };
  const flags = { '--defaults': 'defaults', '--html': 'html', '--offline': 'offline', '--list': 'list', '--help': 'help', '-h': 'help' };
  const values = { '--brand': 'brand', '--platform': 'platform', '--template': 'template', '--data': 'data', '--out': 'out', '--config': 'config' };
  for (let i = 0; i < argv.length; i++) {
    let a = argv[i];
    let v;
    if (a.includes('=')) { [a, v] = [a.slice(0, a.indexOf('=')), a.slice(a.indexOf('=') + 1)]; }
    if (flags[a]) { opts[flags[a]] = true; continue; }
    if (values[a]) {
      if (v === undefined) v = argv[++i];
      if (v === undefined || v.startsWith('--')) fail(`Missing value for ${a}`);
      opts[values[a]] = v;
      continue;
    }
    fail(`Unknown argument: ${a} (try --help)`);
  }
  return opts;
}

function fail(msg) { console.error(`[render] ${msg}`); process.exit(1); }
function warn(msg) { console.warn(`[render] warning: ${msg}`); }

function pick(selector, available, kind) {
  if (!selector || selector === 'all') return available.slice();
  const wanted = String(selector).split(',').map((s) => s.trim()).filter(Boolean);
  for (const w of wanted) if (!available.includes(w)) fail(`Unknown ${kind} "${w}". Available: ${available.join(', ')}`);
  return wanted;
}

function readJson(file) {
  try { return JSON.parse(fs.readFileSync(file, 'utf8')); } catch (e) { fail(`Cannot read JSON ${file}: ${e.message}`); }
}

function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function slug(s) { return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'post'; }

function logoDataUri(logo) {
  if (!logo) return null;
  const file = path.isAbsolute(logo) ? logo : path.join(ROOT, logo);
  if (!fs.existsSync(file)) { warn(`logo not found: ${logo}, using text wordmark`); return null; }
  const ext = path.extname(file).slice(1).toLowerCase();
  const mime = { svg: 'image/svg+xml', png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', webp: 'image/webp' }[ext];
  if (!mime) { warn(`unsupported logo type: ${logo}`); return null; }
  return `data:${mime};base64,${fs.readFileSync(file).toString('base64')}`;
}

/* ---------- content ---------- */

function loadItems(opts, cfg) {
  let dataFile = opts.data;
  if (!dataFile && !opts.defaults) {
    const sample = path.join(HERE, 'content.sample.json');
    if (fs.existsSync(sample)) dataFile = sample;
  }
  if (dataFile) {
    const abs = path.resolve(process.cwd(), dataFile);
    const data = readJson(abs);
    const posts = Array.isArray(data) ? data : data.posts;
    if (!Array.isArray(posts)) fail(`${dataFile} must be an array or an object with a "posts" array`);
    return { source: path.relative(ROOT, abs), items: posts };
  }
  const items = [];
  for (const brand of Object.keys(cfg.brands)) {
    for (const template of Object.keys(cfg.templates)) {
      items.push({ id: `${brand}-${template}-default`, brand, template, fields: { ...cfg.templates[template].defaults } });
    }
  }
  return { source: 'templates.json defaults', items };
}

function validate(item, idx, cfg) {
  const where = `post #${idx + 1}${item.id ? ` (${item.id})` : ''}`;
  if (!cfg.brands[item.brand]) { warn(`${where}: unknown brand "${item.brand}", skipped`); return null; }
  const tpl = cfg.templates[item.template];
  if (!tpl) { warn(`${where}: unknown template "${item.template}", skipped`); return null; }
  const fields = { ...(item.fields || {}) };
  for (const [name, spec] of Object.entries(tpl.fields)) {
    const val = fields[name];
    if (spec.required && (val == null || String(val).trim() === '')) { warn(`${where}: missing required field "${name}", skipped`); return null; }
    if (val != null && spec.maxChars && String(val).length > spec.maxChars) warn(`${where}: "${name}" is ${String(val).length} chars (max ${spec.maxChars}); text will be shrunk to fit`);
  }
  if (item.platforms != null && !Array.isArray(item.platforms)) { warn(`${where}: "platforms" must be an array, ignored`); delete item.platforms; }
  return { id: slug(item.id || `${item.brand}-${item.template}-${idx + 1}`), brand: item.brand, template: item.template, platforms: item.platforms || null, fields };
}

/* ---------- HTML ---------- */

function templateBody(template, f, brand) {
  switch (template) {
    case 'quote':
      return `<div class="mark">&ldquo;</div>
<p class="quote fit-text">${esc(f.quote)}</p>
${f.author ? `<p class="byline"><b>${esc(f.author)}</b>${f.role ? `<span>${esc(f.role)}</span>` : ''}</p>` : ''}`;
    case 'stat':
      return `${f.kicker ? `<p class="kicker">${esc(f.kicker)}</p>` : ''}
<p class="stat">${esc(f.stat)}</p>
<p class="statlabel fit-text">${esc(f.label)}</p>
${f.source ? `<p class="source">${esc(f.source)}</p>` : ''}`;
    case 'tip':
      return `<p class="kicker">${esc(f.series || 'Field note')}${f.index ? `<span class="count">${esc(f.index)}${f.total ? ` / ${esc(f.total)}` : ''}</span>` : ''}</p>
<h1 class="title fit-text">${esc(f.title)}</h1>
<p class="body">${esc(f.body)}</p>`;
    case 'offer':
      return `${f.kicker ? `<p class="kicker">${esc(f.kicker)}</p>` : ''}
<h1 class="headline fit-text">${esc(f.headline)}</h1>
${f.body ? `<p class="body">${esc(f.body)}</p>` : ''}
<div class="ctarow"><span class="cta">${esc(f.cta)} &rarr;</span>${f.url ? `<span class="url">${esc(f.url)}</span>` : ''}</div>`;
    case 'announcement':
      return `<p class="kicker"><span class="dot"></span>${esc(f.kicker || 'Announcement')}${f.date ? `<span class="count">${esc(f.date)}</span>` : ''}</p>
<h1 class="headline fit-text">${esc(f.headline)}</h1>
${f.body ? `<p class="body">${esc(f.body)}</p>` : ''}`;
    default:
      throw new Error(`No layout for template "${template}"`);
  }
}

function buildHtml({ cfg, brandKey, platformKey, item, offline }) {
  const b = cfg.brands[brandKey];
  const p = cfg.platforms[platformKey];
  const c = b.colors;
  const fo = b.fonts;
  const W = p.width, H = p.height;
  const ratio = W / H;
  const layout = ratio > 1.2 ? 'wide' : ratio < 0.8 ? 'tall' : 'square';
  const u = Math.min(W, H) / 100; // 1 unit = 1% of the short side, in px
  const logo = logoDataUri(b.logo);
  const wordmark = logo ? `<img class="logo" src="${logo}" alt="${esc(b.name)}">` : `<span class="wm"><b>${esc(b.short)}</b><span>${esc(b.name)}</span></span>`;
  const fontLink = offline || !cfg.fonts || !cfg.fonts.googleCss ? '' : `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="${esc(cfg.fonts.googleCss)}">`;
  const pad = layout === 'tall' ? 8 : layout === 'wide' ? 6 : 7;

  return `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=${W}, height=${H}">
<title>${esc(`${b.short} ${item.template} ${platformKey}`)}</title>
${fontLink}
<style>
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:${W}px;height:${H}px;overflow:hidden;background:${c.bg}}
:root{--u:${u}px;--fit:1;--bg:${c.bg};--deep:${c.bgDeep};--text:${c.text};--muted:${c.muted};--accent:${c.accent};--line:${c.line}}
.card{position:relative;width:${W}px;height:${H}px;display:flex;flex-direction:column;padding:calc(var(--u)*${pad});color:var(--text);font-family:${fo.body};
 background:radial-gradient(120% 90% at 100% 0%, color-mix(in srgb, var(--accent) 16%, transparent) 0%, transparent 55%),linear-gradient(160deg,var(--bg) 0%,var(--deep) 100%);overflow:hidden}
.card::before{content:"";position:absolute;inset:0;background:repeating-linear-gradient(90deg,var(--line) 0 1px,transparent 1px calc(var(--u)*12.5));opacity:.18;pointer-events:none}
.card::after{content:"";position:absolute;left:calc(var(--u)*${pad});right:calc(var(--u)*${pad});top:calc(var(--u)*${pad} + var(--u)*9);height:1px;background:var(--line)}
header,footer{position:relative;z-index:1;display:flex;align-items:center;justify-content:space-between;gap:calc(var(--u)*3);font-family:${fo.mono};font-size:calc(var(--u)*2.2);letter-spacing:.14em;text-transform:uppercase;color:var(--muted)}
header{height:calc(var(--u)*6)}
.wm{display:flex;align-items:baseline;gap:calc(var(--u)*1.6)}
.wm b{font-family:${fo.macro};font-weight:400;font-size:calc(var(--u)*3.4);letter-spacing:.02em;color:var(--text)}
.wm span{color:var(--muted)}
.logo{height:calc(var(--u)*5.5);width:auto;display:block}
.tag{color:var(--accent)}
main{position:relative;z-index:1;flex:1;min-height:0;display:flex;flex-direction:column;justify-content:${layout === 'tall' ? 'center' : 'flex-end'};gap:calc(var(--u)*3*var(--fit));padding:calc(var(--u)*5) 0 calc(var(--u)*4);overflow:hidden}
footer{border-top:1px solid var(--line);padding-top:calc(var(--u)*2.4)}
footer .handle{color:var(--text)}
.kicker{display:flex;align-items:center;gap:calc(var(--u)*2);font-family:${fo.mono};font-weight:700;font-size:calc(var(--u)*2.4*var(--fit));letter-spacing:.18em;text-transform:uppercase;color:var(--accent)}
.kicker .count{margin-left:auto;color:var(--muted);font-weight:500}
.dot{width:calc(var(--u)*1.4);height:calc(var(--u)*1.4);border-radius:50%;background:var(--accent)}
.headline,.title,.quote{font-family:${fo.display};font-weight:500;letter-spacing:-.045em;line-height:.95;text-wrap:balance;max-width:${layout === 'wide' ? '17ch' : '14ch'}}
.headline{font-size:calc(var(--u)*${layout === 'tall' ? 11 : 10}*var(--fit))}
.title{font-size:calc(var(--u)*${layout === 'tall' ? 10 : 9}*var(--fit))}
.quote{font-size:calc(var(--u)*${layout === 'tall' ? 9.5 : 8.4}*var(--fit));line-height:1.02;max-width:${layout === 'wide' ? '22ch' : '16ch'}}
.mark{font-family:${fo.macro};font-size:calc(var(--u)*16*var(--fit));line-height:.6;height:calc(var(--u)*7*var(--fit));color:var(--accent)}
.byline{display:flex;flex-direction:column;gap:calc(var(--u)*.8);font-size:calc(var(--u)*2.8*var(--fit))}
.byline b{font-weight:500}
.byline span{font-family:${fo.mono};font-size:.75em;letter-spacing:.12em;text-transform:uppercase;color:var(--muted)}
.stat{font-family:${fo.macro};font-size:calc(var(--u)*${layout === 'wide' ? 26 : 30}*var(--fit));line-height:.82;letter-spacing:-.04em;color:var(--accent)}
.statlabel{font-family:${fo.display};font-size:calc(var(--u)*5.4*var(--fit));line-height:1.08;letter-spacing:-.025em;max-width:${layout === 'wide' ? '26ch' : '20ch'};text-wrap:balance}
.source{font-family:${fo.mono};font-size:calc(var(--u)*2*var(--fit));letter-spacing:.1em;text-transform:uppercase;color:var(--muted)}
.body{font-size:calc(var(--u)*${layout === 'wide' ? 3.1 : 3.5}*var(--fit));line-height:1.45;color:var(--muted);max-width:${layout === 'wide' ? '48ch' : '34ch'}}
.ctarow{display:flex;align-items:center;flex-wrap:wrap;gap:calc(var(--u)*3);margin-top:calc(var(--u)*1)}
.cta{display:inline-block;padding:calc(var(--u)*2*var(--fit)) calc(var(--u)*3.4*var(--fit));background:var(--accent);color:var(--deep);font-family:${fo.mono};font-weight:700;font-size:calc(var(--u)*2.6*var(--fit));letter-spacing:.12em;text-transform:uppercase}
.url{font-family:${fo.mono};font-size:calc(var(--u)*2.4*var(--fit));letter-spacing:.08em;color:var(--text);border-bottom:1px solid var(--accent);padding-bottom:calc(var(--u)*.4)}
</style></head>
<body><div class="card t-${esc(item.template)} l-${layout}" data-brand="${esc(brandKey)}" data-platform="${esc(platformKey)}">
<header>${wordmark}<span class="tag">${esc(cfg.templates[item.template].label)}</span></header>
<main>${templateBody(item.template, item.fields, b)}</main>
<footer><span class="handle">${esc(b.handle)}</span><span>${esc(b.url)}</span></footer>
</div>
<script>
window.__fit = function () {
  var root = document.documentElement, main = document.querySelector('main'), fit = 1;
  root.style.setProperty('--fit', '1');
  for (var i = 0; i < 40 && main.scrollHeight > main.clientHeight + 1 && fit > 0.35; i++) {
    fit = Math.round((fit - 0.04) * 100) / 100;
    root.style.setProperty('--fit', String(fit));
  }
  return fit;
};
window.__ready = (document.fonts ? Promise.race([document.fonts.ready, new Promise(function (r) { setTimeout(r, 4000); })]) : Promise.resolve()).then(function () { return window.__fit(); });
</script>
</body></html>`;
}

/* ---------- browser engines ---------- */

function tryRequire(name) {
  for (const base of [process.cwd(), ROOT, HERE]) {
    try { return createRequire(path.join(base, 'noop.js'))(name); } catch (e) { if (e.code !== 'MODULE_NOT_FOUND') throw e; }
  }
  return null;
}

async function openEngine() {
  const args = ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--font-render-hinting=none'];
  const puppeteer = tryRequire('puppeteer');
  if (puppeteer) {
    const browser = await puppeteer.launch({ headless: true, args });
    return {
      name: 'puppeteer',
      async shot(html, w, h, file) {
        const page = await browser.newPage();
        try {
          await page.setViewport({ width: w, height: h, deviceScaleFactor: 1 });
          await page.setContent(html, { waitUntil: 'load', timeout: 30000 }).catch((e) => warn(`page load slow: ${e.message}`));
          const fit = await page.evaluate(() => window.__ready);
          await page.screenshot({ path: file, type: 'png', clip: { x: 0, y: 0, width: w, height: h } });
          return fit;
        } finally { await page.close(); }
      },
      close: () => browser.close(),
    };
  }
  const playwright = tryRequire('playwright') || tryRequire('playwright-core');
  if (playwright && playwright.chromium) {
    const browser = await playwright.chromium.launch({ headless: true, args });
    return {
      name: 'playwright',
      async shot(html, w, h, file) {
        const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
        try {
          await page.setContent(html, { waitUntil: 'load', timeout: 30000 }).catch((e) => warn(`page load slow: ${e.message}`));
          const fit = await page.evaluate(() => window.__ready);
          await page.screenshot({ path: file, type: 'png', clip: { x: 0, y: 0, width: w, height: h } });
          return fit;
        } finally { await page.close(); }
      },
      close: () => browser.close(),
    };
  }
  return null;
}

/* ---------- main ---------- */

function printHelp() {
  console.log(`Hermes social matrix renderer

node hermes/render.cjs [options]
  --brand <list|all>      tbtx, bbai, bbm (comma separated)
  --platform <list|all>   instagram-square, instagram-story, tiktok, linkedin, x, facebook
  --template <list|all>   quote, stat, tip, offer, announcement
  --data <file.json>      content file (default: hermes/content.sample.json if present)
  --defaults              ignore content files, render template defaults for every brand
  --out <dir>             output directory (default: hermes/out)
  --html                  also keep the HTML source next to each PNG
  --offline               do not load Google Fonts (uses local fallbacks)
  --config <file.json>    alternate templates.json
  --list                  print the planned matrix without rendering
  --help                  this message`);
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  if (opts.help) { printHelp(); return; }
  const cfg = readJson(path.resolve(process.cwd(), opts.config));
  for (const k of ['brands', 'platforms', 'templates']) if (!cfg[k] || typeof cfg[k] !== 'object') fail(`templates.json is missing "${k}"`);

  const brands = pick(opts.brand, Object.keys(cfg.brands), 'brand');
  const platforms = pick(opts.platform, Object.keys(cfg.platforms), 'platform');
  const templates = pick(opts.template, Object.keys(cfg.templates), 'template');

  const { source, items: raw } = loadItems(opts, cfg);
  const items = raw.map((it, i) => validate(it, i, cfg)).filter(Boolean).filter((it) => brands.includes(it.brand) && templates.includes(it.template));

  const jobs = [];
  const seen = new Set();
  for (const item of items) {
    for (const platformKey of platforms) {
      if (item.platforms && !item.platforms.includes(platformKey)) continue;
      const key = `${item.brand}/${platformKey}/${item.id}`;
      if (seen.has(key)) { warn(`duplicate id "${item.id}" for ${item.brand}/${platformKey}, skipped`); continue; }
      seen.add(key);
      jobs.push({ item, platformKey });
    }
  }

  console.log(`[render] content: ${source} | ${items.length} posts x ${platforms.length} platforms -> ${jobs.length} renders`);
  if (opts.list) { for (const j of jobs) console.log(`  ${j.item.brand}/${j.platformKey}/${j.item.id}  (${j.item.template})`); return; }
  if (!jobs.length) fail('Nothing to render. Check --brand/--platform/--template filters and your content file.');

  const outDir = path.resolve(process.cwd(), opts.out);
  fs.mkdirSync(outDir, { recursive: true });

  let engine = null;
  try { engine = await openEngine(); } catch (e) { warn(`browser failed to launch: ${e.message}`); }
  if (!engine) {
    console.warn('[render] No headless browser available, writing HTML only.');
    console.warn('[render] To get PNGs run:  npm i -D puppeteer   (or: npm i -D playwright && npx playwright install chromium)');
  } else {
    console.log(`[render] engine: ${engine.name}`);
  }

  const manifest = { generatedAt: new Date().toISOString(), engine: engine ? engine.name : 'html-only', content: source, out: path.relative(ROOT, outDir) || '.', count: 0, failed: 0, items: [] };
  try {
    for (const { item, platformKey } of jobs) {
      const p = cfg.platforms[platformKey];
      const dir = path.join(outDir, item.brand, platformKey);
      fs.mkdirSync(dir, { recursive: true });
      const base = path.join(dir, item.id);
      const html = buildHtml({ cfg, brandKey: item.brand, platformKey, item, offline: opts.offline });
      const entry = { id: item.id, brand: item.brand, platform: platformKey, template: item.template, width: p.width, height: p.height, fields: item.fields };
      if (!engine || opts.html) { fs.writeFileSync(`${base}.html`, html); entry.html = path.relative(outDir, `${base}.html`); }
      if (engine) {
        try {
          const fit = await engine.shot(html, p.width, p.height, `${base}.png`);
          entry.png = path.relative(outDir, `${base}.png`);
          entry.fitScale = fit;
          if (fit < 0.6) warn(`${item.brand}/${platformKey}/${item.id}: copy shrunk to ${Math.round(fit * 100)}%, consider shorter text`);
          console.log(`  ok  ${entry.png}`);
        } catch (e) {
          manifest.failed++;
          entry.error = e.message;
          console.error(`  FAIL ${item.brand}/${platformKey}/${item.id}: ${e.message}`);
        }
      } else {
        console.log(`  html ${entry.html}`);
      }
      manifest.items.push(entry);
    }
  } finally {
    if (engine) await engine.close().catch(() => {});
  }
  manifest.count = manifest.items.length - manifest.failed;
  fs.writeFileSync(path.join(outDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
  console.log(`[render] done: ${manifest.count} ok, ${manifest.failed} failed. Manifest: ${path.join(path.relative(process.cwd(), outDir) || '.', 'manifest.json')}`);
  if (manifest.failed) process.exitCode = 1;
}

main().catch((e) => { console.error(`[render] fatal: ${e.stack || e.message}`); process.exit(1); });
