import { FiExternalLink } from 'react-icons/fi';
import FigureHeader from '@/components/ui/FigureHeader';
import DotPlot from '@/components/viz/DotPlot';
import publications from '../../../data/publications.json';

export default function PublicationsPage() {
  const years = publications.map((p) => p.year);
  const min = Math.min(...years);
  const max = Math.max(...years) || min + 1;
  const span = max - min || 1;
  const positions = years.map((y) => (y - min) / span);

  return (
    <main className="pt-28 pb-24 min-h-screen">
      <div className="section-container max-w-page">
        <FigureHeader
          label="RESEARCH"
          title="Publications"
          subheading="Peer-reviewed work in machine learning for healthcare diagnostics — a Q2 journal and two IEEE conferences."
        />

        <div className="mb-10">
          <DotPlot values={positions} domainLabel="publication years" width={320} height={16} />
          <div className="flex justify-between font-mono text-meta text-graphite mt-1" style={{ width: 320 }}>
            <span>{min}</span>
            <span>{max}</span>
          </div>
        </div>

        <div className="border-t border-rule">
          {publications.map((pub) => (
            <div key={pub.id} className="grid sm:grid-cols-12 gap-4 py-8 border-b border-rule">
              <span className="font-mono text-meta text-graphite tabular sm:col-span-2">
                {pub.quartile} &middot; {pub.year}
              </span>
              <div className="sm:col-span-10">
                <h2 className="text-h3 text-ink mb-1.5 leading-snug">{pub.title}</h2>
                <p className="text-graphite text-sm italic mb-3">{pub.venue}</p>
                <p className="text-ink/80 text-sm leading-[1.6] mb-4 max-w-prose">{pub.abstract}</p>
                {pub.link && pub.link !== '#' && (
                  <a href={pub.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-ink hover:text-accent transition-colors">
                    View paper <FiExternalLink size={13} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
