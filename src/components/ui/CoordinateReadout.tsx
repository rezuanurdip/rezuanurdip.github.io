export default function CoordinateReadout({ location, inline = false }: { location: string; inline?: boolean }) {
  // Dhaka's coordinates, used as the fixed readout for the one location this site reports.
  if (inline) {
    return (
      <span className="font-mono text-meta tracking-[0.12em] text-graphite uppercase tabular whitespace-nowrap">
        &mdash; 23.81&deg;&nbsp;N &middot; 90.41&deg;&nbsp;E
      </span>
    );
  }
  return (
    <p className="font-mono text-meta tracking-[0.12em] text-graphite uppercase tabular">
      23.81&deg; N &middot; 90.41&deg; E — {location.toUpperCase()}
    </p>
  );
}
