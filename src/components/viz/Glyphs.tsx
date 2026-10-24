// Monochrome 64x40 discipline glyphs. Rule/graphite strokes, one accent mark.
// Hover micro-motion is driven by the `.glyph-hover` class on an ancestor
// (group-hover equivalents via CSS, no JS state).

const common = {
  fill: 'none',
  stroke: 'var(--graphite)',
  strokeWidth: 1,
};

export function HexbinGlyph() {
  const hexes = [
    { cx: 14, cy: 12, accent: false },
    { cx: 26, cy: 12, accent: false },
    { cx: 38, cy: 12, accent: true },
    { cx: 20, cy: 24, accent: false },
    { cx: 32, cy: 24, accent: false },
    { cx: 14, cy: 32 },
  ];
  const hex = (cx: number, cy: number, r = 6) =>
    Array.from({ length: 6 })
      .map((_, i) => {
        const a = (Math.PI / 3) * i - Math.PI / 6;
        return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
      })
      .join(' ');

  return (
    <svg viewBox="0 0 64 40" width={64} height={40} role="img" aria-label="Hex-bin density grid, representing geospatial analytics">
      {hexes.map((h, i) => (
        <polygon
          key={i}
          points={hex(h.cx, h.cy)}
          {...common}
          stroke={h.accent ? 'var(--accent)' : 'var(--rule)'}
          strokeOpacity={h.accent ? 0.7 : 1}
          className={h.accent ? 'glyph-accent' : ''}
        />
      ))}
    </svg>
  );
}

export function DagGlyph() {
  return (
    <svg viewBox="0 0 64 40" width={64} height={40} role="img" aria-label="Parallel flow lines merging into a DAG, representing data engineering">
      <circle cx={8} cy={8} r={2} fill="var(--graphite)" />
      <circle cx={8} cy={20} r={2} fill="var(--graphite)" />
      <circle cx={8} cy={32} r={2} fill="var(--graphite)" />
      <circle cx={32} cy={20} r={2.2} fill="var(--accent)" opacity={0.7} className="glyph-accent" />
      <circle cx={56} cy={20} r={2} fill="var(--graphite)" />
      <path d="M10 8 Q22 8 30 19" stroke="var(--rule)" fill="none" strokeWidth={1} />
      <path d="M10 20 H30" stroke="var(--rule)" fill="none" strokeWidth={1} />
      <path d="M10 32 Q22 32 30 21" stroke="var(--rule)" fill="none" strokeWidth={1} />
      <path d="M34 20 H54" stroke="var(--accent)" fill="none" strokeWidth={1} opacity={0.6} />
    </svg>
  );
}

export function DecisionBoundaryGlyph() {
  const classA = [
    [10, 10],
    [16, 16],
    [8, 22],
    [18, 8],
    [12, 28],
  ];
  const classB = [
    [40, 12],
    [50, 18],
    [46, 28],
    [56, 10],
    [52, 30],
  ];
  return (
    <svg viewBox="0 0 64 40" width={64} height={40} role="img" aria-label="Two-class scatter with a decision boundary, representing machine learning">
      <path d="M28 2 Q32 20 30 38" stroke="var(--accent)" strokeWidth={1} opacity={0.7} fill="none" className="glyph-accent" />
      {classA.map(([x, y], i) => (
        <circle key={`a${i}`} cx={x} cy={y} r={1.6} fill="var(--graphite)" />
      ))}
      {classB.map(([x, y], i) => (
        <circle key={`b${i}`} cx={x} cy={y} r={1.6} fill="none" stroke="var(--graphite)" strokeWidth={1} />
      ))}
    </svg>
  );
}

export function EmbeddingClusterGlyph() {
  const cluster1 = [
    [10, 12],
    [14, 16],
    [8, 18],
    [16, 10],
  ];
  const cluster2 = [
    [44, 26],
    [50, 22],
    [48, 32],
    [54, 28],
  ];
  return (
    <svg viewBox="0 0 64 40" width={64} height={40} role="img" aria-label="Embedding clusters with a nearest-neighbour link, representing GenAI and LLM applications">
      {cluster1.map(([x, y], i) => (
        <circle key={`c1-${i}`} cx={x} cy={y} r={1.6} fill="var(--graphite)" />
      ))}
      {cluster2.map(([x, y], i) => (
        <circle key={`c2-${i}`} cx={x} cy={y} r={1.6} fill="var(--graphite)" />
      ))}
      <line x1={14} y1={16} x2={44} y2={26} stroke="var(--accent)" strokeWidth={1} opacity={0.7} className="glyph-accent" />
      <circle cx={14} cy={16} r={2} fill="var(--accent)" opacity={0.7} />
      <circle cx={44} cy={26} r={2} fill="var(--accent)" opacity={0.7} />
    </svg>
  );
}

export function BarSeriesGlyph() {
  const bars = [10, 18, 14, 24, 12, 20];
  return (
    <svg viewBox="0 0 64 40" width={64} height={40} role="img" aria-label="Small bar series with one highlighted bar, representing telecom analytics and BI">
      {bars.map((h, i) => {
        const accent = i === 3;
        return (
          <rect
            key={i}
            x={6 + i * 9}
            y={34 - h}
            width={6}
            height={h}
            fill={accent ? 'var(--accent)' : 'var(--rule)'}
            opacity={accent ? 0.7 : 1}
            className={accent ? 'glyph-accent' : ''}
          />
        );
      })}
      <line x1={4} y1={34} x2={60} y2={34} stroke="var(--graphite)" strokeWidth={1} />
    </svg>
  );
}

export function NodeGraphGlyph() {
  const nodes = [
    [12, 10],
    [12, 30],
    [32, 20],
    [52, 10],
    [52, 30],
  ];
  const edges: [number, number][] = [
    [0, 2],
    [1, 2],
    [2, 3],
    [2, 4],
  ];
  return (
    <svg viewBox="0 0 64 40" width={64} height={40} role="img" aria-label="Minimal node-and-edge graph, representing cloud and DevOps">
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a][0]}
          y1={nodes[a][1]}
          x2={nodes[b][0]}
          y2={nodes[b][1]}
          stroke="var(--rule)"
          strokeWidth={1}
        />
      ))}
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={2} fill={i === 2 ? 'var(--accent)' : 'var(--graphite)'} opacity={i === 2 ? 0.7 : 1} className={i === 2 ? 'glyph-accent' : ''} />
      ))}
    </svg>
  );
}
