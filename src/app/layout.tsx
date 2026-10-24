import type { Metadata } from 'next';
import { Manrope, IBM_Plex_Mono } from 'next/font/google';
import '@/styles/globals.css';
import Navbar from '@/components/layout/Navbar';
import profile from '../../data/profile.json';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  display: 'swap',
  adjustFontFallback: true,
  variable: '--font-sans',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  adjustFontFallback: true,
  variable: '--font-mono',
});

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

const themeInitScript = `
(function () {
  try {
    var stored = window.localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') {
      document.documentElement.setAttribute('data-theme', stored);
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${manrope.variable} ${plexMono.variable} scroll-smooth`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="bg-paper text-ink antialiased">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
