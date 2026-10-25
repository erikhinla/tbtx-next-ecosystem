# ACCOUNTS AND INTEGRATIONS (no secrets here; only where they live)

| What | Used for | Where the credential lives |
|---|---|---|
| GitHub erikhinla | repos, commits, pushes when Erik asks | gh auth, /root/.config/gh/hosts.yml (scopes repo, workflow) |
| Google Workspace erik@transformby10x.ai | work Drive TBTX-BBAI-BBM, Docs, Sheets | ~/.hermes/google_token.json, google_client_secret.json; skill productivity/google-workspace |
| rclone remote gdrive: | bisync of EHB PRODUCTION folder (root crontab) | /root/.config/rclone/rclone.conf |
| Google service accounts | Sheets writer etc. | ~/.hermes/google_service_account.json, hermes-sheets-writer.json |
| Postiz (self-hosted) | social drafts only | POSTIZ_API_KEY, POSTIZ_API_URL in ~/.hermes/.env; MCP entry in config.yaml |
| Telegram bot @FLOW_Agent_OS_bot | Hermes gateway, chat 6384054989 | TELEGRAM_BOT_TOKEN in ~/.hermes/.env |
| Model | google/gemini-2.5-pro via local LiteLLM (Vertex) at 127.0.0.1:4000 | OPENAI_API_KEY/OPENAI_BASE_URL in .env; Vertex creds on VPS |
| Vercel team erikhbush-8628s-projects | previews only | VERCEL_TOKEN in ~/.bashrc |
| Gmail erikhinla, erikhbush | Erik personal mail; never send | not used by Hermes |
| Credential inventory sheets | Erik's index of accounts | general sheet 1dW7KWeCasqEzSiiwI1iHAXJKBkPFSqLpr5M8geYKYSQ; BBAI social matrix 1tY_vGsvYlI2e3c6v7qIbXp_V6WZI_VIgNhMz1uQTOK4 |

## Drive locations
- Work shared drive TBTX-BBAI-BBM; master doc in 02_BRAND/y_DECKS_DOCS. Master Operating Book 1Kq6leQTLg7HLI6BUgI6gys3XxE5hme4gXjnX3UaW6_8.
- Hermes Social Images 1SgRYpPOW-V0Wzw5nggNcuYWmDk6HRUcb; AMG Ai 1ny4wEY0VJg_trU9eIxavHGaXF7ko0-ox; Hermes skills backup 1bcLFbqdeWqz_tsNO--eeT7-A1ozl1cIz.

## Secrets found in skills (2026-10-22) - Erik must rotate
- skills rclone-gdrive SKILL.md: Google OAuth client ID and client secret.
- skills gateway-platform-debugging SKILL.md: a Telegram bot token.
- skills hermes-docker-setup: copies .env into a docker image (any image built with it contains every .env secret).
