const rays = Array.from({ length: 24 }, (_, index) => index);
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

export function Sigil() {
  return (
    <svg
      viewBox="0 0 800 800"
      className="sigil"
      role="img"
      aria-label="Sacred geometry sigil"
    >
      <defs>
        <radialGradient id="sigilGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff8d0" stopOpacity="0.6" />
          <stop offset="30%" stopColor="#d6b35f" stopOpacity="0.38" />
          <stop offset="65%" stopColor="#8e6d22" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#050505" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="sigilGlowInner" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fffbe8" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#dfba7a" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#dfba7a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="sigilStroke" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f2e1ab" />
          <stop offset="50%" stopColor="#c8a24e" />
          <stop offset="100%" stopColor="#7c5b17" />
        </linearGradient>
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
            style={{ animationDelay: `${-(index * 1.13).toFixed(2)}s` }}
          />
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

      <circle cx="400" cy="400" r="332" fill="url(#sigilGlow)" />
      <circle cx="400" cy="400" r="120" fill="url(#sigilGlowInner)" />
      <circle cx="400" cy="400" r="390" className="sigil__frame" />
    </svg>
  );
}
