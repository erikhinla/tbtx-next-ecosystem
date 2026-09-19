# Signed drops

**What this is:** the engagement method. Not a calendar. The unit of work is a **signed drop**.

Hand this file to an agent as a skill. Hand the milestone list to a client as the scope. Same process.

Specimen: TBTX freeze HTML, 2026-09. Reuse on any site, product, or client build where live mistakes are expensive.

---

## The three boxes

Do not talk as if these were one place.

| Box | What it is | Who looks | Reversible |
|---|---|---|---|
| 1. Branch | The workbench. Commits exist. Nobody public sees them. | Builder | Yes. Throw the branch away. |
| 2. Preview | A Vercel (or equivalent) copy of that branch. A URL. | Client signs or rejects here | Yes. Preview is not the business. |
| 3. Live | The domain people already have in posts, bios, ads. | The public | No. Unwind, don't pretend it didn't ship. |

A thing can be real in Box 1 and absent in Box 2. A nickname preview URL can freeze on an old SHA while a unique deploy URL has the new one. Measure the SHA, not the nickname.

Never use the live key because the preview is jammed.

---

## The unit is a step, not a clock

Nobody here has a reference for "how long this takes." Do not invent one.

A drop is done when the named check passes, not when a number of hours has passed.

Live after a signed merge is: merge → production build → confirm the domain serves that SHA. That is three steps. Caching of scripts is a fourth step if the host has a long `max-age`.

---

## One job per drop

A visual pass and a conversion fix do not ride together.

If a round contains both, split it.

If a later fix needs a frozen thing, stop. Name the unlock. Do not quietly undress earlier good work.

---

## How a drop is written

```
One job: <name>.

What changes
- …

What stays
- … (named, not "everything else")

Frozen. Do not touch.
- …

Preview only. Do not merge to main.
Report: <the one measurement that proves it>
```

The client signs the preview. Then, and only then:

```
Merge <this PR> only.
Do not merge <these>.
Record the current production deployment as rollback.
Confirm <domain> serves the new SHA.
```

Two different keys. Preview key, then live key.

---

## Milestone scopes (client sheet)

Copy, rename, fill. Each line is a drop. Order is the engagement.

1. **Look.** Client opens the named preview URL (unique deploy, not a stale alias). Sign or reject.
2. **Live this stack.** Merge that PR only. Confirm the public domain. Close contained PRs. Do not stack rejected or conflicting branches onto it.
3. **Next named surface.** One job. Own preview. Own sign.
4. Repeat 1–3 until the board is empty.

A board is a list of named drops, not a date. Example board (TBTX, after `#33`):

- PROOF hero (hierarchy, Specimen on the film, secondary method CTA)
- `/proof` as its own page (URL already public; do not move the CTA)
- Width check at the signed set of viewports
- One copy of each remaining shared dialog
- Viewer readout (copy first, then build)
- Any later product surface (example: BizBot Mrktng) when that job is opened

---

## Diagnosis when Box 2 lies

Check in this order. Stop when you have the cause.

1. **Wrong URL.** Branch alias vs unique deploy URL vs live domain. Which SHA does each serve.
2. **Account / billing block.** Builds fail with "Account is blocked" while git moves.
3. **Split brain.** Same repo linked to two hosts. Public DNS on one. The other building is noise unless someone moves the domain.
4. **Cache.** HTML may be fresh while JS is `max-age=3600`. Query strings on the HTML must change when the JS body changes.
5. **First paint vs after scripts.** A measurement after `DOMContentLoaded` is not a first frame. If the visitor sees black, measure the HTML, not the runtime.

---

## Irreversible vs preview

| Reversible | Irreversible |
|---|---|
| Branch, preview, copy, CSS, a film swap | Merge to the production branch |
| A 302 while a real page is missing | A 301 (browsers keep it) |
| A CTA on a preview | A URL already in published posts and bios |

If the public CTA_URL already exists, the page comes to the URL. The URL does not move.

---

## Agent skill (short)

When running this method:

- Read this file before planning a change.
- Reply with the conflict if the change touches a freeze. Do not ship around it.
- Report in steps. Never in days, weeks, or "soon."
- One job. Preview URL + SHA. What changed. What did not. The measurement.
- Do not merge until the client names the live key.
- Do not rediscover a diagnosis the client already handed you. Verify it, then act.

---

## Origin

Written from the TBTX freeze engagement, 2026-09-18. The failure mode was not bad work. It was good work quietly undressing earlier good work, and Box 2 being mistaken for Box 3.
