'use client';

import { useState } from 'react';
import { FiGithub, FiCheck, FiCopy } from 'react-icons/fi';
import FigureHeader from '@/components/ui/FigureHeader';
import LabeledScatter from '@/components/viz/LabeledScatter';

interface OSS {
  id: string;
  name: string;
  language: string;
  description: string;
  longDescription: string;
  repo: string;
  stars: number | null;
}

export default function OpenSourceSection({ items }: { items: OSS[] }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard?.writeText('pip install semantic-sense');
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <section className="py-24 lg:py-40 border-t border-rule">
      <div className="section-container">
        <FigureHeader label="OPEN SOURCE" title="Built for the community" />

        {items.map((item) => (
          <div key={item.id} className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="flex items-baseline justify-between gap-4 mb-5">
                <h3 className="text-h3 text-ink">{item.name}</h3>
                <span className="font-mono text-meta text-graphite">{item.language.toLowerCase()}</span>
              </div>

              <p className="text-ink/80 text-base leading-[1.6] mb-4 max-w-prose">{item.description}</p>
              <p className="text-ink/80 text-sm leading-[1.6] mb-6 max-w-prose">{item.longDescription}</p>

              <a
                href={item.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-ink hover:text-accent transition-colors mb-6"
              >
                <FiGithub size={14} /> View on GitHub
              </a>

              <div className="bg-ink text-paper font-mono text-sm px-5 py-4 flex items-center justify-between gap-4">
                <span>pip install semantic-sense</span>
                <button
                  type="button"
                  onClick={copy}
                  aria-label="Copy install command"
                  className="text-paper/60 hover:text-paper transition-colors shrink-0"
                >
                  {copied ? <FiCheck size={14} /> : <FiCopy size={14} />}
                </button>
              </div>
            </div>

            <div>
              <LabeledScatter />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
