"use client";

import { memo } from "react";
import { bioInterests } from "../../lib/home-content";
import { SectionGlyphFields } from "./SectionGlyphFields";

type EsotericBioPanelProps = {
  glyphDensity: "low" | "base" | "high";
};

function EsotericBioPanelImpl({ glyphDensity }: EsotericBioPanelProps) {
  const emphasizeEsotericText = (text: string) => {
    const pattern =
      /(symbolic frameworks|reflective practices|creative disciplines|chemistry|software architecture|meditation|journaling|attention|clarity|imagination|rigor)/gi;
    const parts = text.split(pattern);

    return parts.map((part, index) => {
      if (part.match(pattern)) {
        return (
          <span key={`${text}-${index}`} className="esoteric-bio__hl">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <>
      <SectionGlyphFields variant="esoteric" density={glyphDensity} />
      <div className="esoteric-bio">
        <div className="esoteric-bio__void-static" aria-hidden="true" />
        <p className="esoteric-bio__eyebrow">Off-Hours // SECTOR VII</p>
        <h2 className="esoteric-bio__title" data-glitch="Esoteric Interests">
          Esoteric Interests
        </h2>
        <p className="esoteric-bio__lede">
          {emphasizeEsotericText(
            "Outside of engineering work, I study symbolic frameworks, reflective practices, and creative disciplines.",
          )}
        </p>
        <p className="esoteric-bio__colophon">
          Field notes that keep shaping how I model systems under pressure.
        </p>
        <ul className="esoteric-bio__list" aria-label="Arcane interests">
          {bioInterests.map((interest) => (
            <li key={interest}>{emphasizeEsotericText(interest)}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export const EsotericBioPanel = memo(EsotericBioPanelImpl);
EsotericBioPanel.displayName = "EsotericBioPanel";
