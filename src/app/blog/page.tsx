import Link from 'next/link';
import Image from 'next/image';
import { FiExternalLink, FiArrowRight } from 'react-icons/fi';
import FigureHeader from '@/components/ui/FigureHeader';
import blogPosts from '../../../data/blog.json';

export default function BlogPage() {
  const sorted = [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <main className="pt-28 pb-24 min-h-screen">
      <div className="section-container max-w-page">
        <FigureHeader
          label="WRITING"
          title="Blog"
          subheading="Notes on data engineering, ML in production, and geospatial analytics. Most posts are published on LinkedIn."
        />

        <div className="border-t border-rule">
          {sorted.map((post) => (
            <article key={post.id} className="grid sm:grid-cols-[1fr_200px] gap-6 py-8 border-b border-rule">
              <div>
                <p className="font-mono text-meta text-graphite tabular mb-3">
                  {new Date(post.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                  {'  /  '}
                  {post.tags.slice(0, 3).join(' / ').toLowerCase()}
                </p>
                <h2 className="text-h3 text-ink mb-3 leading-snug">{post.title}</h2>
                <p className="text-ink/80 text-sm leading-[1.6] mb-4 max-w-prose">{post.summary}</p>
                {post.externalUrl ? (
                  <a href={post.externalUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-ink hover:text-accent transition-colors">
                    Read on LinkedIn <FiExternalLink size={12} />
                  </a>
                ) : (
                  <Link href={`/blog/${post.id}`} className="inline-flex items-center gap-1.5 text-sm text-ink hover:text-accent transition-colors">
                    Read more <FiArrowRight size={12} />
                  </Link>
                )}
              </div>
              {post.thumbnail && (
                <div className="group relative w-full aspect-[16/10] sm:h-full border border-rule hover:border-ink transition-colors overflow-hidden order-first sm:order-last">
                  <Image
                    src={post.thumbnail}
                    alt={post.title}
                    fill
                    sizes="200px"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
