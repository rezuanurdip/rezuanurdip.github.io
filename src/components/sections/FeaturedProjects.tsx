import Link from 'next/link';
import { FiArrowRight, FiExternalLink, FiGithub } from 'react-icons/fi';

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
    <section className="section-padding bg-navy-900">
      <div className="section-container">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="section-label">Selected work</p>
            <h2 className="section-heading mb-0">Projects</h2>
          </div>
          <Link href="/projects" className="hidden sm:flex items-center gap-2 text-sm text-accent-400 hover:text-accent-300 transition-colors font-medium">
            All projects <FiArrowRight size={14} />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <div
              key={project.id}
              className={`card card-hover flex flex-col group ${i === 0 ? 'md:col-span-2' : ''}`}
            >
              {/* Top row */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((t) => (
                    <span key={t} className="tag-accent">{t}</span>
                  ))}
                </div>
                <span className="text-xs font-mono text-surface-500 shrink-0">{project.year}</span>
              </div>

              <h3 className="font-display font-bold text-lg text-surface-50 mb-3 group-hover:text-accent-300 transition-colors">
                {project.title}
              </h3>

              <p className="text-surface-400 text-sm leading-relaxed mb-5 flex-1">
                {project.summary}
              </p>

              {/* Stack */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {project.stack.map((s) => (
                  <span key={s} className="text-xs font-mono px-2 py-0.5 rounded bg-navy-700/50 border border-surface-700/30 text-surface-400">
                    {s}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex items-center gap-4 pt-4 border-t border-surface-700/20">
                {project.links.repo && (
                  <a href={project.links.repo} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-surface-400 hover:text-accent-400 transition-colors">
                    <FiGithub size={13} /> Repo
                  </a>
                )}
                {project.links.demo && (
                  <a href={project.links.demo} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-surface-400 hover:text-accent-400 transition-colors">
                    <FiExternalLink size={13} /> Live demo
                  </a>
                )}
                {!project.links.repo && !project.links.demo && (
                  <span className="text-xs text-surface-600 font-mono">Internal / proprietary</span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 text-center sm:hidden">
          <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-accent-400 font-medium">
            All projects <FiArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
