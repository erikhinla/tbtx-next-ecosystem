# TBTX production contract

This file is the source of truth for the public website deployment.

## One production path

| Layer | Authority |
| --- | --- |
| GitHub repository | `erikhinla/tbtx-next-ecosystem` |
| Git branch | `main` |
| Vercel team | `transformby10x` |
| Vercel project | `tbtx-next-ecosystem` (`prj_B81GLip6G8QqE29rxqaPyzFr5XfQ`) |
| Public domain | `transformby10x.ai` |

`tbtx-cinema` and `erikhinla/flow-as/launch` are not production authorities for this website. They may keep their own preview or `.vercel.app` URLs, but they must not own, assign, or alias `transformby10x.ai`.

Registrar ownership, nameservers, and DNS records are separate from Vercel project assignment. Normal website deployments do not require moving the domain or changing DNS.

## Developer workflow

1. Create work on a feature branch.
2. Use the Vercel preview deployment for review.
3. Merge approved work into `main`.
4. Vercel deploys `main` to production and assigns `transformby10x.ai`.

Do not manually point the public domain at a deployment from another project. Use Vercel's rollback on `tbtx-next-ecosystem` if production must be restored.

## Secrets

Infisical is the source of truth for secret values. Never commit secrets, paste them into documentation, or maintain a second manual `.env.local` source of truth.

The website currently reads no server-side secret at runtime. `BLOB_READ_WRITE_TOKEN` is an upload credential for media maintenance; public film playback does not require it. Run upload commands through an authenticated Infisical session as documented in [MEDIA.md](MEDIA.md).

## Verification

After a production deployment, verify:

```bash
vercel inspect transformby10x.ai
curl -I https://transformby10x.ai/tbtx
curl -I https://transformby10x.ai/scan
curl -I https://transformby10x.ai/map
```

Expected route behavior:

- `/` resolves to `/tbtx`
- `/scan` redirects to `/tbtx/scan`
- `/map` redirects to `/tbtx/map`
- `/tbtx`, `/tbtx/scan`, and `/tbtx/map` return `200`
