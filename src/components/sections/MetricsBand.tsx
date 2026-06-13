const DOMAINS = [
  'Data Science',
  'BI & Data Engineering',
  'Data Storytelling',
  'Embedding & LLMs',
  'Publications & Journals',
];

export default function MetricsBand() {
  return (
    <section className="bg-navy-800/60 border-y border-surface-700/20 py-10">
      <div className="section-container">
        <div className="flex flex-wrap justify-center gap-4">
          {DOMAINS.map((domain) => (
            <span
              key={domain}
              className="font-display font-semibold text-sm sm:text-base text-accent-300 bg-accent-500/10 border border-accent-500/25 rounded-full px-5 py-2.5 hover:bg-accent-500/20 hover:text-accent-200 transition-colors"
            >
              {domain}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
