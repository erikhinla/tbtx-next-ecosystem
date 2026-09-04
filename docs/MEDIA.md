# Site films: Vercel Blob, not git

Do not put mp4s in git, GitHub Releases, or LFS. Production films are public Vercel Blob objects. Stills may live in git as posters.

## Naming (memorize this)

Pattern: `{job}-{cut}.{ext}`

- `job` = the slot on the site. One job, one live file.
- `cut` = `hero` | `loop` | `share` | `poster`
- Working drafts add `.draft-vN` before the extension. Never point the site at a draft.

Locked live names:

| Locked name | Job | Notes |
|---|---|---|
| `hero-site.mp4` | Front-door film 1 | Must include an audio track. Current Blob `hero-site-827a.mp4` is video-only — that is why Sound on is silent. |
| `defog-daily-hero.mp4` | Digital De-Fog Daily campaign film | Couple on the street + fog monster. Formerly Fog-Lift Kit campaign. Drive: `Fog-Lift-Kit-campaign-final.mp4`. |
| `share-defog.mp4` | After-share / referral loop | Current Blob `fog-free-share.mp4`. Not the campaign hero. |
| `door-life.mp4` | Personal scan door | Today: `door-b2c-827v2.mp4` |
| `door-work.mp4` | Business map door | Today: `door-b2b-827v2.mp4` |
| `founder.mp4` | Founder close | Today: `founder-erik.mp4` |
| `reel-day.mp4` | Long-form lightbox | Today: `long-form-combined-lowres.mp4` |

Poster = same stem + `.jpg`.

Rules
1. Replace the bytes. Keep the locked name.
2. Do not put `fog-lift` in a new live filename. That title is retired.
3. If two files could be confused, the job token decides, not the pretty title on the slate.

## How playback works

- Localhost: `public/media/`.
- Production: `src/lib/media.ts` `film()` → `https://9s35ujeqbjjbd1bt.public.blob.vercel-storage.com/media/<file>`
- `Film.tsx` falls back to the poster if the mp4 404s.
- Autoplay is muted (browser rule). Sound on only works if that file has an audio stream.

## Blob store

- Project: `tbtx-next-ecosystem` (team transformby10x)
- Store: `tbtx-media` (`store_9S35UJeqbJjbd1BT`)
- Repo: `erikhinla/tbtx-next-ecosystem`

Live Blob objects today:

```
media/hero-site-827a.mp4          # SILENT — no audio track
media/door-b2c-827v2.mp4
media/door-b2b-827v2.mp4
media/founder-erik.mp4            # silent
media/long-form-combined-lowres.mp4  # has audio
media/task-logos.mp4
media/b2b-sold-ai.mp4
media/task-clockout.mp4
media/computer-explodes.mp4
media/hero-fog-people.mp4         # studio fog-monster stills, not the street couple
media/task-lives.mp4
media/desk-fog-loop.mp4
media/infra-endcard.mp4
media/fog-cinematic.mp4           # lockup billboard, has audio
media/fog-free-share.mp4          # share loop, has audio
```

Missing from Blob (must upload before the second hero can play):

```
media/defog-daily-hero.mp4
media/defog-daily-hero.jpg
```

Source on Drive (erik h bush):
- `Fog-Lift-Kit-campaign-final.mp4` (30s, 1920x1080, AAC audio) — campaign hero
- `Fog-Lift-Kit-campaign-clean-loop-v2.mp4` (23s loop, AAC) — same picture, loop cut
- `hero-site-827.mp4` / `hero-site-827a.mp4` 89MB master — likely the sound cut; 10MB web encode on Blob has no audio

## Upload

Canonical checkout: `~/Documents/TBTX_COMMAND_CENTER/04_WEBSITE`.
Secrets from Infisical. Do not paste the Blob token.

```bash
infisical run --env=prod -- bash -lc '
  vercel blob put public/media/defog-daily-hero.mp4 \
    --access public \
    --pathname media/defog-daily-hero.mp4 \
    --add-random-suffix=false \
    --allow-overwrite=true \
    --content-type video/mp4 \
    --rw-token "$BLOB_READ_WRITE_TOKEN" \
    --non-interactive
'
```

Confirm:

```
curl -sI https://9s35ujeqbjjbd1bt.public.blob.vercel-storage.com/media/defog-daily-hero.mp4 | head -5
```

Must be `200` with no random suffix.
