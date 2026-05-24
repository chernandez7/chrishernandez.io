export type SectionId = "hero" | "history" | "esoteric";

export const sectionOrder: SectionId[] = ["hero", "history", "esoteric"];

export const signals = [
  "Performance Discipline",
  "Systems Thinking",
  "Signal Fidelity",
  "Intentional Design",
];

export const occultPulse = [
  "AS ABOVE // SO BELOW",
  "TREE OF LIFE PATHWORK",
  "SQUARE + COMPASS FIELD",
  "MERCURY : SULFUR : SALT",
];

export const sigilQuotes = [
  {
    text: "Measure before myth",
    position: "sigil-quote sigil-quote--north",
  },
  {
    text: "Pattern in, outcome out",
    position: "sigil-quote sigil-quote--east",
  },
  {
    text: "Break, refine, ship",
    position: "sigil-quote sigil-quote--south",
  },
  {
    text: "Chaos, then clarity",
    position: "sigil-quote sigil-quote--west",
  },
] as const;

export type PromotionTrack = {
  company: string;
  subtitle?: string;
  highlights?: string[];
  evidenceUrl?: string;
  evidenceLabel?: string;
  stages: {
    period: string;
    role: string;
  }[];
};

export const promotionTracks: PromotionTrack[] = [
  {
    company: "Tempus AI",
    subtitle: "Chicago (Remote)",
    highlights: [
      "Infectious disease team of one with high-leverage glue work.",
      "Frameworks contributor on a horizontal engineering lane.",
      "AI engineering lead, building forward CIAM foundations.",
    ],
    stages: [
      {
        period: "2025 - Present",
        role: "Senior Software Engineer II",
      },
      {
        period: "2022 - 2025",
        role: "Senior Software Engineer",
      },
    ],
  },
  {
    company: "Accenture",
    subtitle: "Liquid Studios, Chicago",
    highlights: [
      "Liquid Studios build mode: co-create fast, ship in tight loops.",
      "Delivered one of the largest Fortune 500 COVID scheduler programs.",
      "Shipped airline vaccine passport systems and global machine vision work.",
    ],
    stages: [
      {
        period: "2020 - 2021",
        role: "Advanced App Engineering Senior Analyst / Specialist",
      },
      {
        period: "2019 - 2020",
        role: "Application Development Analyst",
      },
    ],
  },
  {
    company: "Alluxo",
    stages: [
      {
        period: "2020 - 2021",
        role: "Head of Engineering (Contract)",
      },
      {
        period: "2018 - 2020",
        role: "Full Stack Developer (Contract)",
      },
    ],
  },
  {
    company: "Own It Technologies, Inc.",
    highlights: [
      "Mobile product scaled to ~30k users with zero paid marketing.",
      "Growth was entirely word-of-mouth.",
    ],
    evidenceUrl: "https://www.youtube.com/watch?v=W6vzzWpSz74",
    evidenceLabel: "Case video",
    stages: [
      {
        period: "2017 - 2020",
        role: "Co-Owner & Full Stack Engineer",
      },
    ],
  },
  {
    company: "NGHT LLC",
    stages: [
      {
        period: "2016 - 2018",
        role: "Full Stack Engineer (Contract)",
      },
    ],
  },
  {
    company: "Tandlr",
    stages: [
      {
        period: "2017 - 2019",
        role: "Full Stack Engineer (Contract)",
      },
    ],
  },
  {
    company: "The Authentic Company",
    stages: [
      {
        period: "2018 - 2019",
        role: "Full Stack Engineer (Contract)",
      },
    ],
  },
];

export const bioInterests = [
  "Symbolic systems and philosophy as tools for focus, discipline, and decision-making.",
  "The arts as pattern practice across sound, light, and visual form.",
  "Hands-on chemistry and software architecture with the same experimental mindset.",
  "Meditation and reflective journaling as maintenance for attention and clarity.",
  "Holding imagination and rigor in balance: one for direction, one for delivery.",
];
