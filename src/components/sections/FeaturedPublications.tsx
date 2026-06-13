import Link from 'next/link';
import { FiArrowRight, FiExternalLink, FiBookOpen } from 'react-icons/fi';

interface Publication {
  id: string;
  title: string;
  venue: string;
  year: number;
  type: string;
  quartile: string;
  link: string;
  abstract: string;
}

export default function FeaturedPublications({ publications }: { publications: Publication[] }) {
  return (
    <section className="section-padding bg-navy-800/40">
      <div className="section-container">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="section-label">Research</p>
            <h2 className="section-heading mb-0">Publications</h2>
          </div>
          <Link href="/publications" className="hidden sm:flex items-center gap-2 text-sm text-accent-400 hover:text-accent-300 transition-colors font-medium">
            All publications <FiArrowRight size={14} />
          </Link>
        </div>

        <div className="space-y-4">
          {publications.map((pub, i) => (
            <div key={pub.id} className="card card-hover group flex items-start gap-6">
              {/* Index */}
              <div className="shrink-0 w-8 h-8 rounded-lg bg-accent-500/10 border border-accent-500/20 flex items-center justify-center">
                <FiBookOpen size={14} className="text-accent-400" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className={`tag ${pub.type === 'journal' ? 'bg-accent-900/40 border-accent-700/40 text-accent-300' : 'bg-navy-700/60 border-surface-700/30 text-surface-300'}`}>
                    {pub.quartile}
                  </span>
                  <span className="text-xs text-surface-500 font-mono">{pub.year}</span>
                </div>

                <h3 className="font-medium text-surface-100 mb-1 group-hover:text-accent-300 transition-colors leading-snug">
                  {pub.title}
                </h3>

                <p className="text-sm text-surface-400 italic mb-2">{pub.venue}</p>

                {pub.link && pub.link !== '#' && (
                  <a
                    href={pub.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-accent-400 hover:text-accent-300 transition-colors"
                  >
                    View paper <FiExternalLink size={11} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 text-center sm:hidden">
          <Link href="/publications" className="inline-flex items-center gap-2 text-sm text-accent-400 font-medium">
            All publications <FiArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
