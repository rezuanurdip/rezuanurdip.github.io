import { FiExternalLink, FiBookOpen, FiAward } from 'react-icons/fi';
import publications from '../../../data/publications.json';

export default function PublicationsPage() {
  const journals     = publications.filter((p) => p.type === 'journal');
  const conferences  = publications.filter((p) => p.type === 'conference');

  return (
    <main className="pt-24 pb-20 bg-navy-900 min-h-screen">
      <div className="section-container max-w-4xl">
        <div className="mb-14">
          <p className="section-label">Research</p>
          <h1 className="section-heading text-5xl">Publications</h1>
          <p className="section-subheading">
            Peer-reviewed work in machine learning for healthcare diagnostics — published in a Q2 impact journal and two IEEE conferences.
          </p>
        </div>

        {/* Journal */}
        <div className="mb-12">
          <h2 className="text-sm font-mono text-surface-400 uppercase tracking-wider flex items-center gap-2 mb-5">
            <FiAward size={14} className="text-accent-400" /> Journal articles
          </h2>
          <div className="space-y-4">
            {journals.map((pub) => (
              <div key={pub.id} className="card card-hover">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="tag bg-accent-900/40 border-accent-700/40 text-accent-300">{pub.quartile}</span>
                  <span className="text-xs text-surface-500 font-mono">{pub.year}</span>
                </div>
                <h3 className="font-medium text-surface-100 mb-1.5 leading-snug">{pub.title}</h3>
                <p className="text-sm text-surface-400 italic mb-3">{pub.venue}</p>
                <p className="text-sm text-surface-400 leading-relaxed mb-4">{pub.abstract}</p>
                {pub.link && pub.link !== '#' && (
                  <a href={pub.link} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-accent-400 hover:text-accent-300 transition-colors">
                    View paper <FiExternalLink size={13} />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Conferences */}
        <div>
          <h2 className="text-sm font-mono text-surface-400 uppercase tracking-wider flex items-center gap-2 mb-5">
            <FiBookOpen size={14} className="text-accent-400" /> Conference papers
          </h2>
          <div className="space-y-4">
            {conferences.map((pub) => (
              <div key={pub.id} className="card card-hover">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="tag bg-navy-700/60 border-surface-700/30 text-surface-300">{pub.quartile}</span>
                  <span className="text-xs text-surface-500 font-mono">{pub.year}</span>
                </div>
                <h3 className="font-medium text-surface-100 mb-1.5 leading-snug">{pub.title}</h3>
                <p className="text-sm text-surface-400 italic mb-3">{pub.venue}</p>
                <p className="text-sm text-surface-400 leading-relaxed mb-4">{pub.abstract}</p>
                {pub.link && pub.link !== '#' && (
                  <a href={pub.link} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-accent-400 hover:text-accent-300 transition-colors">
                    View paper <FiExternalLink size={13} />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
