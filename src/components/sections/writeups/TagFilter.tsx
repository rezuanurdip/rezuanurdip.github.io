'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { TAGS } from '@/lib/writeupTags';

export default function TagFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeTag = searchParams.get('tag');

  const setTag = (tag: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (tag) {
      params.set('tag', tag);
    } else {
      params.delete('tag');
    }
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  };

  return (
    <div className="flex flex-wrap gap-x-5 gap-y-2 mb-8 font-mono text-meta uppercase tracking-[0.12em]">
      <button onClick={() => setTag(null)} className={`transition-colors ${!activeTag ? 'text-accent' : 'text-graphite hover:text-ink'}`}>
        all
      </button>
      {TAGS.map((tag) => (
        <button
          key={tag}
          onClick={() => setTag(tag)}
          className={`transition-colors ${activeTag === tag ? 'text-accent' : 'text-graphite hover:text-ink'}`}
        >
          {tag.toLowerCase()}
        </button>
      ))}
    </div>
  );
}
