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
    title: "Momentum dies at the start",
    implication: "Work doesn't have a first move. Someone has to invent the start every time.",
  },
  1: {
    id: "next",
    title: "Nobody can see the next move",
    implication: "Priorities are reconstructed in conversation instead of routed.",
  },
  2: {
    id: "memory",
    title: "The system is someone's head",
    implication: "Operating knowledge lives in people and chat threads. It walks out of the room.",
  },
  3: {
    id: "tools",
    title: "No operating layer yet",
    implication: "Tools haven't been asked to hold a route. They only add surfaces.",
  },
  4: {
    id: "learning",
    title: "Finished work leaves no memory",
    implication: "Each project starts as if the last one never happened.",
  },
  5: {
    id: "followup",
    title: "Follow-up depends on recall",
    implication: "Leads and replies fall through unless a person remembers them.",
  },
  6: {
    id: "ownership",
    title: "Ownership is unclear",
    implication: "When something needs to move, it waits on whoever happens to notice.",
  },
  7: {
    id: "ai",
    title: "AI is activity without a spine",
    implication: "Prompts and tools fire. Nothing governs what should happen next.",
  },
  8: {
    id: "decisions",
    title: "Pressure picks the loudest voice",
    implication: "Decisions are not routed. They are improvised.",
  },
  9: {
    id: "revenue",
    title: "Revenue still rides on memory",
    implication: "If people forget to follow up, the money doesn't arrive.",
  },
  10: {
    id: "repeat",
    title: "Work is done twice",
    implication: "Context doesn't survive the last cycle, so the same labor returns.",
  },
  11: {
    id: "key-person",
    title: "One absence stops the machine",
    implication: "The operating system is a person. When they are out, work stops.",
  },
  12: {
    id: "pipeline",
    title: "The pipeline is not visible",
    implication: "You can't see what's waiting, slipping, or already lost.",
  },
  13: {
    id: "loop",
    title: "Execution doesn't teach the next cycle",
    implication: "The business doesn't get sharper from the work it already did.",
  },
  14: {
    id: "shape",
    title: "The shape is chaos or reaction",
    implication: "There's motion. There isn't a system that compounds.",
  },
};

const PRESSURE_WHEN_ONE: Record<number, FogPressure> = {
  0: {
    id: "handoff",
    title: "Momentum leaks between tools and waiting",
    implication: "The work exists. The path between steps doesn't.",
  },
  1: {
    id: "priorities",
    title: "Priorities are informal",
    implication: "People know a list. The list doesn't route itself.",
  },
  2: {
    id: "scattered",
    title: "Knowledge is filed, not usable",
    implication: "Docs exist. Finding the live version is still a job.",
  },
  5: {
    id: "loose-followup",
    title: "Follow-up is a loose process",
    implication: "It works when someone has slack. It fails when they don't.",
  },
  6: {
    id: "informal-owner",
    title: "Ownership depends on who is free",
    implication: "Tasks move by availability, not by a rule.",
  },
  9: {
    id: "some-manual",
    title: "Part of revenue still needs a human prompt",
    implication: "Systems cover some of it. Memory covers the rest.",
  },
  10: {
    id: "sometimes-repeat",
    title: "Work repeats often enough to feel it",
    implication: "Reusable pieces exist. They are not the default.",
  },
  12: {
    id: "partial-pipe",
    title: "The pipeline is only partly visible",
    implication: "You can see some of the work. The rest is weather.",
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
      headline: "Agents started more than anyone can finish.",
      body: "A week of re-explaining, chasing, restarting. After agents. A person is still holding it.",
      hoursPerPersonWeek: [6, 12],
    };
  }
  if (health <= 49) {
    return {
      headline: "People are still finishing what the agents leave.",
      body: "Some of a system exists. It doesn't hold. Someone still does it by hand.",
      hoursPerPersonWeek: [4, 8],
    };
  }
  if (health <= 74) {
    return {
      headline: "Work gets done. Then you do it again.",
      body: "The tools don't remember. Agents don't govern themselves. That's the fog showing up at work.",
      hoursPerPersonWeek: [2, 5],
    };
  }
  return {
    headline: "It's working. Don't flood it.",
    body: "Don't add another agent until this can hold the ones you have.",
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
