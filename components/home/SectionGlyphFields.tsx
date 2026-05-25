"use client";

import { memo } from "react";
import {
  FlowerOfLifeGlyph,
  PhilosopherStoneGlyph,
  TreeOfLifeGlyph,
} from "../Sigil";

type SectionGlyphFieldsProps = {
  variant: "hero" | "history" | "esoteric";
  density: "low" | "base" | "high";
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
  hero: ["a", "b", "c", "d"],
  history: ["a", "b", "c", "d"],
  esoteric: ["a", "b", "c", "d"],
} as const;

const glyphCountByDensity = {
  low: {
    hero: { tree: 1, flower: 1, stone: 2 },
    history: { tree: 2, flower: 2, stone: 2 },
    esoteric: { tree: 2, flower: 2, stone: 2 },
  },
  base: {
    hero: { tree: 2, flower: 2, stone: 2 },
    history: { tree: 3, flower: 3, stone: 3 },
    esoteric: { tree: 3, flower: 3, stone: 3 },
  },
  high: {
    hero: { tree: 2, flower: 2, stone: 4 },
    history: { tree: 4, flower: 4, stone: 4 },
    esoteric: { tree: 4, flower: 4, stone: 4 },
  },
} as const;

function SectionGlyphFieldsImpl({ variant, density }: SectionGlyphFieldsProps) {
  const counts = glyphCountByDensity[density][variant];
  const treeGlyphKeys = treeGlyphKeysByVariant[variant].slice(0, counts.tree);
  const flowerGlyphKeys = flowerGlyphKeysByVariant[variant].slice(
    0,
    counts.flower,
  );
  const stoneGlyphKeys = stoneGlyphKeysByVariant[variant].slice(
    0,
    counts.stone,
  );

  return (
    <>
      <div
        className={`section-treefield section-treefield--${variant}`}
        aria-hidden="true"
      >
        {treeGlyphKeys.map((key) => (
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
        {flowerGlyphKeys.map((key) => (
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
        {stoneGlyphKeys.map((key) => (
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
