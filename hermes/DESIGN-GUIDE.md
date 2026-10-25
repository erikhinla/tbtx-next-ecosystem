# v5 OVERRIDES (2026-10-22, Erik). Where this block and the v4 text below disagree, this block wins.
- Production path: templates/kinetic-hyperframes/build.py (or kinetic.py, which calls it). frame_check.py is the pre-flight gate; a visual is approved for delivery only with frame_check PASS printed for that file.
- Main look: a cinematic plate (AI still or one Veo clip via gen_media.py on Vertex; AI imagery/video allowed and preferred) under big kinetic type. Type-only mode uses a designed graphite base (gradient, brushed-metal grain, light sweep, vignette). Never flat #111111 or any flat single colour.
- Support type is near-white #f4f1ea. No grey/muted lines (the #8c8c8c muted role below is retired).
- Type fills an 84% column, centred, safe margins at least 8%; nothing within 6% of an edge; text ink covers at least 20% of the safe area in every main beat.
- Contrast is measured on rendered pixels: 4.5:1 for all text, 3:1 for the magenta key word (text colour only, never a block).
- Duration 8-20 s (template default 13.5 s). Silent is fine. No URL. No end-card wordmark unless Erik asks.

# HERMES DESIGN GUIDE v4 (TBTX / PROOF social visuals)

Supersedes v3 (backup: /root/backups/DESIGN-GUIDE.v3.md). Two corrections from Erik drive this version:
1. Brand colors are accents, not backgrounds. Backgrounds are neutral.
2. No URL in any visual. A link in a video can't be clicked. The link goes in the post caption.

`kinetic.py` v4 enforces most of this in code. The checklist in section 11 covers the rest. Every visual must pass it.

## 1. Color: 60-30-10, neutral first
| Role | Share of frame | TBTX values |
|---|---|---|
| Dominant (background) | ~60% or more | near-black `#111111` (default) or off-white `#fafaf7`. Never magenta. |
| Secondary (type, neutral shapes) | ~30% | on dark: `#f5f5f2` main, `#8c8c8c` muted. On light: `#111111` main, `#5c5c5c` muted. |
| Accent | ~10%, never over 15% | magenta `#d01e98`: one key word (as colored text) or one mark per frame; never a highlight block |

- The dominant color is quiet and neutral. A saturated color at that scale is tiring and leaves nothing for the accent to do. Use the accent sparingly: "appearing everywhere means appearing nowhere" (ColorFYI).
- One accent color only. It goes on the single most important word or mark in the piece.
- `kinetic.py` measures accent pixels on every 10th frame and warns if the accent covers more than 15% of the frame. Post 1 measures 7.6% (1:1) and 3.9% (9:16).
- If the background is a brand color, `kinetic.py` warns. Brand colors are accents only.

### Contrast (WCAG 2.2, 4.5:1 minimum for all text, no large-text exemption here)
| Pair | Ratio | Use |
|---|---|---|
| `#f5f5f2` on `#111111` | 17.3:1 | main type on dark |
| `#8c8c8c` on `#111111` | 5.6:1 | muted / left-behind line |
| magenta `#d01e98` on `#111111` | 3.9:1 | Allowed as display-size accent text (Erik: magenta text on black is fine). Never a block. |
| white on magenta block | 4.9:1 | NOT USED: no highlight blocks |
| magenta on `#fafaf7` | 4.6:1 | magenta text is allowed on off-white only |
| `#111111` on `#fafaf7` | 18.1:1 | main type on light |

- The accent word is always magenta text, on dark or light backgrounds. Never a solid block behind a word.
- Never pink on pink. Never dim text toward the background color.
- `kinetic.py` auto-corrects any fg or muted color under 4.5:1 and refuses the render if no correction exists. It always sets the accent as text (no block mode) and refuses only if the accent is under 3:1 on the background.

## 2. No URL on screen. Links go in the caption
- No URL, domain or "visit" line on any frame or end card. Viewers can't tap text in a video, and a URL costs reading time that the payoff line needs.
- LinkedIn, X and Facebook: put the full link in the post text. Instagram: links in captions aren't clickable, so the caption says "link in bio" and the bio link points to transformby10x.ai/proof. On Stories, use a link sticker.
- The end card is the headline plus the lowercase `tbtx` wordmark. Nothing else by default.
- An optional short action line (spec key `"action"`, for example "Link in caption") is allowed but not preferred. TikTok's own research credits on-screen CTA cards with lift. A clickable CTA button is supplied by the platform on ads, and organic posts carry the link in the caption. Use the action line only on paid placements where testing shows it helps.

## 3. Grid, margins, safe zones
12 columns on 1080 px width. Text area by format:

| Format | Left | Right | Top | Bottom | Text area (px) |
|---|---|---|---|---|---|
| 1:1 (LinkedIn, IG feed) | 8.33% (90) | 8.33% (90) | 8.33% (90) | 8.33% (90) | 90-990 x 90-990 |
| 9:16 organic (Reels, TikTok, Shorts) | 6% (65) | 15% (162) | 12% (230) | 25% (480) | 65-918 x 230-1440 |
| 9:16 paid Meta Reels (`"ads":true`) | 6% (65) | 15% (162) | 14% (269) | 35% (672) | 65-918 x 269-1248 |

- Meta's published ad zone: keep the top 14%, bottom 35% and 6% each side clear. YouTube Shorts keeps 192 px clear on the right. TikTok publishes no fixed figures (its zone shrinks as the caption grows), so the right 15% and bottom 25% rule is the shared conservative box.
- In 9:16 the text block is centred vertically in the text area (50%) and the wordmark sits on the bottom edge of the text area. That fixes v3's dead space at the bottom.

## 4. Alignment
- One axis: flush LEFT on the left margin. Every line, every block edge and the wordmark start on that x.
- Why left: one hard edge gives the eye a place to return to, it survives uneven line lengths, and it's the Swiss/International default. A centred stack of uneven lines has two ragged edges, which is the "thrown on a page" look.
- No centring, no mixed alignments, no rotation, no text placed wherever there was room.

## 5. Type
Two faces maximum:
- Archivo Black (`fonts/ArchivoBlack.ttf`): all copy.
- MuseoModerno (`fonts/MuseoModerno.ttf`): the lowercase `tbtx` wordmark only.

Scale (1.333 modular, at 1080 wide): 24, 32, 43, 57, 76, 101, 135, 180, 240, 320.
- Hero line and end-card headline are display sizes fitted to the column: the hero fills about 60-95% of the text width (cap 320 px). Everything else snaps to the scale.
- Supporting lines: the largest scale step at or under hero / 1.7. The hero is clearly dominant.
- Floor: 48 px on 9:16, 40 px on 1:1. Nothing smaller than 57 px is used in practice.
- Leading 1.02 for display. Space between groups is larger than space inside a group (proximity).
- Max 6 words per beat.
- Wrapping: at most 2 rows for supporting lines and 3 for the end headline. Never a single word alone on the last row ("The / Context Gap", not "The Context / Gap"). If no clean break fits, the size steps down.

## 6. Hierarchy
- One dominant element per frame. Bigger means more important (NN/g). At most 3 sizes in a frame.
- The accent goes on the dominant element only. Color, scale and weight point at the same thing.
- Squint test: blur the frame. The dominant line should still be the first thing seen.

## 7. Composition: make the idea visible
The layout shows the argument, not just the words. Post 1 ("AI tools increase output, but context doesn't keep up"):
1. OUTPUT (magenta text) and CONTEXT (muted) arrive at the same size, stacked tight. They start as equals.
2. OUTPUT grows to hero size and lifts away, a single eased move. CONTEXT doesn't move and stays muted. The space between them opens and becomes the gap.
3. "The Context Gap" lands under CONTEXT in main white.
4. The end card shows "The / Context Gap" and the wordmark.
`fx: climb` does this for any pair: the climb line starts at the size of the line below it, then grows and opens a gap once that line has landed.

## 8. Motion
- Kinetic type is reading first. Readable, understood, emphasis, then brand, in that order (MediaScaleUp).
- One move at a time. Entrances 0.5 s, cubic ease-out, moving about 30% of the type size (small moves, never from zero scale). The climb growth uses ease-in-out over 1.4 s.
- Holds: about 1 s plus 0.3 s per word. The full statement holds at least 1.8 s untouched before the end card.
- Emphasis on one word per beat. Effects only happen in transitions, never during a hold. No shake, pulse or letter-by-letter reveals.
- fx menu: rise (default), slam (lands from 1.15x), pop (small overshoot), stay, split, climb. At most 2 different fx per piece, plus climb.
- Exit: one 0.4 s fade to the end card.

## 9. End card (last ~2.6 s)
- Headline (the `"end"` key or the last line), fitted display size, no orphan word, left axis, at about 45% of the text area.
- Lowercase `tbtx` in MuseoModerno at 101 px on the bottom line of the text area, left axis.
- Same neutral background. No URL, no handle, no rules, no extra copy.

## 10. Banned
- Brand color as a full background.
- Pink, red or purple text on magenta, and any text under 4.5:1.
- URLs, domains or "visit" lines on screen.
- A thin accent line plus a small caption.
- Centred stacks, random placement, orphan words.
- Gradients behind text, drop shadows, outlines, decorative shapes.

## 11. Pre-flight checklist (every visual must pass)
1. Background is neutral (`#111111` or `#fafaf7`). Magenta is an accent only, at 15% of the frame or less (see the render log).
2. `python3 kinetic.py spec.json x --check`: every ratio is 4.5:1 or more, or corrected.
3. No URL or domain anywhere in the frames. The link is in the caption (or "link in bio" on Instagram).
4. Every element starts on the left margin. Nothing is centred.
5. Safe zones: nothing outside the text area for the format.
6. Only Archivo Black, plus MuseoModerno for the wordmark. Only scale sizes, except the fitted hero and end headline.
7. One dominant element per frame, carrying the accent.
8. No orphan word. Max 6 words per beat.
9. One move at a time, ease-out. The full statement holds 1.8 s or more.
10. End card: headline plus the lowercase tbtx wordmark only.
11. The layout shows the idea (for example, something grows while something else is left behind), not just the words.
12. Look test: extract 5 frames plus the end card, view them small side by side, and squint. If anything looks placed rather than designed, it fails.
13. Copy: no you/your, no em dashes, passes COPY-RULES.md.

## Sources (read 2026-10-22)
- Meta Business Help Center, "About text overlays and the safe zone for ads": https://www.facebook.com/business/help/980593475366490 (large clean font in a contrasting hue, one message, keep top, bottom and sides clear, taller screens may crop).
- Mellow, "Reels and Shorts safe zone checker": https://www.mellow.world/hub/tools/reels-safe-zone (Meta figures: top 14%, bottom 35%, 6% sides. YouTube Shorts: 288/672/48/192 px. TikTok publishes templates only, and its zone shrinks with caption length).
- Showtime docs, "Typography for video": https://faviovazquez.github.io/showtime/docs/typography.html (9:16 organic box x 64-916, y 220-1440; hero 60-80% of width; floors 48 px at 9:16 and 40 at 1:1; max 2 families; entrances 0.4-0.6 s moving 16-40 px; one emphasized word; never shake or pulse).
- MediaScaleUp, "How to Get Kinetic Typography Right": https://mediascaleup.com/post/how-to-get-kinetic-typography-right-motion (readable, understood, emphasis, brand; separate the entrance from the hold; about 1 s plus 0.3 s per word; phrase-level motion; effects only in transitions; keep clear of platform UI).
- ColorFYI, "The 60-30-10 Rule: Color Proportion in Design": https://colorfyi.com/blog/color-proportion-rule/ (dominant should be quiet or neutral; accent about 10%, "appearing everywhere means appearing nowhere").
- We.Inc search excerpt on website color schemes (https://we.inc/guides/website-color-schemes): "If the business already has a logo color, that is the accent... if the accent covers a quarter of the screen, it is doing too much." Seen in search results, not fetched in full.
- Vision Australia search excerpt on 60-30-10 and accessibility (https://www.visionaustralia.org/business-consulting/digital-access/Creating-accessible-digital-colour-palettes-60-30-10-design-rule): neutral 60%, accent reserved for key elements, check WCAG. Seen in search results, not fetched in full.
- Nielsen Norman Group, "Visual Hierarchy in UX: Definition": https://www.nngroup.com/articles/visual-hierarchy-ux-definition/ (color and contrast, scale, grouping; at most 3 sizes; biggest means most important; the squint test).
- TikTok for Business, "Creative Codes": https://www.tiktok.com/business/en-US/blog/creative-best-practices-top-performing-ads (hook, body, close; text overlays raise view time and recall; respect the UI safe space; CTA cards reported +45% recall).
- LinkedIn Ads, "Guide to Successful Video Ads for B2B Marketing" (search excerpt): https://business.linkedin.com/marketing-solutions/success/marketing-terms/video-ads ("think like a silent film director"; on-screen text 4-7 words; CTA button and link in the surrounding copy).
- The Church of England Digital Labs, "Are you using links on Instagram correctly?": https://www.churchofengland.org/resources/digital-labs/blogs/are-you-using-links-instagram-correctly (caption links on Instagram aren't clickable; use the bio link or a Story link sticker).
- W3C WCAG 2.2, SC 1.4.3 Contrast (Minimum): https://www.w3.org/TR/WCAG22/#contrast-minimum (formula used in `kinetic.py`. Standard reference, not re-read this session).
- Background canon (books, not web): Müller-Brockmann, *Grid Systems in Graphic Design* (1981). Bringhurst, *The Elements of Typographic Style*.
