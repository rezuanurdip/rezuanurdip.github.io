import { FiAward, FiStar, FiCheckCircle } from 'react-icons/fi';

interface Achievement {
  id: string;
  title: string;
  issuer: string;
  date: string;
  category: string;
}

const catIcon: Record<string, React.ElementType> = {
  award:         FiStar,
  'team-award':  FiAward,
  certification: FiCheckCircle,
};

const catColor: Record<string, string> = {
  award:         'text-amber-400 bg-amber-400/10 border-amber-400/20',
  'team-award':  'text-accent-400 bg-accent-400/10 border-accent-400/20',
  certification: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
};

export default function AchievementsSection({ achievements }: { achievements: Achievement[] }) {
  const grouped = achievements.reduce<Record<string, Achievement[]>>((acc, a) => {
    (acc[a.category] = acc[a.category] || []).push(a);
    return acc;
  }, {});

  const sectionLabels: Record<string, string> = {
    award:         'Corporate awards',
    'team-award':  'Team recognition',
    certification: 'Certifications',
  };

  return (
    <section className="section-padding bg-navy-800/40">
      <div className="section-container">
        <div className="text-center mb-12">
          <p className="section-label">Recognition</p>
          <h2 className="section-heading">Achievements</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {Object.entries(grouped).map(([cat, items]) => {
            const Icon = catIcon[cat] || FiStar;
            const colorClass = catColor[cat] || '';
            return (
              <div key={cat}>
                <h3 className="text-sm font-mono text-surface-400 uppercase tracking-wider mb-4">
                  {sectionLabels[cat] || cat}
                </h3>
                <div className="space-y-3">
                  {items.map((a) => (
                    <div key={a.id} className="card card-hover flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 ${colorClass}`}>
                        <Icon size={14} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-surface-100">{a.title}</p>
                        <p className="text-xs text-surface-400 mt-0.5">{a.issuer}</p>
                        <p className="text-xs text-surface-500 font-mono mt-1">{a.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
