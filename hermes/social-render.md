# Hermes social render

Renders the TBTX social matrix: **brands x platforms x post templates**, as PNG images ready for scheduling (Postiz or manual upload).

- Brands: `tbtx` (TransformBy10X), `bbai` (BizBuilders AI), `bbm` (BizBot Mrktng)
- Platforms: `instagram-square` 1080x1080, `instagram-story` 1080x1920, `tiktok` 1080x1920, `linkedin` 1200x627, `x` 1600x900, `facebook` 1200x630
- Templates: `quote`, `stat`, `tip` (carousel slide), `offer` (CTA), `announcement`

## Files

| File | Role |
|---|---|
| `hermes/render.cjs` | Renderer (CommonJS, Node 18+). Builds HTML per combination, screenshots to PNG. |
| `hermes/templates.json` | Brands (colors, fonts, logo, handle), platforms (sizes), templates (fields, limits, defaults). |
| `hermes/content.sample.json` | Sample content. Used automatically when `--data` is not given. |
| `hermes/out/` | Render output (git ignored). |

## Setup (once)

```bash
cd /root/tbtx-next-ecosystem
git pull
npm i -D puppeteer          # Node 22+; on Node 18/20 use: npm i -D puppeteer@24
```

Playwright also works if it is installed instead (`npm i -D playwright && npx playwright install chromium`). With no browser installed the script still runs and writes HTML files, then prints the install command. The script launches Chromium with `--no-sandbox`, so running as root is fine. Fonts (Outfit, Archivo Black, DM Sans, JetBrains Mono) load from Google Fonts; use `--offline` on a machine without internet.

## Commands

```bash
node hermes/render.cjs                                   # full matrix from content.sample.json
node hermes/render.cjs --data hermes/content.week41.json # your own content file
node hermes/render.cjs --brand bbai --platform linkedin,x
node hermes/render.cjs --template offer --brand tbtx
node hermes/render.cjs --defaults                        # every brand x template using template defaults
node hermes/render.cjs --list                            # show the plan, render nothing
node hermes/render.cjs --html --out /tmp/preview         # keep HTML next to each PNG
node hermes/render.cjs --help
```

Filters take comma lists or `all`. Exit code is 1 if any render failed.

## Content file format

An object with a `posts` array (a bare array also works). Each post renders once per selected platform, or only on the platforms listed in its optional `platforms` array.

```json
{
  "posts": [
    {
      "id": "bbai-tip-01",
      "brand": "bbai",
      "template": "tip",
      "platforms": ["instagram-square", "linkedin"],
      "fields": {
        "series": "Infrastructure first",
        "index": "1",
        "total": "3",
        "title": "Map every handoff before you automate.",
        "body": "AI didn't remove the work. It moved it into the gaps."
      }
    }
  ]
}
```

Template fields (required in bold):

| Template | Fields |
|---|---|
| quote | **quote**, author, role |
| stat | kicker, **stat**, **label**, source |
| tip | series, index, total, **title**, **body** |
| offer | kicker, **headline**, body, **cta**, url |
| announcement | kicker, **headline**, body, date |

Posts with an unknown brand or template, or a missing required field, are skipped with a warning. Text over `maxChars` still renders: the layout shrinks type to fit and the manifest records `fitScale` (below 0.6 prints a warning, so shorten the copy).

Copy rules: professional, on brand, no em-dashes. TBTX refrain: "You don't need more AI. Clear the fog." BBAI refrain: "Infrastructure before acceleration."

## Output layout

```
hermes/out/
  manifest.json
  <brand>/<platform>/<post-id>.png     (and .html with --html or when no browser is installed)
```

`manifest.json` holds `generatedAt`, `engine` (`puppeteer`, `playwright` or `html-only`), `content`, `count`, `failed`, and `items[]` with `id, brand, platform, template, width, height, fields, png, html, fitScale, error`. Use it to hand files and captions to the scheduler.

## Extending

- **Brand:** add a key under `brands` in `templates.json` with `name, short, handle, url, logo, colors {bg, bgDeep, text, muted, accent, line}, fonts {display, macro, body, mono}`. `logo` is a repo-relative path (svg, png, jpg, webp) or `null` for the text wordmark.
- **Platform:** add `"key": { "label", "width", "height" }` under `platforms`. Layout adapts automatically (tall, square, wide).
- **Template:** add it under `templates` (label, fields with `required` and `maxChars`, defaults), then add a matching `case` in `templateBody()` in `render.cjs`. Mark the main headline element with class `fit-text`; type sizes use `var(--u)` (1% of the short side) times `var(--fit)` so auto shrink works.
