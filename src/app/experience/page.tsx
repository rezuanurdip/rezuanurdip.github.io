import FigureHeader from '@/components/ui/FigureHeader';
import experience from '../../../data/experience.json';

export default function ExperiencePage() {
  return (
    <main className="pt-28 pb-24 min-h-screen">
      <div className="section-container max-w-page">
        <FigureHeader
          label="CAREER"
          title="Experience"
          subheading="4+ years at Robi Axiata Limited, growing from intern to Manager of AI & Data Science."
        />

        <div className="grid sm:grid-cols-[120px_1px_1fr] gap-x-8">
          {experience.map((job) => (
            <div key={job.id} className="contents">
              <div className="font-mono text-meta text-graphite tabular pt-1 sm:text-right">
                {job.startDate} &ndash; {job.endDate}
              </div>
              <div className="hidden sm:block bg-rule" />
              <div className="pb-14 border-b border-rule sm:border-b-0 mb-8 sm:mb-0">
                <div className="flex items-baseline gap-3 flex-wrap mb-1">
                  <h2 className="text-h3 text-ink">{job.role}</h2>
                  {job.current && <span className="font-mono text-meta text-accent uppercase">current</span>}
                </div>
                <p className="text-graphite text-sm mb-1">
                  {job.company} &middot; {job.location}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {job.highlights.map((h, j) => (
                    <li key={j} className="text-ink/80 text-sm leading-[1.6] pl-4 border-l border-rule">
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
