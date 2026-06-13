import { FiMapPin, FiCalendar } from 'react-icons/fi';
import experience from '../../../data/experience.json';

export default function ExperiencePage() {
  return (
    <main className="pt-24 pb-20 bg-navy-900 min-h-screen">
      <div className="section-container max-w-4xl">
        <div className="mb-14">
          <p className="section-label">Career</p>
          <h1 className="section-heading text-5xl">Experience</h1>
          <p className="section-subheading">
            4+ years at Robi Axiata Limited, growing from intern to Associate Manager of AI & Data Science.
          </p>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 top-6 bottom-6 w-px bg-gradient-to-b from-accent-500/60 via-accent-500/20 to-transparent" />

          <div className="space-y-12 pl-16">
            {experience.map((job, i) => (
              <div key={job.id} className="relative">
                {/* Timeline dot */}
                <div className={`absolute -left-11 top-1.5 w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  job.current
                    ? 'border-accent-400 bg-accent-400/20'
                    : 'border-surface-600 bg-navy-900'
                }`}>
                  {job.current && (
                    <div className="w-1.5 h-1.5 rounded-full bg-accent-400 animate-pulse" />
                  )}
                </div>

                <div className="card card-hover">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
                    <div>
                      <h2 className="font-display font-bold text-lg text-surface-50 leading-snug">{job.role}</h2>
                      <p className="text-accent-400 font-medium mt-1">{job.company}</p>
                    </div>

                    <div className="flex flex-col items-start sm:items-end gap-1.5 shrink-0">
                      {job.current && (
                        <span className="tag-accent text-xs">Current</span>
                      )}
                      <span className="flex items-center gap-1.5 text-xs text-surface-400 font-mono">
                        <FiCalendar size={11} /> {job.startDate} — {job.endDate}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-surface-400">
                        <FiMapPin size={11} /> {job.location}
                      </span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <ul className="space-y-2.5">
                    {job.highlights.map((h, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm text-surface-300 leading-relaxed">
                        <span className="text-accent-400 mt-1 shrink-0">▸</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
