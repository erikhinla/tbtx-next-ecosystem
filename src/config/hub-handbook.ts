export interface RouteCard {
  label: string;
  path: string;
  note: string;
  tone: "life" | "business" | "approved" | "brand" | "held";
  group: "Front Door" | "Diagnose" | "Offer" | "Foundation" | "Held";
  held?: boolean;
}

export interface ApprovedLine {
  category: "Campaign" | "Ecosystem" | "TBTX" | "BBAI" | "BBM";
  line: string;
}

export interface ConvertSpineBeat {
  step: string;
  phase: string;
  summary: string;
  details: string;
  doors: { label: string; path: string }[];
  held?: boolean;
}

export interface DepartmentMatrixItem {
  dept: string;
  code: string;
  moniker: string;
  accent: string;
  colorHex: string;
  signal: string;
  motion: string;
  visualBehavior?: string;
  irony: string;
}

export interface HubSection {
  id: "canon" | "routes" | "convert" | "selects" | "say" | "diagnose" | "social" | "files";
  index: string;
  label: string;
}

/** Internal hub workstream lanes. One tab per handbook section — not the B2B ad matrix. */
export const HUB_SECTIONS: HubSection[] = [
  { id: "canon", index: "00", label: "Canon" },
  { id: "routes", index: "01", label: "Routes" },
  { id: "convert", index: "02", label: "Convert" },
  { id: "selects", index: "03", label: "Selects" },
  { id: "say", index: "04", label: "Say" },
  { id: "diagnose", index: "05", label: "Diagnose" },
  { id: "social", index: "06", label: "Social" },
  { id: "files", index: "07", label: "Files" },
];

export interface CommandCenterFileCard {
  name: string;
  path: string;
  role: string;
  category: "Core" | "Creative & Motion" | "Code & Runtime" | "Archive";
}

export const CANON_LOCKUPS = {
  hook: "AI Created a Job.",
  mutter: "(Nobody wanted.)",
  mantle: "Managing Digital Fog",
  cta: "Start Here",
  gateTitle: "Choose Your Path",
  gateChoices: [
    { label: "Sit out", result: "After-click line. Site stays closed. Routes stay closed." },
    { label: "Sit back", result: "After-click line. Site stays closed. Routes stay closed." },
    { label: "Stand UP", result: "Opens the doors, mosaic, founder, scan, map, kit, and blueprint." },
  ],
  persona: {
    name: "Noah Bottiē~Élle",
    alias: "Mr. Nobody",
    title: "Project Manager, LA/MIA/NYC Advertising",
    note: "The job is unwanted; Noah is not. Dr. Drool is the later earned evolution and alter ego. Do not reveal it before the story earns it.",
  },
  typePull: "MAP / INFRA / FOG-FREE",
  afterState: "fog-free (lightness, arms around the stack, freedom to create not coordinate)",
  holds: [
    {
      title: "BizBot Mrktng (BBM)",
      status: "HELD OFF LIVE SITE",
      note: "Remains a real brand and offer owner, but is held off the live front door while still a placeholder. Growth only after infrastructure can carry demand.",
    },
    {
      title: "Social Publishing & Paid Ads",
      status: "HELD UNTIL HOMEPAGE FREEZE",
      note: "Hold social publishing of a new lock until the homepage direction is frozen. Paid ads stay frozen until a verified proof library exists.",
    },
    {
      title: "FLOW Agent AS",
      status: "BBAI CLIENT PROOF ONLY",
      note: "Governed path from intention to execution. Not autonomy. Client proof that generated work gets a path to done, not a separate consumer bot.",
    },
  ],
};

export const ROUTES: RouteCard[] = [
  // Front Door
  {
    group: "Front Door",
    label: "Public Story & Worldview",
    path: "/tbtx",
    note: "Cold Path / Front Door",
    tone: "brand",
  },

  // Diagnose
  {
    group: "Diagnose",
    label: "Digital Fog Scan",
    path: "/tbtx/scan",
    note: "Scan for Digital Fog in Life (B2C / 8 Questions)",
    tone: "life",
  },
  {
    group: "Diagnose",
    label: "Business Momentum Map",
    path: "/tbtx/map",
    note: "Map Digital Fog in Business (B2B / 15 Questions)",
    tone: "business",
  },

  // Offer
  {
    group: "Offer",
    label: "Fog-Free Daily",
    path: "/tbtx/kit",
    note: "$7.77 honor system. Daily clearing space, not a bundle.",
    tone: "approved",
  },
  {
    group: "Offer",
    label: "De-Fog Daily Share Loop",
    path: "/tbtx/kit/share",
    note: "Personal referral & video share surface",
    tone: "approved",
  },
  {
    group: "Offer",
    label: "AI Biz Blueprint",
    path: "/tbtx/blueprint",
    note: "Post-Diagnostic Business Deliverable",
    tone: "business",
  },

  // Foundation
  {
    group: "Foundation",
    label: "BizBuilders AI",
    path: "/bbai",
    note: "Operating Foundation & Quad Keystones",
    tone: "business",
  },

  // Held
  {
    group: "Held",
    label: "BizBot Mrktng",
    path: "/bbm",
    note: "Growth Activation (HELD OFF LIVE SITE)",
    tone: "held",
    held: true,
  },
];

export const CONVERT_SPINE: ConvertSpineBeat[] = [
  {
    step: "01",
    phase: "Recognition",
    summary: "Public door & story",
    details: "Visitor recognizes the unwanted job. Hook + Mutter: AI Created a Job. (Nobody wanted.)",
    doors: [{ label: "Public Story (/tbtx)", path: "/tbtx" }],
  },
  {
    step: "02",
    phase: "Scan / Map",
    summary: "Identify where fog accumulates",
    details: "Split into Personal Digital Fog Scan (8 lived-day questions) or Business Momentum Map (15 questions).",
    doors: [
      { label: "Personal Scan (/tbtx/scan)", path: "/tbtx/scan" },
      { label: "Business Map (/tbtx/map)", path: "/tbtx/map" },
    ],
  },
  {
    step: "03",
    phase: "De-Fog Daily or Blueprint",
    summary: "Low-friction next move",
    details: "Personal routes to Digital De-Fog Daily ($7.77 honor system). Business routes to AI Biz Blueprint.",
    doors: [
      { label: "De-Fog Daily (/tbtx/kit)", path: "/tbtx/kit" },
      { label: "Biz Blueprint (/tbtx/blueprint)", path: "/tbtx/blueprint" },
    ],
  },
  {
    step: "04",
    phase: "Aligned Infrastructure",
    summary: "BizBuilders AI Foundation",
    details: "Quad Keystones (Folders, Markdown, Scripts, Protocols) + Context Architecture before automation.",
    doors: [{ label: "Build Backbone (/bbai)", path: "/bbai" }],
  },
  {
    step: "05",
    phase: "Governed Execution",
    summary: "FLOW Agent AS Runtime",
    details: "Governed path from intention to execution. Not autonomy. Client proof that generated work gets a path to done.",
    doors: [{ label: "BBAI Proof (/bbai)", path: "/bbai" }],
  },
  {
    step: "06",
    phase: "Growth Activation",
    summary: "BizBot Mrktng (Held)",
    details: "Lead reactivation, Reddit growth, voice agents. Only after the operating backbone can carry demand.",
    doors: [{ label: "Preview BBM (/bbm)", path: "/bbm" }],
    held: true,
  },
];

export const ASSETS = [
  {
    id: "hook",
    lane: "brand",
    title: "AI created a job.",
    use: "Category hook",
    src: "/media/hero-ai-created-job.jpg",
    format: "STILL / 16:9",
  },
  {
    id: "nobody",
    lane: "brand",
    title: "Nobody wanted.",
    use: "Campaign lockup",
    src: "/media/digital-fog-lockup-827.jpg",
    format: "STILL / 16:9",
  },
  {
    id: "logos",
    lane: "life",
    title: "83 logos",
    use: "Leftover-job scene",
    src: "/media/task-logos.jpg",
    format: "STILL + MOTION",
  },
  {
    id: "clockout",
    lane: "life",
    title: "The agents didn't clock out",
    use: "Recognition post",
    src: "/media/task-clockout.jpg",
    format: "STILL + MOTION",
  },
  {
    id: "personal",
    lane: "life",
    title: "Digital Fog in life",
    use: "Personal scan door",
    src: "/media/door-b2c-827v2.jpg",
    format: "DOOR / 9:16",
  },
  {
    id: "business",
    lane: "business",
    title: "Digital Fog in business",
    use: "Business scan door",
    src: "/media/door-b2b-827v2.jpg",
    format: "DOOR / 9:16",
  },
  {
    id: "warroom",
    lane: "business",
    title: "The human became the system",
    use: "Digital friction post",
    src: "/media/grok-b2b-warroom.jpg",
    format: "STILL / 16:9",
  },
  {
    id: "lift",
    lane: "approved",
    title: "Get the making back",
    use: "Lift / conversion",
    src: "/media/hallway-fog-lift.jpg",
    format: "STILL / 16:9",
  },
] as const;

export const APPROVED_LINES: ApprovedLine[] = [
  // 2026.09.02 Campaign Lines
  { category: "Campaign", line: "When AI Outpaces Infrastructure, You Get Digital Fog." },
  { category: "Campaign", line: "Map the gap. Align the Infra. Build Fog-Free." },

  // Ecosystem
  { category: "Ecosystem", line: "Intelligence isn't the tool. It's the infrastructure." },
  { category: "Ecosystem", line: "Tools multiply faster than context." },
  { category: "Ecosystem", line: "You can't automate what's not organized." },
  { category: "Ecosystem", line: "Sequence is strategy." },
  { category: "Ecosystem", line: "The gap isn't AI adoption. The gap is operational architecture." },

  // TBTX
  { category: "TBTX", line: "AI created a job. Nobody wanted." },
  { category: "TBTX", line: "Digital Fog is what happens when AI changes the quantity, speed, and flow of work faster than infrastructure adapts." },
  { category: "TBTX", line: "The tools got faster. The work got foggier." },
  { category: "TBTX", line: "Before you automate, find the fog." },
  { category: "TBTX", line: "AI cannot find truth your business has not organized." },

  // BBAI
  { category: "BBAI", line: "Digital Fog is the condition. Digital Friction is what the business feels next." },
  { category: "BBAI", line: "Create context. Establish protocols. Sequence the work." },
  { category: "BBAI", line: "Build the backbone before adding more AI." },
  { category: "BBAI", line: "Most AI systems can generate. Very few can govern what happens next." },

  // BBM
  { category: "BBM", line: "Growth is useless if the system drops the lead." },
  { category: "BBM", line: "Dormant leads are not dead. They're unattended." },
  { category: "BBM", line: "The handoff is often where the money leaks." },
  { category: "BBM", line: "Capture the intent. Route the next action. Follow up." },
  { category: "BBM", line: "Activate growth the operating layer can actually carry." },
];

export const DIAGNOSTIC_SYSTEM = {
  b2c: {
    name: "Digital Fog Scan (B2C / Personal)",
    questionCount: 8,
    scoringType: "8 lived-day questions (0, 1, 2 pts). Total score 0–100%.",
    bands: [
      {
        range: "0–49%",
        name: "CARRYING IT",
        desc: "You named it. You're still finishing what the agents start. 20 minutes to close one loop and get one piece of the day back.",
        action: "Routes to Digital De-Fog Daily (/tbtx/kit)",
      },
      {
        range: "50–100%",
        name: "CLEAR ENOUGH TO BUILD",
        desc: "Your day isn't the problem. Work is. Agents started it. People are stuck in the middle. The stand continues there.",
        action: "Routes to Momentum Map (/map)",
      },
    ],
    standard: "MUST writing law: Mirror → Understand → Solve → Transform. No invented algorithm pillars.",
  },
  b2b: {
    name: "Momentum Map (B2B / Business)",
    questionCount: 15,
    scoringType: "15 questions, scored across operating friction vectors.",
    bands: [
      {
        range: "0–24%",
        name: "FRAGMENTED",
        desc: "Agents opened more than the team can close. Work starts fresh every time. People are the operating system. Leftover coordination, not 10x.",
        action: "Routes to AI Biz Blueprint (/tbtx/blueprint)",
      },
      {
        range: "25–49%",
        name: "STALLED",
        desc: "Pieces exist. Nothing holds them. Humans still finish what the agents start. The stand now is to give the leftover work a route.",
        action: "Routes to AI Biz Blueprint (/tbtx/blueprint)",
      },
      {
        range: "50–74%",
        name: "SCALING",
        desc: "Work gets done. Then you do it again. The 10x is still trapped in coordination. Backbone is how the stand holds at work scale.",
        action: "Routes to BizBuilders AI (/bbai)",
      },
      {
        range: "75–100%",
        name: "COMPOUNDING",
        desc: "The system compounds. Guard it. Adding tools faster than the route can hold them puts you back in leftover-finishing.",
        action: "Routes to BizBuilders AI (/bbai)",
      },
    ],
    standard: "Identifies operational drag without creating false certainty from a short form.",
  },
};

export const BUYER_ORDER_STEPS = [
  { step: 1, text: "Something feels harder than it should." },
  { step: 2, text: "They look for language that explains the pattern." },
  { step: 3, text: "They test whether a better future is believable." },
  { step: 4, text: "They choose a low-friction next step." },
  { step: 5, text: "They commit when the prescription matches the stakes." },
  { step: 6, text: "They judge success by changed daily reality." },
];

export const SOCIAL_CROP_RULES = [
  {
    ratio: "4:5",
    rule: "Headline in upper 32%, person/evidence in middle 48%, bridge + CTA in lower 20%.",
  },
  {
    ratio: "1:1",
    rule: "Department badge in upper 12%, headline in upper-left 38%, person/evidence in right/lower 50%.",
  },
  {
    ratio: "9:16",
    rule: "Keep upper 20% clear of platform UI. Headline occupies 20–42%, person 38–76%, CTA stays above lower 16%.",
  },
  {
    ratio: "16:9",
    rule: "Diagnosis occupies left 5 columns, person/evidence right 7 columns, central seam shows the gap.",
  },
];

export const THREE_SECOND_END_CARD = {
  beats: [
    { time: "0.00–0.70", text: "WHEN AI OUTPACES INFRASTRUCTURE types on." },
    { time: "0.70–1.25", text: "INFRASTRUCTURE cracks. Digital Fog crosses and partially covers the line." },
    { time: "1.25–1.65", text: "DIGITAL FOG resolves for one beat." },
    { time: "1.65–2.10", text: "OG is replaced by RICTION, producing DIGITAL FRICTION." },
    { time: "2.10–3.00", text: "MAP YOURS." },
  ],
  liveRoute: "/tbtx/map",
};

export const DEPARTMENT_MATRIX: DepartmentMatrixItem[] = [
  {
    dept: "Account Management",
    code: "ACC",
    moniker: "The Context Relay",
    accent: "Cobalt",
    colorHex: "#3b82f6",
    signal: "Route-line brackets",
    motion: "Output multiplies while systems fracture; the manager becomes isolated memory.",
    irony: "AI multiplied responses everywhere. Noah is still the only one who remembers the client's actual goal.",
  },
  {
    dept: "Finance",
    code: "FIN",
    moniker: "The Reconciliation Loop",
    accent: "Ledger green",
    colorHex: "#10b981",
    signal: "Offset closing lines",
    motion: "Disparate systems collapse manually; authorization and origin must be proved again.",
    irony: "(Billing is still trying to find it.)",
  },
  {
    dept: "Legal",
    code: "LGL",
    moniker: "The Provenance Chain",
    accent: "Oxblood",
    colorHex: "#991b1b",
    signal: "Source-mark chain with an unresolved link",
    motion: "An archaeological dig for truth, provenance, and liability.",
    visualBehavior: "Uncovers buried truth (must not share PR's valve behavior)",
    irony: "The contract draft generated instantly. Proving who authorized the source took an investigation.",
  },
  {
    dept: "Production",
    code: "PRD",
    moniker: "The Version Stack",
    accent: "Orange",
    colorHex: "#f97316",
    signal: "Stacked frames",
    motion: "Versions multiply while ownership and finality fall out of sync.",
    irony: "AI versions multiplied by lunch. Nobody knows which one is approved for ship.",
  },
  {
    dept: "Strategy",
    code: "STR",
    moniker: "The Signal Filter",
    accent: "Violet",
    colorHex: "#8b5cf6",
    signal: "Narrowing signal field",
    motion: "More inputs arrive faster than a decision model can turn them into direction.",
    irony: "Synthetic research points multiplied everywhere. Nobody can find the clear operating direction.",
  },
  {
    dept: "Creative",
    code: "CRT",
    moniker: "The Option Field",
    accent: "Magenta",
    colorHex: "#d946ef",
    signal: "Asterisk field",
    motion: "The original idea loses coordinate space; time to think is consumed by option management.",
    irony: "Infinite options created instantly. No time left to make the actual thing.",
  },
  {
    dept: "Public Relations",
    code: "PR",
    moniker: "The Approval Pulse",
    accent: "Cyan",
    colorHex: "#06b6d4",
    signal: "Pulse through an approval gate",
    motion: "Reputation moves faster than approval; the visual behaves like a pressurized valve.",
    visualBehavior: "Contains pressure moving toward release (pressurized valve)",
    irony: "Public narratives move at lightspeed while internal approvals remain stuck in human triage.",
  },
  {
    dept: "Media Buying / Planning",
    code: "MED",
    moniker: "The Attribution Maze",
    accent: "Chartreuse",
    colorHex: "#84cc16",
    signal: "Target and route lines",
    motion: "Optimization output multiplies across platforms while attribution fragments.",
    irony: "Platforms running automated micro-experiments everywhere. Nobody can trace which channel made the money.",
  },
  {
    dept: "Human Resources",
    code: "HR",
    moniker: "The Human Context Check",
    accent: "Coral",
    colorHex: "#f43f5e",
    signal: "Human point inside policy brackets",
    motion: "Policies and AI output meet in exceptions that people must interpret and carry.",
    irony: "AI answered the policy questions. Humans had to handle every real-life exception.",
  },
  {
    dept: "Operations",
    code: "OPS",
    moniker: "The Missing Layer",
    accent: "Brass",
    colorHex: "#d6b46e",
    signal: "Two systems separated by a human-shaped bridge",
    motion: "The operating foundation lags. Motion is reductive convergence, never a pileup of every department.",
    visualBehavior: "Reductive convergence onto the missing layer (default campaign chassis)",
    irony: "Tools multiplied faster than context. The human became the operating system.",
  },
];

export const COMMAND_CENTER_FILES: CommandCenterFileCard[] = [
  {
    name: "TBTX_MASTER.md",
    path: "TBTX_COMMAND_CENTER/TBTX_MASTER.md",
    role: "Single authoritative operating book across all brands, canons, and rules.",
    category: "Core",
  },
  {
    name: "00_LOCK",
    path: "TBTX_COMMAND_CENTER/Campaign elements/00_LOCK/",
    role: "Canonical locks for typography, Start Here CTA, naming, and decisions.",
    category: "Core",
  },
  {
    name: "00_START_HERE",
    path: "TBTX_COMMAND_CENTER/Campaign elements/00_START_HERE/",
    role: "Authoritative paths, one-person workflows, and ingestion maps.",
    category: "Core",
  },
  {
    name: "01_CANON",
    path: "TBTX_COMMAND_CENTER/Campaign elements/01_CANON/",
    role: "Source canonical documents and historical reference versions.",
    category: "Core",
  },
  {
    name: "01_MOTION",
    path: "TBTX_COMMAND_CENTER/Campaign elements/01_MOTION/",
    role: "Motion probes, layout gifs, and typography animation files.",
    category: "Creative & Motion",
  },
  {
    name: "02_CREATIVE",
    path: "TBTX_COMMAND_CENTER/Campaign elements/02_CREATIVE/",
    role: "Visual media selects, posters, hero films, and department stills.",
    category: "Creative & Motion",
  },
  {
    name: "03_CAMPAIGN",
    path: "TBTX_COMMAND_CENTER/Campaign elements/03_CAMPAIGN/",
    role: "Launch journeys, copy libraries, and conversion sequences.",
    category: "Creative & Motion",
  },
  {
    name: "04_WEBSITE",
    path: "TBTX_COMMAND_CENTER/Campaign elements/04_WEBSITE/",
    role: "Next.js production web application and diagnostic engine.",
    category: "Code & Runtime",
  },
  {
    name: "05_POSTIZ_PACKAGES",
    path: "TBTX_COMMAND_CENTER/Campaign elements/05_POSTIZ_PACKAGES/",
    role: "Social media draft packages and Postiz distribution wiring.",
    category: "Code & Runtime",
  },
  {
    name: "06_RUNTIME",
    path: "TBTX_COMMAND_CENTER/Campaign elements/06_RUNTIME/",
    role: "Governed execution runtime, scripts, and agent environments.",
    category: "Code & Runtime",
  },
  {
    name: "99_ARCHIVE",
    path: "TBTX_COMMAND_CENTER/99_ARCHIVE/",
    role: "Frozen pre-lock archives, historical drafts, and consolidated files.",
    category: "Archive",
  },
];
