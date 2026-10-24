import Link from 'next/link';
import { FiArrowRight, FiExternalLink } from 'react-icons/fi';
import FigureHeader from '@/components/ui/FigureHeader';

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
    <section className="py-24 lg:py-40 border-t border-rule">
      <div className="section-container">
        <FigureHeader label="RESEARCH" title="Publications" />

        <div className="border-t border-rule">
          {publications.map((pub) => (
            <div key={pub.id} className="grid sm:grid-cols-12 gap-4 py-7 border-b border-rule items-baseline">
              <span className="font-mono text-meta text-graphite tabular sm:col-span-2">
                {pub.quartile} &middot; {pub.year}
              </span>
              <div className="sm:col-span-8">
                <h3 className="text-h3 text-ink mb-1 leading-snug">{pub.title}</h3>
                <p className="text-graphite text-sm italic">{pub.venue}</p>
              </div>
              <div className="sm:col-span-2 sm:text-right">
                {pub.link && pub.link !== '#' && (
                  <a
                    href={pub.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-graphite hover:text-ink transition-colors"
                  >
                    View <FiExternalLink size={11} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <Link href="/publications" className="inline-flex items-center gap-2 text-sm text-graphite hover:text-ink transition-colors mt-6">
          All publications <FiArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
}
