'use client';

import { useReveal } from '@/lib/useReveal';
import { noOrphan } from '@/lib/typography';

// The one-sentence summary is the bio's first sentence.
function firstSentence(text: string): string {
  const match = text.match(/^[^.]+\./);
  return match ? match[0] : text;
}

export default function StatementBand({ tagline, bio }: { tagline: string; bio: string }) {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section className="border-t border-rule py-24 md:py-[160px]">
      <div className="section-container">
        <div className="grid grid-cols-12 gap-x-6">
          <div ref={ref} className="reveal-statement col-span-12 lg:col-start-2 lg:col-span-9">
            <h2 className="text-statement text-ink max-w-[18ch]">{noOrphan(tagline)}</h2>
            <p className="text-graphite max-w-prose mt-10">{firstSentence(bio)}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
