"use client";
import { PhilosopherStoneGlyph, Sigil } from "../Sigil";
import { socialLinks } from "../../lib/links";
import {
  occultPulse,
  sigilEquations,
  signals,
  sigilQuotes,
  type SectionId,
} from "../../lib/home-content";
import { SectionGlyphFields } from "./SectionGlyphFields";

type HeroPanelProps = {
  perfLite: boolean;
  activeSection: SectionId;
  glyphDensity: "low" | "base" | "high";
  glitchLevel: "low" | "base" | "high";
  sigilDensity: "ultra-low" | "low" | "base" | "high" | "ultra";
};

const canonicalName = "Christopher Hernandez";
function GlitchTitle() {
  const displayName = canonicalName;

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

function SocialLinksNav() {
  return (
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
  );
}

export function HeroPanel({
  perfLite,
  activeSection,
  glyphDensity,
  glitchLevel,
  sigilDensity,
}: HeroPanelProps) {
  const heroActive = activeSection === "hero";
  const glitchClass =
    glitchLevel === "low"
      ? " page--glitch-low"
      : glitchLevel === "base"
        ? " page--glitch-base"
        : "";

  return (
    <main className={`page${perfLite ? " page--perf-lite" : ""}${glitchClass}`}>
      {heroActive && (
        <SectionGlyphFields variant="hero" density={glyphDensity} />
      )}

      <section className="hero">
        <div className="hero__mast">
          <p className="hero__eyebrow">Skate.dev // Signal Console</p>
          <GlitchTitle />
          <a
            className="role-link"
            href="https://www.tempus.com/"
            target="_blank"
            rel="noreferrer noopener"
          >
            <span className="role-link__text">
              Senior Software Engineer II @ Tempus AI
            </span>
            <span className="role-link__caret" aria-hidden="true">
              |
            </span>
          </a>
          <p className="lede">
            I <span className="hero__hl">solve</span> hard problems and
            <span className="hero__hl"> build</span> the systems around them.
          </p>
          <span className="hero__scan-notch" aria-hidden="true" />
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

          <SocialLinksNav />
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
        <ul className="sigil-equations" aria-label="Foundational equations">
          {sigilEquations.map((equation, index) => (
            <li
              key={equation}
              className={`sigil-equation sigil-equation--${index + 1}`}
            >
              {equation}
            </li>
          ))}
        </ul>
        {heroActive && (
          <PhilosopherStoneGlyph
            className="sigil-panel__stone-mark"
            idPrefix="hero-sigil-stone"
          />
        )}
        {heroActive && <Sigil density={sigilDensity} />}
      </aside>
    </main>
  );
}
