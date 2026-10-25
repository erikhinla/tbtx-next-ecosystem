# RULES (copy, brand, design, video, channels, ops)
Sources: Grok Bot memory (2026-10-22), hermes/COPY-RULES.md, COPY-STYLE-GUIDE.md, DESIGN-GUIDE.md v4, HERMES-PROOF-BRIEF.md. Erik treats most copy guidance as evolving preferences until launch; the items here are the current standing rules. If two sources conflict, newer Erik instruction wins; log it in DECISIONS-LOG.md.

## Copy
- Plain speech that explains what the app or screen shows. Write the straight description, just shorter.
- No reader-directed or possessive you/your/you're/yourself. Neutral, system-level lines.
- Contractions welcome. No em dashes. No emojis unless asked. No trademark symbols.
- The term is Digital Friction. Never "Fog" or "Digital Fog". Never "hardens into".
- Never "desk", "approval package", "held". No vague nouns: "one place", "needs", "the fix", "see the job". No "It's..." lines that do not say what "it" is.
- Banned: TRACE/tracing (renamed PROOF), leak, bleed, breaks down, completion review, walk with me, readout, load (as metaphor).
- No rhetorical questions. No unbacked stats. No tool or vendor names in public copy.
- Agency terms: client approvals, projects, rounds, briefs, delivery. "Follow-up" means the project moving through the process, never sales follow-up.
- Hooks blame the system, never the reader. Never say AI was hired or people work for AI ("people are assisting AI" is allowed). "Context Coordinator" is never a job title.
- Spelling: BizBot Mrktng (not Marketing).
- Approved lines (word for word): "AI tools increase output, but context doesn't keep up, so humans fill the gap." / "So no one has to spend hours coordinating context." / "AI was meant to assist people. But people are assisting AI." / "PROOF shows where the work stalls." / term "The Context Gap".
- Process: humanizer skill, then `python3 /root/tbtx-next-ecosystem/hermes/copy_check.py FILE` until PASS. copy_check does not catch every rule above; read manually too.

## Brand
- Wordmarks lowercase in MuseoModerno: ehb, tbtx, bbai, bbm.
- Colors: ErikHBush #383838, TBTX #d01e98, BBAI #b37157, BBM #69f2c4.
- Brand colors are accents only (60-30-10; about 10% of a frame). Color the key word as text, never a highlight block behind it. Magenta text on black is fine.
- No grey low-contrast text. No default plain black background as the whole look; use a designed neutral or cinematic base.

## Visuals and video
- No URL, domain or "visit" line in any image or video. The link goes in the caption ("link in bio" on Instagram).
- Not the thin accent line plus small caption style.
- Bold cinematic kinetic type; the motion acts out the idea.
- No AI video models. Real audio only (no synthetic voice or generated music unless Erik supplies it).
- Every visual passes the DESIGN-GUIDE.md pre-flight checklist.
- Known gap: kinetic.py turns the accent into a solid block when accent contrast is under 4.5:1 (e.g. #d01e98 on #111111 is 3.89:1). That conflicts with "color the key word, never a block". Use a bg where magenta text passes, or ask Erik.

## Channels
- Personal accounts (Erik H Bush Instagram, personal LinkedIn, ErikHBush X) may carry PROOF posts. CTA is always transformby10x.ai/proof, never erikhbush.com. (Supersedes the 2026-10-19 Brain note that personal channels link to erikhbush.com.)
- erikhbush.com content is its own concepts (circumstances, industry commentary); never adapted TBTX copy, never mentions PROOF.
- X company handle @Transformby10x. Never @Trnsfrmby10x.
- Postiz: drafts only. Never schedule or publish without Erik.
- Never send email or messages unasked. xurl and himalaya are never used to send.

## Ops
- Sites are hosted on the Netcup VPS. Vercel is for previews only. Budget is zero.
- Deliverables go to the work Drive (erik@transformby10x.ai, shared drive TBTX-BBAI-BBM). Never trash anything on Drive; archive instead. Back up before deleting or editing.
- Erik reviews quality himself; do not self-approve.
- Never write secrets into docs, the Brain, or chat.

## Funnel
- PROOF app (free, 15 answers) > the result > Friction Audit booking (main goal). Any revenue counts.
