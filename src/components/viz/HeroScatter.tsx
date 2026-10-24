'use client';

import { useEffect, useRef } from 'react';
import { mulberry32, gaussian } from '@/lib/viz/random';

const SEED = 2026;
const COUNT = 220;
const RADIUS = 1.4;
const FEATHER = 40; // px of soft falloff around every avoid rect
const DRIFT_START_MS = 1100 + 800; // after the entrance fade-in completes

interface Dot {
  nx: number; // normalised 0-1 position within the hero
  ny: number;
  alpha: number;
  accent: boolean;
  amp: number; // drift radius, px
  omega: number; // rad/ms
  phaseX: number;
  phaseY: number;
}

// Cluster centres in normalised hero space; the accent cluster sits low and
// between the text and portrait columns so it stays visible on desktop.
const CLUSTERS = [
  { cx: 0.5, cy: 0.9, sd: 0.08, accent: true },
  { cx: 0.1, cy: 0.12, sd: 0.1, accent: false },
  { cx: 0.62, cy: 0.08, sd: 0.09, accent: false },
  { cx: 0.93, cy: 0.88, sd: 0.07, accent: false },
];

function makeDots(): Dot[] {
  const rng = mulberry32(SEED);
  const dots: Dot[] = [];
  for (let i = 0; i < COUNT; i++) {
    const c = rng() < 0.65 ? CLUSTERS[Math.floor(rng() * CLUSTERS.length)] : null;
    const nx = c ? c.cx + gaussian(rng, 0, c.sd) : rng();
    const ny = c ? c.cy + gaussian(rng, 0, c.sd * 1.4) : rng();
    const accent = !!c?.accent;
    const period = 12000 + rng() * 8000;
    dots.push({
      nx: Math.min(1, Math.max(0, nx)),
      ny: Math.min(1, Math.max(0, ny)),
      alpha: accent ? 0.45 : 0.2 + rng() * 0.15,
      accent,
      amp: 3 + rng() * 3,
      omega: (Math.PI * 2) / period,
      phaseX: rng() * Math.PI * 2,
      phaseY: rng() * Math.PI * 2,
    });
  }
  return dots;
}

// Atmosphere behind the hero: one canvas, one rAF loop, no per-point React state.
// Elements marked data-scatter-avoid inside the hero are masked with a soft feather.
export default function HeroScatter() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dots = makeDots();
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isStatic = host.dataset.static === 'true';

    let w = 0;
    let h = 0;
    let dpr = 1;
    let xs: number[] = [];
    let ys: number[] = [];
    let masks: number[] = []; // per-dot feather multiplier 0-1
    let colors = { gray: '#5a5a57', accent: '#3a48b8' };
    let raf = 0;
    let running = false;
    let inView = true;
    let t0 = 0;

    const readColors = () => {
      const cs = getComputedStyle(document.documentElement);
      colors = {
        gray: cs.getPropertyValue('--graphite').trim() || colors.gray,
        accent: cs.getPropertyValue('--accent').trim() || colors.accent,
      };
    };

    const layout = () => {
      const r = host.getBoundingClientRect();
      w = r.width;
      h = r.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      const rects = Array.from(host.querySelectorAll<HTMLElement>('[data-scatter-avoid]')).map((el) => {
        const b = el.getBoundingClientRect();
        return { l: b.left - r.left, t: b.top - r.top, r: b.right - r.left, b: b.bottom - r.top };
      });
      xs = dots.map((d) => d.nx * w);
      ys = dots.map((d) => d.ny * h);
      masks = dots.map((_, i) => {
        let m = 1;
        for (const q of rects) {
          const dx = Math.max(q.l - xs[i], 0, xs[i] - q.r);
          const dy = Math.max(q.t - ys[i], 0, ys[i] - q.b);
          m = Math.min(m, Math.min(1, Math.hypot(dx, dy) / FEATHER));
        }
        return m;
      });
    };

    const draw = (now: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const t = now - t0;
      const drifting = !reduceMotion && t > 0;
      for (let i = 0; i < dots.length; i++) {
        const m = masks[i];
        if (m <= 0.01) continue;
        const d = dots[i];
        const x = xs[i] + (drifting ? Math.cos(t * d.omega + d.phaseX) * d.amp : 0);
        const y = ys[i] + (drifting ? Math.sin(t * d.omega + d.phaseY) * d.amp : 0);
        ctx.globalAlpha = d.alpha * m;
        ctx.fillStyle = d.accent ? colors.accent : colors.gray;
        ctx.beginPath();
        ctx.arc(x, y, RADIUS, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const frame = (now: number) => {
      draw(now);
      raf = requestAnimationFrame(frame);
    };

    const sync = () => {
      const shouldRun = !reduceMotion && inView && !document.hidden;
      if (shouldRun && !running) {
        running = true;
        raf = requestAnimationFrame(frame);
      } else if (!shouldRun && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    };

    const redraw = () => draw(performance.now());

    readColors();
    layout();
    // Drift begins once the fade-in has finished (immediately when no entrance plays).
    t0 = performance.now() + (isStatic ? 0 : DRIFT_START_MS);
    redraw();
    sync();

    const ro = new ResizeObserver(() => {
      layout();
      redraw();
    });
    ro.observe(host);
    host.querySelectorAll('[data-scatter-avoid]').forEach((el) => ro.observe(el));

    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    });
    io.observe(host);

    document.addEventListener('visibilitychange', sync);

    // Re-read the palette when the theme changes.
    const onTheme = () => {
      readColors();
      redraw();
    };
    const themeObserver = new MutationObserver(onTheme);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener('change', onTheme);

    // Late-loading fonts shift the text boxes; re-measure the masks.
    document.fonts?.ready.then(() => {
      layout();
      redraw();
    });

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      themeObserver.disconnect();
      mq.removeEventListener('change', onTheme);
      document.removeEventListener('visibilitychange', sync);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="hero-fade absolute inset-0 w-full h-full pointer-events-none"
      style={{ ['--hero-delay' as string]: '1100ms', ['--hero-dur' as string]: '800ms' }}
    />
  );
}
