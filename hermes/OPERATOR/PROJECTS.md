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
- Sub-brands under TBTX. Strip words: tbtx DIAGNOSE, bbai BUILD, bbm GROW (mint, "grow with the flow"). BBAI = implementation team installing the BizBlueprint (Context Keystones). BBM = growth / automated marketing layer ("BizBot comes with the blueprint"). Repo erikhinla/bizbuilders-ai. Use correct logos from SOCIAL ENGINE/logos on the work Drive.

## erikhbush.com (personal, "Pencils Down" field notes)
- VPS checkout /root/erikhbush.com. DNS points to the VPS. Own concepts only.

## AMG (americanmeangirls.com AI layer, "Ask Amber")
- Preview amg-rebuild.vercel.app (password in Grok Bot memory, ask Erik). Repo erikhinla/amg-rebuild is stale except branch ai-layer-approved. Only corridor-v2 teaser and amber-hero-loop are approved media. Plan: hermes/AMG_VIDEO_PLAN.md. Drive folder "AMG Ai" (1ny4wEY0VJg_trU9eIxavHGaXF7ko0-ox).

## Shared Brain
- /root/tbtx-brain (erikhinla/tbtx-brain, private). NOW.md, Decisions.md, Hubs/. Cron pulls every 10 min.

## Hermes itself
- Code /usr/local/lib/hermes-agent, home ~/.hermes, Telegram bot @FLOW_Agent_OS_bot (id 8711124103; some notes say FLOW_Agent_AS_bot), Erik chat 6384054989.
- Open: memory store near its limit; google-workspace script needs the Hermes venv python (system python3 lacks googleapiclient); 3 skills contain plaintext secrets (see ACCOUNTS.md).

## History highlights
- 2026-09: Postiz self-hosted; credential setup cost many chat rounds (lesson: one setup script after 2 rounds). Sept 17 credential inventory sheets created.
- 2026-10-01: files moved to shared drive TBTX-BBAI-BBM.
- 2026-10-03: AMG preview rebuilt from the approved local build after a stale-repo deploy exposed rejected teasers; paid render failed for credits, effect rebuilt without paid tools (origin of the zero-budget, no-AI-video rule).
- 2026-10-08: Postiz audit, 89 posts healthy; duplicates and old @Trnsfrmby10x posts removed; all times moved to PT; @Trnsfrmby10x deactivated.
- 2026-10-12: Context Keystones made principle-first (handoff note in tbtx-brain).
- 2026-10-17: Master Operating Book declared canon (Erik later said mockup-phase copy docs are drafts, not gospel).
- 2026-10-19: TRACE renamed PROOF; PROOF no-scroll redesign; all sites to the VPS; tbtx-brain created.
- 2026-10-21: Hermes memory full; Postiz cert mismatch reported; COPY-RULES and copy_check created; Digital Friction replaces Fog.
- 2026-10-22: personal accounts allowed for PROOF posts with the PROOF CTA; accents-only colors; kinetic.py v4 and DESIGN-GUIDE v4; hyperframes remake test of PROOF post 1; skills restored and router written; Thursday digest set; this manual.

## Open items (running todo; Needs Erik unless noted)
1. PROOF lines that sound like sales: "missed leads", "booked jobs", "open quotes", "A revenue promise". Rewrite in agency process terms or Erik confirms.
2. Offer page voice: stays first person or not.
3. Rename of "Structure modifier" (PROOF scoring label).
4. "desk" and department names still in PROOF / pages (rules ban "desk"; PROOF never names departments). Find and replace list needed.
5. Clip v5 verdict from Erik (kinetic vs hyperframes remake).
6. Rotate the Postiz API key.
7. Review pages vs /bbai and pricing: which stays, how pricing shows (pricing is a scenario index; disclose it).
8. Audio license for any music used in clips (real audio only, licensed).
9. PROOF batch 1 posts 2-10 not yet rendered or loaded into Postiz as drafts (Postiz API showed 0 posts Oct 22-31 on 2026-10-22). Hermes can do this; Erik approves.
10. LinkedIn display name "Erik Howerbush" to change to Erik H Bush (Erik, in LinkedIn).
11. Three leaked secrets in skills (see ACCOUNTS.md): rotate.
12. Canon conflicts: "15 answers" vs "15 questions"; paid step name; funnel wording with banned "completion review".
13. Vercel card ending 9292 failing (previews only).
14. Digest cron hour after the Oct 25 (server) and Nov 1 (PT) clock changes (Hermes to recheck).
15. kinetic.py defaults look plain (flat black, grey support line); redesign defaults (Hermes, with Erik review).
16. Correct logos from SOCIAL ENGINE/logos on the work Drive; AMG open items (rejected files in repo, Ask Amber site-wide).
