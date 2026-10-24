const DOMAINS = [
  'Data Science',
  'BI & Data Engineering',
  'Data Storytelling',
  'Embedding & LLMs',
  'Publications & Journals',
];

export default function MetricsBand() {
  return (
    <section className="border-y border-rule py-5">
      <div className="section-container">
        <p className="font-mono text-meta uppercase tracking-[0.12em] text-graphite text-center sm:text-left">
          {DOMAINS.join('  /  ')}
        </p>
      </div>
    </section>
  );
}
