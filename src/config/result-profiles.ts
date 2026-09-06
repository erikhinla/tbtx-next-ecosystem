export interface BrandProfile {
  band: string;
  profile: string;
  nextStep: string;
  cta: string;
  ctaRoute: string;
}

export const brandProfiles: Record<string, Record<string, BrandProfile>> = {
  tbtx: {
    "0-24": {
      band: "0-24",
      profile: "Fragmented",
      nextStep:
        "Review a starting point for the gaps your answers suggest.",
      cta: "View Blueprint",
      ctaRoute: "/tbtx/blueprint",
    },
    "25-49": {
      band: "25-49",
      profile: "Stalled",
      nextStep:
        "Use the Blueprint to choose one handoff to improve.",
      cta: "View Blueprint",
      ctaRoute: "/tbtx/blueprint",
    },
    "50-74": {
      band: "50-74",
      profile: "Scaling",
      nextStep:
        "Explore how shared context and clear ownership can reduce coordination.",
      cta: "Explore BizBuilders AI",
      ctaRoute: "/bbai",
    },
    "75-100": {
      band: "75-100",
      profile: "Compounding",
      nextStep:
        "Review how new AI agents and tools will fit before adding them.",
      cta: "Explore BizBuilders AI",
      ctaRoute: "/bbai",
    },
  },
  bbai: {
    "0-24": {
      band: "0-24",
      profile: "Gaps to review",
      nextStep: "Map where momentum stalls in the business.",
      cta: "Start Map",
      ctaRoute: "/tbtx/map",
    },
    "25-49": {
      band: "25-49",
      profile: "Handoffs to review",
      nextStep: "Review a starting point for the gap.",
      cta: "View Blueprint",
      ctaRoute: "/tbtx/blueprint",
    },
    "50-74": {
      band: "50-74",
      profile: "Connected processes",
      nextStep: "Explore how people, AI agents and tools can work from shared context.",
      cta: "Explore BizBuilders AI",
      ctaRoute: "/bbai",
    },
    "75-100": {
      band: "75-100",
      profile: "Oversight to review",
      nextStep: "Explore how people, AI agents and tools can work from shared context.",
      cta: "Explore BizBuilders AI",
      ctaRoute: "/bbai",
    },
  },
  bbm: {
    "0-24": {
      band: "0-24",
      profile: "Leaking Leads",
      nextStep: "Map where momentum stalls in the business.",
      cta: "Start Map",
      ctaRoute: "/tbtx/map",
    },
    "25-49": {
      band: "25-49",
      profile: "Weak Follow-Up",
      nextStep: "Map where momentum stalls in the business.",
      cta: "Start Map",
      ctaRoute: "/tbtx/map",
    },
    "50-74": {
      band: "50-74",
      profile: "Automation to review",
      nextStep: "Explore how people, AI agents and tools can work from shared context.",
      cta: "Explore BizBuilders AI",
      ctaRoute: "/bbai",
    },
    "75-100": {
      band: "75-100",
      profile: "Growth setup to review",
      nextStep: "Explore how people, AI agents and tools can work from shared context.",
      cta: "Explore BizBuilders AI",
      ctaRoute: "/bbai",
    },
  },
};

export function getBandKey(score: number): string {
  if (score <= 24) return "0-24";
  if (score <= 49) return "25-49";
  if (score <= 74) return "50-74";
  return "75-100";
}
