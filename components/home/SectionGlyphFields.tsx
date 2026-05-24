"use client";

import { memo } from "react";
import {
  FlowerOfLifeGlyph,
  PhilosopherStoneGlyph,
  TreeOfLifeGlyph,
} from "../Sigil";

type SectionGlyphFieldsProps = {
  variant: "hero" | "history" | "esoteric";
};

const treeGlyphKeysByVariant = {
  hero: ["a", "b"],
  history: ["a", "b", "c", "d"],
  esoteric: ["a", "b", "c", "d"],
} as const;

const flowerGlyphKeysByVariant = {
  hero: ["c", "d"],
  history: ["a", "b", "c", "d"],
  esoteric: ["a", "b", "c", "d"],
} as const;

const stoneGlyphKeysByVariant = {
  hero: ["a", "b"],
  history: ["a", "b", "c", "d"],
  esoteric: ["a", "b", "c", "d"],
} as const;

function SectionGlyphFieldsImpl({ variant }: SectionGlyphFieldsProps) {
  return (
    <>
      <div
        className={`section-treefield section-treefield--${variant}`}
        aria-hidden="true"
      >
        {treeGlyphKeysByVariant[variant].map((key) => (
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
        {flowerGlyphKeysByVariant[variant].map((key) => (
          <FlowerOfLifeGlyph
            key={`${variant}-flower-${key}`}
            className={`section-flowerfield__glyph section-flowerfield__glyph--${key}`}
            idPrefix={`${variant}-flower-${key}`}
          />
        ))}
      </div>
      <div
        className={`section-stonefield section-stonefield--${variant}`}
        aria-hidden="true"
      >
        {stoneGlyphKeysByVariant[variant].map((key) => (
          <PhilosopherStoneGlyph
            key={`${variant}-stone-${key}`}
            className={`section-stonefield__glyph section-stonefield__glyph--${key}`}
            idPrefix={`${variant}-stone-${key}`}
          />
        ))}
      </div>
    </>
  );
}

export const SectionGlyphFields = memo(SectionGlyphFieldsImpl);
SectionGlyphFields.displayName = "SectionGlyphFields";
