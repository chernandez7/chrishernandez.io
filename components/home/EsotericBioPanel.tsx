"use client";

import { memo } from "react";
import { bioInterests, type SectionId } from "../../lib/home-content";
import { SectionGlyphFields } from "./SectionGlyphFields";

type EsotericBioPanelProps = {
  onScrollToSection: (section: SectionId) => void;
};

function EsotericBioPanelImpl({ onScrollToSection }: EsotericBioPanelProps) {
  return (
    <>
      <SectionGlyphFields variant="esoteric" />
      <div className="esoteric-bio">
        <p className="esoteric-bio__eyebrow">Inner Chamber</p>
        <h2 className="esoteric-bio__title">Arcane Dossier</h2>
        <p className="esoteric-bio__lede">
          Engineering by daylight; by candlelit hours, symbols, rites, and old
          currents of thought.
        </p>
        <ul className="esoteric-bio__list" aria-label="Arcane interests">
          {bioInterests.map((interest) => (
            <li key={interest}>{interest}</li>
          ))}
        </ul>

        <div className="section-arrow-row">
          <button
            type="button"
            className="section-arrow section-arrow--next"
            onClick={() => onScrollToSection("hero")}
            aria-label="Scroll down to main section"
          >
            <span>Return</span>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 4v14" />
              <path d="M6 12l6 6 6-6" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}

export const EsotericBioPanel = memo(EsotericBioPanelImpl);
EsotericBioPanel.displayName = "EsotericBioPanel";
