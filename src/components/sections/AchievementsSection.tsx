import FigureHeader from '@/components/ui/FigureHeader';
import DotPlot from '@/components/viz/DotPlot';

interface Achievement {
  id: string;
  title: string;
  issuer: string;
  date: string;
  category: string;
}

interface Group {
  title: string;
  issuer: string;
  dates: string[];
}

function groupByTitle(items: Achievement[]): Group[] {
  const map = new Map<string, Group>();
  for (const a of items) {
    const existing = map.get(a.title);
    if (existing) {
      existing.dates.push(a.date);
    } else {
      map.set(a.title, { title: a.title, issuer: a.issuer, dates: [a.date] });
    }
  }
  return Array.from(map.values());
}

// Maps a mix of "YYYY", "YYYY-YYYY", and "Qn YYYY" date strings onto a 0-1 axis.
function datesToPositions(dates: string[]): number[] {
  const toYear = (d: string) => {
    const m = d.match(/\d{4}/g);
    return m ? parseInt(m[m.length - 1], 10) : 2023;
  };
  const years = dates.map(toYear);
  const min = Math.min(...years, 2021);
  const max = Math.max(...years, 2026);
  const span = max - min || 1;
  return years.map((y) => (y - min) / span);
}

function Ledger({ title, items }: { title: string; items: Achievement[] }) {
  const groups = groupByTitle(items);
  return (
    <div>
      <p className="meta-label mb-4">{title}</p>
      <div className="border-t border-rule">
        {groups.map((g) => (
          <div key={g.title} className="flex items-center justify-between gap-4 py-3 border-b border-rule">
            <div className="min-w-0">
              <p className="text-ink text-sm">
                {g.title}
                {g.dates.length > 1 && <span className="text-graphite"> &times; {g.dates.length}</span>}
              </p>
              <p className="text-graphite text-xs mt-0.5">{g.issuer}</p>
            </div>
            {g.dates.length > 1 ? (
              <DotPlot values={datesToPositions(g.dates)} domainLabel={g.title} width={100} height={14} />
            ) : (
              <span className="font-mono text-meta text-graphite tabular shrink-0">{g.dates[0]}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AchievementsSection({ achievements }: { achievements: Achievement[] }) {
  const corporate = achievements.filter((a) => a.category === 'award' || a.category === 'team-award');
  const certifications = achievements.filter((a) => a.category === 'certification');

  return (
    <section className="py-24 lg:py-40 border-t border-rule">
      <div className="section-container">
        <FigureHeader label="RECOGNITION" title="Achievements" />

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-12">
          <Ledger title="Awards" items={corporate} />
          <Ledger title="Certifications" items={certifications} />
        </div>
      </div>
    </section>
  );
}
