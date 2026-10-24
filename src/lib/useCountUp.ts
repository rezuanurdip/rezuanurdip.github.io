'use client';

import { useEffect, useRef, useState } from 'react';

// Parses a stat string like "121M", "50M+", "300+", "80%" into a numeric
// target + suffix, then counts up once when the element scrolls into view.
export function useCountUp(raw: string) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(raw.replace(/[\d.]+/, '0'));
  const started = useRef(false);

  useEffect(() => {
    const match = raw.match(/[\d.]+/);
    if (!match) {
      setDisplay(raw);
      return;
    }
    const target = parseFloat(match[0]);
    const prefix = raw.slice(0, match.index);
    const suffix = raw.slice((match.index ?? 0) + match[0].length);
    const decimals = match[0].includes('.') ? match[0].split('.')[1].length : 0;
    // "%" reads fine mid-count (e.g. "3%"); "M+"/"+" could be misread as the
    // final value, so those suffixes only appear once the count finishes.
    const suffixDuringCount = suffix === '%' ? suffix : '';

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      setDisplay(raw);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const duration = 900;
            const startTime = performance.now();
            const tick = (now: number) => {
              const progress = Math.min(1, (now - startTime) / duration);
              const eased = 1 - Math.pow(1 - progress, 3);
              const value = target * eased;
              const currentSuffix = progress >= 1 ? suffix : suffixDuringCount;
              setDisplay(`${prefix}${value.toFixed(decimals)}${currentSuffix}`);
              if (progress < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [raw]);

  return { ref, display };
}
