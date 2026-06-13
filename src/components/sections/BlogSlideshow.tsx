'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowRight, FiExternalLink, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

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
  const [current, setCurrent] = useState(0);
  const [paused, setPaused]   = useState(false);

  const next = useCallback(() =>
    setCurrent((c) => (c + 1) % posts.length), [posts.length]);
  const prev = () =>
    setCurrent((c) => (c - 1 + posts.length) % posts.length);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 4000);
    return () => clearInterval(id);
  }, [paused, next]);

  if (!posts.length) return null;
  const post = posts[current];

  return (
    <section className="section-padding bg-navy-900">
      <div className="section-container">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="section-label">From the blog</p>
            <h2 className="section-heading mb-0">Latest writing</h2>
          </div>
          <Link href="/blog" className="hidden sm:flex items-center gap-2 text-sm text-accent-400 hover:text-accent-300 transition-colors font-medium">
            All posts <FiArrowRight size={14} />
          </Link>
        </div>

        {/* Slide navigation — sits above the card */}
        <div className="flex items-center justify-end gap-3 mb-4">
          {/* Dots */}
          <div className="flex gap-2">
            {posts.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === current
                    ? 'w-6 h-2 bg-accent-400'
                    : 'w-2 h-2 bg-surface-600 hover:bg-surface-400'
                }`}
                aria-label={`Go to post ${i + 1}`}
              />
            ))}
          </div>

          {/* Arrows */}
          <div className="flex gap-2 ml-2">
            <button
              onClick={prev}
              className="w-9 h-9 rounded-full border border-surface-700/50 flex items-center justify-center text-surface-400 hover:border-accent-500/50 hover:text-accent-400 transition-all"
              aria-label="Previous post"
            >
              <FiChevronLeft size={16} />
            </button>
            <button
              onClick={next}
              className="w-9 h-9 rounded-full border border-surface-700/50 flex items-center justify-center text-surface-400 hover:border-accent-500/50 hover:text-accent-400 transition-all"
              aria-label="Next post"
            >
              <FiChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Slideshow */}
        <div
          className="relative rounded-3xl overflow-hidden bg-navy-800 border border-surface-700/20"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Accent bar */}
          <div className="h-1 bg-gradient-to-r from-accent-500 to-accent-300"
            style={{ width: `${((current + 1) / posts.length) * 100}%`, transition: 'width 0.4s ease' }}
          />

          <div className="p-8 sm:p-12 lg:p-16 grid lg:grid-cols-2 gap-8 items-center min-h-[320px]">
            {/* Text */}
            <div>
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-5">
                {post.tags.slice(0, 3).map((t) => (
                  <span key={t} className="tag-accent">{t}</span>
                ))}
              </div>

              <h3 className="font-display font-bold text-xl sm:text-2xl text-surface-50 mb-4 leading-snug">
                {post.title}
              </h3>

              <p className="text-surface-300 text-sm leading-relaxed mb-6 max-w-lg">
                {post.summary}
              </p>

              <div className="flex items-center gap-4">
                <span className="text-xs text-surface-500 font-mono">
                  {new Date(post.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric', day: 'numeric' })}
                </span>
                {post.externalUrl ? (
                  <a
                    href={post.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm text-accent-400 hover:text-accent-300 font-medium transition-colors"
                  >
                    Read on LinkedIn <FiExternalLink size={13} />
                  </a>
                ) : (
                  <Link href={`/blog/${post.id}`} className="flex items-center gap-1.5 text-sm text-accent-400 hover:text-accent-300 font-medium transition-colors">
                    Read more <FiArrowRight size={13} />
                  </Link>
                )}
              </div>
            </div>

            {/* Thumbnail with post number & navigation */}
            <div className="relative w-full h-56 lg:h-full min-h-[260px] rounded-2xl overflow-hidden order-first lg:order-last">
              {post.thumbnail && (
                <Image
                  src={post.thumbnail}
                  alt={post.title}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/85 via-navy-900/10 to-transparent" />

              <div className="absolute inset-0 p-6 flex items-start lg:items-end justify-start lg:justify-end">
                <div className="font-mono text-7xl font-bold text-surface-50/30 select-none">
                  {String(current + 1).padStart(2, '0')}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 text-center sm:hidden">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-accent-400 font-medium">
            All posts <FiArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
