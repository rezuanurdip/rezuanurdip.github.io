import { notFound } from 'next/navigation';
import { getAllWriteUpSlugs, getWriteUpBySlug } from '@/lib/writeups';
import WriteUpContent from '@/components/sections/writeups/WriteUpContent';

export function generateStaticParams() {
  return getAllWriteUpSlugs().map((slug) => ({ slug }));
}

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const entry = await getWriteUpBySlug(slug);
  if (!entry) return {};

  const url = `/writeups/${entry.slug}/`;
  const image = {
    url: '/images/diary-og-cover.png',
    width: 1200,
    height: 630,
    alt: entry.title,
  };

  return {
    title: `${entry.title} | My Diary`,
    description: entry.excerpt,
    openGraph: {
      title: entry.title,
      description: entry.excerpt,
      url,
      type: 'article',
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title: entry.title,
      description: entry.excerpt,
      images: [image.url],
    },
  };
}

export default async function WriteUpDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const entry = await getWriteUpBySlug(slug);
  if (!entry) notFound();

  return (
    <main className="pt-28 pb-24 min-h-screen">
      <div className="section-container">
        <WriteUpContent entry={entry} />
      </div>
    </main>
  );
}
