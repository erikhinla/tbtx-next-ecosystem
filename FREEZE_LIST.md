# FREEZE_LIST.md

**Repo:** `erikhinla/tbtx-next-ecosystem`
**Version:** 2026.09.17c
**Status:** ACTIVE. This file governs every change round until Erik bumps the version.
**Verified against:** `https://transformby10x.ai` production, read live 2026-09-17.

**Amended in c:** one unlock, the manifesto ground in Section C, approved by
Erik. Two open jobs in flight, tracked separately in Section H. See the
changelog at the foot of this file.

---

## What this file is

Every item below is signed off and shipped. It does not change because a later
round found a collision, a cleaner layout, or a better line. If a fix requires
touching a frozen item, the fix stops and Erik names the unlock first.

This exists because the failure mode on this build has not been bad work. It has
been good work quietly undressing earlier good work. The manifesto lost its film
because a note that said "give the copy its own ground" was read as "remove the
motion." That is the pattern. This file is the guard against it.

**Agents: read this file before you plan a change, not after.** If your change
touches anything in Sections A, B or C, reply with the conflict instead of
shipping.

---

## The three rules

1. **Freeze.** Sections A, B and C are locked. Erik unlocks by naming the item.
2. **Preview before live.** Any non-trivial pass goes to a branch, Erik looks at
   the Vercel preview, then it goes to `main`. Trivial means a typo or a dead
   link.
3. **One job per round.** A visual pass and a conversion fix do not ride in the
   same drop. If a round contains both, split it.

---

## Section A. Locked copy

Exact strings. Character for character. These live in `data/benefit-track.json`
and the page components that import from it. Do not duplicate them anywhere else
in the codebase.

### A1. Campaign lockup (arrival)

```
AI
CREATED A JOB
(nobody wanted)
```

One stack, left column. `(nobody wanted)` sits with the lockup and leaves with
the hero. It does not persist through the film. TBTX does not appear on this
beat.

### A2. The benefit track, in order

| Beat | Line | Mode |
|---|---|---|
| arrival | `There's a name for it.` | free |
| fog | `I'm not crazy. This fog is real.` | silent on track, primary in flow |
| gate | (silent) | silent |
| carry | `It was never ours to carry.` | free, post Stand Up |
| fork | `Same leftover job. Two rooms.` | free |
| proof | `(the dashboards kept the job.)` | lockup, in flow |
| ddd | `20 minutes. One surface. A way back.` | lockup, in flow |
| founder | `Back to the work that's mine.` | free, release |

The gate stays silent. One beat with no subtitle is what makes the others land.

Named beats wear their line in flow. They never repeat on the fixed layer.

**On the fog beat.** The line is the manifesto primary and the fixed track is
silent there. Do not promote it to a free track line. That would put the same
sentence on the track and the page at the same moment, which is the exact
collision this list exists to prevent. Correcting it would need an unlock, and
the answer is no.

### A3. Manifesto

Opens on the accusation. No click, no door, no "Familiar with Fog?" gate in
front of it.

- Headline: `ALWAYS BUSY. NEVER BUILDING.`
- Open: `Your tools didn't remove the work.` / `They reassigned it to you.`
- Protected line: `Part therapist for software.` Never cut.
- The four-part joke keeps its line breaks and its brass rule.
- The six titles run inline as a series, not as bullets.
- Protected clause: `And one it never gets: the person at home who keeps track
  of everything.` This is what earns the personal lane.
- Close: `Nobody assigned this job.`
- After Stand Up: `It was never ours to carry.`
- Rhythm: three peaks, three valleys, alternating. Only three things are set
  apart. The accusation, the joke, the close. Nothing else breaks.
- No closing question. The Gate is the only ask on the site.

### A4. The Gate

```
WHERE
DO YOU
STAND?
```

Sit Out and Sit Back are closed consequence text. Stand Up is the only door.
The gate sits on carbon with no burned-in film type competing with it. This is
the only place on the site a visitor is asked to choose.

### A5. The fork

Both doors share one format. If one gets a count line, the other gets a count
line.

```
DIGITAL FOG SCAN     MY DAY.        8 answers. One spot.
MOMENTUM MAP         MY BUSINESS.   15 answers. Where the work comes back.
```

`15 answers. Where the work comes back.` renders on **one line**. It does not
wrap after "the." This has broken twice.

8 and 15 are both correct and deliberate. Scan is the B2C lane, Map is the B2B
lane. Do not reconcile them to a single number.

### A6. PROOF

- `PROOF` / `Fog & Friction Forensics`
- Track line: `(the dashboards kept the job.)` No BizBuilders clause appended.
- Primary CTA: `Map Business Momentum`
- `See the limits` opens the method. It does not promise a formula.
- `Enter BizBuilders AI` sits in the CTA cluster, never across the wordmark.

### A7. DDD landing

- `Digital De-Fog Daily` / `LESS TO CARRY.`
- `20 minutes. One surface. A way back.`
- `First month is on me.`
- Primary: `Start DDD`. Secondary: `Inside DDD`.
- **No payment rails on this screen.** Venmo and any other rail stay hidden
  until the visitor clicks Pass it on. A visitor can finish DDD without ever
  seeing a payment method.
- After Start DDD: `Your month is covered. Nothing to pay, nothing to cancel.`
  then the sentence, not a button: `This one's on me. Pass it on when it's your
  turn.`

### A8. Founder

- `THE WORK BETWEEN THE WORK.`
- Links: `How we got here` and `Field notes`.
- Field notes opens on `I publish the parts that aren't working yet.` Notes take
  the primary click. BizBuilders takes the quiet one. The voice is `I` here on
  purpose. No 10X as a verb anywhere in this section.

### A9. The hang

- Public name is `The hang`. Not Nudes. Not the operator archive on the door.
- The axis is the three questions, not a calendar:
  - `Why is everything harder than it should be?`
  - `What is actually missing?`
  - `How does the work actually get done?`
- Signature piece: `Tools multiply faster than context.`

### A10. 404

```
THIS PAGE ISN'T HERE.
The work is still on the site. Come back in.
```

Branded, with a way back in.

---

## Section B. Locked routes

Verified 2026-09-17. All resolve.

| Path | Resolves to | Status |
|---|---|---|
| `/` | arrival | 200 |
| `/bbai` | BizBuilders page | 200 |
| `/proof` | `/bbai` (lands on `#proof`) | 200 |
| `/bizbuilders` | `/bbai` | 200 |
| `/bizbuilders.html` | `/bbai` | 200 |
| `/tbtx/bbai` | `/bbai` | 200 |
| `/scan` | Digital Fog Scan, question 1 of 8 | 200 |
| `/map` | Momentum Map | 200 |
| `/hang` | the gallery | 200 |
| `/hang/<piece>` | individual piece, own URL | 200 |
| anything else | branded 404 | 404 |

`/proof` is the published CTA target. It does not 404 again.

Per-piece hang URLs are what social assets link to. Once an asset is published
against `/hang/fog`, that URL is frozen for good.

---

## Section C. Locked behavior

- **Gate gating.** `carry`, `routes`, `proof`, `daily` and `founder` are hidden
  until Stand Up. They then reveal in full, on phone as well as desktop. The
  phone must not stop the film at Scan. This broke once.
- **Sound.** One control. Small speaker, bottom right, 40% opacity. Wide corner
  hit area. Tapping the film itself toggles sound. The icon is the status, not
  the only control. The hit area does not cover Stand Up. Sound follows the film
  you are on. Two tracks never stack.
- **The world layer.** Carbon behind the gate only. Empty carbon behind the
  manifesto is a regression, not a fix.
- **The manifesto ground.** UNLOCKED by Erik 2026-09-17, superseding the
  fog-desk loop. The new ground is `manifesto-hall-loop.mp4`, the hall walk cut
  from his own manifesto film. Measured: copy column stays at luma 19 to 33 for
  the full 11 seconds, which carries warm white body copy without a heavy wash.
  No audio track. Poster frame `manifesto-hall-poster.jpg` for lazy load.
  Refreezes once it is on the preview and Erik signs it off. Until then this is
  the only item in C that may move, and an agent may not substitute a different
  film for it.
- **Film titles.** Cropped out. No burned-in type competing with live copy.
- **Track transitions.** A cut, not a dissolve. Out over 300ms, then in over
  400ms. Never two lines on screen at once.
- **Emerald.** Appears exactly once, on the founder line. One color event in the
  whole film. If it matches two beats, the arc is broken.
- **Accessibility.** The fixed track is `aria-hidden`. `TrackCaption` carries the
  copy in document order, visually hidden. No `aria-live`. Verified live: the
  caption is correctly clipped and does not render visibly.
- **Escape** closes a panel and returns the visitor where they were, still
  stood.
- **Reduced motion.** Fades become instant cuts. Nothing else changes.
- **Performance.** First paint loads the arrival film only. Scan, Map and hang
  stills load on approach. Opening the hang does not auto-start a movie.
- **Reversibility.** Removing `<BenefitTrack />` from the layout leaves the site
  as it was.

---

## Section D. Do not

Each of these has already cost a round.

1. Do not delete a film to solve a type collision. Move the type or add a wash.
2. Do not delete a section to solve an overlap. Respace it.
3. Do not reinterpret a previous lock as an invitation to restyle.
4. Do not push a design pass straight to production.
5. Do not mix a visual redesign and a conversion fix in one drop.
6. Do not add a sixth brand, a glossary, a legend or an explainer section.
7. Do not put the benefit table on the site. It is the brief. The site is the
   film.
8. Do not add a second ask anywhere. The Gate is the only choice.
9. Do not move the track horizontally between beats. The fixed slot is the
   device.
10. Do not animate the type. No per-character reveals, no typewriter, no
    counters.
11. Do not duplicate a frozen string in source. One definition, in
    `benefit-track.json`, imported everywhere it renders. Rendering a line in
    flow under its name is correct and expected. This rule bans a second
    hardcoded copy, not the in-flow lockup. Do not strip working markup to
    satisfy it.
12. Do not use em dashes or en dashes in any public string.
13. Do not use the retired empty verbs. No Learn More, no Explore BBAI, no Book
    a Discovery Call as the primary relief CTA.
14. Do not invent a price, a proof number, an hour count or a percentage.
15. Do not put Mr. Nobody on a public surface before October 2026.
16. Do not use 10X as a verb.

---

## Section E. Open. These may still change.

Not frozen. Named here so they do not get confused with drift.

1. **The founder emerald line.** `Back to the work that's mine.` is the pick.
   Two alternates remain in `founder.alternates`. Read all three out loud before
   locking. **Verify by eye on the preview that the line actually renders
   emerald.** Programmatic checks could not confirm the release color fires, and
   this is the only color event in the film.
2. **BizBot Mrktng on `/bbai`.** The page currently shows `BizBot Mrktng /
   GROW. / Explore the products`. Canon holds BBM off the live site as a
   placeholder, and `Explore the products` is the empty-verb pattern already
   retired. Decide: pull the block, or bump canon and rewrite the verb.
3. **Nav chrome.** Live reads logo, BizBuilders, PROOF, DDD, The hang. The
   working record described it as TBTX, PROOF, DDD, The hang. Confirm the
   BizBuilders item is intended before it freezes.
4. **404 page title.** The tab title is `Managing Digital Fog` while other pages
   read `TBTX · AI created a job` and `BizBuilders AI · Begin with PROOF`. Pick
   one convention.
5. **Scan scoring range.** Canon's public calc assumes 15 questions at 0 to 3
   for a 0 to 45 total with four tiers. The live Scan is 8 questions. Either it
   normalizes to 0 to 45 so tiers stay comparable across lanes, or it gets its
   own published range and thresholds. Copy inherits whichever way this goes.
6. **Canon version bump.** `TBTX_MASTER.md` still locks both the Scan and the
   Map at 15 questions. Live is 8 and 15. TBTX_MASTER is now the only place that
   says otherwise, and it needs the bump.
7. **The unfinished mobile patch round.** One patch-list pass ran long and never
   returned a result. Confirm nothing from it is half applied before the next
   push.
8. **Two token values.** `--track-ink` and `--track-release` were left as
   REPLACE pending canon hex values. Confirm they are set and not a second
   palette.
9. **The Map intro screen.** `/map` opens on `15 answers. Reveal the limiting
   factor. Take the first step the rest depends on.` The fork card says
   `15 answers. Where the work comes back.` Two sentences for one instrument on
   two surfaces. Not a drift, because neither was frozen, and correctly left
   alone rather than guessed at. Decide whether the Map screen inherits the
   fork line or keeps its own longer promise. Whichever survives, the other
   surface follows and both freeze together.

---

## Section F. How to unlock

Erik names the item by its section number. For example: "unlock A5, the Map line
can wrap on phone."

An agent may propose an unlock. It may not take one. The proposal says what is
frozen, what would change, and what breaks if it does not. Then it stops.

After an approved change, the item goes back into the freeze list with a new
version number on this file.

---

## Section G. The pre-push check

Four minutes. Run it on the preview, not on production.

1. **The mute test.** Kill every video. Scroll from arrival to founder with
   nothing but the track visible. Eight lines, in order, gate silent. If a
   stranger can read them and say what they get, it holds.
2. **The phone scroll.** Stand Up, then confirm the full sequence arrives:
   carry, fork, Scan, Map, PROOF, DDD, founder, the hang. Nothing stops at Scan.
3. **The one-line check.** `15 answers. Where the work comes back.` on one row.
   `8 answers. One spot.` matching.
4. **The room check.** The fog-desk loop is behind the manifesto. Carbon is
   behind the gate. Neither has swapped.
5. **The color check.** Emerald appears once, on the founder line, and nowhere
   else.
6. **The route check.** `/proof`, `/bbai`, `/scan`, `/map`, `/hang`, and one
   nonsense path for the 404.
7. **The CTA check.** Every `Map Business Momentum` opens the Map. `See the limits` opens
   the method. `Start DDD` reaches the covered-month screen with no payment rail
   in sight.
8. **The breakpoint check.** 390px, 768px, 1440px, and landscape phone. The
   track never collides with the campaign lockup.

Then `main`, then the domain, then hard refresh once.

---

## Section H. Jobs in flight

Rule 3 says one job per round. Two are open. They stay on separate branches and
they merge one at a time.

**H1. E2, BizBot closed text.** Branch `freeze/e2-bbm-closed`, draft PR #23.
Awaiting review. Not merged. Production still has the door.

**H2. Manifesto ground.** Not started. Branch it separately. Do not fold it into
H1, and do not merge them together. Assets are cut and ready:

- `manifesto-hall-loop.mp4`, 1920x1080, 10.0s, no audio, 1.0MB. Cut from Erik's
  own hallway render. Measured: copy column peaks at luma 51 and never once
  crosses 55 across the full runtime, worst-case contrast 10.7:1 against warm
  white, mean 14.1:1. Loop seam delta is 5.8 luma, soft enough to be invisible.
- `manifesto-hall-poster.jpg`, 1920x1080 poster frame for lazy load.
- `computer-explodes-clean.mp4`, 1920x1080, 23.4s, audio kept. Erik corrected
  the mirroring at source. Watermark cropped out, 16:9 preserved by a slight
  punch-in. This is a candidate for The hang. It is NOT a manifesto ground and
  must not be placed behind body copy.

Both films are 1080p, so the earlier softness concern is closed.

---

## Changelog

**2026.09.17c**

- C: the manifesto ground unlocked and respecified. The fog-desk loop is retired
  for that beat in favour of the hall walk from Erik's own manifesto film.
  Unlock requested and approved by Erik, which is Section F working as intended.
- Measured before accepting: the uploaded film's darker half holds for the first
  11.5 seconds only. After that the stone computer takes the copy column from
  luma 19 to 98, which is what made the manifesto hard to read.
- Two defects found in the stone computer footage and fixed in the cut asset. It
  was horizontally flipped, so its on-screen type read backwards, and it carried
  a NotebookLM generator watermark in the corner. Neither may reach a public
  surface. Erik re-rendered both films at 1080p and corrected the mirroring at
  source the same day. The watermark is cropped out in the staged asset.
- Section H added to track the two open jobs so they do not merge together.

**2026.09.17b**

- A2: fog row was written as a free track line. Corrected to silent on the
  track, primary in flow. Source was the live page read, where the line renders
  inside the manifesto section. The data file is the authority and it says
  silent. Not independently reverified, flagged here rather than claimed.
- D11: was read as an instruction to strip in-flow markup. Rewritten to say
  what it meant, one definition in JSON, imported everywhere it renders.
- E9 added: the Map intro screen and the fork card carry different sentences.
  Neither was frozen, so this is an open decision, not a regression.
- No item was unlocked. A1 through A10, B and C stand unchanged.

**2026.09.17a**

- First freeze. Built from a live read of production, not from the build record.

---

Strategy: clear the fog so attention returns to work that compounds.
Position: a named leftover job, a way out in the day, a find-then-fix path in the business.
Marketing: benefit rides the film as subtitles, never as body copy.
Revenue: Recognition stays free, DDD stays honor-priced, PROOF routes to engagement.
