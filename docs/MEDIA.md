# Site films: Vercel Blob, not git

Do not put mp4s in git, GitHub Releases, or LFS. That pack is ~547MB. GitHub times out. The GitHub Release path is why `founder-erik.mp4` 404s on transformby10x.ai.

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

Already live (exact pathname, no random suffix):

```
media/founder-erik.mp4
```

A test upload of `hero-fog-people` got a random suffix. Re-upload with `--add-random-suffix=false` (equals sign required).

## Upload remaining used films

From `~/Documents/website/tbtx-next-ecosystem`:

```bash
set -a; source .env.local; set +a
for f in \
  hero-fog-people.mp4 desk-fog-loop.mp4 task-logos.mp4 task-clockout.mp4 \
  fog-cinematic.mp4 b2b-sold-ai.mp4 task-lives.mp4 fog-free-share.mp4 \
  infra-endcard.mp4 computer-explodes.mp4 long-form-combined-lowres.mp4 \
  door-b2b-827v2.mp4 door-b2c-827v2.mp4 hero-site-827a.mp4
do
  vercel blob put "public/media/$f" \
    --access public \
    --pathname "media/$f" \
    --add-random-suffix=false \
    --allow-overwrite=true \
    --content-type video/mp4 \
    --rw-token "$BLOB_READ_WRITE_TOKEN" \
    --non-interactive
done
```

Then confirm:

```
curl -sI https://9s35ujeqbjjbd1bt.public.blob.vercel-storage.com/media/hero-site-827a.mp4 | head -5
```

Must be `200` and the URL must **not** contain a random suffix.

Set env if missing:

```bash
printf '%s' 'https://9s35ujeqbjjbd1bt.public.blob.vercel-storage.com/media' \
  | vercel env add NEXT_PUBLIC_MEDIA_ORIGIN production preview development
```

Redeploy after env + uploads. Until a film is on Blob at the exact name, the poster still shows. That is intended.
