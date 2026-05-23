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
};

export function Sigil({
  className,
  idPrefix = "sigil",
  ariaHidden = false,
}: SigilProps = {}) {
  const rootClassName = className ? `sigil ${className}` : "sigil";
  const glowId = `${idPrefix}-glow`;
  const glowInnerId = `${idPrefix}-glow-inner`;
  const strokeId = "sigilStroke";
  const ordoPathId = `${idPrefix}-ordo-path`;
  const enochPathId = `${idPrefix}-enoch-path`;

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
        {flowerCenters.map((point, index) => (
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
              dur="12s"
              repeatCount="indefinite"
              begin={`${-(index * 0.27).toFixed(2)}s`}
              keyTimes="0; 0.45; 1"
              keySplines="0.45 0 0.2 1; 0.3 0 0.2 1"
              calcMode="spline"
            />
            <animate
              attributeName="opacity"
              values="0.88; 0.25; 0.92"
              dur="12s"
              repeatCount="indefinite"
              begin={`${-(index * 0.27).toFixed(2)}s`}
            />
          </circle>
        ))}
      </g>

      {/* Pentagram — slowly rotates, cross-fades with other shapes */}
      <g className="sigil__pentagram">
        <path d="M400,240 L306,529 L552,351 L248,351 L494,529 Z" />
      </g>

      <g className="sigil__metashape sigil__metashape--a">
        <path d="M400 210 L560 305 L560 495 L400 590 L240 495 L240 305 Z" />
        <path d="M400 250 L520 322 L520 478 L400 550 L280 478 L280 322 Z" />
      </g>

      <g className="sigil__metashape sigil__metashape--b">
        <path d="M400 188 L640 400 L400 612 L160 400 Z" />
        <path d="M400 250 L550 400 L400 550 L250 400 Z" />
      </g>

      <g className="sigil__metashape sigil__metashape--c">
        <path d="M400 190 L510 400 L400 610 L290 400 Z" />
        <path d="M400 240 L640 400 L400 560 L160 400 Z" />
      </g>

      <polygon
        points="400,132 622,520 178,520"
        className="sigil__triangle sigil__triangle--up"
      />
      <polygon
        points="400,668 622,280 178,280"
        className="sigil__triangle sigil__triangle--down"
      />

      {rays.map((ray) => {
        const angle = (ray * 360) / rays.length;
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
              animationDelay: `${-(ray * 0.19).toFixed(2)}s`,
            }}
          />
        );
      })}

      {rays.map((ray) => {
        const angle = (ray * 360) / rays.length + 7.5;
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

      <path
        d="M400 182 L540 400 L400 618 L260 400 Z"
        className="sigil__diamond"
      />
      <path
        d="M400 240 L560 400 L400 560 L240 400 Z"
        className="sigil__diamond sigil__diamond--thin"
      />
      <path
        d="M400 300 C490 300, 560 360, 560 400 C560 440, 490 500, 400 500 C310 500, 240 440, 240 400 C240 360, 310 300, 400 300 Z"
        className="sigil__ring"
      />

      <circle cx="400" cy="400" r="332" fill={`url(#${glowId})`} />
      <circle cx="400" cy="400" r="120" fill={`url(#${glowInnerId})`} />
      <circle cx="400" cy="400" r="390" className="sigil__frame" />

      {/* Heptagon — slowly counter-rotates outside the inner layers */}
      <polygon points={heptagonPoints} className="sigil__heptagon" />

      {/* Outer tick marks at r≈372 — 8 radial ticks beyond the outer orbit */}
      {outerTicks.map((tick) => (
        <line
          key={`outer-tick-${tick}`}
          x1="400"
          y1="18"
          x2="400"
          y2="34"
          className="sigil__outer-tick"
          transform={`rotate(${tick * 45} 400 400)`}
        />
      ))}

      {/* Inscription ring — masonic motto follows the outer orbit */}
      <text className="sigil__inscription">
        <textPath href={`#${ordoPathId}`} startOffset="0%">
          {
            "  ✦  ORDO AB CHAO  ✦  LVX IN TENEBRIS  ✦  V.I.T.R.I.O.L  ✦  FIAT LVX  ✦  "
          }
        </textPath>
      </text>

      <text className="sigil__enochian sigil__enochian--forward">
        <textPath href={`#${enochPathId}`} startOffset="0%">
          {enochianText}
        </textPath>
      </text>

      <text className="sigil__enochian sigil__enochian--reverse">
        <textPath href={`#${enochPathId}`} startOffset="50%">
          {enochianText}
        </textPath>
      </text>

      <g className="sigil__tree-life" aria-hidden="true">
        {treeLinks.map(([from, to], index) => (
          <line
            key={`path-${from}-${to}`}
            x1={treeNodes[from].x}
            y1={treeNodes[from].y}
            x2={treeNodes[to].x}
            y2={treeNodes[to].y}
            className="sigil__tree-path"
            style={{ animationDelay: `${-(index * 0.19).toFixed(2)}s` }}
          />
        ))}
        {treeNodes.map((node, index) => (
          <circle
            key={node.name}
            cx={node.x}
            cy={node.y}
            r={index === 9 ? 12 : 10}
            className="sigil__tree-node"
            style={{ animationDelay: `${-(index * 0.37).toFixed(2)}s` }}
          />
        ))}
      </g>

      <g className="sigil__square-compass" aria-hidden="true">
        <path
          d="M400 202 L548 556 L252 556 Z"
          className="sigil__masonic-compass"
        />
        <path
          d="M274 544 L400 350 L526 544"
          className="sigil__masonic-compass"
        />
        <path
          d="M244 536 L400 640 L556 536"
          className="sigil__masonic-square"
        />
        <path
          d="M284 506 L400 582 L516 506"
          className="sigil__masonic-square"
        />
        <text x="400" y="485" className="sigil__masonic-glyph">
          G
        </text>
      </g>

      <text x="400" y="168" className="sigil__axiom sigil__axiom--north">
        AS ABOVE
      </text>
      <text x="400" y="636" className="sigil__axiom sigil__axiom--south">
        SO BELOW
      </text>

      <g className="sigil__alchemy" aria-hidden="true">
        {alchemicalMarks.map((mark, index) => (
          <text
            key={`alchemy-${mark}-${index}`}
            x="400"
            y="72"
            className="sigil__alchemy-mark"
            transform={`rotate(${index * 60} 400 400)`}
            style={{ animationDelay: `${-(index * 0.8).toFixed(2)}s` }}
          >
            {mark}
          </text>
        ))}
      </g>
    </svg>
  );
}
