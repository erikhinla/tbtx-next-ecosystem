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
      band: "0\u201324",
      profile: "Fragmented",
      nextStep: "Digital Fog Kit",
      cta: "Get the Digital Fog Kit - $7.77",
      ctaRoute: "/tbtx/kit",
    },
    "25-49": {
      band: "25\u201349",
      profile: "Stalled",
      nextStep: "AI Custom Roadmap",
      cta: "Get Your Custom Roadmap",
      ctaRoute: "/bbai/roadmap",
    },
    "50-74": {
      band: "50\u201374",
      profile: "Scaling",
      nextStep: "BizBuilders AI consultation",
      cta: "Build the Backbone",
      ctaRoute: "/bbai",
    },
    "75-100": {
      band: "75\u2013100",
      profile: "Compounding",
      nextStep: "FLOW Agent AS implementation",
      cta: "Structure the Work",
      ctaRoute: "/bbai/flow-agent-as",
    },
  },
  bbai: {
    "0-24": {
      band: "0\u201324",
      profile: "Not Ready",
      nextStep: "Start with Context Architecture",
      cta: "Get Your Custom Roadmap",
      ctaRoute: "/bbai/roadmap",
    },
    "25-49": {
      band: "25\u201349",
      profile: "Structurally Blocked",
      nextStep: "Context Architecture Blueprint",
      cta: "Start With Context Architecture",
      ctaRoute: "/bbai/context-architecture",
    },
    "50-74": {
      band: "50\u201374",
      profile: "Infrastructure Ready",
      nextStep: "FLOW Agent AS implementation",
      cta: "Build the Backbone",
      ctaRoute: "/bbai",
    },
    "75-100": {
      band: "75\u2013100",
      profile: "Agent Ready",
      nextStep: "Infrastructure Buildout",
      cta: "Get Your Custom Roadmap",
      ctaRoute: "/bbai/roadmap",
    },
  },
  bbm: {
    "0-24": {
      band: "0\u201324",
      profile: "Leaking Leads",
      nextStep: "Lead Loss Diagnostic",
      cta: "Stop Losing Leads",
      ctaRoute: "/bbm/lead-loss",
    },
    "25-49": {
      band: "25\u201349",
      profile: "Weak Follow-Up",
      nextStep: "Missed-Call Recovery + Lead Nurture",
      cta: "Activate Growth System",
      ctaRoute: "/bbm",
    },
    "50-74": {
      band: "50\u201374",
      profile: "Ready for Automation",
      nextStep: "Voice Concierge Setup",
      cta: "Try the AI Voice Assistant",
      ctaRoute: "/bbm/voice",
    },
    "75-100": {
      band: "75\u2013100",
      profile: "Growth System Ready",
      nextStep: "Full Marketing Automation + Reddit Growth",
      cta: "Activate Growth System",
      ctaRoute: "/bbm",
    },
  },
};

export function getBandKey(score: number): string {
  if (score <= 24) return "0-24";
  if (score <= 49) return "25-49";
  if (score <= 74) return "50-74";
  return "75-100";
}
