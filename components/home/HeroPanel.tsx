"use client";
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
  activeSection: SectionId;
  onScrollToSection: (section: SectionId) => void;
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
          <span className="link-card__meta">
            {link.meta}
          </span>
        </a>
      ))}
    </nav>
  );
}

export function HeroPanel({
  perfLite,
  activeSection,
  onScrollToSection,
}: HeroPanelProps) {
  const heroActive = activeSection === "hero";

  return (
    <main className={`page${perfLite ? " page--perf-lite" : ""}`}>
      {heroActive && <SectionGlyphFields variant="hero" />}

      <section className="hero">
        <div className="hero__mast">
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
            I solve hard problems and build the systems around them.
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
        {heroActive && <Sigil />}
      </aside>

      <button
        type="button"
        className="section-arrow section-arrow--hero-up"
        onClick={() => onScrollToSection("esoteric")}
        aria-label="Scroll to arcane dossier"
        aria-hidden={activeSection === "esoteric"}
        tabIndex={activeSection === "esoteric" ? -1 : 0}
      >
        <span>Arcane Dossier</span>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 20V6" />
          <path d="M6 12l6-6 6 6" />
        </svg>
      </button>

      <button
        type="button"
        className="section-arrow section-arrow--down"
        onClick={() => onScrollToSection("history")}
        aria-label="Scroll to craft chronicle"
        aria-hidden={activeSection === "history"}
        tabIndex={activeSection === "history" ? -1 : 0}
      >
        <span>Craft Chronicle</span>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 4v14" />
          <path d="M6 12l6 6 6-6" />
        </svg>
      </button>
    </main>
  );
}
