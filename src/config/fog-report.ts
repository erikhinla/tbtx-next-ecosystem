import { getProfile, type ProfileBand } from "./diagnostic-tbtx";
import { brandProfiles, getBandKey, type BrandProfile } from "./result-profiles";
import type { Archetype } from "./intakeQuestions";

export type FogPressure = {
  id: string;
  title: string;
  implication: string;
};

export type FogLoad = {
  headline: string;
  body: string;
  hoursPerPersonWeek: [number, number];
};

export type FogReportModel = {
  score: number;
  maxScore: number;
  health: number;
  profile: ProfileBand;
  brand: BrandProfile;
  pressures: FogPressure[];
  load: FogLoad;
  archetype: Archetype;
};

const MAX_PER_QUESTION = 2;

const PRESSURE_WHEN_ZERO: Record<number, FogPressure> = {
  0: {
    id: "start",
    title: "Starting work",
    implication: "You reported difficulty starting. Check whether the first step is clear.",
  },
  1: {
    id: "next",
    title: "Choosing the next step",
    implication: "You work out priorities as you go. Try keeping the next action in one place.",
  },
  2: {
    id: "memory",
    title: "Finding shared knowledge",
    implication: "Your answer points to knowledge held in people's heads or scattered messages.",
  },
  3: {
    id: "tools",
    title: "Before adding AI agents and tools",
    implication: "You reported no AI agents and tools in use. Start with the task and its handoffs before choosing any.",
  },
  4: {
    id: "learning",
    title: "Keeping what you learn",
    implication: "You reported losing what a project taught you. Save one lesson with the work.",
  },
  5: {
    id: "followup",
    title: "Tracking follow-up",
    implication: "Your answer suggests follow-up can depend on someone remembering.",
  },
  6: {
    id: "ownership",
    title: "Ownership is unclear",
    implication: "You reported unclear ownership. Give one waiting task an owner.",
  },
  7: {
    id: "ai",
    title: "AI agents and tools need a process",
    implication: "You reported experimenting without a system. Define what happens after an output arrives.",
  },
  8: {
    id: "decisions",
    title: "Deciding under pressure",
    implication: "Your answer suggests decisions depend on who speaks up or is available.",
  },
  9: {
    id: "revenue",
    title: "Revenue follow-up",
    implication: "You reported that much of your revenue depends on manual follow-up or memory.",
  },
  10: {
    id: "repeat",
    title: "Repeated work",
    implication: "You reported frequent repeated work. Check what could be reused.",
  },
  11: {
    id: "key-person",
    title: "Covering an absence",
    implication: "You reported work stopping or slowing when a key person is away.",
  },
  12: {
    id: "pipeline",
    title: "The pipeline is not visible",
    implication: "You reported limited visibility into leads. Check where status is recorded.",
  },
  13: {
    id: "loop",
    title: "Learning from completed work",
    implication: "You reported no regular learning process. Review one completed task.",
  },
  14: {
    id: "shape",
    title: "Responding as work arrives",
    implication: "You described work as chaotic or reactive. Start with one repeatable next step.",
  },
};

const PRESSURE_WHEN_ONE: Record<number, FogPressure> = {
  0: {
    id: "handoff",
    title: "Tools and handoffs",
    implication: "You reported delays switching tools or waiting on others.",
  },
  1: {
    id: "priorities",
    title: "Priorities are informal",
    implication: "Your priorities or process are informal. Make the next owner and action visible.",
  },
  2: {
    id: "scattered",
    title: "Finding the current information",
    implication: "You reported loosely organized knowledge. Check whether the current version is easy to find.",
  },
  5: {
    id: "loose-followup",
    title: "Follow-up is a loose process",
    implication: "You reported a loose follow-up process. Make the next contact date visible.",
  },
  6: {
    id: "informal-owner",
    title: "Ownership depends on who is free",
    implication: "You reported informal ownership or assignments based on availability.",
  },
  9: {
    id: "some-manual",
    title: "Some follow-up remains manual",
    implication: "You reported some revenue depending on manual follow-up or memory.",
  },
  10: {
    id: "sometimes-repeat",
    title: "Occasional repeated work",
    implication: "You reported repeating some work. Keep a useful example with the next task.",
  },
  12: {
    id: "partial-pipe",
    title: "The pipeline is only partly visible",
    implication: "Your answer suggests some lead status is visible. Check the gaps.",
  },
};

function deriveArchetype(pressures: FogPressure[]): Archetype {
  const ids = new Set(pressures.map((item) => item.id));
  if (ids.has("key-person") || ids.has("ownership") || ids.has("informal-owner")) {
    return "bottleneckOperator";
  }
  if (ids.has("tools") || ids.has("handoff")) {
    return "toolOverload";
  }
  if (ids.has("start") || ids.has("loop") || ids.has("next")) {
    return "executionStall";
  }
  return "fragmentedWorkflow";
}

function loadForHealth(health: number): FogLoad {
  if (health <= 24) {
    return {
      headline: "Start with one point of friction.",
      body: "Look for time spent finding context, chasing updates, or restarting work.",
      hoursPerPersonWeek: [6, 12],
    };
  }
  if (health <= 49) {
    return {
      headline: "Check the gaps between steps.",
      body: "Trace one task from request to finish. Note where someone has to reconnect the pieces.",
      hoursPerPersonWeek: [4, 8],
    };
  }
  if (health <= 74) {
    return {
      headline: "Look for repeated coordination.",
      body: "Check whether the next task can reuse the decisions and context from the last.",
      hoursPerPersonWeek: [2, 5],
    };
  }
  return {
    headline: "Keep the setup connected.",
    body: "Give each new AI agent or tool a clear purpose, owner, and place in the process.",
    hoursPerPersonWeek: [1, 3],
  };
}

export function deriveFogReport(answers: number[]): FogReportModel {
  const filled = answers.map((value) => (value < 0 ? 0 : value));
  const score = filled.reduce((sum, value) => sum + value, 0);
  const maxScore = filled.length * MAX_PER_QUESTION;
  const health = maxScore === 0 ? 0 : Math.round((score / maxScore) * 100);
  const profile = getProfile(health);
  const brand = brandProfiles.tbtx[getBandKey(health)] || brandProfiles.tbtx["0-24"];

  const zeros: FogPressure[] = [];
  const ones: FogPressure[] = [];
  filled.forEach((value, index) => {
    if (value === 0 && PRESSURE_WHEN_ZERO[index]) zeros.push(PRESSURE_WHEN_ZERO[index]);
    if (value === 1 && PRESSURE_WHEN_ONE[index]) ones.push(PRESSURE_WHEN_ONE[index]);
  });

  const pressures = [...zeros, ...ones].slice(0, 4);

  return {
    score,
    maxScore,
    health,
    profile,
    brand,
    pressures,
    load: loadForHealth(health),
    archetype: deriveArchetype(pressures),
  };
}

export function groupHours(people: number, hoursPerPersonWeek: [number, number]): [number, number] {
  const count = Math.min(50, Math.max(1, Math.round(people)));
  return [count * hoursPerPersonWeek[0], count * hoursPerPersonWeek[1]];
}
