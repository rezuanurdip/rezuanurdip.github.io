import { FiAward, FiStar, FiCheckCircle, FiTrendingUp } from 'react-icons/fi';

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

const isTopFive = (a: Achievement) => a.title.toLowerCase().startsWith('top 5%');

export default function AchievementsSection({ achievements }: { achievements: Achievement[] }) {
  const corporate = achievements.filter((a) => a.category === 'award' || a.category === 'team-award');
  const certifications = achievements.filter((a) => a.category === 'certification');

  // Highlighted items (Top 5%) lead the list, rest keep their original order.
  const corporateSorted = [
    ...corporate.filter(isTopFive),
    ...corporate.filter((a) => !isTopFive(a)),
  ];

  return (
    <section className="section-padding bg-navy-800/40">
      <div className="section-container">
        <div className="text-center mb-12">
          <p className="section-label">Recognition</p>
          <h2 className="section-heading">Achievements</h2>
        </div>

        <div className="space-y-12">
          <div>
            <h3 className="text-sm font-mono text-surface-400 uppercase tracking-wider mb-4">
              Corporate Awards
            </h3>
            <div className="grid md:grid-cols-3 gap-3">
              {corporateSorted.map((a) => {
                const Icon = isTopFive(a) ? FiTrendingUp : catIcon[a.category] || FiStar;
                const colorClass = isTopFive(a)
                  ? 'text-amber-300 bg-amber-400/20 border-amber-400/40'
                  : catColor[a.category] || '';
                return (
                  <div
                    key={a.id}
                    className={`card card-hover flex items-start gap-3 ${
                      isTopFive(a) ? 'ring-1 ring-amber-400/40 bg-amber-400/5' : ''
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 ${colorClass}`}>
                      <Icon size={14} />
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${isTopFive(a) ? 'text-amber-300' : 'text-surface-100'}`}>
                        {a.title}
                      </p>
                      <p className="text-xs text-surface-400 mt-0.5">{a.issuer}</p>
                      <p className="text-xs text-surface-500 font-mono mt-1">{a.date}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-mono text-surface-400 uppercase tracking-wider mb-4">
              Certifications / Courses
            </h3>
            <div className="grid md:grid-cols-3 gap-3">
              {certifications.map((a) => {
                const Icon = catIcon[a.category] || FiCheckCircle;
                const colorClass = catColor[a.category] || '';
                return (
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
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
