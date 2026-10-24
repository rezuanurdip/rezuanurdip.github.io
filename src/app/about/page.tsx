import Image from 'next/image';
import { FiLinkedin, FiGithub, FiMail, FiDownload } from 'react-icons/fi';
import { SiGooglescholar } from 'react-icons/si';
import FigureHeader from '@/components/ui/FigureHeader';
import LegendTags from '@/components/ui/LegendTags';
import profile from '../../../data/profile.json';

const skills = [
  { category: 'Languages', items: ['Python', 'SQL', 'PL/SQL', 'Bash', 'C', 'HTML'] },
  { category: 'ML & AI', items: ['Scikit-learn', 'XGBoost', 'SparkML', 'YOLO', 'Embeddings', 'LangChain'] },
  { category: 'Data Engineering', items: ['Apache Spark', 'Airflow', 'Hadoop', 'Oracle', 'PostgreSQL'] },
  { category: 'Cloud & DevOps', items: ['AWS S3', 'EC2', 'SageMaker', 'Bedrock', 'GitHub Actions'] },
  { category: 'Visualization', items: ['Tableau', 'Folium', 'Matplotlib', 'Seaborn', 'GeoPandas'] },
];

const quickFacts: [string, string][] = [
  ['Role', 'Manager, AI & DS'],
  ['Company', 'Robi Axiata Limited'],
  ['Location', 'Dhaka, Bangladesh'],
  ['Education', 'BSc in EEE — IUT, OIC'],
  ['CGPA', '3.54 / 4.0'],
  ['Focus', 'Research | Industry'],
];

export default function AboutPage() {
  return (
    <main className="pt-28 pb-24 min-h-screen">
      <div className="section-container max-w-page">
        <FigureHeader label="ABOUT ME" title="Background & philosophy" />

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6 text-ink/80 leading-[1.6]">
            <div className="float-left relative w-48 h-60 mr-6 mb-2 border border-rule overflow-hidden">
              <Image src="/images/about.jpg" alt={profile.name} fill sizes="(min-width: 640px) 12rem, 10rem" className="object-cover" />
            </div>

            <p>
              I&apos;m a data professional based in Dhaka, Bangladesh, currently working as Manager of AI and Data Science at{' '}
              <span className="text-ink">Robi Axiata Limited</span>, one of Bangladesh&apos;s largest telecom operators. Over 4+ years
              I&apos;ve progressed from intern to individual contributor to manager, touching almost every layer of the data stack along
              the way.
            </p>
            <p>
              My work sits at the intersection of <span className="text-accent">geospatial analytics</span>,{' '}
              <span className="text-accent">ML in production</span>, <span className="text-accent">data storytelling</span>, and{' '}
              <span className="text-accent">data engineering at scale</span>. I&apos;ve built coverage optimization algorithms on
              large-scale datasets, shipped LLM-based automation for daily feedback processing, and designed data platforms serving a
              nationwide subscriber base.
            </p>
            <p className="clear-left">
              My engineering philosophy is <span className="text-ink">efficiency-first</span>: I reach for lightweight, cost-effective
              solutions over heavyweight stacks when the problem doesn&apos;t require them. That&apos;s why I used semantic embeddings
              instead of a full generative LLM for VOC automation — faster, cheaper, and more accurate for that problem class. It&apos;s
              also the thinking behind <span className="text-ink">Semantic-Sense</span>, my open-source hybrid anomaly-detection
              library.
            </p>
            <p>
              Outside production work, I&apos;m an IEEE-published researcher with a Q2 journal paper and two conference papers in ML for
              healthcare. I&apos;m currently preparing applications for MSc programs in Data Science and Artificial Intelligence at
              universities in the UK, Ireland, and Germany.
            </p>

            <div className="flex flex-wrap gap-6 pt-4 font-mono text-sm">
              <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-graphite hover:text-ink transition-colors">
                <FiLinkedin size={14} /> LinkedIn
              </a>
              <a href={profile.social.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-graphite hover:text-ink transition-colors">
                <FiGithub size={14} /> GitHub
              </a>
              <a href={profile.social.scholar} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-graphite hover:text-ink transition-colors">
                <SiGooglescholar size={14} /> Scholar
              </a>
              <a href={`mailto:${profile.email}`} className="flex items-center gap-2 text-graphite hover:text-ink transition-colors">
                <FiMail size={14} /> Email
              </a>
              <a href={profile.resumeUrl} download className="flex items-center gap-2 text-ink hover:text-accent transition-colors">
                <FiDownload size={14} /> R&eacute;sum&eacute;
              </a>
            </div>
          </div>

          <div className="space-y-10">
            <div>
              <p className="meta-label mb-4">Quick facts</p>
              <div className="border-t border-rule">
                {quickFacts.map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-2 text-sm py-2.5 border-b border-rule">
                    <span className="text-graphite shrink-0">{k}</span>
                    <span className="text-ink text-right">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="meta-label mb-4">Education</p>
              <p className="text-ink text-sm">BSc in Electrical &amp; Electronic Engineering</p>
              <p className="text-graphite text-sm mt-0.5">Islamic University of Technology (IUT), OIC</p>
              <p className="font-mono text-meta text-graphite mt-1.5">Class of 2021 &middot; CGPA 3.54</p>
              <p className="text-accent text-sm mt-2">1 Q2 journal &middot; 2 IEEE conferences</p>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <p className="meta-label mb-6">Technical skills</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-8 border-t border-rule pt-8">
            {skills.map((group) => (
              <div key={group.category}>
                <p className="font-mono text-meta uppercase tracking-[0.12em] text-ink mb-3">{group.category}</p>
                <LegendTags items={group.items.map((i) => i.toLowerCase())} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
