# PROJECTS (status as of 2026-10-22; verify before acting)

## TBTX / transformby10x.ai
- Repo erikhinla/tbtx-next-ecosystem, VPS checkout /root/tbtx-next-ecosystem. Hermes work in hermes/.
- Served by nginx on the VPS (/etc/nginx/sites-enabled/proof, server_name transformby10x.ai www). DNS points to 159.195.251.226. Verified HTTP 200 on / and /proof 2026-10-22.
- Open: Vercel card ending 9292 failing on team erikhbush-8628 (previews only).

## PROOF (free diagnostic at transformby10x.ai/proof)
- Repo erikhinla/flow-visualizer-telemetry, branch design/proof-noscroll-2026-10-19. Docker container flow-visualizer-telemetry (nginx proxies /proof/screen to :3000; preview container on :3002).
- Open canon questions for Erik: "15 answers" vs "15 questions"; name of the paid step (Friction Audit vs old "TRACE Context Architecture Audit"); funnel wording (Brain says PROOF > agreed engagement > BizBlueprint > implementation > completion review, but "completion review" is now banned).

## Social engine / Postiz
- postiz.transformby10x.ai (self-hosted, docker postiz-app). Integrations 2026-10-22: Facebook TransformBy10X, LinkedIn page TransformBy10X, Instagram Erik H Bush, X TransformBy10X, X ErikHBush, X Seraphina Vane, YouTube Erik H Bush, LinkedIn Erik Howerbush (display name to change to Erik H Bush).
- PROOF wave: brief hermes/HERMES-PROOF-BRIEF.md, batch hermes/HERMES-PROOF-POSTS-BATCH1.md, assets hermes/proof-wave-2026-10, outputs hermes/out/. Postiz API returned 0 posts for Oct 22-31 on 2026-10-22, so batch drafts are not confirmed loaded.
- Weekly digest cron: Thursdays 1 PM PT to Telegram.

## BBAI (BizBuilders AI) and BBM (BizBot Mrktng)
- Sub-brands under TBTX. BBAI = implementation team installing the BizBlueprint (Context Keystones). BBM = growth / automated marketing layer ("BizBot comes with the blueprint"). Repo erikhinla/bizbuilders-ai. Use correct logos from SOCIAL ENGINE/logos on the work Drive.

## erikhbush.com (personal, "Pencils Down" field notes)
- VPS checkout /root/erikhbush.com. DNS points to the VPS. Own concepts only.

## AMG (americanmeangirls.com AI layer, "Ask Amber")
- Preview amg-rebuild.vercel.app (password in Grok Bot memory, ask Erik). Repo erikhinla/amg-rebuild is stale except branch ai-layer-approved. Only corridor-v2 teaser and amber-hero-loop are approved media. Plan: hermes/AMG_VIDEO_PLAN.md. Drive folder "AMG Ai" (1ny4wEY0VJg_trU9eIxavHGaXF7ko0-ox).

## Shared Brain
- /root/tbtx-brain (erikhinla/tbtx-brain, private). NOW.md, Decisions.md, Hubs/. Cron pulls every 10 min.

## Hermes itself
- Code /usr/local/lib/hermes-agent, home ~/.hermes, Telegram bot @FLOW_Agent_OS_bot (id 8711124103; some notes say FLOW_Agent_AS_bot), Erik chat 6384054989.
- Open: memory store near its limit; google-workspace script needs the Hermes venv python (system python3 lacks googleapiclient); 3 skills contain plaintext secrets (see ACCOUNTS.md).
