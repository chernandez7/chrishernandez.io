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
  {
    text: "Ordo ab chao // compile, test, ship",
    position: "sigil-quote sigil-quote--northeast",
  },
  {
    text: "Solve in layers, reveal in logs",
    position: "sigil-quote sigil-quote--southeast",
  },
  {
    text: "As above, so below the stack",
    position: "sigil-quote sigil-quote--southwest",
  },
  {
    text: "Square, compass, and clean abstractions",
    position: "sigil-quote sigil-quote--northwest",
  },
] as const;

export const sigilEquations = [
  "e^(i*pi)+1=0",
  "F(x)=x^2+c",
  "dN/dt=rN(1-N/K)",
  "S=k log W",
  "Gmu nu+Lambda gmu nu=(8piG/c^4)Tmu nu",
  "x_(n+1)=r x_n(1-x_n)",
  "3:5:7",
  "111 // 333 // 666 // 33",
] as const;

export type PromotionTrack = {
  company: string;
  subtitle?: string;
  highlights?: string[];
  skills?: string[];
  evidenceUrl?: string;
  evidenceLabel?: string;
  stages: {
    period: string;
    role: string;
  }[];
};

export type EducationEntry = {
  school: string;
  degree: string;
  period: string;
  activities?: string;
  skills?: string[];
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
    skills: [
      "Frontend Systems",
      "Backend Architecture",
      "Cloud Platforms",
      "Scalable Data",
      "Technical Leadership",
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
    skills: [
      "Product Delivery",
      "Cross-Platform Apps",
      "Cloud and Serverless",
      "Enterprise Programs",
      "Emerging Tech",
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
    skills: [
      "Product Design",
      "Technical Leadership",
      "Systems Design",
      "Team Development",
    ],
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
    skills: [
      "Startup Product Engineering",
      "Mobile and API Systems",
      "Scalable Data",
      "Growth Engineering",
      "Mentorship",
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
    skills: [
      "POS Integrations",
      "Location Discovery",
      "Nightlife Ordering",
      "Mobile Product Delivery",
    ],
    stages: [
      {
        period: "2016 - 2018",
        role: "Full Stack Engineer (Contract)",
      },
    ],
  },
  {
    company: "Tandlr",
    skills: [
      "Education Platform",
      "Tutor Marketplace",
      "Payments and Booking",
      "Student Experience",
    ],
    stages: [
      {
        period: "2017 - 2019",
        role: "Full Stack Engineer (Contract)",
      },
    ],
  },
  {
    company: "The Authentic Company",
    skills: [
      "Rapid Prototyping",
      "Mobile Development",
      "Music Product Innovation",
      "Experience Redesign",
    ],
    stages: [
      {
        period: "2018 - 2019",
        role: "Full Stack Engineer (Contract)",
      },
    ],
  },
];

export const educationEntries: EducationEntry[] = [
  {
    school: "Loyola University Chicago",
    degree: "Bachelor's Degree, Computer Science",
    period: "2013 - 2017",
    activities:
      "Association for Computing Machinery (ACM) student chapter.",
    skills: [
      "Computer Science Fundamentals",
      "Systems Programming",
      "High Performance Computing",
      "Graphics and Simulation",
      "Scientific Tooling",
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
