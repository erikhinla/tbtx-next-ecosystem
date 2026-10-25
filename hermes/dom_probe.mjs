// DOM layout probe for hyperframes compositions (used by frame_check.py and build.py stills).
// node dom_probe.mjs <index.html> <W> <H> <t1,t2,...> [--shot <t> <out.png>]
// Seeks window.__timelines[<root id>] to each t and prints JSON: per t, every visible text run's
// client rects, colour, effective opacity, font size, and whether an ancestor clips it.
import { createRequire } from "module";
import fs from "fs";
import path from "path";
const require = createRequire("/usr/local/lib/node_modules/hyperframes/");
const puppeteer = require("puppeteer-core");
const CHROME = fs.readdirSync(process.env.HOME + "/.cache/hyperframes/chrome/chrome-headless-shell").sort().reverse()
  .map(d => process.env.HOME + `/.cache/hyperframes/chrome/chrome-headless-shell/${d}/chrome-headless-shell-linux64/chrome-headless-shell`)
  .find(p => fs.existsSync(p));
const [html, W, H, ts] = process.argv.slice(2);
const si = process.argv.indexOf("--shot");
const shot = si > 0 ? [parseFloat(process.argv[si + 1]), process.argv[si + 2]] : null;
const browser = await puppeteer.launch({ executablePath: CHROME, args: ["--no-sandbox", "--allow-file-access-from-files", "--force-color-profile=srgb"] });
const page = await browser.newPage();
await page.setViewport({ width: +W, height: +H, deviceScaleFactor: 1 });
await page.goto("file://" + path.resolve(html), { waitUntil: "load" });
await page.evaluate(() => document.fonts.ready);
const seek = t => page.evaluate(t => {
  const root = document.querySelector("[data-composition-id]");
  const tl = window.__timelines[root.getAttribute("data-composition-id")];
  tl.seek(t, false);
  document.querySelectorAll("video").forEach(v => { v.style.visibility = "hidden"; });
}, t);
const out = [];
for (const t of (ts ? ts.split(",").map(Number) : [])) {
  await seek(t);
  out.push({ t, runs: await page.evaluate((W, H) => {
    const res = []; const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let n;
    while ((n = walker.nextNode())) {
      if (!n.textContent.trim()) continue;
      const el = n.parentElement; if (el.closest("script,style,template")) continue;
      let op = 1, clipped = false, e = el;
      const r0 = document.createRange(); r0.selectNodeContents(n);
      const rects = [...r0.getClientRects()].filter(r => r.width > 1 && r.height > 1);
      while (e) {
        const cs = getComputedStyle(e); op *= parseFloat(cs.opacity);
        if (cs.visibility === "hidden" || cs.display === "none") op = 0;
        if (e !== el && /(hidden|clip)/.test(cs.overflow + cs.overflowX + cs.overflowY) && e !== document.body && e !== document.documentElement) {
          const b = e.getBoundingClientRect();
          for (const r of rects) if (r.left < b.left - 1 || r.right > b.right + 1 || r.top < b.top - 1 || r.bottom > b.bottom + 1) clipped = true;
        }
        e = e.parentElement;
      }
      if (op < 0.02 || !rects.length) continue;
      const cs = getComputedStyle(el);
      res.push({ text: n.textContent.trim(), color: cs.color, opacity: op, fontSize: parseFloat(cs.fontSize),
        accent: !!el.closest(".k,[data-accent]"), clipped,
        rects: rects.map(r => [r.left, r.top, r.right, r.bottom]) });
    }
    return res;
  }, +W, +H) });
}
if (shot) { await seek(shot[0]); await page.evaluate(() => document.querySelectorAll("video").forEach(v => v.style.visibility = "")); await page.screenshot({ path: shot[1] }); }
await browser.close();
console.log(JSON.stringify(out));
