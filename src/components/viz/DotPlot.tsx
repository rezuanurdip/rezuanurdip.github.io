interface DotPlotProps {
  values: number[]; // normalized 0-1 positions along the axis
  domainLabel: string;
  width?: number;
  height?: number;
}

// A time-axis dot-plot: a hairline with marks at given normalized positions.
export default function DotPlot({ values, domainLabel, width = 160, height = 16 }: DotPlotProps) {
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      role="img"
      aria-label={`Timeline of occurrences across ${domainLabel}`}
    >
      <line x1={0} y1={height / 2} x2={width} y2={height / 2} stroke="var(--rule)" strokeWidth={1} />
      {values.map((v, i) => (
        <circle key={i} cx={v * width} cy={height / 2} r={2.5} fill="var(--accent)" opacity={0.7} />
      ))}
    </svg>
  );
}
