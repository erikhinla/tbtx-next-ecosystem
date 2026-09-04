export const publicLanes = {
  personal: {
    job: "Social Life",
    mantle: "Digital Fog",
    begin: "Begin the Scan",
    again: "Scan again",
    otherHref: "/tbtx/map",
    otherLabel: "Map Digital Fog in Business",
    frameLine: "Find the leftover job.",
    headline: "You asked it to give you the night back.",
    payoff: "Then you spent the night inside the draft.",
    lead:
      "You wanted one text to your sister so you could sleep. ChatGPT wrote three. None of them were you. At 11 you were still in the box, putting your voice back in.",
  },
  business: {
    job: "Work Life",
    mantle: "Digital Fog",
    begin: "Begin the Map",
    again: "Map again",
    otherHref: "/tbtx/scan",
    otherLabel: "Scan Digital Fog in Life",
    frameLine: "Find the leftover job.",
    headline: "You've been the one who finishes it.",
    payoff: "You don't have to keep doing that.",
    lead: "They start. You still close. Name where.",
  },
} as const;

export type PublicLane = keyof typeof publicLanes;
