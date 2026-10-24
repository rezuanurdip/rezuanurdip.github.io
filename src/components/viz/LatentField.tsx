'use client';

import { useEffect, useMemo, useRef } from 'react';
import { generateLatentField } from '@/lib/viz/latentField';

const SEED = 2026;
const COUNT = 320;

// Portrait avoid-zone in the shared 0-100 viewBox: top-right quadrant, anchored
// right and top, 4:5 aspect (width 48 -> height 60 in this uniform-scale box).
// Margin is padded a little extra to clear the mat frame's 14px offset too.
const AVOID = { x: 52, y: 0, w: 48, h: 60, margin: 8 };

export default function LatentField({ variant = 'full' }: { variant?: 'full' | 'band' }) {
  const field = useMemo(() => generateLatentField(SEED, COUNT, variant === 'full' ? AVOID : undefined), [variant]);
  const svgRef = useRef<SVGSVGElement>(null);
  const pointRefs = useRef<(SVGCircleElement | null)[]>([]);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || variant === 'band') return;

    const handleMove = (e: MouseEvent) => {
      const rect = svg.getBoundingClientRect();
      const px = ((e.clientX - rect.left) / rect.width) * 100;
      const py = ((e.clientY - rect.top) / rect.height) * 100;
      field.points.forEach((p, i) => {
        const el = pointRefs.current[i];
        if (!el) return;
        const d = Math.hypot(p.x - px, p.y - py);
        const boost = Math.max(0, 1 - d / 10);
        const base = 0.35 + 0.2 * p.edgeFade;
        el.style.opacity = String((base + boost * 0.4) * p.edgeFade);
      });
    };

    const handleLeave = () => {
      pointRefs.current.forEach((el, i) => {
        if (!el) return;
        const p = field.points[i];
        const base = p.cluster === field.accentCluster ? 0.7 : 0.4;
        el.style.opacity = String(base * p.edgeFade);
      });
    };

    svg.addEventListener('mousemove', handleMove);
    svg.addEventListener('mouseleave', handleLeave);

    return () => {
      svg.removeEventListener('mousemove', handleMove);
      svg.removeEventListener('mouseleave', handleLeave);
    };
  }, [field, variant]);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 100 100"
      role="img"
      aria-label="A two-dimensional embedding projection of 320 observations forming four well-separated clusters, with a faint density contour around each and a nearest-neighbour link from one highlighted cluster to its closest neighbour."
      className="w-full h-full"
      preserveAspectRatio={variant === 'band' ? 'xMidYMid slice' : 'xMidYMid meet'}
    >
      {field.clusters.map((c, i) => (
        <ellipse
          key={`contour-${i}`}
          cx={c.cx}
          cy={c.cy}
          rx={c.rx}
          ry={c.ry}
          fill="none"
          stroke="var(--rule)"
          strokeWidth={0.2}
          opacity={0.9}
        />
      ))}

      <line
        x1={field.link.x1}
        y1={field.link.y1}
        x2={field.link.x2}
        y2={field.link.y2}
        stroke="var(--accent)"
        strokeWidth={0.25}
        opacity={0.7}
      />

      {field.points.map((p, i) => (
        <circle
          key={i}
          ref={(el) => {
            pointRefs.current[i] = el;
          }}
          cx={p.x}
          cy={p.y}
          r={p.cluster === field.accentCluster ? 0.42 : 0.36}
          fill={p.cluster === field.accentCluster ? 'var(--accent)' : 'var(--graphite)'}
          opacity={0}
          style={{
            animation: `latent-fade-in 400ms cubic-bezier(0.2,0.7,0.2,1) forwards`,
            animationDelay: `${p.cluster * 220}ms`,
            ['--target-opacity' as string]: p.cluster === field.accentCluster
              ? 0.7 * p.edgeFade
              : 0.4 * p.edgeFade,
          }}
        />
      ))}

      <style>{`
        @keyframes latent-fade-in {
          from { opacity: 0; }
          to { opacity: var(--target-opacity); }
        }
        @media (prefers-reduced-motion: reduce) {
          svg circle { animation: none !important; opacity: var(--target-opacity) !important; }
        }
      `}</style>
    </svg>
  );
}
