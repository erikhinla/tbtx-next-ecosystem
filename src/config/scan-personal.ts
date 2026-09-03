import type { Question, ProfileBand } from "./diagnostic-tbtx";

/** B2C / Fog-Free Daily path. Lived-day questions. Not a business ops quiz. */
export const personalQuestions: Question[] = [
  {
    id: 1,
    text: "When you sit down to do one thing, what usually happens?",
    options: [
      { text: "I actually do that one thing", value: 2 },
      { text: "I start, then three other things pull me off", value: 1 },
      { text: "I spend the first stretch hunting for what I need", value: 0 },
      { text: "I never really sit down. The day just hits", value: 0 },
    ],
  },
  {
    id: 2,
    text: "How often do you search for something you know you saved?",
    options: [
      { text: "Almost never. I can put my hand on it", value: 2 },
      { text: "A few times a week", value: 1 },
      { text: "Most days", value: 0 },
      { text: "That's most of what I do now", value: 0 },
    ],
  },
  {
    id: 3,
    text: "What does your digital day feel like by evening?",
    options: [
      { text: "Clear enough. I can put it down", value: 2 },
      { text: "Busy, but I can still see tomorrow", value: 1 },
      { text: "Tabs, threads, and half-finished notes everywhere", value: 0 },
      { text: "Like another room I have to clean", value: 0 },
    ],
  },
  {
    id: 4,
    text: "How many unfinished loops are you carrying in your head?",
    options: [
      { text: "A short, honest list", value: 2 },
      { text: "A list I keep rewriting", value: 1 },
      { text: "Too many to count without getting tired", value: 0 },
      { text: "I don't know where they live anymore", value: 0 },
    ],
  },
  {
    id: 5,
    text: "When AI helps you produce something, what happens next?",
    options: [
      { text: "I use it and move on", value: 2 },
      { text: "I edit it, then I can use it", value: 1 },
      { text: "I spend longer cleaning it up than it saved", value: 0 },
      { text: "It becomes another file I have to manage", value: 0 },
    ],
  },
  {
    id: 6,
    text: "If you put the phone down for a week, could you pick your life back up?",
    options: [
      { text: "Yes. It's where I left it", value: 2 },
      { text: "Mostly, with a little hunting", value: 1 },
      { text: "I'd have to reconstruct it from memory", value: 0 },
      { text: "I'd be starting over", value: 0 },
    ],
  },
  {
    id: 7,
    text: "What usually costs you the morning?",
    options: [
      { text: "The actual thing I meant to do", value: 2 },
      { text: "Messages that shouldn't have been urgent", value: 1 },
      { text: "Finding the right version of something", value: 0 },
      { text: "Re-explaining context to myself or a tool", value: 0 },
    ],
  },
  {
    id: 8,
    text: "If your digital life worked, what would you feel first?",
    options: [
      { text: "I already feel that most days", value: 2 },
      { text: "A little more room to think", value: 1 },
      { text: "Mornings that don't start in a scramble", value: 0 },
      { text: "Like I'm not the filing system anymore", value: 0 },
    ],
  },
];

export const personalBands: ProfileBand[] = [
  {
    min: 0,
    max: 49,
    profile: "CARRYING IT",
    description:
      "You named it. You are still finishing what the agents start. Twenty minutes to close one loop and get one piece of the day back.",
    cta: "Get Digital De-Fog Daily",
    ctaRoute: "/tbtx/kit",
  },
  {
    min: 50,
    max: 100,
    profile: "CLEAR ENOUGH TO BUILD",
    description:
      "Your day isn't the problem. Work is. Agents started it. People are stuck in the middle. The stand continues there.",
    cta: "Map the Digital Friction",
    ctaRoute: "/tbtx/map",
  },
];
