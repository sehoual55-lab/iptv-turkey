/**
 * Türkiye flag, drawn flat to the official specification.
 *
 * Turkish Flag Law No. 2893, with G as the flag width and L = 1.5G:
 *   outer circle of the crescent   G/2 diameter
 *   inner circle of the crescent   2G/5 diameter, centre offset G/16
 *   circle around the star         G/4 diameter
 *   the star's single vertex faces the hoist
 * Red is Pantone 186 C (#E30A17).
 *
 * The crescent is one even-odd path rather than a mask, so it renders the same
 * everywhere it is used.
 */

const G = 800; // width (height of the flag)
const L = G * 1.5; // length

// A — outer crescent centre sits G/2 from the hoist.
const outerCx = G / 2;
const outerR = G / 4;

// C — inner circle centre offset by G/16; D — inner diameter 2G/5.
const innerCx = outerCx + G / 16;
const innerR = G / 5;

// E — star circle centre a further G/3 along; B — star circle diameter G/4.
const starCx = outerCx + G / 3;
const starR = G / 8;

const cy = G / 2;

function circlePath(cx: number, cyy: number, r: number): string {
  return `M ${cx - r} ${cyy} a ${r} ${r} 0 1 0 ${2 * r} 0 a ${r} ${r} 0 1 0 ${-2 * r} 0 Z`;
}

function starPoints(cx: number, cyy: number, r: number): string {
  const ratio = Math.cos((72 * Math.PI) / 180) / Math.cos((36 * Math.PI) / 180);
  return Array.from({ length: 10 }, (_, i) => {
    const radius = i % 2 === 0 ? r : r * ratio;
    const angle = ((180 + i * 36) * Math.PI) / 180;
    return `${(cx + radius * Math.cos(angle)).toFixed(2)},${(cyy + radius * Math.sin(angle)).toFixed(2)}`;
  }).join(' ');
}

export function TurkishFlag({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${L} ${G}`}
      className={className}
      role="img"
      aria-label="Türkiye bayrağı"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width={L} height={G} fill="#E30A17" />
      <g fill="#FFFFFF">
        <path
          d={`${circlePath(outerCx, cy, outerR)}${circlePath(innerCx, cy, innerR)}`}
          fillRule="evenodd"
        />
        <polygon points={starPoints(starCx, cy, starR)} />
      </g>
    </svg>
  );
}
