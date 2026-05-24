# VIBE.md — Design & Aesthetic Guide

This document captures the visual and tonal identity of `chrishernandez.io`.
Future agents and contributors should read this before making any design decisions.

---

## Who This Site Is For

Christopher Hernandez — Senior Software Engineer II at Tempus AI.
He builds systems, solves hard problems, and has a deep interest in:

- Occult / esoteric symbolism (Aztec, Masonic, sacred geometry)
- Software architecture and engineering infrastructure
- The idea of _order from chaos_ — **Ordo ab Chao**

He is **not** a UI/design person. The aesthetic should feel like it was summoned, not designed.

---

## The Core Feeling

> "Like tripping on a psychedelic — almost breaking, at the brink of insanity,
> but still controlled and refined and clear."

The site should feel like:

- A signal coming through static
- A ritual space that is also a terminal
- Sacred geometry bleeding into software
- Something ancient rendered in modern tech

It should **not** feel like:

- A portfolio
- A dark-mode SaaS app
- Cyberpunk / neon
- Minimalist "clean" design

---

## Color Palette

### Primary

| Name            | Value     | Use                |
| --------------- | --------- | ------------------ |
| Background      | `#060309` | Page base          |
| Background soft | `#0e0814` | Secondary surfaces |
| Text            | `#f2eee4` | Body copy          |
| Muted           | `#b3b0a9` | Secondary text     |
| Soft            | `#8b8b91` | Tertiary / labels  |

### Accent

| Name        | Value     | Use                      |
| ----------- | --------- | ------------------------ |
| Gold        | `#b98c4f` | Primary accent, borders  |
| Gold bright | `#dfba7a` | Highlights, hover states |
| Gold dim    | `#7d5b2e` | Subtle gold, `›` prefix  |
| Ember       | `#a3562a` | Warm secondary accent    |

### Occult / Atmospheric

| Name               | Value                  | Use              |
| ------------------ | ---------------------- | ---------------- |
| Ritual violet      | `rgba(55,10,75,...)`   | Background haze  |
| Blood crimson      | `rgba(100,14,14,...)`  | Background haze  |
| Deep purple glitch | `rgba(120,0,210,...)`  | Aberration color |
| Blood red glitch   | `rgba(255,56,126,...)` | Aberration color |

### Rules

- **No blues.** Blues were removed intentionally — they read as tech/corporate.
- Cyan is replaced with ritual violet `rgba(120,0,210)` in all glitch effects.
- Keep the palette narrow. Add nothing without removing something.

---

## Background

Three radial gradients over a near-black linear base:

1. **Blood crimson** at top-left (`8% 5%`) — like an ember at the edge of sight
2. **Warm ember** at top-right (`88% 12%`) — the only warm-light source
3. **Ritual purple** at bottom (`62% 92%`) — deep, heavy, occult

No sharp edges. Everything bleeds into black.

---

## Typography

| Role            | Font               | Weight  | Style                              |
| --------------- | ------------------ | ------- | ---------------------------------- |
| Display / Names | Cormorant Garamond | 600–700 | Serif, large, tight letter-spacing |
| Body            | Cormorant Garamond | 400     | Serif, readable                    |
| Labels / Data   | IBM Plex Mono      | 400–500 | All-caps, wide letter-spacing      |
| UI Elements     | IBM Plex Mono      | 400     | Code-like, precise                 |

**Title** (`Christopher Hernandez`): `clamp(2.4rem, 6.6vw, 5.4rem)`, `line-height: 0.9`, `-0.05em` letter-spacing.

Never use sans-serif. The combination of old-style serif + monospace is intentional — it creates the tension between ancient and technical.

---

## Layout

Hero section is two columns, but the page itself is now a stacked multi-section experience:

- **Hero section** (2-column):
- Left: name, role, motto, signals, links
- Right: sigil panel with sacred overlays and equations
- **History section**: work timeline + education
- **Esoteric section**: off-hours interests and symbolic notes

The sigil is **unboxed** — no card, no border, no background. It exists as raw light.

On mobile, vertical scrolling across sections is intentional.

---

## The Sigil

The sigil is the centerpiece. It should feel:

- **Overwhelming** — too much to fully parse at once
- **Alive** — never still, never the same twice
- **Sacred** — flower of life, Star of David, pentagram, orbiting rings, rays
- **Layered** — canonical sigil plus philosopher-stone overlay and equation ring

Animation principles:

- Every layer moves at a different speed
- Metashapes (hexagon, diamond, pentagon) run on **prime-number durations** (17s, 23s, 31s, 43s) — they never sync, always cross-fading
- Triangles counter-rotate (140s / 100s) — the Star of David turns
- Rays shimmer individually with staggered delays
- Flower-of-life circles pulse individually
- The whole sigil breathes (`sigilBreathe`, 9s) — expanding glow, subtle scale
- It should feel **alive, breathing, transforming** — like a living mandala

Do not reduce the sigil's animation. Do not box it in.

Philosopher stone constraints:

- Keep the canonical upright construction intact
- Motion is allowed, but geometry should remain coherent at all times
- Avoid visual bleed where inner square escapes triangle bounds

---

## Glitch & Noise System

Layered over the entire page:

1. **`page__grain`** — subtle static/scanlines, `soft-light` blend
2. **`page__scanlines`** — CRT horizontal lines + dark wine chromatic tint
3. **`page__glitch`** — full-page RGB channel split that fires every ~9s
4. **`page__sweep`** — slow violet/crimson bar that sweeps top-to-bottom every ~11s
5. **`worldShift`** on `.page` — imperceptible skewX/skewY warp every ~19s

On the title:

- Two glitch slice pseudo-elements (`::before` red, `::after` violet) fire on different timers
- `titleShift` keyframe periodically splits the text-shadow into RGB channels

On individual elements:

- `.eyebrow` / `glitch-flicker` — text opacity drop with color shadow burst (5s cycle)
- Signal chips — staggered `chipJitter` (horizontal micro-jitter)
- Link rows — `cardFlicker` (border color flash, red then violet, then recovers)
- Experience rows — `rowJitter` (staggered translate)

Runtime interruption layer:

- The page may occasionally enter a short-lived "fault/interruption" state
- During this state, a centered system-fault panel appears and text visibly corrupts then recovers
- Outside fault mode, lighter passive text substitutions can still happen at low frequency

The glitch effects should feel **sporadic and authentic** — not regular enough to feel like a loop, irregular enough to feel like signal interference.

Important: prefer applying number motifs in text content and symbolic output, not expensive global timing changes.

---

## Mottos & Phrases

- **"Ordo ab Chao"** — Order from Chaos. The primary motto. Appears:
  - Small, as `.eyebrow` at top of hero (gold, monospace, all-caps)
  - Large, as `.ordo-statement` centered between the name and links (pulsing, 15% opacity)
- **"FIAT LVX"** — Let there be light. Appears only in the seraphim hover effect.

Do not add new mottos. These two are sufficient.

---

## Navigation / Links

No nav. Five links rendered as terminal-style rows:

1. Tempus AI
2. GitHub
3. LinkedIn
4. YouTube
5. _(MILodges is accessible only via the corner mark)_

Link style: `›` prefix in gold, monospace label, right-aligned meta. Flat rows with hairline separators. No cards, no shadows, no hover-lift. On hover: background tints gold-amber, `›` slides right.

---

## The Corner Mark (Square and Compass)

A covert 1.8rem masonic square-and-compass SVG fixed at bottom-right, linking to `milodges.com`.

Normally: 20% opacity.

On hover (or approaching the 20rem × 20rem corner zone):

- 12 golden rays emanate from the corner
- 6 seraphim wing curves fan outward in 3 pairs (fading by pair)
- 3 concentric rings expand and dissolve in sequence
- "FIAT LVX" text fades in
- The mark brightens to 85%

This is the hidden sacred detail. It rewards curiosity.

---

## What NOT to Do

- Do not add navigation or page routes
- Do not add hero images or photos
- Do not use card UI for the links
- Do not add blues or bright/neon colors
- Do not add sans-serif fonts
- Do not reduce or simplify the sigil animations
- Do not make it "clean" or "minimal" in a conventional way
- Do not explain the symbolism in the UI — let it speak for itself
- Do not add more content sections — the existing three (topline, mast, signals+links) are enough
- Do not remove section stacking behavior or mobile continuous scroll

---

## Voice / Copy

Direct. Not a portfolio. Not marketing copy.

Good:

> "I solve hard problems and build the systems around them."

Bad:

> "Passionate full-stack engineer with expertise in..."
> "Building modern systems with an esoteric edge."
> "I craft beautiful digital experiences."

The lede is one sentence. It says what he does. That's it.
