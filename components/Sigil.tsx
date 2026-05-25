import { memo, type CSSProperties } from "react";

const rays = Array.from({ length: 24 }, (_, index) => index);
const outerTicks = Array.from({ length: 8 }, (_, index) => index);
const alchemicalMarks = ["🜂", "🜁", "🜃", "🜄", "🜍", "🜔"];
const enochianText =
  "  ✶  ZODACARE OD ZIRDO NAZAVAB  ✶  LONSHI CALZ IRGIL  ✶  MADRIAX NANTA  ✶  ";

const treeNodes = [
  { name: "keter", x: 400, y: 132 },
  { name: "chokmah", x: 322, y: 206 },
  { name: "binah", x: 478, y: 206 },
  { name: "chesed", x: 302, y: 298 },
  { name: "gevurah", x: 498, y: 298 },
  { name: "tiferet", x: 400, y: 384 },
  { name: "netzach", x: 322, y: 476 },
  { name: "hod", x: 478, y: 476 },
  { name: "yesod", x: 400, y: 560 },
  { name: "malkuth", x: 400, y: 652 },
];

const treeLinks: Array<[number, number]> = [
  [0, 1],
  [0, 2],
  [1, 2],
  [1, 3],
  [2, 4],
  [1, 5],
  [2, 5],
  [3, 4],
  [3, 5],
  [4, 5],
  [3, 6],
  [4, 7],
  [5, 6],
  [5, 7],
  [6, 7],
  [6, 8],
  [7, 8],
  [8, 9],
];

// Heptagon (7 vertices), r=318, center (400,400), starting from top
const heptagonPoints = Array.from({ length: 7 }, (_, i) => {
  const angle = Math.PI * (-0.5 + (2 * i) / 7);
  return `${(400 + 318 * Math.cos(angle)).toFixed(1)},${(400 + 318 * Math.sin(angle)).toFixed(1)}`;
}).join(" ");
const flowerCenters = (() => {
  const centers: Array<{ x: number; y: number }> = [];
  const spacing = 64;
  const root3 = Math.sqrt(3);

  for (let q = -2; q <= 2; q += 1) {
    for (let r = -2; r <= 2; r += 1) {
      const s = -q - r;
      if (Math.max(Math.abs(q), Math.abs(r), Math.abs(s)) <= 2) {
        centers.push({
          x: 400 + spacing * (q + r / 2),
          y: 400 + spacing * ((root3 / 2) * r),
        });
      }
    }
  }

  return centers;
})();

type SigilProps = {
  className?: string;
  idPrefix?: string;
  ariaHidden?: boolean;
  density?: "ultra-low" | "low" | "base" | "high" | "ultra";
};

type TreeOfLifeGlyphProps = {
  className?: string;
  idPrefix?: string;
  ariaHidden?: boolean;
};

type FlowerOfLifeGlyphProps = {
  className?: string;
  idPrefix?: string;
  ariaHidden?: boolean;
  introCycleMs?: number;
};

type PhilosopherStoneGlyphProps = {
  className?: string;
  idPrefix?: string;
  ariaHidden?: boolean;
};

function FlowerOfLifeGlyphImpl({
  className,
  idPrefix = "flower-of-life",
  ariaHidden = true,
  introCycleMs,
}: FlowerOfLifeGlyphProps = {}) {
  const rootClassName = className
    ? `flower-of-life-glyph ${className}`
    : "flower-of-life-glyph";
  const strokeId = `${idPrefix}-stroke`;

  return (
    <svg
      viewBox="0 0 800 800"
      className={rootClassName}
      role="img"
      aria-label="Flower of life glyph"
      aria-hidden={ariaHidden}
    >
      <defs>
        <linearGradient id={strokeId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f2e1ab" />
          <stop offset="50%" stopColor="#c8a24e" />
          <stop offset="100%" stopColor="#7c5b17" />
        </linearGradient>
      </defs>

      <g className="flower-of-life__group" aria-hidden="true">
        {flowerCenters.map((point, index) => (
          <circle
            key={`glyph-flower-${index}`}
            cx={point.x}
            cy={point.y}
            r="64"
            className="flower-of-life__circle"
            stroke={`url(#${strokeId})`}
            style={
              {
                animationDelay: `${-(index * 0.19).toFixed(2)}s`,
                "--collapse-x": `${(400 - point.x).toFixed(2)}px`,
                "--collapse-y": `${(400 - point.y).toFixed(2)}px`,
              } as CSSProperties
            }
          >
            {typeof introCycleMs === "number" && (
              <>
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values={`0 0; ${400 - point.x} ${400 - point.y}; ${400 - point.x} ${400 - point.y}; 0 0; 0 0`}
                  dur={`${(introCycleMs / 1000).toFixed(2)}s`}
                  repeatCount="1"
                  keyTimes="0; 0.44; 0.58; 0.82; 1"
                  keySplines="0.42 0 0.2 1; 0 0 1 1; 0.25 0 0.2 1; 0 0 1 1"
                  calcMode="spline"
                />
                <animate
                  attributeName="opacity"
                  values="0.78; 0.9; 0.62; 0.88; 0.78"
                  dur={`${(introCycleMs / 1000).toFixed(2)}s`}
                  repeatCount="1"
                  keyTimes="0; 0.44; 0.58; 0.82; 1"
                />
              </>
            )}
          </circle>
        ))}
      </g>
    </svg>
  );
}

function TreeOfLifeGlyphImpl({
  className,
  idPrefix = "tree-of-life",
  ariaHidden = true,
}: TreeOfLifeGlyphProps = {}) {
  const rootClassName = className
    ? `tree-of-life-glyph ${className}`
    : "tree-of-life-glyph";
  const strokeId = `${idPrefix}-stroke`;

  return (
    <svg
      viewBox="0 0 800 800"
      className={rootClassName}
      role="img"
      aria-label="Tree of life glyph"
      aria-hidden={ariaHidden}
    >
      <defs>
        <linearGradient id={strokeId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f2e1ab" />
          <stop offset="50%" stopColor="#c8a24e" />
          <stop offset="100%" stopColor="#7c5b17" />
        </linearGradient>
      </defs>

      <g className="tree-of-life__group" aria-hidden="true">
        {treeLinks.map(([from, to], index) => (
          <line
            key={`glyph-path-${from}-${to}`}
            x1={treeNodes[from].x}
            y1={treeNodes[from].y}
            x2={treeNodes[to].x}
            y2={treeNodes[to].y}
            className="tree-of-life__path"
            stroke={`url(#${strokeId})`}
            style={{ animationDelay: `${-(index * 0.23).toFixed(2)}s` }}
          />
        ))}
        {treeNodes.map((node, index) => (
          <circle
            key={`glyph-node-${node.name}`}
            cx={node.x}
            cy={node.y}
            r={index === 9 ? 14 : 12}
            className="tree-of-life__node"
            stroke={`url(#${strokeId})`}
            style={{ animationDelay: `${-(index * 0.31).toFixed(2)}s` }}
          />
        ))}
      </g>
    </svg>
  );
}

function PhilosopherStoneGlyphImpl({
  className,
  idPrefix = "philosopher-stone",
  ariaHidden = true,
}: PhilosopherStoneGlyphProps = {}) {
  const rootClassName = className
    ? `philosopher-stone-glyph ${className}`
    : "philosopher-stone-glyph";
  const strokeId = `${idPrefix}-stroke`;

  return (
    <svg
      viewBox="0 0 800 800"
      className={rootClassName}
      role="img"
      aria-label="Philosopher's stone glyph"
      aria-hidden={ariaHidden}
    >
      <defs>
        <linearGradient id={strokeId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f2e1ab" />
          <stop offset="50%" stopColor="#c8a24e" />
          <stop offset="100%" stopColor="#7c5b17" />
        </linearGradient>
      </defs>

      <g className="philosopher-stone__group" aria-hidden="true">
        <circle
          cx="400"
          cy="400"
          r="292"
          className="philosopher-stone__ring"
          stroke={`url(#${strokeId})`}
        />
        <polygon
          points="400,134 630,532 170,532"
          className="philosopher-stone__triangle"
          stroke={`url(#${strokeId})`}
        />
        <rect
          x="294"
          y="319"
          width="212"
          height="212"
          className="philosopher-stone__square"
          stroke={`url(#${strokeId})`}
        />
        <circle
          cx="400"
          cy="425"
          r="94"
          className="philosopher-stone__core"
          stroke={`url(#${strokeId})`}
        />
      </g>
    </svg>
  );
}

function SigilImpl({
  className,
  idPrefix = "sigil",
  ariaHidden = false,
  density = "ultra",
}: SigilProps = {}) {
  const rootClassName = className ? `sigil ${className}` : "sigil";
  const glowId = `${idPrefix}-glow`;
  const glowInnerId = `${idPrefix}-glow-inner`;
  const strokeId = "sigilStroke";
  const ordoPathId = `${idPrefix}-ordo-path`;
  const enochPathId = `${idPrefix}-enoch-path`;
  const densitySettings =
    density === "ultra-low"
      ? {
          flowerCount: flowerCenters.length,
          rayCount: 16,
          tickCount: 16,
          outerTickCount: 5,
          alchemyCount: 4,
          outerGlowOpacity: 0.72,
          innerGlowOpacity: 0.78,
          // Layer flags — ultra-low: only orbits, core, seed, flower, rays, ticks survive
          showHeptagon: false,
          showOuterTicks: false,
          showInscription: false,
          showEnochian: false,
          showEnochianReverse: false,
          showAxioms: false,
          showAlchemy: false,
          showDiamond: false,
          showRing: false,
        }
      : density === "low"
        ? {
            flowerCount: flowerCenters.length,
            rayCount: 18,
            tickCount: 18,
            outerTickCount: 6,
            alchemyCount: 4,
            outerGlowOpacity: 0.8,
            innerGlowOpacity: 0.84,
            // Layer flags — low: diamonds/ring reappear, outer ticks return; text still stripped
            showHeptagon: false,
            showOuterTicks: true,
            showInscription: false,
            showEnochian: false,
            showEnochianReverse: false,
            showAxioms: false,
            showAlchemy: false,
            showDiamond: true,
            showRing: true,
          }
        : density === "base"
          ? {
              flowerCount: flowerCenters.length,
              rayCount: 20,
              tickCount: 20,
              outerTickCount: 7,
              alchemyCount: 5,
              outerGlowOpacity: 0.88,
              innerGlowOpacity: 0.9,
              // Layer flags — base: inscription + enochian forward return; still no axioms/reverse/alchemy/heptagon
              showHeptagon: false,
              showOuterTicks: true,
              showInscription: true,
              showEnochian: true,
              showEnochianReverse: false,
              showAxioms: false,
              showAlchemy: false,
              showDiamond: true,
              showRing: true,
            }
          : density === "high"
            ? {
                flowerCount: flowerCenters.length,
                rayCount: 22,
                tickCount: 22,
                outerTickCount: 8,
                alchemyCount: 6,
                outerGlowOpacity: 0.95,
                innerGlowOpacity: 0.96,
                // Layer flags — high: axioms + enochian reverse + alchemy return; heptagon still absent
                showHeptagon: false,
                showOuterTicks: true,
                showInscription: true,
                showEnochian: true,
                showEnochianReverse: true,
                showAxioms: true,
                showAlchemy: true,
                showDiamond: true,
                showRing: true,
              }
            : {
                flowerCount: flowerCenters.length,
                rayCount: rays.length,
                tickCount: rays.length,
                outerTickCount: outerTicks.length,
                alchemyCount: alchemicalMarks.length,
                outerGlowOpacity: 1,
                innerGlowOpacity: 1,
                // Layer flags — ultra: everything rendered
                showHeptagon: true,
                showOuterTicks: true,
                showInscription: true,
                showEnochian: true,
                showEnochianReverse: true,
                showAxioms: true,
                showAlchemy: true,
                showDiamond: true,
                showRing: true,
              };
  const visibleFlowerCenters = flowerCenters.slice(
    0,
    densitySettings.flowerCount,
  );
  const visibleRays = rays.slice(0, densitySettings.rayCount);
  const visibleTicks = rays.slice(0, densitySettings.tickCount);
  const visibleOuterTicks = outerTicks.slice(0, densitySettings.outerTickCount);
  const visibleAlchemicalMarks = alchemicalMarks.slice(
    0,
    densitySettings.alchemyCount,
  );
  const layerClassName = (visible: boolean) =>
    `sigil__layer ${visible ? "sigil__layer--visible" : "sigil__layer--hidden"}`;

  return (
    <svg
      viewBox="0 0 800 800"
      className={rootClassName}
      role="img"
      aria-label="Sacred geometry sigil"
      aria-hidden={ariaHidden}
    >
      <defs>
        <radialGradient id={glowId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff8d0" stopOpacity="0.6" />
          <stop offset="30%" stopColor="#d6b35f" stopOpacity="0.38" />
          <stop offset="65%" stopColor="#8e6d22" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#050505" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={glowInnerId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fffbe8" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#dfba7a" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#dfba7a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={strokeId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f2e1ab" />
          <stop offset="50%" stopColor="#c8a24e" />
          <stop offset="100%" stopColor="#7c5b17" />
        </linearGradient>
        {/* circular path for inscription text */}
        <path
          id={ordoPathId}
          d="M 400,40 A 360,360 0 0,1 400,760 A 360,360 0 0,1 400,40"
          fill="none"
        />
        <path
          id={enochPathId}
          d="M 400,12 A 388,388 0 0,1 400,788 A 388,388 0 0,1 400,12"
          fill="none"
        />
      </defs>

      <circle
        cx="400"
        cy="400"
        r="360"
        className="sigil__orbit sigil__orbit--outer"
      />
      <circle
        cx="400"
        cy="400"
        r="270"
        className="sigil__orbit sigil__orbit--mid"
      />
      <circle
        cx="400"
        cy="400"
        r="170"
        className="sigil__orbit sigil__orbit--inner"
      />
      <circle cx="400" cy="400" r="94" className="sigil__core" />
      <circle cx="400" cy="400" r="42" className="sigil__seed" />

      <g className="sigil__flower-life">
        {visibleFlowerCenters.map((point, index) => (
          <circle
            key={`flower-${index}`}
            cx={point.x}
            cy={point.y}
            r="64"
            className="sigil__flower-circle"
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              values={`0 0; ${400 - point.x} ${400 - point.y}; 0 0`}
              dur="16s"
              repeatCount="indefinite"
              begin={`${-(index * 0.27).toFixed(2)}s`}
              keyTimes="0; 0.45; 1"
              keySplines="0.45 0 0.2 1; 0.3 0 0.2 1"
              calcMode="spline"
            />
            <animate
              attributeName="opacity"
              values="0.88; 0.25; 0.92"
              dur="16s"
              repeatCount="indefinite"
              begin={`${-(index * 0.27).toFixed(2)}s`}
            />
          </circle>
        ))}
      </g>

      {visibleRays.map((ray, index) => {
        const angle = (index * 360) / visibleRays.length;
        return (
          <line
            key={ray}
            x1="400"
            y1="60"
            x2="400"
            y2="150"
            className="sigil__ray"
            style={{
              transform: `rotate(${angle}deg)`,
              animationDelay: `${-(index * 0.19).toFixed(2)}s`,
            }}
          />
        );
      })}

      {visibleTicks.map((ray, index) => {
        const angle = (index * 360) / visibleTicks.length + 7.5;
        return (
          <line
            key={`tick-${ray}`}
            x1="400"
            y1="210"
            x2="400"
            y2="246"
            className="sigil__tick"
            style={{ transform: `rotate(${angle}deg)` }}
          />
        );
      })}

      <g
        className={`${layerClassName(densitySettings.showDiamond)} sigil__layer--diamond`}
      >
        <path
          d="M400 182 L540 400 L400 618 L260 400 Z"
          className="sigil__diamond"
        />
        <path
          d="M400 240 L560 400 L400 560 L240 400 Z"
          className="sigil__diamond sigil__diamond--thin"
        />
      </g>
      <g className={`${layerClassName(densitySettings.showRing)} sigil__layer--ring`}>
        <path
          d="M400 300 C490 300, 560 360, 560 400 C560 440, 490 500, 400 500 C310 500, 240 440, 240 400 C240 360, 310 300, 400 300 Z"
          className="sigil__ring"
        />
      </g>

      <circle
        cx="400"
        cy="400"
        r="332"
        fill={`url(#${glowId})`}
        style={{ opacity: densitySettings.outerGlowOpacity }}
      />
      <circle
        cx="400"
        cy="400"
        r="120"
        fill={`url(#${glowInnerId})`}
        style={{ opacity: densitySettings.innerGlowOpacity }}
      />
      <circle cx="400" cy="400" r="390" className="sigil__frame" />

      {/* Heptagon — slowly counter-rotates outside the inner layers */}
      <g
        className={`${layerClassName(densitySettings.showHeptagon)} sigil__layer--heptagon`}
      >
        <polygon points={heptagonPoints} className="sigil__heptagon" />
      </g>

      {/* Outer tick marks at r≈372 — 8 radial ticks beyond the outer orbit */}
      <g
        className={`${layerClassName(densitySettings.showOuterTicks)} sigil__layer--outer-ticks`}
      >
        {visibleOuterTicks.map((tick, index) => (
          <line
            key={`outer-tick-${tick}`}
            x1="400"
            y1="18"
            x2="400"
            y2="34"
            className="sigil__outer-tick"
            transform={`rotate(${(index * 360) / visibleOuterTicks.length} 400 400)`}
          />
        ))}
      </g>

      {/* Inscription ring — masonic motto follows the outer orbit */}
      <g
        className={`${layerClassName(densitySettings.showInscription)} sigil__layer--inscription`}
      >
        <text className="sigil__inscription">
          <textPath href={`#${ordoPathId}`} startOffset="0%">
            {
              "  ✦  ORDO AB CHAO  ✦  LVX IN TENEBRIS  ✦  V.I.T.R.I.O.L  ✦  FIAT LVX  ✦  "
            }
          </textPath>
        </text>
      </g>

      <g
        className={`${layerClassName(densitySettings.showEnochian)} sigil__layer--enochian-forward`}
      >
        <text className="sigil__enochian sigil__enochian--forward">
          <textPath href={`#${enochPathId}`} startOffset="0%">
            {enochianText}
          </textPath>
        </text>
      </g>

      <g
        className={`${layerClassName(densitySettings.showEnochianReverse)} sigil__layer--enochian-reverse`}
      >
        <text className="sigil__enochian sigil__enochian--reverse">
          <textPath href={`#${enochPathId}`} startOffset="50%">
            {enochianText}
          </textPath>
        </text>
      </g>

      <g className={`${layerClassName(densitySettings.showAxioms)} sigil__layer--axioms`}>
        <text x="400" y="168" className="sigil__axiom sigil__axiom--north">
          AS ABOVE
        </text>
        <text x="400" y="636" className="sigil__axiom sigil__axiom--south">
          SO BELOW
        </text>
      </g>

      <g
        className={`${layerClassName(densitySettings.showAlchemy)} sigil__layer--alchemy`}
        aria-hidden="true"
      >
        <g className="sigil__alchemy">
          {visibleAlchemicalMarks.map((mark, index) => (
            <text
              key={`alchemy-${mark}-${index}`}
              x="400"
              y="72"
              className="sigil__alchemy-mark"
              transform={`rotate(${(index * 360) / visibleAlchemicalMarks.length} 400 400)`}
              style={{ animationDelay: `${-(index * 0.8).toFixed(2)}s` }}
            >
              {mark}
            </text>
          ))}
        </g>
      </g>
    </svg>
  );
}

export const FlowerOfLifeGlyph = memo(FlowerOfLifeGlyphImpl);
FlowerOfLifeGlyph.displayName = "FlowerOfLifeGlyph";

export const TreeOfLifeGlyph = memo(TreeOfLifeGlyphImpl);
TreeOfLifeGlyph.displayName = "TreeOfLifeGlyph";

export const PhilosopherStoneGlyph = memo(PhilosopherStoneGlyphImpl);
PhilosopherStoneGlyph.displayName = "PhilosopherStoneGlyph";

export const Sigil = memo(SigilImpl);
Sigil.displayName = "Sigil";
