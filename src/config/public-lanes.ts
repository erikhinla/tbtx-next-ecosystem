export const publicLanes = {
  personal: {
    job: "Digital Fog in Life",
    mantle: "",
    begin: "Start Scan",
    mapLabel: "Scan the Day",
    again: "Begin Again",
    otherHref: "/tbtx/kit",
    otherLabel: "Digital Fog-Free Daily",
    frameLine: "",
    headline:
      "See where the day stalls before it turns into leftover work, so you can gain clarity and focus on what you\u2019re made to do.",
    payoff: "You asked it to give you the night back.",
    lead: "Then you spent the night inside the draft.",
  },
  business: {
    job: "Digital Fog in Business",
    mantle: "",
    begin: "Start Map",
    mapLabel: "Map the Gap",
    again: "Begin Again",
    otherHref: "",
    otherLabel: "",
    frameLine: "",
    headline:
      "See where momentum is stalling before it leads to friction so you can gain clarity and focus on growing what you\u2019re made to do.",
    payoff: "",
    lead: "",
  },
} as const;

export type PublicLane = keyof typeof publicLanes;
