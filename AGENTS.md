# AGENTS.md — chrishernandez.io

This file is for AI agents working on this codebase. Read it before making changes.

---

## Project Identity

Personal site for **Christopher Hernandez** — Senior Software Engineer II at Tempus AI.
Domain: `skate.dev` (metadataBase). Deployed as a **Next.js static export**.

The site is intentionally esoteric, dark, and animated. It should feel like it's almost
breaking — psychedelic but controlled, sacred geometry meets terminal readout, occult
masonry meets software engineering. Do not sanitize or normalize the aesthetic.

---

## Tech Stack

| Thing           | Detail                                                                     |
| --------------- | -------------------------------------------------------------------------- |
| Framework       | Next.js (app router, static export)                                        |
| Language        | TypeScript strict mode                                                     |
| Node            | 22 via `fnm` (`.node-version` file)                                        |
| Package manager | npm                                                                        |
| Fonts           | Cormorant Garamond (serif) + IBM Plex Mono — loaded via `next/font/google` |
| CSS             | Single flat file: `styles/globals.css` — no CSS modules                    |
| Analytics       | Cloudflare Web Analytics (token in `app/layout.tsx`)                       |

---

## Key Commands

```bash
# Always activate fnm first
eval "$(fnm env --shell zsh)" && fnm use 22

# Dev server
npm run dev

# Typecheck (run after any change)
npm run typecheck    # tsc --noEmit

# Build
npm run build
```

**Always run `npm run typecheck` after edits. Never skip it.**

---

## File Map

```
app/
  layout.tsx      — root layout, fonts, metadata, analytics script
  page.tsx        — the entire site (only route), section stack + glitch/fault runtime

components/
  Sigil.tsx       — animated SVG sacred geometry sigil + floating glyph primitives
  home/
    HeroPanel.tsx
    WorkHistoryPanel.tsx
    EsotericBioPanel.tsx
    SectionGlyphFields.tsx

lib/
  home-content.ts — section copy, quotes, equations, timeline data, skill pills
  links.ts        — social link data (SocialLink type)

styles/
  globals.css     — ALL styles (large, flat), no modules

tests/
  site.spec.ts    — Playwright smoke/layout/accessibility checks
```

### No other routes exist. The whole site is `app/page.tsx`.

---

## Architecture Notes

- **Page structure**: `app/page.tsx` hosts a multi-section `div.page-stack` with `hero`, `history`, `esoteric` sections.
- **Section behavior**: Desktop uses guided section navigation; mobile allows continuous vertical scroll.
- **Hero layout**: 2-column grid (hero + sigil-panel) when hero is active.
- **Sigil**: The `<Sigil />` component is SVG-only, no JS animation — all motion is pure CSS keyframes.
- **Sigil panel composition**: There are now two SVGs in `.sigil-panel` (`<PhilosopherStoneGlyph />` overlay + `<Sigil />`).
- **Glitch effects**: Page-wide overlays (`page__grain`, `page__scanlines`, `page__glitch`, `page__sweep`) are fixed divs. The `.page` itself has a subtle `worldShift` skew animation.
- **Fault mode**: A periodic runtime interruption overlays a system-fault screen and temporarily scrambles text nodes.
- **Corner sanctuary**: Fixed bottom-right `div.corner-sanctuary` (20rem × 20rem hover zone). Contains a seraphim SVG that appears on hover + the masonic square-and-compass `<a>` mark.

---

## CSS Conventions

- All variables in `:root` at top of `globals.css`
- **Color family**: dark occult — near-black `#060309`, deep blood crimsons, ritual purples, gold/amber. **No blues.**
- `--serif` / `--mono` are CSS custom properties pointing to font variables
- Animations use `steps(1)` for glitch snaps, `ease-in-out` for organic motion
- Prefer subtle symbolic numerics in copy/text over performance-costly timing gimmicks
- `prefers-reduced-motion` block disables all glitch/animation at bottom of CSS file

---

## Design Constraints — Read Before Changing Anything Visual

See `VIBE.md` for the full aesthetic guide. Short version:

1. **Dark, occult, masonic** — not cyberpunk, not neon, not corporate dark mode
2. **Gold/amber as the primary accent** — crimson and ritual violet as secondary
3. **Controlled chaos** — things should feel like they're almost breaking but never do
4. **The sigil is the center** — it should be dominant, unboxed, overwhelming
5. **Typography is serif (Cormorant) for display, mono (IBM Plex) for data/labels**
6. Do not add new colors without removing something first
7. Do not add card/panel UI — the terminal-row link style is intentional

---

## Gotchas

- `transform-box: fill-box; transform-origin: center` must be set on SVG elements that rotate — otherwise rotation origin is wrong
- The flower-of-life and rays use inline `style={{ animationDelay }}` for stagger — don't remove these
- The floating glyph fields intentionally use occasional fill/glitch pulses from palette colors; keep subtle
- Philosopher stone geometry is strict: keep the canonical upright shape and prevent square bleed outside triangle while moving
- `worldShift` on `.page` uses `skewX`/`skewY` — this is intentional and subtle. It is the "psychedelic" feel
- The `corner-sanctuary` hover zone is larger than the visible mark — this is intentional so users discover the seraphim effect when approaching the corner
- MILodges is accessible via the corner mark SVG link only, not the link grid
- `link-card:focus-visible` and `sigil-panel:focus-visible` share an outline rule — keep them together
- Pre-push hook runs Playwright; keep `tests/site.spec.ts` aligned with DOM reality (especially mobile sigil SVG count and section locators)
