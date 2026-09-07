import type { Metadata } from 'next';
import '@/styles/globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import profile from '../../data/profile.json';

export const metadata: Metadata = {
  metadataBase: new URL('https://rezuanurdip.github.io'),
  title: `${profile.name} — ${profile.title}`,
  description: profile.bio,
  keywords: ['Data Scientist', 'Analytics Engineer', 'Machine Learning', 'Robi Axiata', 'Bangladesh', 'Geospatial', 'LLM'],
  authors: [{ name: profile.name }],
  openGraph: {
    title: `${profile.name} — ${profile.title}`,
    description: profile.tagline,
    type: 'website',
    locale: 'en_US',
    images: [{ url: '/images/display.png', width: 1200, height: 630, alt: profile.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${profile.name} — ${profile.title}`,
    description: profile.tagline,
    images: ['/images/display.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-navy-900 text-surface-100 antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
