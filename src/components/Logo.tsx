/**
 * IPTV Turkey logo.
 *
 * A crescent-and-star tile beside a two-line wordmark. The crescent follows
 * Turkish Flag Law No. 2893 proportions (outer circle G/2, inner 2G/5, centres
 * offset G/16, star circle G/4) and is drawn as a single even-odd path so it
 * renders identically everywhere — masks are unevenly supported, especially
 * when an SVG is used as a favicon.
 */

const SIZES = {
  sm: {
    tile: 'h-12 w-12 rounded-xl',
    mark: 32,
    top: 'text-xl',
    bottom: 'text-[0.6875rem]',
    gap: 'gap-3',
    lead: 'mt-1',
  },
  md: {
    tile: 'h-16 w-16 rounded-2xl',
    mark: 42,
    top: 'text-3xl',
    bottom: 'text-sm',
    gap: 'gap-4',
    lead: 'mt-1.5',
  },
} as const;

/** Circle as a path, so it can be combined into one even-odd shape. */
function circlePath(cx: number, cy: number, r: number): string {
  return `M ${cx - r} ${cy} a ${r} ${r} 0 1 0 ${2 * r} 0 a ${r} ${r} 0 1 0 ${-2 * r} 0 Z`;
}

function starPoints(cx: number, cy: number, r: number): string {
  const ratio = Math.cos((72 * Math.PI) / 180) / Math.cos((36 * Math.PI) / 180);
  return Array.from({ length: 10 }, (_, i) => {
    const radius = i % 2 === 0 ? r : r * ratio;
    const angle = ((180 + i * 36) * Math.PI) / 180;
    return `${(cx + radius * Math.cos(angle)).toFixed(2)},${(cy + radius * Math.sin(angle)).toFixed(2)}`;
  }).join(' ');
}

/** The crescent-and-star mark on its own — also used for the app icon. */
export function FlagMark({ size = 32, className = '' }: { size?: number; className?: string }) {
  const G = 100;
  const outerR = G / 4;
  const innerR = G / 5;
  const offset = G / 16;
  const starR = G / 8;
  const cx = 34;
  const cy = 50;
  const starCx = cx + outerR + starR * 1.05;

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {/* 3.19 centres the crescent-plus-star group inside the tile. */}
      <g transform="translate(3.19 0)" fill="currentColor">
        <path d={`${circlePath(cx, cy, outerR)}${circlePath(cx + offset, cy, innerR)}`} fillRule="evenodd" />
        <polygon points={starPoints(starCx, cy, starR)} />
      </g>
    </svg>
  );
}

export function Logo({ size = 'sm' }: { size?: keyof typeof SIZES }) {
  const s = SIZES[size];

  return (
    <span className={`inline-flex items-center ${s.gap}`}>
      <span
        className={`inline-flex shrink-0 items-center justify-center bg-gradient-to-br from-brand-500 to-brand-600 text-white ${s.tile}`}
      >
        <FlagMark size={s.mark} />
      </span>

      <span className="flex flex-col leading-none">
        <span className={`font-display font-extrabold tracking-tight text-paper ${s.top}`}>IPTV</span>
        <span className={`${s.lead} font-display font-medium tracking-[0.3em] text-brand-300 ${s.bottom}`}>
          TURKEY
        </span>
      </span>
    </span>
  );
}
