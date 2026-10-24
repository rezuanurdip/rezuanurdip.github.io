'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface PortraitProps {
  src: string;
  alt: string;
  location: string;
  matOffsetPx: number;
  sizes: string;
  delayMs?: number;
}

// A framed portrait: hairline "mat" offset behind the photo, a clip-path wipe
// reveal on first load, and a mono location caption aligned to the photo's
// left edge. The mat sits inside the same footprint via padding (box-sizing:
// border-box), so it never adds extra width to the layout.
export default function Portrait({ src, alt, location, matOffsetPx, sizes, delayMs = 0 }: PortraitProps) {
  const [revealed, setRevealed] = useState(false);
  const [matVisible, setMatVisible] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setReduceMotion(rm);
    if (rm) {
      setRevealed(true);
      setMatVisible(true);
      return;
    }
    const raf = requestAnimationFrame(() => setRevealed(true));
    const matTimer = setTimeout(() => setMatVisible(true), delayMs + 900 + 200);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(matTimer);
    };
  }, [delayMs]);

  return (
    <div>
      <div className="relative" style={{ paddingRight: matOffsetPx, paddingBottom: matOffsetPx }}>
        {/* mat frame: hairline rule, offset down-right, behind the photo */}
        <div
          aria-hidden="true"
          className="absolute border border-rule transition-opacity duration-300"
          style={{
            top: matOffsetPx,
            left: matOffsetPx,
            right: 0,
            bottom: 0,
            opacity: matVisible ? 1 : 0,
          }}
        />
        <div
          className="relative w-full aspect-[4/5]"
          style={{
            clipPath: revealed ? 'inset(0% 0 0 0)' : 'inset(100% 0 0 0)',
            transition: reduceMotion ? 'none' : `clip-path 900ms cubic-bezier(0.2, 0.7, 0.2, 1) ${delayMs}ms`,
          }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority
            className="object-cover"
            style={{ objectPosition: '50% 20%' }}
          />
        </div>
      </div>
      <p className="font-mono text-meta uppercase tracking-[0.12em] text-graphite mt-3">{location}</p>
    </div>
  );
}
