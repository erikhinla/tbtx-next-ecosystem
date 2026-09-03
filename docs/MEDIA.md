# Site films: Vercel Blob, not git

Do not put mp4s in git, GitHub Releases, or LFS. The film pack is too large for the repository. Production films are public Vercel Blob objects; still images remain in git as fallbacks.

## How it works

- Localhost: `public/media/` on this Mac. Site requests `/media/founder-erik.mp4`.
- Production: `src/lib/media.ts` `film()` points at Vercel Blob:

```
https://9s35ujeqbjjbd1bt.public.blob.vercel-storage.com/media/<file>
```

Override with `NEXT_PUBLIC_MEDIA_ORIGIN` if the store URL changes.

Stills (jpg) stay in git. `src/components/Film.tsx` shows the poster if a film 404s.

## Blob store

- Project: `tbtx-next-ecosystem` (team transformby10x, Vercel login `bizbuilders-ai`)
- Store: `tbtx-media` (`store_9S35UJeqbJjbd1BT`)
- GitHub repo: `erikhinla/tbtx-next-ecosystem` (active gh account: **erikhinla**, not transformby10x)

Live production files (stable pathnames, no random suffix):

```
media/hero-site-827a.mp4
media/door-b2c-827v2.mp4
media/door-b2b-827v2.mp4
media/founder-erik.mp4
media/long-form-combined-lowres.mp4
media/task-logos.mp4
media/b2b-sold-ai.mp4
media/task-clockout.mp4
media/computer-explodes.mp4
media/task-lives.mp4
media/desk-fog-loop.mp4
media/infra-endcard.mp4
media/fog-cinematic.mp4
media/fog-free-share.mp4
```

Retired — unlinked from the site. Still on Blob until ops purges (no `BLOB_READ_WRITE_TOKEN` in this environment):

```
https://9s35ujeqbjjbd1bt.public.blob.vercel-storage.com/media/hero-fog-people.mp4
```

Do not re-upload `hero-fog-people.mp4`. Recuts from that file stay dead. `hero-site-827a.mp4` is a different film; keep it.

## Upload or replace used films

Use the canonical checkout at `~/Documents/TBTX_COMMAND_CENTER/04_WEBSITE`. Infisical is the secret source of truth. Do not source `.env.local` or paste the Blob token into a command.

The checkout must first be linked by an authenticated Infisical user with `infisical init`. Then run the upload inside the Infisical-injected environment:

```bash
infisical run --env=prod -- bash -lc '
  for media_file in \
    desk-fog-loop.mp4 task-logos.mp4 task-clockout.mp4 \
    fog-cinematic.mp4 b2b-sold-ai.mp4 task-lives.mp4 fog-free-share.mp4 \
    infra-endcard.mp4 computer-explodes.mp4 long-form-combined-lowres.mp4 \
    door-b2b-827v2.mp4 door-b2c-827v2.mp4 hero-site-827a.mp4
  do
    source_file="public/media/$media_file"
    if [ -f "public/media/_web/$media_file" ]; then
      source_file="public/media/_web/$media_file"
    fi
    vercel blob put "$source_file" \
      --access public \
      --pathname "media/$media_file" \
      --add-random-suffix=false \
      --allow-overwrite=true \
      --content-type video/mp4 \
      --rw-token "$BLOB_READ_WRITE_TOKEN" \
      --non-interactive
  done
'
```

Then confirm:

```
curl -sI https://9s35ujeqbjjbd1bt.public.blob.vercel-storage.com/media/hero-site-827a.mp4 | head -5
```

The response must be `200`, and the URL must **not** contain a random suffix.

Set env if missing:

```bash
printf '%s' 'https://9s35ujeqbjjbd1bt.public.blob.vercel-storage.com/media' \
  | vercel env add NEXT_PUBLIC_MEDIA_ORIGIN production preview development
```

Redeploy when `NEXT_PUBLIC_MEDIA_ORIGIN` changes. Replacing a film at the same public pathname does not require a code deployment. If a film is unavailable, the poster fallback is intentional.
