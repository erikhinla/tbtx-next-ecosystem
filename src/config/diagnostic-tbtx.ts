// TBTX Digital Fog Diagnostic - 15Q Question Set + Scoring
// Source: ECOSYSTEM_CANON.md Section 6
// This file is the single source for the diagnostic engine. Update here only.

export interface QuestionOption {
  text: string;
  value: 0 | 1 | 2;
}

export interface Question {
  id: number;
  text: string;
  options: QuestionOption[];
}

export const questions: Question[] = [
  {
    id: 1,
    text: "Where does your business lose momentum most often?",
    options: [
      { text: "Starting things", value: 0 },
      { text: "Switching between tools", value: 1 },
      { text: "Waiting on others", value: 1 },
      { text: "Getting things across the finish line", value: 2 },
    ],
  },
  {
    id: 2,
    text: "How does your team know what to work on next?",
    options: [
      { text: "We figure it out as we go", value: 0 },
      { text: "We have informal priorities", value: 1 },
      { text: "We've got a system, but it isn't always followed", value: 1 },
      { text: "We have a clear routing process", value: 2 },
    ],
  },
  {
    id: 3,
    text: "Where does your business store its most important operating knowledge?",
    options: [
      { text: "In people's heads", value: 0 },
      { text: "In scattered docs and chats", value: 0 },
      { text: "In a loosely organized system", value: 1 },
      { text: "In a structured, accessible system", value: 2 },
    ],
  },
  {
    id: 4,
    text: "How many AI tools or automations are you currently running?",
    options: [
      { text: "None yet", value: 0 },
      { text: "One or two, lightly", value: 1 },
      { text: "Several, but they aren't connected", value: 1 },
      { text: "Several, connected and producing consistent output", value: 2 },
    ],
  },
  {
    id: 5,
    text: "When a project ends, what happens to what was learned?",
    options: [
      { text: "It disappears with the project", value: 0 },
      { text: "Some notes get saved somewhere", value: 1 },
      { text: "We debrief but nothing formal", value: 1 },
      { text: "We capture it and it improves future work", value: 2 },
    ],
  },
  {
    id: 6,
    text: "How does your business handle missed leads or unanswered inquiries?",
    options: [
      { text: "They usually fall through the cracks", value: 0 },
      { text: "We follow up manually when we remember", value: 0 },
      { text: "We have a loose process", value: 1 },
      { text: "We have automated follow-up", value: 2 },
    ],
  },
  {
    id: 7,
    text: "How clear is ownership when something needs to get done?",
    options: [
      { text: "Unclear - it often falls through", value: 0 },
      { text: "It depends on who is available", value: 1 },
      { text: "We have informal ownership", value: 1 },
      { text: "Every task has a clear owner and routing rule", value: 2 },
    ],
  },
  {
    id: 8,
    text: "How would you describe your AI usage right now?",
    options: [
      { text: "Experimenting with no system", value: 0 },
      { text: "Using tools but results are inconsistent", value: 1 },
      { text: "Running workflows but they are fragmented", value: 1 },
      { text: "Operating a governed AI execution layer", value: 2 },
    ],
  },
  {
    id: 9,
    text: "How does your business make decisions under pressure?",
    options: [
      { text: "Whoever speaks loudest", value: 0 },
      { text: "By whoever is available", value: 0 },
      { text: "Using loose guidelines", value: 1 },
      { text: "Using documented decision rules", value: 2 },
    ],
  },
  {
    id: 10,
    text: "How much of your revenue depends on manual follow-up or human memory?",
    options: [
      { text: "Almost all of it", value: 0 },
      { text: "Most of it", value: 0 },
      { text: "Some of it", value: 1 },
      { text: "Very little - systems handle most of it", value: 2 },
    ],
  },
  {
    id: 11,
    text: "How often does your team repeat work that has already been done?",
    options: [
      { text: "Frequently", value: 0 },
      { text: "Often", value: 0 },
      { text: "Sometimes", value: 1 },
      { text: "Rarely - we have reusable systems", value: 2 },
    ],
  },
  {
    id: 12,
    text: "What happens when a key person is unavailable?",
    options: [
      { text: "Work stops", value: 0 },
      { text: "Things slow down significantly", value: 0 },
      { text: "We manage, but it's painful", value: 1 },
      { text: "The system continues without disruption", value: 2 },
    ],
  },
  {
    id: 13,
    text: "How visible is your pipeline or lead flow at any given moment?",
    options: [
      { text: "Not visible at all", value: 0 },
      { text: "Partially visible", value: 1 },
      { text: "Mostly visible", value: 1 },
      { text: "Fully visible with real-time tracking", value: 2 },
    ],
  },
  {
    id: 14,
    text: "How does your business improve from what it executes?",
    options: [
      { text: "It doesn't", value: 0 },
      { text: "Informally, through conversation", value: 1 },
      { text: "We review occasionally", value: 1 },
      { text: "We have a structured reflection and learning loop", value: 2 },
    ],
  },
  {
    id: 15,
    text: "If you had to describe your current operating system in one word, which fits best?",
    options: [
      { text: "Chaos", value: 0 },
      { text: "Reactive", value: 0 },
      { text: "Building", value: 1 },
      { text: "Compounding", value: 2 },
    ],
  },
];

export interface ProfileBand {
  min: number;
  max: number;
  profile: string;
  description: string;
  cta: string;
  ctaRoute: string;
}

export const scoringBands: ProfileBand[] = [
  {
    min: 0,
    max: 24,
    profile: "FRAGMENTED",
    description: "Your business is running on effort, not infrastructure. Every project starts fresh. Context gets lost. Decisions repeat. Leads fall through gaps. The fog is thick, and it's costing you time, momentum, and revenue you can't see clearly. This isn't a talent problem. It's a systems problem.",
    cta: "Get the AI Biz Blueprint",
    ctaRoute: "/tbtx/blueprint",
  },
  {
    min: 25,
    max: 49,
    profile: "STALLED",
    description: "You've got pieces of a system, but they aren't connected. Tools are running. Some workflows exist. There's no unified operating layer holding everything together. Execution is inconsistent. Context gets lost between handoffs. AI is adding activity without adding leverage.",
    cta: "Get the AI Biz Blueprint",
    ctaRoute: "/tbtx/blueprint",
  },
  {
    min: 50,
    max: 74,
    profile: "SCALING",
    description: "You've got real infrastructure. The question now is whether it compounds. You're operating with systems, but the learning loop is incomplete. Work completes without creating retained intelligence. Agents or automations run without governance. The execution layer isn't recursive yet.",
    cta: "Build the Backbone",
    ctaRoute: "/bbai",
  },
  {
    min: 75,
    max: 100,
    profile: "COMPOUNDING",
    description: "Your operating system is working. Now it needs to scale. You've got context, routing, memory, and execution discipline. The next layer is governance, recursive improvement, and an orchestration system that gets sharper every cycle.",
    cta: "Build the Backbone",
    ctaRoute: "/bbai",
  },
];

export function calculateScore(answers: number[]): number {
  return answers.reduce((sum, value) => sum + value, 0);
}

export function getProfile(score: number): ProfileBand {
  return scoringBands.find(band => score >= band.min && score <= band.max) || scoringBands[0];
}
