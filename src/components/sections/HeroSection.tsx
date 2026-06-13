'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FiArrowRight, FiDownload, FiLinkedin, FiGithub } from 'react-icons/fi';
import { SiGooglescholar } from 'react-icons/si';

interface Profile {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  location: string;
  email: string;
  avatar: string;
  resumeUrl: string;
  social: { linkedin: string; github: string; scholar: string };
}

export default function HeroSection({ profile }: { profile: Profile }) {
  return (
    <section className="relative min-h-[calc(100vh+6rem)] flex items-center overflow-hidden bg-navy-900">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-navy-600/20 rounded-full blur-[100px]" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(148,163,184,0.06) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="section-container-wide relative z-10 pt-40 pb-28">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: text */}
          <div>
            {/* Eyebrow */}
            <div className="mb-8 animate-fade-in">
              <span className="inline-block text-sm font-mono text-accent-400 tracking-[0.2em] uppercase border border-accent-500/30 bg-accent-500/5 rounded-full px-5 py-2">
                Data Professional
              </span>
            </div>

            {/* Name */}
            <h1 className="font-display font-extrabold text-6xl sm:text-7xl lg:text-8xl text-surface-50 leading-[1.05] mb-8 tracking-tight">
              {profile.name.split(' ').slice(0, 2).join(' ')}
              <br />
              <span className="gradient-text">{profile.name.split(' ').slice(2).join(' ')}</span>
            </h1>

            {/* Title */}
            <p className="text-2xl sm:text-3xl font-medium text-surface-300 mb-3">
              {profile.title}
            </p>

            {/* Location */}
            <p className="text-base text-surface-400 font-mono mb-10">
              📍 {profile.location}
            </p>

            {/* Tagline */}
            <p className="text-surface-200 text-xl sm:text-2xl leading-relaxed max-w-xl mb-10 border-l-2 border-accent-500/50 pl-6 font-medium">
              {profile.tagline}
            </p>

            {/* Short bio */}
            <p className="text-surface-400 text-base sm:text-lg leading-relaxed max-w-xl mb-12">
              {profile.bio.slice(0, 180)}...
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Link href="/projects" className="btn-primary">
                View my work <FiArrowRight size={16} />
              </Link>
              <a href={profile.resumeUrl} download className="btn-outline">
                <FiDownload size={16} /> Download résumé
              </a>
              <Link href="/contact" className="btn-outline border-surface-600/50 text-surface-300 hover:text-surface-100 hover:border-surface-400">
                Get in touch
              </Link>
            </div>

            {/* Social */}
            <div className="flex items-center gap-6 mt-10">
              <a
                href={profile.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-base text-surface-400 hover:text-accent-400 transition-colors"
              >
                <FiLinkedin size={18} /> LinkedIn
              </a>
              <span className="dot-divider" />
              <a
                href={profile.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-base text-surface-400 hover:text-accent-400 transition-colors"
              >
                <FiGithub size={18} /> GitHub
              </a>
              <span className="dot-divider" />
              <a
                href={profile.social.scholar}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-base text-surface-400 hover:text-accent-400 transition-colors"
              >
                <SiGooglescholar size={18} /> Scholar
              </a>
            </div>
          </div>

          {/* Right: avatar card */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Glow ring */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-accent-500/20 to-navy-600/20 blur-2xl" />
              {/* Avatar */}
              <div className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-3xl overflow-hidden border border-accent-500/20 bg-navy-800">
                <Image
                  src={profile.avatar}
                  alt={profile.name}
                  fill
                  sizes="(min-width: 640px) 24rem, 18rem"
                  className="object-cover"
                  priority
                />
              </div>

              {/* Floating badges */}
              <div className="absolute -bottom-4 -left-6 bg-navy-800 border border-accent-500/30 rounded-xl px-4 py-2 text-xs font-mono">
                <span className="text-accent-400">4+</span>
                <span className="text-surface-400 ml-1">years in production</span>
              </div>
              <div className="absolute -top-4 -right-4 bg-navy-800 border border-surface-700/40 rounded-xl px-3 py-2 text-xs font-mono text-surface-300">
                <span className="text-accent-400">3</span> publications
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-28 flex justify-center">
          <div className="flex flex-col items-center gap-2 animate-bounce">
            <span className="text-xs text-surface-500 font-mono tracking-wider">scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-accent-400/50 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
