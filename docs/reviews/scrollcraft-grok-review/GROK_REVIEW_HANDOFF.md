# TransformBy10X Scrollcraft Experience: Grok Review

## Review state

This is a staged design review. It is not approved for release or publication.

- Candidate branch: `codex/scrollcraft-tbtx`
- Candidate source: `https://github.com/erikhinla/tbtx-next-ecosystem/tree/codex/scrollcraft-tbtx`
- Candidate route: `/scrollcraft-demo`
- Local preview: `http://127.0.0.1:3000/scrollcraft-demo`
- Review status: `review_required`
- Publish allowed: `false`

## What this is

An alternative TransformBy10X front-door experience using Nate Herk's Scrollcraft engine. The goal is to make Digital Fog tangible, then move visitors to the right next step without turning the page into a feature grid or generic AI site.

The experience uses the existing TransformBy10X hierarchy:

```
Digital Fog
  -> personal friction: Fog-Lift
  -> business operating friction: BizBuilders AI
  -> readiness established: BizBot
```

## Journey and interaction score

| Beat | Visitor shift | Interaction | Notes |
| --- | --- | --- | --- |
| Recognition | “This is what my day feels like.” | Pinned typographic opening | More tools are not presented as the answer. |
| Tension | “The issue is structural, not personal failure.” | Flow section and fog reveal | Digital Fog is named plainly. |
| Peak | “There is a route out.” | Pinned Fog Lattice | WIN, GOAL, FLOW, and ACTION move from drift into a route. |
| Orientation | “I know which door is mine.” | Horizontal route rail | Routes are personal, business, and post-readiness. |
| Commitment | “I can take one clear action.” | Held close | One CTA: run the Digital Fog diagnostic. |

## Files to review

- `src/components/ScrollcraftTBTXExperience.tsx`: authored semantic page, copy, and engine mount.
- `src/app/scrollcraft-demo/scrollcraft-demo.css`: visual system and Fog Lattice signature move.
- `src/app/scrollcraft-demo/page.tsx`: route.
- `src/vendor/scrollcraft/`: unmodified MIT-licensed Scrollcraft engine and attribution.
- `scrollcraft/builds/tbtx-digital-fog/BRIEF.md`: self-authored Scrollcraft brief, feeling curve, and device score.

## What needs a real design judgment

Review the actual route at desktop and mobile. Do not score from source alone.

1. Does the opening earn attention without reading like motion for motion’s sake?
2. Does the Fog Lattice land as the single memorable peak, or does it need a stronger visual idea?
3. Do the route choices feel like appropriate next steps rather than an offer grid?
4. Is the motion purposeful, legible, and comfortable on desktop and mobile?
5. Does the page preserve TransformBy10X’s human, precise, non-generic voice?
6. What one change would produce the largest increase in felt quality?

## Required response format

Return only this structure, with direct language and no invented metrics:

```md
## Verdict
PASS (8+/10) | REVISE | REJECT

## Scores
Concept: X/10
Craft: X/10
Story: X/10
Emotion / Curiosity: X/10
Brand fit: X/10
Motion and interaction: X/10
Mobile usability: X/10

## What holds up
- ...

## What breaks or feels generic
- ...

## Highest-leverage revision
- ...

## Release recommendation
Hold | Ready for human approval
```

## Constraints

- Do not approve, merge, deploy, or publish this work.
- Do not replace the TransformBy10X offer hierarchy or invent new offers.
- Keep the engine vendor code unchanged. Make bespoke behavior in the page layer.
- A PASS means 8+/10 or better in each of Concept, Craft, Story, Emotion / Curiosity, and Brand fit. It still requires human selection before release.
