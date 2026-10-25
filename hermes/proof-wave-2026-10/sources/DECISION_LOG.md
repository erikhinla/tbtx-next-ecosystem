# Decision Log

## Overview
This document serves as the immutable record of all approved deviations, mathematical formulas, infrastructure constraints, and significant architectural decisions for the FLOW Blueprint Visualizer & Telemetry Tool.

## Decision Format
Each entry includes:
- **Date**: Decision date
- **Category**: Type of decision (Architecture, Security, Infrastructure, Scoring, etc.)
- **Decision**: The approved change or deviation
- **Rationale**: Why this decision was made
- **Impact**: How this affects the system
- **Status**: Active/Deprecated/Superseded

---

## Decisions

### Decision #001 - Repository Structure
**Date**: 2026-09-09  
**Category**: Architecture  
**Decision**: TypeScript monorepo with Express backend and Next.js frontend separation  
**Rationale**: Type safety, developer experience, and scalability for FLOW Blueprint visualization  
**Impact**: All future code contributions must follow TypeScript strict mode  
**Status**: Active

### Decision #002 - Telemetry Collection Strategy
**Date**: 2026-09-09  
**Category**: Diagnostic  
**Decision**: Client-side telemetry collection with server-side aggregation  
**Rationale**: Real-time diagnostics and performance monitoring for FLOW applications  
**Impact**: All telemetry data flows through designated collection endpoints  
**Status**: Active

---

## Security & Compliance Notes
- All infrastructure decisions must be documented before implementation
- Credential management: NO secrets in version control (enforced by Dependabot secret scanning)
- All mathematical formulas used in scoring must be recorded with derivation
- Any deviation from established SLAs requires documented approval

---

## Future Decisions
*To be filled as the project evolves*



### Decision #003 - PROOF product and evidence language
**Date**: 2026-09-14
**Decision**: Record Erik’s Finder, Trace, separate Scan, visible calculation, DDD matching, BBM gate, Scrollcraft and work/effort language decisions in the master addendum.
**Impact**: Preserve scoring and identifiers. Distinguish the existing TBTX website from this separate PROOF repository. The collector in Decision #002 remains a placeholder; the decision alone is not evidence of backend delivery.
**Status**: User-confirmed product direction. Creative execution remains under review.

**Later visual correction, same day:** Exclude dolls, illustrated figures and cartoon images. Exclude It Only Looks Automated as both asset and design direction, including its mechanical sculpture style. Reject the generated lettering adaptations of those graphics. Use existing TBTX footage and campaign assets where they fit, with PROOF typography and answer-driven motion.

### Approved films and placement, 14 September 2026

Erik explicitly selected `defog-daily-hero.mp4` for **B2B / Momentum Map** and `ddd-r5-picture-sfx.mp4` for **B2C / Scan**. The filenames do not decide the audience. These specific film approvals govern their use, including the established campaign character within the footage. They do not restore the rejected doll, cartoon-poster or mechanical-sculpture design direction. The 69-second PROOF film’s narration remains excluded.

The review places the B2B film before the Map questions and the B2C film between the Scan result and DDD. Both have playback controls, start without autoplay, and allow continuation without watching. Proposed companion copy is labeled as proposed copy, not a transcript.

### Approved B2B work-task films, 14 September 2026

Erik supplied six additional campaign clips as the B2B visual direction: specific work tasks, people within the scene, and fog as part of the scene. All six were copied from the supplied local folder and sampled visually. They remain campaign scenes, not observed PROOF case evidence.

| Source suffix | Task visible in the selected clip | Placement |
| --- | --- | --- |
| `484d9640-c045-453e-b694-6b148bd2ff8f` | Checking code across screens | Scrollcraft film in the PROOF section and task examples |
| `1d1ef9b2-2aa7-4369-9038-17efbfb6d55f` | Rewriting content strategy | B2B task examples |
| `3cfb4e13-97c5-4c23-80dd-6a52f3ffe203` | Reconciling conflicting diagnostic outputs | B2B task examples |
| `22b738bd-ec69-459b-a971-471cc8139d59` | Choosing among logo variants | B2B task examples |
| `5bfb4442-8715-4243-9ec8-c33b91cd0cb9` | Finding a final meeting summary | B2B task examples |
| `da6240f5-c90c-46f6-9088-e27daad87096` | Keeping strategy work in view | B2B task examples |

The task examples open on request. Selecting a recognizable scene leads to the Map through the entry gate; it does not assign points or change the question set. The full original filenames and file hashes are recorded in the review’s asset manifest. The clinical scene supplies no medical guidance or claim of diagnostic validation.

### Creative priority and accepted film wording, 14 September 2026

I judge recognition and emotional impact before finishing detail. Vivid human scenes, fog in the scene, irony and a slightly absurd expression of a truthful work problem lead the design. I do not flatten that intention into a compliance-style diagram or a generic software page.

Erik selected three additional PROOF concept films and explicitly accepted existing wording errors, including Forensics in place of Finder, for this stage. I preserve the supplied films. New surrounding copy uses Finder and work or effort. The accepted films do not reopen the rejected *It Only Looks Automated* direction.

`grok-imagine-PROOFmp4.mp4` leads the PROOF section: an office handoff turns the extra responsibility into a vivid, absurd object. The two 25-second `grok-video-6947b0b5-242e-46b8-919c-66d503437dbf` cuts remain available as optional concept films. They have different file hashes and remain distinct. Their existing sound can be played by choice. This approval does not apply to the rejected narration in the separate 69-second PROOF film.

The human handoff creates recognition. The six work-task films make that recognition specific. The Map lets the person examine their own answers. Finishing corrections follow once that sequence works.


## 2026-09-15: Recover completed local design review

Restored the saved review and copy documents after temporary checkouts disappeared. Current scope and evidence are recorded in docs/TBTX_PROOF_MESSAGING_UX_COPY.md: full-bleed revision, direct DDD, supplied Link checkout, BBAI philosophy, five BBM offer previews, and founder story/gallery. This replaces the earlier local-only design commits with one recovery commit from the last pushed review branch. No push or deployment.
