import Link from 'next/link';

export default function WriteUpNotFound() {
  return (
    <main className="pt-28 pb-24 min-h-screen flex items-center justify-center">
      <div className="text-center px-4">
        <p className="meta-label mb-3">404</p>
        <h1 className="text-h2 font-medium text-ink mb-8">That entry doesn&apos;t exist.</h1>
        <Link href="/writeups" className="text-accent hover:text-ink transition-colors">
          Back to diary
        </Link>
      </div>
    </main>
  );
}
