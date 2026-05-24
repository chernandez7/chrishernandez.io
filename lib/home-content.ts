export type SectionId = "hero" | "history" | "esoteric";

export const sectionOrder: SectionId[] = ["esoteric", "hero", "history"];

export const signals = [
  "Observatory",
  "Atlas",
  "Signal Hunter",
  "Sacred Infrastructure",
];

export const occultPulse = [
  "AS ABOVE // SO BELOW",
  "TREE OF LIFE PATHWORK",
  "SQUARE + COMPASS FIELD",
  "MERCURY : SULFUR : SALT",
];

export const sigilQuotes = [
  {
    text: "As above, so below.",
    position: "sigil-quote sigil-quote--north",
  },
  {
    text: "Visita interiora terrae.",
    position: "sigil-quote sigil-quote--east",
  },
  {
    text: "Solve et coagula.",
    position: "sigil-quote sigil-quote--south",
  },
  {
    text: "From ash, measure and build.",
    position: "sigil-quote sigil-quote--west",
  },
] as const;

export type PromotionTrack = {
  company: string;
  stages: {
    period: string;
    role: string;
  }[];
};

export const promotionTracks: PromotionTrack[] = [
  {
    company: "Tempus AI",
    stages: [
      {
        period: "2022 - 2025",
        role: "Senior Software Engineer",
      },
      {
        period: "2025 - Present",
        role: "Senior Software Engineer II",
      },
    ],
  },
  {
    company: "Accenture",
    stages: [
      {
        period: "2019 - 2020",
        role: "Application Development Analyst",
      },
      {
        period: "2020 - 2021",
        role: "Advanced App Engineering Senior Analyst / Specialist",
      },
    ],
  },
  {
    company: "Alluxo",
    stages: [
      {
        period: "2018 - 2020",
        role: "Full Stack Developer",
      },
      {
        period: "2020 - 2021",
        role: "Head of Engineering",
      },
    ],
  },
  {
    company: "Own It Technologies, Inc.",
    stages: [
      {
        period: "2017 - 2020",
        role: "VP of Engineering",
      },
    ],
  },
  {
    company: "NGHT LLC / Tandlr / The Authentic Company",
    stages: [
      {
        period: "2016 - 2019",
        role: "Co-Founder and Full Stack Engineer (Contract + Startup)",
      },
    ],
  },
];

export const bioInterests = [
  "Thirty solar turns; I chart inner constellations and return carrying workable light.",
  "Six strings, four strings, and shutter rites, with sacred geometry as the hidden grammar beneath form.",
  "Game realms, old pages, and twin laboratories: glass and reagent by one light, racks and packets by another, both practicing transmutation.",
  "Inner work, meditation, astral searching, manifestation, and operative magic: not all temples are built with hands.",
  "Lodge currents, hermetic study, and philosophy as true north; body tempered beside mind, ascending toward the unopened door.",
];
