"use client";

import { useEffect, useRef } from "react";
import { Sigil } from "../components/Sigil";
import { socialLinks } from "../lib/links";

const signals = [
  "Observatory",
  "Atlas",
  "Signal Hunter",
  "Sacred Infrastructure",
];

const sigilQuotes = [
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
  const sanctuaryRef = useRef<HTMLDivElement>(null);
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Christopher Hernandez",
    url: "https://skate.dev",
    sameAs: socialLinks.map((link) => link.href),
    jobTitle: "Senior Software Engineer II",
    worksFor: {
      "@type": "Organization",
      name: "Tempus AI",
      url: "https://www.tempus.com/",
    },
    description:
      "Senior Software Engineer II focused on hard systems problems, platform architecture, and resilient product delivery.",
  };

  useEffect(() => {
    const root = document.documentElement;
    let frameId = 0;
    let sanctuaryActive = false;

    const clampUnit = (value: number) => Math.max(-1, Math.min(1, value));

    const writeMouseState = (clientX: number, clientY: number) => {
      const viewportX = clampUnit((clientX / window.innerWidth) * 2 - 1);
      const viewportY = clampUnit((clientY / window.innerHeight) * 2 - 1);

      root.style.setProperty("--mouse-x", viewportX.toFixed(4));
      root.style.setProperty("--mouse-y", viewportY.toFixed(4));

      const rect = sanctuaryRef.current?.getBoundingClientRect();
      if (!rect) {
        root.style.setProperty("--sanctuary-x", "0");
        root.style.setProperty("--sanctuary-y", "0");
        return;
      }

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const localX = clampUnit((clientX - centerX) / (rect.width / 2));
      const localY = clampUnit((clientY - centerY) / (rect.height / 2));

      root.style.setProperty("--sanctuary-x", localX.toFixed(4));
      root.style.setProperty("--sanctuary-y", localY.toFixed(4));
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!sanctuaryActive) {
        return;
      }

      if (frameId) {
        cancelAnimationFrame(frameId);
      }

      const { clientX, clientY } = event;
      frameId = requestAnimationFrame(() => {
        writeMouseState(clientX, clientY);
      });
    };

    const resetMouseState = () => {
      root.style.setProperty("--mouse-x", "0");
      root.style.setProperty("--mouse-y", "0");
      root.style.setProperty("--sanctuary-x", "0");
      root.style.setProperty("--sanctuary-y", "0");
    };

    const activateSanctuary = () => {
      sanctuaryActive = true;
    };

    const deactivateSanctuary = () => {
      sanctuaryActive = false;
      resetMouseState();
    };

    const sanctuaryElement = sanctuaryRef.current;

    sanctuaryElement?.addEventListener("pointerenter", activateSanctuary);
    sanctuaryElement?.addEventListener("pointerleave", deactivateSanctuary);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", resetMouseState);

    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
      sanctuaryElement?.removeEventListener("pointerenter", activateSanctuary);
      sanctuaryElement?.removeEventListener("pointerleave", deactivateSanctuary);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", resetMouseState);
      resetMouseState();
    };
  }, []);

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
          <ul className="sigil-quotes" aria-label="Occult inscriptions">
            {sigilQuotes.map((quote) => (
              <li key={quote.text} className={quote.position}>
                {quote.text}
              </li>
            ))}
          </ul>
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

      <div className="corner-sanctuary" ref={sanctuaryRef}>
        <a
          className="corner-hit"
          href="https://milodges.com/"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="MILodges — Open from sanctuary"
        />
        <svg
          className="corner-rays"
          viewBox="0 0 300 300"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="holyLight" cx="100%" cy="100%" r="80%">
              <stop offset="0%" stopColor="#fff8c0" stopOpacity="0.98" />
              <stop offset="22%" stopColor="#f5daa0" stopOpacity="0.55" />
              <stop offset="42%" stopColor="#dfba7a" stopOpacity="0.24" />
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
          <img src="/sc.svg" alt="Square and compass" />
        </a>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
    </>
  );
}
