# Handoff - 2026-08-31

## Current visual authority

- `docs/internal/VISUAL_SYSTEM_2026-08-31.md`
- `docs/internal/ASSET_ROUTE_MAP_2026-08-31.md`
- `output/pdf/TBTX_BBAI_VISUAL_SYSTEM_2026-08-31.pdf`

These documents replace the anti-slop deck and older visual-direction material for launch work. Production pages and assets reviewed within the current seven-day window control design decisions.

Restart the Mac. Work is in git. Do not resume GitHub Releases.

## What is true right now

| Item | State |
|------|--------|
| Repo | `erikhinla/tbtx-next-ecosystem` (gh login **erikhinla**) |
| Vercel | project `tbtx-next-ecosystem`, team transformby10x, CLI user `bizbuilders-ai` |
| Films in git | **no** (gitignored). Stills stay. |
| Production films | Vercel Blob `tbtx-media` |
| Live media origin | Vercel Blob `tbtx-media` |
| GitHub Release `media-v1` | **dead end**. Draft. Caused 404s. Ignore it. |
| Site 404 on founder video | `film()` used to point at that Release. Code now points at Blob. |

## Do next (site) — 20 min after reboot

1. `cd ~/Documents/website/tbtx-next-ecosystem`
2. `gh auth status` — active account must be **erikhinla**
3. Upload the 14 remaining films with the commands in `docs/MEDIA.md` (`--add-random-suffix=false`)
4. Set `NEXT_PUBLIC_MEDIA_ORIGIN` if not already on the project
5. `vercel --prod` or push to `main`
6. Check https://transformby10x.ai — founder clip plays; if a film is still missing, poster shows, no dead video

## Do next (social) — @erikhbush via Postiz

Profile first, then Week 1 queue. Do not invent a second content system.

**Profile (same session)**

Pack: `~/transformby10x-campaign/social-export/week-1/profile/`

- X @erikhbush: avatar `visuals/avatar-400.png`, banner `x-banner-1500x500.jpg`, bio from `copy/BIOS.md`, link `https://transformby10x.ai`
- LinkedIn: `avatar-campaign-800.png`, `linkedin-banner-1584x396.jpg`, headline from runbook, featured diagnostic still
- Runbook: `PROFILE_UPDATE_RUNBOOK.md`

**Week 1 posts**

- Queue: `social-export/week-1/QUEUE.md` + `QUEUE.csv`
- Days 1–5 → diagnostic (`/tbtx/scan` personal, `/tbtx/map` business)
- Day 6 → Fog-Free Daily only
- Day 7 → BizBuilders
- Copy already in `posts/day-0N/`. Visuals already in that folder.
- Journey contract: `docs/PUBLIC_JOURNEY.md` (social → site stakes → doors → scan)

**Postiz (publisher of record)**

- Doc: `docs/POSTIZ_WIRING.md`
- Connect **@erikhbush** as the personal integration. Brand @transformby10x is secondary.
- New API key on the live instance. Never localhost keys.
- Schedule drafts only until you approve. Attach media already in the week-1 pack. Do not re-encode 80MB site heroes for social.

**Creative (when a new asset is needed)**

| Tool | Use |
|------|-----|
| Imagine (Grok) | stills, lockups, posters, profile crops |
| Higgsfield | motion / short social films from locked stills |
| Canva | platform crops (X 1:1, LinkedIn 1.91:1, stories 9:16) from the orange masters in `profile/visuals/_orange_masters/` |

Do not generate a disconnected visual language. Follow the current internal visual system and route map. Blue-tagged business assets feed BBAI; campaign assets feed the Digital Fog world.

## Do not

- `git add public/media` or any mp4
- `gh release create` / `gh release upload`
- Git LFS
- transformby10x GitHub login for this repo
- Em dashes
- Shortcut social CTAs past stakes/doors (see PUBLIC_JOURNEY.md)

## After reboot, first prompt for the next agent

> Read docs/HANDOFF.md and docs/MEDIA.md. Upload remaining films to Vercel Blob with --add-random-suffix=false. Confirm founder-erik plays on transformby10x.ai. Then run the @erikhbush profile update from transformby10x-campaign/social-export/week-1/profile/PROFILE_UPDATE_RUNBOOK.md and queue Week 1 through Postiz as drafts.
