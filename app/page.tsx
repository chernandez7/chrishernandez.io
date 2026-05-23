import { Sigil } from "../components/Sigil";
import { socialLinks } from "../lib/links";

const signals = [
  "Observatory",
  "Atlas",
  "Signal Hunter",
  "Sacred Infrastructure",
];

const experience = [
  {
    period: "2025 - Present",
    company: "Tempus AI",
    role: "Senior Software Engineer II",
  },
  {
    period: "2022 - 2025",
    company: "Tempus AI",
    role: "Senior Software Engineer",
  },
  {
    period: "2020 - 2021",
    company: "Accenture",
    role: "Advanced App Engineering Senior Analyst / Specialist",
  },
  {
    period: "2018 - 2021",
    company: "Alluxo",
    role: "Full Stack Developer -> Head of Engineering",
  },
  {
    period: "2017 - 2020",
    company: "Own It Technologies, Inc.",
    role: "VP of Engineering",
  },
  {
    period: "2016 - 2019",
    company: "NGHT LLC / Tandlr / The Authentic Company",
    role: "Co-Founder and Full Stack Engineer (Contract + Startup)",
  },
];

export default function Home() {
  return (
    <>
      <main className="page">
        <div className="page__grain" aria-hidden="true" />
        <div className="page__scanlines" aria-hidden="true" />
        <div className="page__glitch" aria-hidden="true" />
        <div className="page__sweep" aria-hidden="true" />
        <div className="page__halo page__halo--one" aria-hidden="true" />
        <div className="page__halo page__halo--two" aria-hidden="true" />
        <div className="page__halo page__halo--three" aria-hidden="true" />

        <section className="hero">
          <div className="hero__mast">
            <h1
              className="title glitch-title"
              data-text="Christopher Hernandez"
            >
              Christopher Hernandez
            </h1>
            <a
              className="role-link"
              href="https://www.tempus.com/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Senior Software Engineer II @ Tempus AI
            </a>
            <p className="lede">
              I solve hard problems and build the systems around them.
            </p>
          </div>

          <p className="ordo-statement" aria-hidden="true">
            Ordo ab Chao
          </p>

          <div className="hero__footer">
            <ul className="signal-list" aria-label="Design signals">
              {signals.map((signal) => (
                <li key={signal} className="signal-glitch">
                  {signal}
                </li>
              ))}
            </ul>

            <nav className="link-grid" aria-label="Social links">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  className="link-card"
                  href={link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <span className="link-card__label">{link.label}</span>
                  <span className="link-card__meta">{link.meta}</span>
                </a>
              ))}
            </nav>
          </div>
        </section>

        <aside
          className="sigil-panel"
          aria-label="Sacred geometry illustration"
        >
          <Sigil />
          <section className="experience-panel" aria-label="LinkedIn history">
            <p className="experience-panel__title">
              LinkedIn History / Field Record
            </p>
            <ul className="experience-list">
              {experience.map((item) => (
                <li key={`${item.company}-${item.period}`}>
                  <p className="experience-list__period">{item.period}</p>
                  <p className="experience-list__role">{item.role}</p>
                  <p className="experience-list__company">{item.company}</p>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </main>

      <div className="corner-sanctuary">
        <svg
          className="corner-rays"
          viewBox="0 0 300 300"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="holyLight" cx="100%" cy="100%" r="80%">
              <stop offset="0%" stopColor="#fff8c0" stopOpacity="0.65" />
              <stop offset="30%" stopColor="#dfba7a" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#8b4a1a" stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* expanding concentric rings */}
          <circle
            cx="300"
            cy="300"
            r="90"
            className="corner-ring corner-ring--1"
          />
          <circle
            cx="300"
            cy="300"
            r="155"
            className="corner-ring corner-ring--2"
          />
          <circle
            cx="300"
            cy="300"
            r="225"
            className="corner-ring corner-ring--3"
          />
          {/* divine light aura */}
          <circle cx="300" cy="300" r="290" fill="url(#holyLight)" />
          {/* 12 rays from corner */}
          <line
            x1="300"
            y1="300"
            x2="0"
            y2="275"
            className="corner-ray"
            style={{ animationDelay: "0s" }}
          />
          <line
            x1="300"
            y1="300"
            x2="0"
            y2="225"
            className="corner-ray"
            style={{ animationDelay: "-0.22s" }}
          />
          <line
            x1="300"
            y1="300"
            x2="0"
            y2="170"
            className="corner-ray"
            style={{ animationDelay: "-0.44s" }}
          />
          <line
            x1="300"
            y1="300"
            x2="0"
            y2="115"
            className="corner-ray"
            style={{ animationDelay: "-0.66s" }}
          />
          <line
            x1="300"
            y1="300"
            x2="8"
            y2="62"
            className="corner-ray"
            style={{ animationDelay: "-0.88s" }}
          />
          <line
            x1="300"
            y1="300"
            x2="38"
            y2="18"
            className="corner-ray"
            style={{ animationDelay: "-1.1s" }}
          />
          <line
            x1="300"
            y1="300"
            x2="86"
            y2="0"
            className="corner-ray"
            style={{ animationDelay: "-1.32s" }}
          />
          <line
            x1="300"
            y1="300"
            x2="140"
            y2="0"
            className="corner-ray"
            style={{ animationDelay: "-1.54s" }}
          />
          <line
            x1="300"
            y1="300"
            x2="195"
            y2="0"
            className="corner-ray"
            style={{ animationDelay: "-1.76s" }}
          />
          <line
            x1="300"
            y1="300"
            x2="248"
            y2="0"
            className="corner-ray"
            style={{ animationDelay: "-1.98s" }}
          />
          <line
            x1="300"
            y1="300"
            x2="286"
            y2="0"
            className="corner-ray"
            style={{ animationDelay: "-2.2s" }}
          />
          {/* seraphim — three wing pairs */}
          <path
            d="M300,300 C235,255 155,180 65,85"
            className="corner-wing corner-wing--a"
          />
          <path
            d="M300,300 C270,238 248,158 238,50"
            className="corner-wing corner-wing--b"
          />
          <path
            d="M300,300 C252,270 185,242 100,218"
            className="corner-wing corner-wing--c"
          />
          <path
            d="M300,300 C262,258 238,215 222,142"
            className="corner-wing corner-wing--d"
          />
          <path
            d="M300,300 C268,296 228,292 158,288"
            className="corner-wing corner-wing--e"
          />
          <path
            d="M300,300 C274,284 258,258 252,210"
            className="corner-wing corner-wing--f"
          />
          {/* Fiat Lux */}
          <text x="52" y="125" className="fiat-lux">
            FIAT LVX
          </text>
        </svg>
        <a
          className="corner-mark"
          href="https://milodges.com/"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="MILodges — Square and Compass"
        >
          <svg viewBox="0 0 64 64" role="img" aria-label="Square and compass">
            {/* Square: ⌐-shaped carpenter’s tool — horizontal + vertical, corner at lower-left */}
            <path d="M16,18 V48" />
            <path d="M16,48 H54" />
            <path d="M16,42 H23 V48" />
            {/* Compass: wide-spread legs from top pivot, downward bow brace */}
            <path d="M32,5 L7,60" />
            <path d="M32,5 L57,60" />
            <path d="M14,33 Q32,46 50,33" />
            <circle cx="32" cy="5" r="3" />
          </svg>
        </a>
      </div>
    </>
  );
}
