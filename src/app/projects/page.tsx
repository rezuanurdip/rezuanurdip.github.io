'use client';

import { useState } from 'react';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import FigureHeader from '@/components/ui/FigureHeader';
import LegendTags from '@/components/ui/LegendTags';
import projects from '../../../data/projects.json';

const allTags = Array.from(new Set(projects.flatMap((p) => p.tags)));

export default function ProjectsPage() {
  const [active, setActive] = useState<string>('all');
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = active === 'all' ? projects : projects.filter((p) => p.tags.includes(active));

  return (
    <main className="pt-28 pb-24 min-h-screen">
      <div className="section-container">
        <FigureHeader
          label="PORTFOLIO"
          title="Projects"
          subheading="From geospatial network planning to GenAI automation — work that shipped and made an impact."
        />

        <div className="flex flex-wrap gap-x-5 gap-y-2 mb-8 font-mono text-meta uppercase tracking-[0.12em]">
          {['all', ...allTags].map((tag) => (
            <button
              key={tag}
              onClick={() => setActive(tag)}
              className={`transition-colors ${active === tag ? 'text-accent' : 'text-graphite hover:text-ink'}`}
            >
              {tag.toLowerCase()}
            </button>
          ))}
        </div>

        <div className="border-t border-rule">
          {filtered.map((project) => {
            const isOpen = expanded === project.id;
            return (
              <div
                key={project.id}
                className="border-b border-rule py-6 cursor-pointer"
                onMouseEnter={() => setExpanded(project.id)}
                onMouseLeave={() => setExpanded(null)}
              >
                <div className="grid sm:grid-cols-12 gap-4">
                  <span className="font-mono text-meta text-graphite tabular sm:col-span-1">{project.year}</span>
                  <h2 className="text-ink sm:col-span-5">{project.title}</h2>
                  <div className="sm:col-span-3">
                    <LegendTags items={project.tags.map((t) => t.toLowerCase())} />
                  </div>
                  <div className="sm:col-span-3">
                    <LegendTags items={project.stack.map((s) => s.toLowerCase())} />
                  </div>
                </div>

                <div
                  className="overflow-hidden transition-[max-height,opacity] duration-[220ms] ease-[cubic-bezier(0.2,0.7,0.2,1)]"
                  style={{ maxHeight: isOpen ? '160px' : '0px', opacity: isOpen ? 1 : 0 }}
                >
                  <div className="pt-5 sm:pl-[calc(8.33%+1rem)] max-w-prose">
                    <p className="text-ink/80 text-sm leading-[1.6] mb-3">{project.summary}</p>
                    <div className="flex items-center gap-5 font-mono text-meta">
                      {project.links.repo ? (
                        <a href={project.links.repo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-graphite hover:text-ink transition-colors">
                          <FiGithub size={12} /> repo
                        </a>
                      ) : null}
                      {project.links.demo ? (
                        <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-graphite hover:text-ink transition-colors">
                          <FiExternalLink size={12} /> demo
                        </a>
                      ) : null}
                      {!project.links.repo && !project.links.demo && (
                        <span className="text-mist uppercase">internal / proprietary</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
