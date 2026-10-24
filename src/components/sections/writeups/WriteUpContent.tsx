import Link from 'next/link';
import { FiArrowLeft, FiClock } from 'react-icons/fi';
import type { WriteUp } from '@/types/writeup';

export default function WriteUpContent({ entry }: { entry: WriteUp }) {
  return (
    <article className="max-w-prose mx-auto">
      <Link href="/writeups" className="inline-flex items-center gap-1.5 text-sm text-graphite hover:text-ink transition-colors mb-10">
        <FiArrowLeft size={14} /> back to diary
      </Link>

      <p className="font-mono text-meta uppercase tracking-[0.12em] text-graphite mb-4">
        {entry.tag.toLowerCase()} &middot;{' '}
        {new Date(entry.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
        {entry.readingTime && (
          <>
            {' '}
            &middot; <FiClock size={11} className="inline -mt-0.5" /> {entry.readingTime}
          </>
        )}
      </p>

      <h1 className="text-h2 font-medium text-ink mb-10 leading-tight">{entry.title}</h1>

      <div className="prose-diary text-ink text-base leading-[1.7]" dangerouslySetInnerHTML={{ __html: entry.content }} />
    </article>
  );
}
