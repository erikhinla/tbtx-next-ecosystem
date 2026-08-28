# Antigravity prompt: Postiz + Activepieces social operating system

```text
Work directly in the TransformBy10X ecosystem. Do not give me a plan, ask me a questionnaire, or stop at recommendations. Inspect what already exists, wire what can be wired, create the missing infrastructure, verify it, and leave a concise evidence-based handoff.

Objective

Wire the hosted Postiz instance, Activepieces, the TransformBy10X site, and my social identities into one working publishing system. The primary identities are:

- @erikhbush: the human/founder voice. It carries the lived observation, the hard truth, and the point of view.
- @transformby10x: the proof, product, diagnostic, and destination voice.

Use every social platform already connected in Postiz. At a minimum, find and map the X integrations for both identities. If LinkedIn or Instagram accounts are already authenticated, map them too. Do not invent accounts, integration IDs, credentials, or platforms.

Starting context

- Repository: https://github.com/erikhinla/tbtx-next-ecosystem
- Existing Postiz notes: docs/POSTIZ_WIRING.md
- Existing site and offer language: README.md, docs/COLLATERAL_EXPLAINERS.md, docs/ECOSYSTEM_COLLATERAL_ONE_SHEET.md
- Core visitor sequence: TransformBy10X names and diagnoses Digital Fog. Personal friction routes to Fog-Lift. Business operating friction routes to BizBuilders AI. BizBot is a post-readiness growth layer.
- Preserve this core campaign language unless a live canonical source says otherwise:
  - AI created a job.
  - Nobody wants.
  - Managing Digital Fog.
  - Start here.
- Use supplied video first when it strengthens the post. Do not turn the system into generic text-card posting.

Work sequence

1. Inspect and map the current state
   - Inspect the hosted Postiz instance, current integrations, Postiz API access, Activepieces flows, deployed site routes, existing environment templates, and the repository documentation.
   - Build a real integration map: platform, identity, Postiz integration ID, media capability, destination URL pattern, and whether it is operational. Never print secrets.
   - Use existing authenticated browser sessions, host environment, or secure environment variables. Do not ask me to paste passwords, API keys, SSH keys, or 2FA codes into chat.

2. Wire the publishing path
   - Make Postiz the publisher of record. Activepieces prepares, validates, schedules, and receives status; it does not become a second scheduler.
   - Create or repair these Activepieces flows:
     a. social_content_intake: accepts a normalized post payload from the site, a webhook, or the content queue.
     b. social_content_validate: requires identity, platform/integration, campaign pillar, destination URL, post text, asset references, schedule time, and idempotency key. It must reject missing required fields with a useful error.
     c. postiz_dispatch: uploads/attaches approved media when needed and creates a Postiz draft or scheduled post against the correct integration.
     d. postiz_status_sync: polls or receives Postiz status, then records sent, failed, scheduled, or draft state back to the queue.
     e. social_failure_alert: records actionable failures with the integration, payload ID, exact provider error, and retry status.
   - Use a durable queue. Prefer existing Activepieces Tables if available. Otherwise use an existing project Postgres/Supabase database. Only add a new service if neither exists.
   - Enforce idempotency so a retry cannot create duplicate social posts.
   - Keep secrets in Postiz, Activepieces connections, or the host environment. Commit only `.env.example` names and non-secret configuration.

3. Wire the site into the system
   - Create a single social link/tracking convention for TransformBy10X destination URLs. Use campaign source, medium, identity, platform, and content slug parameters consistently.
   - Add a small, reusable site-side handoff point for a social post payload only where it is useful. Do not build a public social dashboard or expose Postiz credentials in the browser.
   - Link posts to the correct next step: the Digital Fog diagnostic first, Fog-Lift for personal friction, BizBuilders AI for business operating friction, and BizBot only after readiness.

4. Install this social matrix and cadence

Do not cross-post identical copy. Recut the same core video or idea for the platform and identity.

| Identity | Platform | Cadence | Primary job | Content mix | Destination |
| --- | --- | --- | --- | --- | --- |
| @erikhbush | X | 5 posts/week | Founder observation and sharp lived truth | 2 Digital Fog observations, 1 build-in-public/system insight, 1 short video reaction, 1 direct invitation | Diagnostic or relevant proof page |
| @erikhbush | LinkedIn, if connected | 3 posts/week | Business consequence and operating clarity | 1 story, 1 framework, 1 video-led point of view | BizBuilders AI or diagnostic |
| @erikhbush | Instagram, if connected | 3 posts/week | Human recognition and relief | 2 Reels, 1 carousel or still only when video is weaker | Diagnostic or Fog-Lift |
| @transformby10x | X | 4 posts/week | Diagnostic, proof, and product library | 1 hook, 1 diagnostic prompt, 1 short proof/clip, 1 route explainer | Diagnostic first |
| @transformby10x | LinkedIn, if connected | 2 posts/week | Business education and proof | 1 operating-friction post, 1 customer/system proof | BizBuilders AI or diagnostic |
| @transformby10x | Instagram, if connected | 2 posts/week | Video-first visual proof | 2 Reels or cutdowns | Diagnostic or Fog-Lift |

Use Puerto Rico / Atlantic time. Default slots, then adjust using each platform's connected analytics if available:

- X: 9:10 AM on weekdays; a second @erikhbush post at 1:40 PM on Tuesday and Thursday only.
- LinkedIn: Tuesday, Wednesday, Thursday at 8:40 AM.
- Instagram: Tuesday, Thursday, Saturday at 12:15 PM.
- Stagger @erikhbush and @transformby10x so they never publish the same idea within four hours.

Build a rolling 14-day queue with these content pillars:

1. Recognition: the visible symptoms of Digital Fog.
2. The invisible cleanup job: AI created a job nobody wants, managing Digital Fog.
3. Route: WIN, GOAL, FLOW, and the next clear action.
4. Proof: real workflow, operating, or build evidence.
5. Door: Fog-Lift, BizBuilders AI, or BizBot only when it is the actual next step.

5. Build the missing operational layer
   - Create docs/SOCIAL_OPERATING_MATRIX.md with the live integration map, social matrix, cadence, content pillars, URL convention, ownership, and workflow IDs.
   - Update docs/POSTIZ_WIRING.md with the actual endpoint path, integration mapping, request schema, queue storage, idempotency behavior, and status sync. Do not add secrets.
   - Add a versioned normalized payload schema and one valid example payload.
   - Add a simple runbook for: create content, attach media, choose identity and platform, schedule, retry failure, and verify a sent post.
   - Create the first 14-day queue in Postiz as drafts or scheduled entries, using existing approved media and concise native copy. Do not use filler copy, fabricated metrics, or generic AI claims.

6. Verify and report
   - Run a real end-to-end non-public test through Activepieces to Postiz for each available identity and platform: normalized payload -> validation -> Postiz draft -> status written to queue.
   - Verify a duplicate submission with the same idempotency key does not create another Postiz item.
   - Confirm that no secret appears in git diff, application code, or browser-delivered content.
   - Commit and push the implementation on a clearly named branch.
   - Return only: actual integrations found, flows created or updated, exact files changed, workflow IDs, test results, connection gaps that could not be completed without an authenticated session, and the next single action for each gap. Do not claim a platform is connected, a post is scheduled, or a workflow is live unless you verified it.

Handling blocked access

Do not stall or ask broad questions. Complete every local, repository, and hosted-system task you can reach. If a platform connection requires me to click through an OAuth screen, leave a one-line action card with the exact destination, identity, and button needed, then continue with the remaining work.
```
