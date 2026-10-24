interface LabeledPoint {
  label: string;
  x: number;
  y: number;
  outlier?: boolean;
}

const points: LabeledPoint[] = [
  { label: 'bread', x: 20, y: 60 },
  { label: 'sandwich', x: 32, y: 48 },
  { label: 'pharmacy', x: 70, y: 30 },
  { label: 'casino', x: 85, y: 78, outlier: true },
];

export default function LabeledScatter() {
  return (
    <svg
      viewBox="0 0 100 100"
      width="100%"
      role="img"
      aria-label="A two-dimensional embedding space with bread, sandwich, and pharmacy forming a plausible neighborhood while casino is flagged as the outlier"
      className="w-full"
    >
      <line x1={26} y1={54} x2={32} y2={48} stroke="var(--rule)" strokeWidth={0.6} />
      {points.map((p) => (
        <g key={p.label}>
          <circle
            cx={p.x}
            cy={p.y}
            r={p.outlier ? 2.6 : 2}
            fill={p.outlier ? 'var(--accent)' : 'var(--graphite)'}
            opacity={p.outlier ? 0.7 : 1}
          />
          <text
            x={p.x}
            y={p.y - 5}
            fontSize={5}
            fontFamily="var(--font-mono)"
            textAnchor="middle"
            fill={p.outlier ? 'var(--accent)' : 'var(--graphite)'}
            opacity={p.outlier ? 0.7 : 1}
          >
            {p.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
