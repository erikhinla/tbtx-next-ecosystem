# TBTX copy style guide (working draft)

Status: working draft, 2026-10-21. Most of this is preference, not law. Rules are marked as rules.
Applies to transformby10x.ai, the PROOF app, and the BizBuilders AI and BizBot Mrktng pages.
The older copy docs from the mockup phase (for example TBTX_PROOF_MESSAGING_UX_COPY.md) are placeholders, not canon.

## Rules (fixed)

- Names: "BizBot Mrktng" (never "BizBot Marketing"), "BizBuilders AI", "TransformBy10X", "PROOF" in caps.
- Wordmarks are lowercase in MuseoModerno bold, set tight: tbtx, bbai, bbm.
- Brand colors: tbtx #d01e98 magenta, bbai #b37157 copper, bbm #69f2c4 mint, ErikHBush #383838.
- Mint is never small text on a light background. Use mint on black, or as colored text in large type on black.
- "Digital Friction", never "Digital Fog". The board band formerly called Fog is "Drift".
- No em dashes. No ™ or ®.
- No tool or vendor names. No internal system names. No unbacked stats or prices.
- Banned words: trace or tracing, leak or leaking, bleed, breaks down, readout, completion review, walk with me, hardens into, load or load-bearing.
- Fixed lines: "So no one has to spend hours coordinating context." and item 01 "The Context Gap": "AI tools increase output, but context doesn't keep up, so humans fill the gap."
- BBM tagline, lowercase: "grow with the flow".

## Preferences (current direction)

1. Say what the screen shows. A headline describes what's below it, not a mood.
   - Before: "The draft is finished. I'm still finding what it needs."
   - After (Account Management): "Hours lost tracking down what the client approved."
2. No rhetorical-question headings. State the content.
   - Before: "Can the people doing the work see the job?"
   - After: "Status, next step, owner and deadline for every project in Account Management"
3. Name the thing. Avoid vague nouns: "the job", "one place", "needs", "the operating layer", and "the fix" as a noun ("fix" as a verb is fine).
   - Before: "Context Keystones restore the operating layer."
   - After: line cut. The headline already says it.
   - Before: "Compare the week after the fix" / After: "Compare the week after the change"
4. Every "it" needs a clear antecedent in the same sentence. If in doubt, repeat the noun.
   - Before: "Nobody has accepted it, and done is undefined."
   - After: "Nobody has accepted the handoff, and done isn't defined."
5. Neutral, system-level voice. No you or your. No possessives ("the review by the client", not "the client's review").
   - Before: "Your summary is copied." / After: "The summary is copied."
6. Contractions are welcome: isn't, doesn't, can't.
7. Be specific to the real process for each audience: agency (brief, approvals, delivery), consulting (engagement, deliverable, sign-off), service business (call, quote, job).
   - Agency intro: "Context still gets carried by hand, from first brief to final delivery."
8. Labels over questions on data rows: "Status", "Next step", "Owner", "Deadline" instead of "Where is the project now?" or "What needs done?"
9. Cut throwaway creative lines that don't describe anything.
   - Removed: "Automation saved everyone time. Billing is still trying to find it."
10. Short and warm beats clever. Approved tone examples: "AI created a job. Nobody wanted." "The people aren't the problem. The structure is."
11. Default copy is industry-agnostic. Use work, requests, clients and next steps rather than sales words like leads, prospects or booked calls.

## Plain speech (Erik, 2026-10-21)

Write it the way a normal person would explain the app out loud to an agency owner. If a line wouldn't be said in conversation, rewrite it or cut it.

- Use the words people actually use: client approvals, the project, the round, the final file. Not "approval package", "master", "evidence", "reconciliation", "exception".
  - Before: "Approval package" / After: "Client approval"
- No "desk". Nobody outside a trading floor says it. Name the team ("every project in Account Management") or say "this team". Internal code names can stay.
  - Before: "This desk has stalled." / After: "This team is stalled."
  - Before: "Desk model" / After: "Team model"
- Drop the verb "held" / "holds". Say where something sits, who keeps it, or that it's on track.
  - Status names: On track, Drift, Friction, Stalled, Unmapped (was Held, ...).
  - Before: "A Context Keystone holds the brief, decisions and status for a piece of work" / After: "A Context Keystone keeps the brief, decisions and status with the work"
- No tacked-on trailing clauses (", and how well each is held"). Restructure or cut.
- No stacked noun lists. Three items is the limit; prefer one.
  - Before: "Context Keystones link the version, owner, change history and decision on each package."
  - After: cut.
- No word salad.
  - Before: "There is more to do than the hours will hold." / After: "There's more work than hours to do it."
- Cut before rewording. If a line repeats the headline or explains nothing, delete it.
  - Cut: all ten per-team subheads, the "Owner and review" kicker, "The review below still stays."
- Results lines state the finding, not "Answers suggest...".
  - Before: "Answers suggest gaps between brief, making, approval, and live." / After: "Work stalls between brief, production, approval and launch."

## Review checklist

Read every line twice: once as Erik (no jargon, no filler, no vague pronouns) and once as a first-time visitor from each audience. Read each line aloud. Then run the copy check (copy_check.py) and confirm no em dashes.
