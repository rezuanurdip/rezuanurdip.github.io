export default function LegendTags({ items }: { items: string[] }) {
  return (
    <p className="font-mono text-meta lowercase tracking-[0.02em] text-graphite">
      {items.map((item, i) => (
        <span key={item}>
          {item}
          {i < items.length - 1 && <span className="text-mist"> / </span>}
        </span>
      ))}
    </p>
  );
}
