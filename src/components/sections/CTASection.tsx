'use client';

import { useState } from 'react';
import { FiLinkedin, FiGithub } from 'react-icons/fi';
import { SiGooglescholar } from 'react-icons/si';

interface Profile {
  name: string;
  email: string;
  social: { linkedin: string; github: string; scholar: string };
}

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // clipboard API unavailable — no-op, the address is still visible and selectable
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label="Copy email address"
      className="font-mono text-meta uppercase tracking-[0.12em] text-graphite hover:text-ink transition-colors shrink-0"
    >
      <span aria-hidden="true">{copied ? 'COPIED' : 'COPY'}</span>
      <span className="sr-only" aria-live="polite">
        {copied ? 'Email address copied to clipboard' : ''}
      </span>
    </button>
  );
}

const PROFILE_LINKS = (profile: Profile) => [
  { label: 'LinkedIn', href: profile.social.linkedin, icon: FiLinkedin },
  { label: 'GitHub', href: profile.social.github, icon: FiGithub },
  { label: 'Google Scholar', href: profile.social.scholar, icon: SiGooglescholar },
];

export default function CTASection({ profile }: { profile: Profile }) {
  return (
    <section className="py-24 lg:py-40 border-t border-rule">
      <div className="section-container">
        <h2 className="text-h2 font-medium text-ink text-balance max-w-3xl mb-6">
          Open to graduate study and <span className="text-accent">global</span> opportunities.
        </h2>
        <p className="text-ink/80 text-lg max-w-xl leading-[1.6]">
          If you&apos;re looking for a data scientist with production experience, a research
          collaborator, or considering my graduate application &mdash; I&apos;d love to hear from
          you.
        </p>

        <div className="flex items-center gap-4 mt-10">
          <a
            href={`mailto:${profile.email}`}
            className="text-ink hover:text-accent transition-colors text-[28px] sm:text-[36px] leading-tight break-all"
          >
            {profile.email}
          </a>
          <CopyButton value={profile.email} />
        </div>

        <div className="flex flex-wrap gap-3 mt-6">
          {PROFILE_LINKS(profile).map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${link.label} profile (opens in new tab)`}
              className="font-mono text-sm uppercase tracking-[0.12em] text-ink border border-ink px-5 py-3.5 hover:bg-ink hover:text-paper transition-colors duration-150"
            >
              {link.label} &#8599;
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
