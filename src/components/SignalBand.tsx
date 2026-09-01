/**
 * The site's signature graphic: an abstract bitrate/signal band.
 *
 * Deliberately original artwork — no broadcaster marks, no channel logos and
 * no third-party imagery. Purely decorative, so it is hidden from assistive
 * technology.
 *
 * The bar heights are generated from a fixed seed rather than Math.random so
 * the server and client markup match and nothing shifts on hydration.
 */

const SEED = [
  18, 34, 27, 52, 41, 68, 45, 79, 58, 92, 71, 84, 63, 97, 74, 55, 88, 66, 43, 76,
  59, 90, 48, 81, 62, 95, 70, 53, 86, 39, 72, 57, 93, 46, 78, 61, 35, 83, 50, 68,
];

export function SignalBand({ className = '' }: { className?: string }) {
  const barWidth = 6;
  const gap = 6;
  const width = SEED.length * (barWidth + gap);
  const height = 120;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      role="presentation"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="signal-fade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#E11D2E" stopOpacity="0.15" />
          <stop offset="45%" stopColor="#E11D2E" stopOpacity="1" />
          <stop offset="75%" stopColor="#FF6B76" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#FF6B76" stopOpacity="0.12" />
        </linearGradient>
      </defs>

      {SEED.map((value, i) => {
        const barHeight = (value / 100) * height;
        return (
          <rect
            key={i}
            x={i * (barWidth + gap)}
            y={(height - barHeight) / 2}
            width={barWidth}
            height={barHeight}
            rx={3}
            fill="url(#signal-fade)"
          />
        );
      })}
    </svg>
  );
}
