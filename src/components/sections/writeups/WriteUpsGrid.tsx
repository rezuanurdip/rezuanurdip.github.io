'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FiClock } from 'react-icons/fi';
import TagFilter from './TagFilter';
import type { WriteUpMeta } from '@/types/writeup';

export default function WriteUpsGrid({ entries }: { entries: WriteUpMeta[] }) {
  const searchParams = useSearchParams();
  const activeTag = searchParams.get('tag');

  const filtered = activeTag ? entries.filter((e) => e.tag === activeTag) : entries;

  return (
    <>
      <TagFilter />

      {filtered.length === 0 ? (
        <p className="text-graphite py-8 border-t border-rule">No entries under this tag yet.</p>
      ) : (
        <div className="border-t border-rule">
          {filtered.map((entry) => (
            <Link key={entry.id} href={`/writeups/${entry.slug}`} className="group grid sm:grid-cols-12 gap-4 py-6 border-b border-rule">
              <span className="font-mono text-meta text-graphite tabular sm:col-span-2">
                {new Date(entry.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
              </span>
              <span className="font-mono text-meta text-graphite uppercase tracking-[0.12em] sm:col-span-2">{entry.tag.toLowerCase()}</span>
              <div className="sm:col-span-6">
                <h2 className="text-ink group-hover:text-accent transition-colors">{entry.title}</h2>
                <p className="text-ink/80 text-sm leading-[1.6] mt-1 max-w-prose">{entry.excerpt}</p>
              </div>
              <div className="sm:col-span-2 sm:text-right">
                {entry.readingTime && (
                  <span className="inline-flex items-center gap-1.5 font-mono text-meta text-graphite">
                    <FiClock size={11} /> {entry.readingTime}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
