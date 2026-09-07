import Image from 'next/image';
import { FiLinkedin, FiGithub, FiMail, FiDownload } from 'react-icons/fi';
import { SiGooglescholar } from 'react-icons/si';
import profile from '../../../data/profile.json';

const skills = [
  { category: 'Languages',          items: ['Python', 'SQL', 'PL/SQL', 'Bash', 'C', 'HTML'] },
  { category: 'ML & AI',            items: ['Scikit-learn', 'XGBoost', 'SparkML', 'YOLO', 'Embeddings', 'LangChain'] },
  { category: 'Data Engineering',   items: ['Apache Spark', 'Airflow', 'Hadoop', 'Oracle', 'PostgreSQL'] },
  { category: 'Cloud & DevOps',     items: ['AWS S3', 'EC2', 'SageMaker', 'Bedrock', 'GitHub Actions'] },
  { category: 'Visualization',      items: ['Tableau', 'Folium', 'Matplotlib', 'Seaborn', 'GeoPandas'] },
];

export default function AboutPage() {
  return (
    <main className="pt-24 pb-20 bg-navy-900 min-h-screen">
      <div className="section-container">
        {/* Header */}
        <div className="mb-14">
          <p className="section-label">About me</p>
          <h1 className="section-heading text-5xl">Background &amp; philosophy</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Bio column */}
          <div className="lg:col-span-2 space-y-6 text-surface-300 leading-relaxed">
            {/* Photo */}
            <div className="float-left relative w-48 sm:w-56 h-64 sm:h-72 mr-6 mb-2 rounded-2xl bg-navy-800 border border-surface-700/30 overflow-hidden">
              <Image
                src="/images/about.jpg"
                alt={profile.name}
                fill
                sizes="(min-width: 640px) 14rem, 12rem"
                className="object-cover"
              />
            </div>

            <p>
              I&apos;m a data professional based in Dhaka, Bangladesh, currently working as Manager of AI and Data Science at{' '}
              <span className="text-surface-100 font-medium">Robi Axiata Limited</span>, one of Bangladesh&apos;s largest telecom operators.
              Over 4+ years I&apos;ve progressed from intern to individual contributor to manager, touching almost every layer of the data stack along the way.
            </p>
            <p>
              My work sits at the intersection of{' '}
              <span className="text-accent-400">Geospatial Analytics</span>,{' '}
              <span className="text-accent-400">ML in production</span>,{' '}
              <span className="text-accent-400">Data Visualization with Story-Telling</span>, and{' '}
              <span className="text-accent-400">Data Engineering at scale</span>.
              I&apos;ve built coverage optimization algorithms on large-scale datasets, shipped LLM-based automation for daily feedback processing,
              and designed data platforms serving a nationwide subscriber base.
            </p>
            <p className="clear-left">
              My engineering philosophy is <span className="text-surface-100 font-medium">efficiency-first</span>:
              I reach for lightweight, cost-effective solutions over heavyweight stacks when the problem doesn&apos;t require them.
              That&apos;s why I used semantic embeddings instead of a full generative LLM for VOC automation —
              faster, cheaper, and more accurate for that problem class.
              It&apos;s also the thinking behind <span className="text-surface-100 font-medium">Semantic-Sense</span>, my open-source hybrid anomaly-detection library.
            </p>
            <p>
              Outside production work, I&apos;m an IEEE-published researcher with a Q2 journal paper and two conference papers in ML for healthcare.
              I&apos;m currently preparing applications for MSc programs in Data Science and Artificial Intelligence at universities in the UK, Ireland, and Germany.
            </p>

            {/* Social */}
            <div className="flex flex-wrap gap-4 pt-4">
              <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer"
                className="btn-outline text-sm">
                <FiLinkedin size={15} /> LinkedIn
              </a>
              <a href={profile.social.github} target="_blank" rel="noopener noreferrer"
                className="btn-outline text-sm">
                <FiGithub size={15} /> GitHub
              </a>
              <a href={profile.social.scholar} target="_blank" rel="noopener noreferrer"
                className="btn-outline text-sm">
                <SiGooglescholar size={15} /> Scholar
              </a>
              <a href={`mailto:${profile.email}`} className="btn-outline text-sm">
                <FiMail size={15} /> Email
              </a>
              <a href={profile.resumeUrl} download className="btn-primary text-sm">
                <FiDownload size={15} /> Download résumé
              </a>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick facts */}
            <div className="card">
              <h3 className="text-sm font-mono text-surface-400 uppercase tracking-wider mb-4">Quick facts</h3>
              <div className="space-y-3">
                {[
                  ['Role',       'Manager, AI & DS'],
                  ['Company',    'Robi Axiata Limited'],
                  ['Location',   'Dhaka, Bangladesh'],
                  ['Education',  'BSc in EEE — IUT, OIC'],
                  ['CGPA',       '3.54 / 4.0'],
                  ['Focus',     'Research | Industry'],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-2 text-sm">
                    <span className="text-surface-500 shrink-0">{k}</span>
                    <span className="text-surface-200 text-right">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="card">
              <h3 className="text-sm font-mono text-surface-400 uppercase tracking-wider mb-4">Education</h3>
              <div>
                <p className="font-medium text-surface-100 text-sm">BSc in Electrical & Electronic Engineering</p>
                <p className="text-sm text-surface-400 mt-0.5">Islamic University of Technology (IUT), OIC</p>
                <p className="text-xs text-surface-500 font-mono mt-1">Class of 2021 · CGPA 3.54</p>
                <p className="text-xs text-accent-400 mt-2">1 Q2 journal · 2 IEEE conferences</p>
              </div>
            </div>
          </div>
        </div>

        {/* Skills grid */}
        <div className="mt-16">
          <h2 className="text-xl font-display font-semibold text-surface-100 mb-7">Technical skills</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {skills.map((group) => (
              <div key={group.category} className="card">
                <h3 className="text-xs font-mono text-accent-400 uppercase tracking-wider mb-3">{group.category}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span key={item} className="tag-surface text-xs">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
