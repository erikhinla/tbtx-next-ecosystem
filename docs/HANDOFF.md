# Production Handoff Document: TBTX Web Ecosystem

## Overview
This document serves as the guide for taking over the production and deployment of the TBTX Ecosystem (TBTX, BBAI, BBM). The project has been fully migrated from static prototypes to a Next.js full-stack application.

## Brand Strategies & Aesthetics

### 1. TransformBy10X (Philosophy)
- **Path**: `/tbtx`
- **Aesthetic**: *TYPE BREAK / HARD CUTS*
- **Mechanism**: A full-screen declarative series of messages.
- **Production Note**: The timing is strictly locked to **160ms** cuts to ensure a severe, non-organic feel.

### 2. BizBuilders AI (Infrastructure)
- **Path**: `/bbai`
- **Aesthetic**: *TYPE DOMINANT / SYSTEM REVEAL*
- **Mechanism**: Subtle line and text rendering as the user scrolls.
- **Production Note**: Uses Framer Motion's `whileInView` for reveal triggers. If adding new sections, use the `RevealText` and `SystemLine` components for consistency.

### 3. BizBot Marketing (The Engine)
- **Path**: `/bbm`
- **Aesthetic**: *LIVE DIAGNOSIS SURFACE*
- **Mechanism**: A persistent terminal surface on the right that reacts to question inputs on the left.
- **Logic**: 
  - The 15 questions are defined in `src/config/intakeQuestions.ts`.
  - Every answer applies weighted points to four archetypes: `toolOverload`, `executionStall`, `fragmentedWorkflow`, and `bottleneckOperator`.
  - The "AVA" character is system intelligence, not a bot.

## Deployment Instructions

### Local Development
1. Navigate to `PROJECTS/tbtx-next-ecosystem`.
2. Run `npm run dev`.
3. Preview at [http://localhost:3000](http://localhost:3000).

### Vercel Deployment
1. Push this folder to a new GitHub repository.
2. Link the repository to a new Vercel Project.
3. Next.js will automatically handle the build and edge deployment.

## Key Logic Files
- **Intake Questions**: `src/config/intakeQuestions.ts` (Edit this to change the questions or scoring logic).
- **Blueprint Results**: `src/app/diagnostic/blueprint/page.tsx` (Handles the layout and copy for the generated PDF-style report).
- **Global Design Tokens**: `src/app/globals.css` (Adjust brand colors and base typography here).

## Next Steps for Production
- **Email Capture**: Integrate an API route (e.g., Resend or SendGrid) inside the blueprint result page to capture leads.
- **PDF Generation**: Enhance the `blueprint/page.tsx` with a server-side PDF generation library if local `window.print()` is insufficient for high-end exports.

---

Handed off by Antigravity.
