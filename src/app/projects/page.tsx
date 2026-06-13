'use client';

import { useState } from 'react';
import { FiExternalLink, FiGithub, FiFilter } from 'react-icons/fi';
import projects from '../../../data/projects.json';

const allTags = Array.from(new Set(projects.flatMap((p) => p.tags)));

export default function ProjectsPage() {
  const [active, setActive] = useState<string>('All');

  const filtered = active === 'All'
    ? projects
    : projects.filter((p) => p.tags.includes(active));

  return (
    <main className="pt-24 pb-20 bg-navy-900 min-h-screen">
      <div className="section-container">
        <div className="mb-10">
          <p className="section-label">Portfolio</p>
          <h1 className="section-heading text-5xl">Projects</h1>
          <p className="section-subheading">
            From geospatial network planning to GenAI automation — work that shipped and made an impact.
          </p>
        </div>

        {/* Filter chips */}
        <div className="flex flex-wrap gap-2 mb-10">
          <FiFilter size={14} className="text-surface-400 mt-1.5" />
          {['All', ...allTags].map((tag) => (
            <button
              key={tag}
              onClick={() => setActive(tag)}
              className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all duration-200 ${
                active === tag
                  ? 'bg-accent-500 border-accent-400 text-navy-900'
                  : 'border-surface-700/40 text-surface-400 hover:border-accent-500/50 hover:text-accent-400'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map((project) => (
            <div key={project.id} className="card card-hover group flex flex-col">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((t) => (
                    <span key={t} className="tag-accent">{t}</span>
                  ))}
                </div>
                <span className="text-xs font-mono text-surface-500 shrink-0">{project.year}</span>
              </div>

              <h2 className="font-display font-bold text-surface-50 mb-3 group-hover:text-accent-300 transition-colors">
                {project.title}
              </h2>

              <p className="text-sm text-surface-400 leading-relaxed mb-5 flex-1">
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

              <div className="flex items-center gap-4 pt-4 border-t border-surface-700/20">
                {project.links.repo ? (
                  <a href={project.links.repo} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-surface-400 hover:text-accent-400 transition-colors">
                    <FiGithub size={13} /> Repository
                  </a>
                ) : null}
                {project.links.demo ? (
                  <a href={project.links.demo} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-surface-400 hover:text-accent-400 transition-colors">
                    <FiExternalLink size={13} /> Live demo
                  </a>
                ) : null}
                {!project.links.repo && !project.links.demo && (
                  <span className="text-xs text-surface-600 font-mono italic">Internal / proprietary</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
