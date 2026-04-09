export type Archetype = "toolOverload" | "bottleneckOperator" | "fragmentedWorkflow" | "executionStall";

export interface QuestionOption {
  label: string;
  weights: Partial<Record<Archetype, number>>;
}

export interface IntakeQuestion {
  id: string;
  topic: string;
  question: string;
  options: QuestionOption[];
}

export const intakeConfig: IntakeQuestion[] = [
  {
    id: "q1",
    topic: "where progress slows down",
    question: "Where does progress slow down most?",
    options: [
      { label: "Starting", weights: { executionStall: 2, fragmentedWorkflow: 1 } },
      { label: "Switching tools", weights: { toolOverload: 2, fragmentedWorkflow: 1 } },
      { label: "Waiting on others", weights: { bottleneckOperator: 2, fragmentedWorkflow: 1 } },
      { label: "Finishing", weights: { executionStall: 2 } }
    ]
  },
  {
    id: "q2",
    topic: "number of tools involved",
    question: "How many apps does it take to finish one core task?",
    options: [
      { label: "Just 1 or 2. It's focused.", weights: { bottleneckOperator: 1 } },
      { label: "3 to 4. Standard stack.", weights: { fragmentedWorkflow: 1 } },
      { label: "5+. It feels like jumping between tabs constantly.", weights: { toolOverload: 3 } },
      { label: "I don't know, everyone uses different things.", weights: { fragmentedWorkflow: 2, toolOverload: 1 } }
    ]
  },
  {
    id: "q3",
    topic: "handoff frequency",
    question: "How often does work get handed off before it's done?",
    options: [
      { label: "Rarely. I handle it end-to-end.", weights: { bottleneckOperator: 2 } },
      { label: "Once or twice for review.", weights: { executionStall: 1 } },
      { label: "Constantly. It's a game of hot potato.", weights: { fragmentedWorkflow: 3 } },
      { label: "We avoid handoffs because they always break.", weights: { bottleneckOperator: 1, toolOverload: 1 } }
    ]
  },
  {
    id: "q4",
    topic: "knowledge location",
    question: "Where does the truth live for a project?",
    options: [
      { label: "In one single tool of record.", weights: {} },
      { label: "Spread across Slack, Docs, and email.", weights: { fragmentedWorkflow: 2, toolOverload: 1 } },
      { label: "In my head (or one specific person's head).", weights: { bottleneckOperator: 3 } },
      { label: "We have an SOP but no one follows it.", weights: { executionStall: 2 } }
    ]
  },
  {
    id: "q5",
    topic: "owner bottleneck",
    question: "If you take a week off, what happens to the system?",
    options: [
      { label: "It keeps running smoothly.", weights: {} },
      { label: "Things slow down significantly.", weights: { executionStall: 1, fragmentedWorkflow: 1 } },
      { label: "Progress completely halts. Nothing ships.", weights: { bottleneckOperator: 3 } },
      { label: "People invent their own workarounds.", weights: { toolOverload: 2 } }
    ]
  },
  {
    id: "q6",
    topic: "restart frequency",
    question: "How often do you have to restart a system or process from scratch?",
    options: [
      { label: "Rarely, templates work well.", weights: {} },
      { label: "Every few months when tools change.", weights: { toolOverload: 2 } },
      { label: "Constantly. Every project feels like day one.", weights: { executionStall: 2, fragmentedWorkflow: 1 } },
      { label: "Only when the main expert changes jobs.", weights: { bottleneckOperator: 2 } }
    ]
  },
  {
    id: "q7",
    topic: "decision revisits",
    question: "Are decisions frequently reopened after being 'made'?",
    options: [
      { label: "Yes, because we lose track of the context.", weights: { fragmentedWorkflow: 2 } },
      { label: "Yes, because the owner wasn't in the loop.", weights: { bottleneckOperator: 2 } },
      { label: "Yes, we get stuck in analysis paralysis.", weights: { executionStall: 3 } },
      { label: "No, decisions are final and tracked.", weights: {} }
    ]
  },
  {
    id: "q8",
    topic: "workflow repeatability",
    question: "Is your most valuable workflow repeatable by a new hire?",
    options: [
      { label: "Yes, fully documented.", weights: {} },
      { label: "No, it requires tool fluency they don't have.", weights: { toolOverload: 2 } },
      { label: "No, it requires unspoken context.", weights: { bottleneckOperator: 2, fragmentedWorkflow: 1 } },
      { label: "We don't really have a 'workflow'.", weights: { executionStall: 2 } }
    ]
  },
  {
    id: "q9",
    topic: "AI usage",
    question: "How is AI currently driving your progress?",
    options: [
      { label: "Randomly. One-off ChatGPT queries.", weights: { fragmentedWorkflow: 2 } },
      { label: "We pay for 5 AI tools but hardly use them.", weights: { toolOverload: 3 } },
      { label: "We want to use it, but can't find the time.", weights: { executionStall: 2 } },
      { label: "It's integrated natively into our process.", weights: {} }
    ]
  },
  {
    id: "q10",
    topic: "output retention",
    question: "What happens to the output of a completed task?",
    options: [
      { label: "Saved in the system of record.", weights: {} },
      { label: "Lost in a Google Drive folder forever.", weights: { fragmentedWorkflow: 2 } },
      { label: "Siloed in a specialized tool.", weights: { toolOverload: 2 } },
      { label: "It sits on my desktop locally.", weights: { bottleneckOperator: 2 } }
    ]
  },
  {
    id: "q11",
    topic: "follow-up systems",
    question: "How do you track follow-ups and action items?",
    options: [
      { label: "An automated reminder triggers.", weights: {} },
      { label: "I manually check my 3 different to-do lists.", weights: { toolOverload: 2 } },
      { label: "I rely on memory and Slack notifications.", weights: { fragmentedWorkflow: 3 } },
      { label: "Things often slip through the cracks.", weights: { executionStall: 2 } }
    ]
  },
  {
    id: "q12",
    topic: "personal/work system overlap",
    question: "Does the company system match how you actually like to work?",
    options: [
      { label: "Yes, perfectly aligned.", weights: {} },
      { label: "No, I have to re-enter data into 'the system'.", weights: { toolOverload: 2, fragmentedWorkflow: 1 } },
      { label: "What company system? I just do what works.", weights: { bottleneckOperator: 2 } },
      { label: "The system is so heavy it kills momentum.", weights: { executionStall: 2 } }
    ]
  },
  {
    id: "q13",
    topic: "next-step clarity",
    question: "When you sit down to work, is the exact next step obvious?",
    options: [
      { label: "Always. The queue tells me.", weights: {} },
      { label: "I usually have to hunt for the status.", weights: { fragmentedWorkflow: 2 } },
      { label: "I have 40 notifications telling me different things.", weights: { toolOverload: 2 } },
      { label: "No, I spend an hour deciding what to do.", weights: { executionStall: 3 } }
    ]
  },
  {
    id: "q14",
    topic: "manual repetition",
    question: "How much of your week is spent copying/pasting data?",
    options: [
      { label: "Under 5%.", weights: {} },
      { label: "Maybe 20%. I do it to save time.", weights: { bottleneckOperator: 1 } },
      { label: "At least 40%. It's the only way tools connect.", weights: { toolOverload: 3, fragmentedWorkflow: 1 } },
      { label: "So much that it feels like my actual job.", weights: { executionStall: 2 } }
    ]
  },
  {
    id: "q15",
    topic: "desired outcome",
    question: "What's the one thing that would fix this?",
    options: [
      { label: "Fewer tools. More connection.", weights: { toolOverload: 2, fragmentedWorkflow: 1 } },
      { label: "Taking myself out of the critical path.", weights: { bottleneckOperator: 3 } },
      { label: "Consolidating all communication.", weights: { fragmentedWorkflow: 2 } },
      { label: "Momentum. Just moving faster.", weights: { executionStall: 2 } }
    ]
  }
];
