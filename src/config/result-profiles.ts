// Result Profiles for all brands - TBTX, BBAI, BBM
// Source: ECOSYSTEM_CANON.md Section 6 Scoring Bands table and TBTX profiles
// Shared reference for ResultProfile component

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
      nextStep: "AI Biz Blueprint",
      cta: "Get the AI Biz Blueprint",
      ctaRoute: "/tbtx/blueprint",
    },
    "25-49": {
      band: "25-49",
      profile: "Stalled",
      nextStep: "AI Biz Blueprint",
      cta: "Get the AI Biz Blueprint",
      ctaRoute: "/tbtx/blueprint",
    },
    "50-74": {
      band: "50-74",
      profile: "Scaling",
      nextStep: "BizBuilders AI",
      cta: "Build the Backbone",
      ctaRoute: "/bbai",
    },
    "75-100": {
      band: "75-100",
      profile: "Compounding",
      cta: "Build the Backbone",
      nextStep: "BizBuilders AI",
      ctaRoute: "/bbai",
    },
  },
  bbai: {
    "0-24": {
      band: "0-24",
      profile: "Not Ready",
      nextStep: "Momentum Map",
      cta: "Map My Momentum",
      ctaRoute: "/tbtx/map",
    },
    "25-49": {
      band: "25-49",
      profile: "Structurally Blocked",
      nextStep: "AI Biz Blueprint",
      cta: "Get the AI Biz Blueprint",
      ctaRoute: "/tbtx/blueprint",
    },
    "50-74": {
      band: "50-74",
      profile: "Infrastructure Ready",
      nextStep: "BizBuilders AI",
      cta: "Build the Backbone",
      ctaRoute: "/bbai",
    },
    "75-100": {
      band: "75-100",
      profile: "Ready to govern execution",
      nextStep: "BizBuilders AI",
      cta: "Build the Backbone",
      ctaRoute: "/bbai",
    },
  },
  bbm: {
    "0-24": {
      band: "0-24",
      profile: "Leaking Leads",
      nextStep: "Momentum Map",
      cta: "Map My Momentum",
      ctaRoute: "/tbtx/map",
    },
    "25-49": {
      band: "25-49",
      profile: "Weak Follow-Up",
      nextStep: "Momentum Map",
      cta: "Map My Momentum",
      ctaRoute: "/tbtx/map",
    },
    "50-74": {
      band: "50-74",
      profile: "Ready for Automation",
      nextStep: "BizBuilders AI",
      cta: "Build the Backbone",
      ctaRoute: "/bbai",
    },
    "75-100": {
      band: "75-100",
      profile: "Growth System Ready",
      nextStep: "BizBuilders AI",
      cta: "Build the Backbone",
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
