export default function FigureHeader({ label, title, subheading }: { label: string; title: string; subheading?: string }) {
  return (
    <div className="mb-12 lg:mb-16">
      <p className="meta-label mb-3">{label}</p>
      <div className="h-px bg-rule mb-6" />
      <h2 className="text-h2 font-medium tracking-[-0.02em] text-ink text-balance">{title}</h2>
      {subheading && <p className="text-ink/80 text-lg mt-4 max-w-prose">{subheading}</p>}
    </div>
  );
}
