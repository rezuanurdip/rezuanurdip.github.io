import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import FigureHeader from '@/components/ui/FigureHeader';
import LegendTags from '@/components/ui/LegendTags';

interface Project {
  id: string;
  title: string;
  summary: string;
  tags: string[];
  stack: string[];
  links: { demo: string; repo: string; writeup: string };
  featured: boolean;
  year: number;
}

export default function FeaturedProjects({ projects }: { projects: Project[] }) {
  return (
    <section className="py-24 lg:py-40 border-t border-rule">
      <div className="section-container">
        <FigureHeader label="SELECTED WORK" title="Projects" />

        <div className="border-t border-rule">
          {projects.map((project) => (
            <div key={project.id} className="grid sm:grid-cols-12 gap-4 py-7 border-b border-rule">
              <span className="font-mono text-meta text-graphite tabular sm:col-span-1">{project.year}</span>
              <div className="sm:col-span-7">
                <h3 className="text-h3 text-ink mb-2">{project.title}</h3>
                <p className="text-ink/80 text-sm leading-[1.6] max-w-[56ch]">{project.summary}</p>
              </div>
              <div className="sm:col-span-4 sm:text-right">
                <LegendTags items={project.stack.map((s) => s.toLowerCase())} />
                <p className="font-mono text-meta text-graphite mt-3">
                  {!project.links.repo && !project.links.demo ? 'internal / proprietary' : 'public'}
                </p>
              </div>
            </div>
          ))}
        </div>

        <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-graphite hover:text-ink transition-colors mt-6">
          All projects <FiArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
}
