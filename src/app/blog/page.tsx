import Link from 'next/link';
import Image from 'next/image';
import { FiExternalLink, FiArrowRight, FiCalendar, FiTag } from 'react-icons/fi';
import blogPosts from '../../../data/blog.json';

export default function BlogPage() {
  const sorted = [...blogPosts].sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <main className="pt-24 pb-20 bg-navy-900 min-h-screen">
      <div className="section-container max-w-4xl">
        <div className="mb-14">
          <p className="section-label">Writing</p>
          <h1 className="section-heading text-5xl">Blog</h1>
          <p className="section-subheading">
            Thoughts on data engineering, ML in production, geospatial analytics, and building a career in data science.
            Most articles are published on LinkedIn — click through to read.
          </p>
        </div>

        <div className="space-y-5">
          {sorted.map((post) => (
            <article key={post.id} className="card card-hover group">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                {post.thumbnail && (
                  <div className="relative w-full sm:w-40 h-40 sm:h-28 rounded-xl overflow-hidden shrink-0 order-first sm:order-last bg-navy-700/60">
                    <Image
                      src={post.thumbnail}
                      alt={post.title}
                      fill
                      sizes="(min-width: 640px) 10rem, 100vw"
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {post.tags.slice(0, 3).map((t) => (
                      <span key={t} className="tag-accent text-xs">{t}</span>
                    ))}
                  </div>

                  <h2 className="font-display font-semibold text-surface-100 mb-2 group-hover:text-accent-300 transition-colors leading-snug">
                    {post.title}
                  </h2>

                  <p className="text-sm text-surface-400 leading-relaxed mb-4">
                    {post.summary}
                  </p>

                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5 text-xs text-surface-500 font-mono">
                      <FiCalendar size={11} />
                      {new Date(post.date).toLocaleDateString('en-US', {
                        day: 'numeric', month: 'short', year: 'numeric'
                      })}
                    </span>

                    {post.externalUrl ? (
                      <a
                        href={post.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-sm text-accent-400 hover:text-accent-300 font-medium transition-colors"
                      >
                        Read on LinkedIn <FiExternalLink size={12} />
                      </a>
                    ) : (
                      <Link
                        href={`/blog/${post.id}`}
                        className="flex items-center gap-1.5 text-sm text-accent-400 hover:text-accent-300 font-medium transition-colors"
                      >
                        Read more <FiArrowRight size={12} />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
