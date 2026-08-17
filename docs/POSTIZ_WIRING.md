# Postiz API wiring — TransformBy10X

## Answers (ops)

1. **Who puts keys on the VPS?** You. Secrets stay on the host / in Postiz UI. We only commit templates and scripts without real keys.
2. **Localhost keys?** Treat `localhost:8080` public/private keys as dead. Create a **new API key** on the **running** Postiz instance (VPS / production). Connecting X is separate: one Postiz API key + **integrations** for each X account (`@transformby10x`, personal handle). You do **not** mint a special “X-only” API key.

## One-time setup (you)

1. Open production Postiz (VPS container `flow-postiz`, port **5000** on host, or your public URL).
2. Settings → API Keys → create key → store as `POSTIZ_API_KEY` (never commit).
3. Connect channels: X → `@transformby10x` and personal handle. Note each **integration id**.
4. Confirm API base:
   - Self-hosted: `http://127.0.0.1:5000/public/v1` from the host (or your public URL + `/public/v1`)
   - Cloud: `https://api.postiz.com/public/v1`

## Env on VPS (example)

```bash
# do not commit values
POSTIZ_API_KEY=from_postiz_settings
POSTIZ_API_BASE=http://127.0.0.1:5000/public/v1
POSTIZ_INTEGRATION_TBTX=integration-id-for-transformby10x
POSTIZ_INTEGRATION_PERSONAL=integration-id-for-personal-x
```

## List integrations

```bash
curl -s -H "Authorization: $POSTIZ_API_KEY" \
  "$POSTIZ_API_BASE/integrations" | python3 -m json.tool
```

## Schedule a brand post (template)

```bash
curl -s -X POST "$POSTIZ_API_BASE/posts" \
  -H "Authorization: $POSTIZ_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "schedule",
    "date": "2026-08-18T15:00:00.000Z",
    "shortLink": false,
    "tags": [],
    "posts": [{
      "integration": { "id": "'