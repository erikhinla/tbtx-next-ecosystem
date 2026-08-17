# Postiz API wiring — TransformBy10X

## Ops answers

1. **Who puts keys on the VPS?** You. Secrets stay on the host / in Postiz UI. Repo only gets templates — never real keys.
2. **Localhost keys?** Treat anything from `localhost:8080` as dead. Create a **new API key** on the **running** Postiz instance (VPS container `flow-postiz`). X accounts are **integrations**, not separate API keys. One Postiz API key posts to every connected channel.

## One-time setup (you)

1. Open production Postiz (host port **5000**, or your public URL).
2. Settings → API Keys → create → save as `POSTIZ_API_KEY` (password manager / VPS env only).
3. Connect X: `@transformby10x` and personal handle. Copy each **integration id**.
4. API base from the host:
   - Self-hosted: `http://127.0.0.1:5000/public/v1`
   - Cloud: `https://api.postiz.com/public/v1`

## Env on VPS (do not commit values)

```bash
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

## Schedule brand post (text)

```bash
curl -s -X POST "$POSTIZ_API_BASE/posts" \
  -H "Authorization: $POSTIZ_API_KEY" \
  -H "Content-Type: application/json" \
  -d "{
    \"type\": \"schedule\",
    \"date\": \"2026-08-18T15:00:00.000Z\",
    \"shortLink\": false,
    \"tags\": [],
    \"posts\": [{
      \"integration\": { \"id\": \"$POSTIZ_INTEGRATION_TBTX\" },
      \"value\": [{
        \"content\": \"AI created a job nobody applied for: managing Digital Fog.\n\nFind where your system is breaking → https://transformby10x.ai/tbtx/diagnostic\",
        \"image\": []
      }],
      \"settings\": { \"__type\": \"x\", \"who_can_reply_post\": \"everyone\" }
    }]
  }"
```

Upload media via Postiz first, then attach the returned path in `image`.

## Messaging (short)

| Channel | Asset | Line |
|---------|--------|------|
| Site hub | desk-fog-loop under type | H1 + CTA |
| X brand | desk / reaction GIF | H1 or H2 + diagnostic URL |
| X personal | same, first person | H2 |
| LinkedIn | reaction GIF | workplace fog |
| IG | multi-life montage | S1 only |

## Activepieces

Optional: HTTP step → same Postiz `/posts` body. Postiz is the publisher of record.
