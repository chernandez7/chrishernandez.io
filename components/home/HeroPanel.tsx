"use client";

import { useEffect, useState } from "react";
import { Sigil } from "../Sigil";
import { socialLinks } from "../../lib/links";
import {
  occultPulse,
  signals,
  sigilQuotes,
  type SectionId,
} from "../../lib/home-content";
import { SectionGlyphFields } from "./SectionGlyphFields";

type HeroPanelProps = {
  perfLite: boolean;
  phaseShiftActive: boolean;
  activeSection: SectionId;
  onScrollToSection: (section: SectionId) => void;
};

type PossessedLinkState = {
  index: number;
  text: string;
};

const canonicalName = "Christopher Hernandez";
const enochianTransliteration = "KHRISTOFER HERNANDEZ OD ZIRDO";
const glitchAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>[]{}|/\\+=-_*#?~";
const linkPossessionBursts = [
  "// TRACE : ASTRAL HANDSHAKE",
  "// KETER->MALKUTH BRIDGE",
  "// ORDO:CONVERGENCE:ACTIVE",
  "// GATE SIGIL RESONANCE",
  "// WATCHER ACKNOWLEDGED",
];

const scrambleName = (name: string, intensity = 0.35) => {
  return name
    .split("")
    .map((char) => {
      if (char === " ") {
        return char;
      }

      if (Math.random() > intensity) {
        return char;
      }

      const index = Math.floor(Math.random() * glitchAlphabet.length);
      return glitchAlphabet[index];
    })
    .join("");
};

function GlitchTitle({
  perfLite,
  phaseShiftActive,
}: {
  perfLite: boolean;
  phaseShiftActive: boolean;
}) {
  const [displayName, setDisplayName] = useState(canonicalName);

  useEffect(() => {
    if (perfLite) {
      setDisplayName(canonicalName);
      return;
    }

    let scrambleFrames = 0;

    const timer = window.setInterval(() => {
      if (phaseShiftActive) {
        setDisplayName(
          scrambleName(enochianTransliteration, 0.24 + Math.random() * 0.34),
        );
        return;
      }

      if (scrambleFrames > 0) {
        scrambleFrames -= 1;
        setDisplayName(scrambleName(canonicalName, 0.28 + Math.random() * 0.5));
        if (scrambleFrames === 0) {
          setDisplayName(canonicalName);
        }
        return;
      }

      if (Math.random() < 0.17) {
        scrambleFrames = 2 + Math.floor(Math.random() * 5);
      }
    }, 170);

    return () => {
      window.clearInterval(timer);
      setDisplayName(canonicalName);
    };
  }, [perfLite, phaseShiftActive]);

  return (
    <h1
      className="title glitch-title"
      data-text={displayName}
      aria-label={canonicalName}
    >
      {displayName}
    </h1>
  );
}

function SocialLinksNav({ perfLite }: { perfLite: boolean }) {
  const [possessedLink, setPossessedLink] = useState<PossessedLinkState | null>(
    null,
  );

  useEffect(() => {
    if (perfLite) {
      setPossessedLink(null);
      return;
    }

    let possessionFrames = 0;
    let nextPossessed: PossessedLinkState | null = null;

    const timer = window.setInterval(() => {
      if (possessionFrames > 0 && nextPossessed) {
        possessionFrames -= 1;
        setPossessedLink(nextPossessed);
        if (possessionFrames === 0) {
          setPossessedLink(null);
          nextPossessed = null;
        }
        return;
      }

      if (Math.random() < 0.08) {
        nextPossessed = {
          index: Math.floor(Math.random() * socialLinks.length),
          text: linkPossessionBursts[
            Math.floor(Math.random() * linkPossessionBursts.length)
          ],
        };
        possessionFrames = 1 + Math.floor(Math.random() * 2);
      }
    }, 120);

    return () => {
      window.clearInterval(timer);
      setPossessedLink(null);
    };
  }, [perfLite]);

  return (
    <nav className="link-grid" aria-label="Social links">
      {socialLinks.map((link, index) => (
        <a
          key={link.label}
          className={`link-card${
            possessedLink?.index === index ? " link-card--possessed" : ""
          }`}
          href={link.href}
          target="_blank"
          rel="noreferrer noopener"
        >
          <span className="link-card__label">
            {possessedLink?.index === index ? possessedLink.text : link.label}
          </span>
          <span className="link-card__meta">
            {possessedLink?.index === index ? "ritual-channel" : link.meta}
          </span>
        </a>
      ))}
    </nav>
  );
}

export function HeroPanel({
  perfLite,
  phaseShiftActive,
  activeSection,
  onScrollToSection,
}: HeroPanelProps) {
  return (
    <main
      className={`page${phaseShiftActive ? " page--phase-shift" : ""}${perfLite ? " page--perf-lite" : ""}`}
    >
      <SectionGlyphFields variant="hero" />
      <div className="page__grain" aria-hidden="true" />
      <div className="page__cadence" aria-hidden="true" />
      <div className="page__scanlines" aria-hidden="true" />
      <div className="page__glitch" aria-hidden="true" />
      <div className="page__sweep" aria-hidden="true" />
      <div className="page__ashlar" aria-hidden="true" />
      <div className="page__halo page__halo--one" aria-hidden="true" />
      <div className="page__halo page__halo--two" aria-hidden="true" />
      <div className="page__halo page__halo--three" aria-hidden="true" />

      <section className="hero">
        <div className="hero__mast">
          <GlitchTitle
            perfLite={perfLite}
            phaseShiftActive={phaseShiftActive}
          />
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

          <ul className="occult-pulse" aria-label="Occult frame signals">
            {occultPulse.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>

          <SocialLinksNav perfLite={perfLite} />
        </div>
      </section>

      <aside className="sigil-panel" aria-label="Sacred geometry illustration">
        <ul className="sigil-quotes" aria-label="Occult inscriptions">
          {sigilQuotes.map((quote) => (
            <li key={quote.text} className={quote.position}>
              {quote.text}
            </li>
          ))}
        </ul>
        <Sigil />
      </aside>

      <button
        type="button"
        className="section-arrow section-arrow--hero-up"
        onClick={() => onScrollToSection("esoteric")}
        aria-label="Scroll to interests and bio"
        aria-hidden={activeSection === "esoteric"}
        tabIndex={activeSection === "esoteric" ? -1 : 0}
      >
        <span>Interests / Bio</span>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 20V6" />
          <path d="M6 12l6-6 6 6" />
        </svg>
      </button>

      <button
        type="button"
        className="section-arrow section-arrow--down"
        onClick={() => onScrollToSection("history")}
        aria-label="Scroll to work history"
        aria-hidden={activeSection === "history"}
        tabIndex={activeSection === "history" ? -1 : 0}
      >
        <span>Work History</span>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 4v14" />
          <path d="M6 12l6 6 6-6" />
        </svg>
      </button>
    </main>
  );
}
