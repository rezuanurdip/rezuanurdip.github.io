import { FiGithub, FiStar, FiCode } from 'react-icons/fi';

interface OSS {
  id: string;
  name: string;
  language: string;
  description: string;
  longDescription: string;
  repo: string;
  stars: number | null;
}

export default function OpenSourceSection({ items }: { items: OSS[] }) {
  return (
    <section className="section-padding bg-navy-900">
      <div className="section-container">
        <div className="text-center mb-12">
          <p className="section-label">Open source</p>
          <h2 className="section-heading">Built for the community</h2>
          <p className="section-subheading mx-auto">
            Lightweight, opinionated libraries that solve real problems.
          </p>
        </div>

        {items.map((item) => (
          <div
            key={item.id}
            className="card card-hover max-w-3xl mx-auto border-accent-500/20 bg-gradient-to-br from-navy-800 to-navy-800/60"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-accent-500/15 border border-accent-500/30 flex items-center justify-center">
                  <FiCode size={16} className="text-accent-400" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-surface-50 text-lg">{item.name}</h3>
                  <span className="text-xs font-mono text-surface-400">{item.language}</span>
                </div>
              </div>

              <a
                href={item.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm px-4 py-1.5 rounded-lg border border-surface-700/40 text-surface-300 hover:border-accent-500/50 hover:text-accent-400 transition-all font-medium"
              >
                <FiGithub size={14} /> GitHub
              </a>
            </div>

            <p className="text-surface-300 text-sm leading-relaxed mb-3">
              {item.description}
            </p>
            <p className="text-surface-400 text-sm leading-relaxed">
              {item.longDescription}
            </p>

            {/* Code snippet teaser */}
            <div className="mt-5 rounded-xl bg-navy-900/80 border border-surface-700/30 p-4 font-mono text-xs text-surface-400 overflow-x-auto">
              <span className="text-accent-400">pip install</span> semantic-sense
              <br />
              <span className="text-surface-500"># Detects that "bread" → "sandwich" is normal,</span>
              <br />
              <span className="text-surface-500"># but "bread" → "casino" is anomalous</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
