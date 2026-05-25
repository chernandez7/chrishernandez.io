# Brand System Guide

This document exports the current site design language into a reusable brand system for marketing, social media, and print collateral.

## 1. Brand Core

### Brand Thesis

Ancient signal, modern systems. The brand should feel ritualistic, precise, and intense without becoming chaotic or unreadable.

### Positioning

- Systems engineer identity first
- Esoteric visual language as atmosphere, not gimmick
- Controlled chaos: high energy with high discipline

### Brand Motto

- Primary: ORDO AB CHAO
- Secondary (rare): FIAT LVX

## 2. Visual Pillars

1. Dark ritual palette anchored in near-black backgrounds
2. Gold and ember highlights as primary luminous accent
3. Serif plus monospace contrast to signal old world + technical rigor
4. Symbolic geometry as hero motif (sigil, philosopher stone, square and compass)
5. Glitch/noise as subtle interference, never visual overload

## 3. Color System

Use this as the canonical palette for web, social, and print adaptation.

### Core Tokens (Hex)

| Token       | Hex     | Role                    |
| ----------- | ------- | ----------------------- |
| bg          | #010007 | Primary background      |
| bg-soft     | #060310 | Secondary background    |
| text        | #EDE8DC | Primary text            |
| muted       | #A8A4A0 | Secondary text          |
| soft        | #7A7A82 | Tertiary labels         |
| gold        | #B98C4F | Primary accent          |
| gold-bright | #DFBA7A | Accent highlight        |
| gold-dim    | #6E4E22 | Sub-accent / separators |
| ember       | #8C3E18 | Warm secondary accent   |
| violet      | #2E1050 | Atmospheric lowlights   |

### Atmospheric Utility Colors

| Token         | Value                     | Use                     |
| ------------- | ------------------------- | ----------------------- |
| glow          | rgba(185, 140, 79, 0.42)  | Aura and edge glow      |
| chrome-border | rgba(223, 186, 122, 0.26) | UI lines and containers |
| line          | rgba(180, 160, 120, 0.12) | Hairline dividers       |

### Color Rules

- No blues.
- No neon accents.
- Gold must be the dominant accent in all deliverables.
- Crimson and violet are atmospheric supports, not headline colors.

## 4. Typography System

### Font Pairing

- Display Serif: Cinzel (site implementation)
- Technical Mono: IBM Plex Mono

### Fallback Stacks

- Serif fallback: Georgia, Palatino, Times New Roman, serif
- Mono fallback: SFMono-Regular, Consolas, Liberation Mono, monospace

### Type Roles

| Role            | Font          | Weight  | Usage                       |
| --------------- | ------------- | ------- | --------------------------- |
| Hero Title      | Cinzel        | 600-700 | Name, campaign heading      |
| Section Heading | Cinzel        | 500-600 | Section titles, card fronts |
| Body            | Cinzel        | 400-500 | Paragraphs, intro copy      |
| Label / Meta    | IBM Plex Mono | 400-500 | Captions, tags, metadata    |
| CTA / Data Line | IBM Plex Mono | 500-600 | Buttons, signal rows        |

### Tracking and Casing

- Mono labels: uppercase with generous letter spacing
- Serif body: normal case, medium contrast sizes
- Avoid very tight tracking outside hero titles

## 5. Symbol System

### Primary Mark Family

- Hero Sigil (animated digital centerpiece)
- Philosopher Stone overlay geometry
- Square and Compass corner mark

### Mark Usage Rules

- Keep marks unboxed when possible.
- Do not add drop-shadow heavy effects to marks.
- Preserve canonical upright geometry for philosopher stone form.
- Use single-color or gold-gradient mark treatments for print.

### Clear Space Guidance

- Minimum clear space around marks: one mark stroke-width x 6 on all sides.
- For business cards: clear space should be at least 8% of the short edge.

### Minimum Sizes

- Digital icon mark: 24 px minimum
- Social corner sigil: 72 px minimum
- Print mark: 0.35 in minimum width

## 6. Motion and Effects (Digital Only)

### Motion Character

- Slow ceremonial rotations
- Irregular glitch pulses
- Layered breathing and shimmer

### Motion Safety

- Always support reduced motion variants.
- In marketing videos, keep rapid glitch flashes below accessibility risk thresholds.
- For static social graphics, freeze motion states at high-legibility moments.

## 7. Layout and Composition

### Structural Rhythm

- Asymmetric compositions are preferred.
- Left-aligned narrative with right-side symbolic mass works best.
- Use strong negative space around headline text.

### Spacing Scale

- Use an 8 px base scale for UI and social templates.
- For print, convert to proportional scale using 0.125 in increments.

### Border and Surface Style

- Hairline dividers over solid blocks.
- Transparent dark surfaces over full opaque cards.
- Gold lines should be subtle and precise.

## 8. Brand Voice for Copy

### Voice Attributes

- Precise
- Mythic but grounded
- Systems-minded
- Confident, not loud

### Copy Pattern

- Lead with engineering truth.
- Follow with symbolic framing.
- End with practical signal (result, metric, or next action).

### Example Voice

- "I build resilient systems under uncertainty."
- "Order from chaos, delivered as architecture and execution."

## 9. Channel Adaptation Specs

### A) Social Media

#### LinkedIn / X landscape

- Size: 1200 x 630
- Composition: name + role left, sigil motif right
- Accent ratio: 75% dark neutrals, 20% gold family, 5% ember/violet atmosphere

#### Instagram square

- Size: 1080 x 1080
- Safe area: keep critical text inside center 900 x 900
- Recommended pattern: headline top-left, glyph cluster bottom-right

#### Instagram portrait

- Size: 1080 x 1350
- Safe area: center 960 x 1200 for key copy

#### Story / Reel cover

- Size: 1080 x 1920
- Keep top 250 px and bottom 320 px light on text

### B) Marketing One-Pagers / Decks

- Heading: Cinzel, high contrast sizing
- Supporting structure: mono signal rows and hairline dividers
- Keep each slide to one dominant statement plus one supporting system diagram

### C) Business Cards (US Standard)

#### Dimensions

- Final size: 3.5 in x 2.0 in
- Bleed: 0.125 in each side
- Export canvas: 3.75 in x 2.25 in
- Safe zone: 0.125 in inset from final trim

#### Front Layout

- Name in Cinzel
- Role in IBM Plex Mono
- Subtle sigil or square/compass mark
- Dark base with gold text

#### Back Layout

- Motto line or short systems statement
- Contact set in mono
- Optional simplified mark at one corner

#### Print Finishing Suggestions

- Soft-touch matte stock
- Optional gold foil for name or symbol linework
- Avoid full heavy gloss

## 10. Accessibility and Legibility

- Maintain strong text contrast on dark backgrounds.
- Gold text should not be used at tiny sizes on textured backgrounds.
- For social posts, keep headline text to 1-2 lines.
- Prefer clear hierarchy over decorative density.

## 11. Do / Do Not

### Do

- Use dark ritual atmosphere with controlled contrast.
- Keep serif and mono pairing consistent.
- Use gold as primary signal color.
- Preserve symbolic geometry discipline.

### Do Not

- Introduce blues, cyan, or neon synthwave tones.
- Replace brand type stack with modern sans defaults.
- Flatten everything into generic corporate templates.
- Over-glitch content to the point of reduced readability.

## 12. Reusable Token Export

### CSS Tokens

```css
:root {
  --bg: #010007;
  --bg-soft: #060310;
  --text: #ede8dc;
  --muted: #a8a4a0;
  --soft: #7a7a82;
  --gold: #b98c4f;
  --gold-bright: #dfba7a;
  --gold-dim: #6e4e22;
  --ember: #8c3e18;
  --violet: #2e1050;
  --line: rgba(180, 160, 120, 0.12);
  --glow: rgba(185, 140, 79, 0.42);
}
```

### JSON Tokens

```json
{
  "color": {
    "bg": "#010007",
    "bgSoft": "#060310",
    "text": "#EDE8DC",
    "muted": "#A8A4A0",
    "soft": "#7A7A82",
    "gold": "#B98C4F",
    "goldBright": "#DFBA7A",
    "goldDim": "#6E4E22",
    "ember": "#8C3E18",
    "violet": "#2E1050"
  },
  "type": {
    "display": "Cinzel",
    "mono": "IBM Plex Mono"
  }
}
```

## 13. Source of Truth in This Repo

- Color and effects: styles/globals.css
- Typography and metadata: app/layout.tsx
- Signature motifs and tone: VIBE.md
- Symbol geometry: components/Sigil.tsx
- Social preview baseline: public/og-image.svg

## 14. Brand QA Checklist

Before publishing any asset:

1. Gold is the primary accent and remains legible.
2. Serif plus mono pairing is intact.
3. No blue/cyan/neon contamination.
4. Symbol geometry is upright and undistorted.
5. Copy is concise, high-signal, and systems-forward.
6. Export resolution matches target channel.
