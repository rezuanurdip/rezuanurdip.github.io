import type { Metadata } from 'next';

// The diary is hidden from navigation; keep it out of search indexes too.
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function WriteupsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
