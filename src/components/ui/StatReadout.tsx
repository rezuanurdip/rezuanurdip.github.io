'use client';

import { useCountUp } from '@/lib/useCountUp';

export default function StatReadout({ value, label }: { value: string; label: string }) {
  const { ref, display } = useCountUp(value);
  return (
    <div>
      <span ref={ref} className="block font-mono text-4xl lg:text-5xl tabular text-ink tracking-tight">
        {display}
      </span>
      <p className="font-mono text-meta uppercase tracking-[0.12em] text-graphite mt-2 max-w-[22ch]">{label}</p>
    </div>
  );
}
