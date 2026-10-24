import { Suspense } from 'react';
import { getAllWriteUpsMeta } from '@/lib/writeups';
import WriteUpsHero from '@/components/sections/writeups/WriteUpsHero';
import WriteUpsGrid from '@/components/sections/writeups/WriteUpsGrid';

const DESCRIPTION = 'Reflections, poems, and small stories — a quiet, personal corner of the site.';
const COVER_IMAGE = {
  url: '/images/diary-og-cover.png',
  width: 1200,
  height: 630,
  alt: 'My Diary',
};

export const metadata = {
  title: 'My Diary | Rezuanur Rahman Dip',
  description: DESCRIPTION,
  openGraph: {
    title: 'My Diary',
    description: DESCRIPTION,
    url: '/writeups/',
    type: 'website',
    images: [COVER_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'My Diary',
    description: DESCRIPTION,
    images: [COVER_IMAGE.url],
  },
};

export default function WriteUpsPage() {
  const entries = getAllWriteUpsMeta();

  return (
    <main className="pt-28 pb-24 min-h-screen">
      <div className="section-container max-w-page">
        <WriteUpsHero />
        <Suspense fallback={null}>
          <WriteUpsGrid entries={entries} />
        </Suspense>
      </div>
    </main>
  );
}
