import Link from 'next/link';
import Image from 'next/image';
import { FiArrowRight, FiExternalLink } from 'react-icons/fi';
import FigureHeader from '@/components/ui/FigureHeader';

interface Post {
  id: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  thumbnail?: string;
  externalUrl?: string;
  featured: boolean;
}

export default function BlogSlideshow({ posts }: { posts: Post[] }) {
  if (!posts.length) return null;
  const post = [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

  return (
    <section className="py-24 lg:py-40 border-t border-rule">
      <div className="section-container">
        <FigureHeader label="FROM THE BLOG" title="Latest writing" />

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="font-mono text-meta text-graphite tabular mb-4">
              {new Date(post.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric', day: 'numeric' })}
              {'  /  '}
              {post.tags.slice(0, 3).join(' / ').toLowerCase()}
            </p>
            <h3 className="text-h2 font-medium text-ink mb-4 leading-tight">{post.title}</h3>
            <p className="text-ink/80 text-base leading-[1.6] max-w-prose mb-6">{post.summary}</p>
            {post.externalUrl ? (
              <a
                href={post.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-ink hover:text-accent transition-colors"
              >
                Read on LinkedIn <FiExternalLink size={13} />
              </a>
            ) : (
              <Link href={`/blog/${post.id}`} className="inline-flex items-center gap-1.5 text-sm text-ink hover:text-accent transition-colors">
                Read more <FiArrowRight size={13} />
              </Link>
            )}
          </div>

          {post.thumbnail && (
            <div className="group relative w-full aspect-[16/10] border border-rule hover:border-ink transition-colors overflow-hidden">
              <Image
                src={post.thumbnail}
                alt={post.title}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </div>
          )}
        </div>

        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-graphite hover:text-ink transition-colors mt-10">
          All posts <FiArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
}
