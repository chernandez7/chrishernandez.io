"use client";

import { FlowerOfLifeGlyph, TreeOfLifeGlyph } from "../Sigil";

type SectionGlyphFieldsProps = {
  variant: "hero" | "history" | "esoteric";
};

const glyphKeys = ["a", "b", "c", "d", "e"] as const;

export function SectionGlyphFields({ variant }: SectionGlyphFieldsProps) {
  return (
    <>
      <div
        className={`section-treefield section-treefield--${variant}`}
        aria-hidden="true"
      >
        {glyphKeys.map((key) => (
          <TreeOfLifeGlyph
            key={`${variant}-tree-${key}`}
            className={`section-treefield__glyph section-treefield__glyph--${key}`}
            idPrefix={`${variant}-tree-${key}`}
          />
        ))}
      </div>
      <div
        className={`section-flowerfield section-flowerfield--${variant}`}
        aria-hidden="true"
      >
        {glyphKeys.map((key) => (
          <FlowerOfLifeGlyph
            key={`${variant}-flower-${key}`}
            className={`section-flowerfield__glyph section-flowerfield__glyph--${key}`}
            idPrefix={`${variant}-flower-${key}`}
          />
        ))}
      </div>
    </>
  );
}
