import FigureHeader from '@/components/ui/FigureHeader';
import StatReadout from '@/components/ui/StatReadout';

interface Metric {
  value: string;
  label: string;
}

export default function StatsSection({ metrics }: { metrics: Metric[] }) {
  return (
    <section className="py-24 lg:py-40 border-t border-rule">
      <div className="section-container">
        <FigureHeader label="AT A GLANCE" title="Production scale" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-y-10 gap-x-8 lg:gap-x-0 items-start">
          {metrics.map((m, i) => (
            <div
              key={m.label}
              className={`lg:col-span-3 lg:pr-8 ${i > 0 ? 'lg:pl-8 lg:border-l lg:border-rule' : ''}`}
            >
              <StatReadout value={m.value} label={m.label} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
