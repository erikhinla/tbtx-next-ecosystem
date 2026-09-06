export const publicLanes = {
  personal: {
    job: "Digital Fog in Life",
    mantle: "",
    begin: "Start Scan",
    mapLabel: "",
    again: "Start Again",
    otherHref: "/tbtx/kit",
    otherLabel: "Digital De-Fog Daily",
    frameLine: "",
    headline:
      "What to expect",
    payoff: "You’ve taken a stand. Start with your day.",
    lead: "Answer eight questions about where things pile up, pull your attention, or get held up.",
  },
  business: {
    job: "Digital Fog in Business",
    mantle: "",
    begin: "Start Map",
    mapLabel: "",
    again: "Start Again",
    otherHref: "",
    otherLabel: "",
    frameLine: "",
    headline:
      "You’ve taken a stand. Start with your business.",
    payoff: "",
    lead: "Answer a few questions about where work gets held up and handoffs break down.",
  },
} as const;

export type PublicLane = keyof typeof publicLanes;
