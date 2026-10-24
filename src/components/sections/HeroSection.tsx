'use client';

import { useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import HeroScatter from '@/components/viz/HeroScatter';
import CoordinateReadout from '@/components/ui/CoordinateReadout';
import Portrait from '@/components/ui/Portrait';

interface Profile {
  name: string;
  title: string;
  location: string;
  avatar: string;
  resumeUrl: string;
}

const DISCIPLINES = [
  'Data Science',
  'Data Engineering',
  'Business Intelligence',
  'Data Visualization',
  'Statistics',
  'AI',
  'Geo Analytics',
];

// The entrance plays on a full page load only; coming back to the home page
// through client-side navigation within the same page lifetime skips it.
let entrancePlayed = false;

const delay = (ms: number) => ({ ['--hero-delay' as string]: `${ms}ms` });

export default function HeroSection({ profile }: { profile: Profile }) {
  const ref = useRef<HTMLElement>(null);
  const [first, ...rest] = profile.name.split(' ');

  useLayoutEffect(() => {
    if (entrancePlayed && ref.current) ref.current.dataset.static = 'true';
    entrancePlayed = true;
  }, []);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden flex items-center mt-[var(--nav-h)] py-16 lg:py-20 min-h-[calc(100svh-var(--nav-h))]"
    >
      <HeroScatter />

      <div className="section-container relative w-full">
        {/* Discipline line: terms never break internally */}
        <p
          data-scatter-avoid
          className="hero-fade w-fit max-w-full font-mono text-[11px] uppercase tracking-[0.14em] leading-[1.9] text-graphite"
          style={{ ['--hero-dur' as string]: '400ms', ...delay(0) }}
        >
          {DISCIPLINES.map((d, i) => (
            <span key={d}>
              <span className="whitespace-nowrap">{d}</span>
              {i < DISCIPLINES.length - 1 && <span className="px-[0.35em]"> &middot; </span>}
            </span>
          ))}
        </p>

        <div className="mt-12 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-x-12 gap-y-14">
          <div className="min-w-0">
            <h1 data-scatter-avoid className="text-display text-ink w-fit [word-spacing:0.08em]">
              <span className="hero-mask">
                <span className="hero-rise" style={delay(150)}>
                  {first}
                </span>
              </span>
              <span className="hero-mask font-normal">
                <span className="hero-rise" style={delay(300)}>
                  {rest.join(' ')}
                </span>
              </span>
            </h1>

            <div
              data-scatter-avoid
              className="hero-fade mt-7 w-fit flex flex-wrap items-baseline gap-x-3 gap-y-1"
              style={delay(500)}
            >
              <p className="text-[20px] leading-[1.4] text-graphite">{profile.title}</p>
              <CoordinateReadout location={profile.location} inline />
            </div>

            <div
              data-scatter-avoid
              className="hero-fade mt-10 w-fit flex flex-wrap gap-x-8 gap-y-3"
              style={delay(900)}
            >
              <Link href="/projects" className="group inline-flex items-baseline gap-2 text-[15px] text-ink">
                <span className="link-underline">View work</span>
                <span className="link-arrow" aria-hidden="true">&rarr;</span>
              </Link>
              <a href={profile.resumeUrl} download className="group inline-flex items-baseline gap-2 text-[15px] text-ink">
                <span className="link-underline">R&eacute;sum&eacute;</span>
                <span className="link-arrow" aria-hidden="true">&rarr;</span>
              </a>
              <Link href="/contact" className="group inline-flex items-baseline gap-2 text-[15px] text-ink">
                <span className="link-underline">Contact</span>
                <span className="link-arrow" aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>

          <div
            data-scatter-avoid
            className="shrink-0 w-full max-w-[300px] lg:max-w-none lg:w-[clamp(240px,20vw,300px)]"
          >
            <Portrait
              src={profile.avatar}
              alt={profile.name}
              location={profile.location.toUpperCase()}
              matOffsetPx={14}
              sizes="300px"
              delayMs={600}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
