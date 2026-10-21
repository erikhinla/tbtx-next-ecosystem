# Hermes content prompt: The Hang decks + new PROOF build

Owner: Erik H Bush. Written 2026-10-21. This prompt is self-contained. Do every step below. Do not publish anything, and do not deploy anything live.

## Source material (this repo only)

- `hermes/source/the-hang/` holds six PDFs:
  - AI-Aligned_Ops.pdf
  - AI_Operational_Physics.pdf
  - Architecting_Momentum.pdf
  - Enterprise_AI_Blueprint.pdf
  - Managing_Digital_Fog.pdf
  - Mining_Intellectual_Ore.pdf
- The new PROOF build is live at https://transformby10x.ai/proof/screen/. It asks 15 questions. The result shows:
  - a pattern (fragmented, stalled, scaling, compounding);
  - the stall point (the stage of work where jobs stall);
  - "What you're feeling", a summary, and "Where it shows up";
  - a capacity-cost estimate;
  - the "Review your PROOF" button;
  - a "What happens after" ladder.
- The Friction Model page is https://transformby10x.ai/friction-model.

## Part (a): add 5 decks to The hang (STAGED ONLY, not live)

The hang lives on erikhbush.com. The live entries are in `/srv/www/erikhbush/current/story.js` (release `hermes-20260928`). Each entry looks like this:

    {title:'Managing Digital Fog',count:15,file:'Managing_Digital_Fog.pdf',note:'Working concept deck. ... not measured client results or a live offer.',notes:{}},

1. Add these five decks:
   - AI-Aligned_Ops
   - AI_Operational_Physics
   - Architecting_Momentum
   - Enterprise_AI_Blueprint
   - Mining_Intellectual_Ore

   Do NOT add Managing_Digital_Fog, because it is already on the page.

   Architecting_Momentum.pdf already has an entry. Compare the new PDF with the existing one. If it is a newer version, stage it as a replacement file under the same entry. Do not add a duplicate entry.
2. Match the existing entries exactly:
   - Use the same fields (`title`, `count` = number of pages, `file`, `note`, `notes:{}`).
   - Use the same honest note style ("Working concept deck / Campaign deck ... not a live offer or measured client result").
   - Add a slug in `PIECES` and in the `map` in hang.html if other entries have one.
3. Stage it in a NEW release folder, `/srv/www/erikhbush/releases/hang-staged-<YYYYMMDD>`, copied from current. Do not change the `current` symlink. Write a `ROLLBACK`/`PROMOTE` note in the folder, and report the diff for Erik's approval.

## Part (b): social content, "From the working archive"

### Story spine (use these words)

- Digital Fog is the cause. Digital Friction is the effect: "Rework grows. Handoffs stall. Momentum stops. The process just can't carry what AI produces."
- Line pair, always together and in this order:
  "AI was meant to help your team.
  Now your team helps the AI."
- The ladder, in this order:
  1. PROOF: free, 15 answers.
  2. Review your PROOF: free, 45 min.
  3. Friction Audit: paid, fixed scope, 2 weeks. It produces the FACT report (Friction Audit Context Telemetry) and the BizBlueprint.
  4. The BizBlueprint names the Context Keystones.
  5. BizBuilders AI installs them.
  6. The Pipeline Airlock.
- The Context Keystones are Folders, Markdown, Scripts and Protocols.
- The Friction Model page (https://transformby10x.ai/friction-model) is the math "wow". Use it for the posts that show why the friction compounds.
- The PROOF estimate is a capacity-cost equivalent. Never call it cash savings or ROI.

### Format

- The series name is "From the working archive".
- Each deck becomes 3-4 carousel posts, plus single-slide quick posts pulled from its strongest single slides.
- PROOF posts show the real screens and the flow: start → 15 answers → result (pattern, stall point) → Review your PROOF → ladder. Use screenshots of the live build.
- Cadence is 2-3 posts a week per channel. Every schedule time is in Pacific time (America/Los_Angeles) and is labeled PT.

### Channels

- **Personal channels (Erik):** link to https://erikhbush.com only. Never mention PROOF.
- **TBTX channels:** on X use @Transformby10x ONLY. Never use @Trnsfrmby10x. Link to "Start PROOF" at https://transformby10x.ai/proof/screen/.
- No post ever links to The hang.

### Rules (every post)

- No em dashes.
- Never use: TRACE or Tracing, leak, bleed, breaks down, completion review, walk with me.
- Name no tools or vendors.
- Use "stall" for where work stops.
- No TM marks.
- No statistic unless it is backed in the source deck. Say where it came from.
- Hooks blame the system, never the reader.
- "Context Coordinator" is never a job title.
- Never say AI was hired, and never say people work for AI.

### Output

1. Write every draft to `hermes/proof-wave-2026-10/working-archive-drafts.md`. For each draft, give the channel, the deck or PROOF, the slide list or copy, the link, and the proposed day and time in PT.
2. Queue each draft in Postiz as a DRAFT only. Do not schedule it to publish and do not publish it.
3. Commit and push the drafts file. Report a list of the drafts: title, channel, Postiz draft id, and proposed PT time.
