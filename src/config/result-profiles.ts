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
        "You named where momentum stalls. The next move is the blueprint \u2014 the map of the drag so people stop finishing what the agents start.",
      cta: "Get the AI Biz Blueprint",
      ctaRoute: "/tbtx/blueprint",
    },
    "25-49": {
      band: "25-49",
      profile: "Stalled",
      nextStep:
        "Pieces exist. Nothing holds them. The blueprint names the stall so you can gain clarity and put attention back on work you\u2019re made to do.",
      cta: "Get the AI Biz Blueprint",
      ctaRoute: "/tbtx/blueprint",
    },
    "50-74": {
      band: "50-74",
      profile: "Scaling",
      nextStep:
        "Work gets done. Then you do it again. See the operating layer that keeps coordination from becoming the job.",
      cta: "See the operating layer",
      ctaRoute: "/bbai",
    },
    "75-100": {
      band: "75-100",
      profile: "Compounding",
      nextStep:
        "The system compounds. Guard it. Adding tools faster than the route can hold them puts you back in leftover-finishing.",
      cta: "See the operating layer",
      ctaRoute: "/bbai",
    },
  },
  bbai: {
    "0-24": {
      band: "0-24",
      profile: "Not Ready",
      nextStep: "Map where momentum stalls in the business.",
      cta: "Map Digital Fog in Business",
      ctaRoute: "/tbtx/map",
    },
    "25-49": {
      band: "25-49",
      profile: "Structurally Blocked",
      nextStep: "Get the written map of the stall.",
      cta: "Get the AI Biz Blueprint",
      ctaRoute: "/tbtx/blueprint",
    },
    "50-74": {
      band: "50-74",
      profile: "Infrastructure Ready",
      nextStep: "See how the operating layer holds people and AI on one route.",
      cta: "See the operating layer",
      ctaRoute: "/bbai",
    },
    "75-100": {
      band: "75-100",
      profile: "Ready to govern execution",
      nextStep: "See how the operating layer holds people and AI on one route.",
      cta: "See the operating layer",
      ctaRoute: "/bbai",
    },
  },
  bbm: {
    "0-24": {
      band: "0-24",
      profile: "Leaking Leads",
      nextStep: "Map where momentum stalls in the business.",
      cta: "Map Digital Fog in Business",
      ctaRoute: "/tbtx/map",
    },
    "25-49": {
      band: "25-49",
      profile: "Weak Follow-Up",
      nextStep: "Map where momentum stalls in the business.",
      cta: "Map Digital Fog in Business",
      ctaRoute: "/tbtx/map",
    },
    "50-74": {
      band: "50-74",
      profile: "Ready for Automation",
      nextStep: "See how the operating layer holds people and AI on one route.",
      cta: "See the operating layer",
      ctaRoute: "/bbai",
    },
    "75-100": {
      band: "75-100",
      profile: "Growth System Ready",
      nextStep: "See how the operating layer holds people and AI on one route.",
      cta: "See the operating layer",
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
