import Link from 'next/link';
import { FiArrowRight, FiLinkedin } from 'react-icons/fi';

interface Profile {
  name: string;
  social: { linkedin: string };
}

export default function CTASection({ profile }: { profile: Profile }) {
  return (
    <section className="section-padding bg-navy-900">
      <div className="section-container">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-navy-800 via-navy-800 to-accent-900/30 border border-accent-500/20 p-12 lg:p-20 text-center">
          {/* Background */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-accent-500/10 blur-[80px]" />
          </div>

          <div className="relative">
            <p className="section-label mb-4">Let&apos;s connect</p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-surface-50 mb-4">
              Open to graduate study & <br className="hidden sm:block" />
              <span className="gradient-text">global opportunities</span>
            </h2>
            <p className="text-surface-300 text-lg max-w-xl mx-auto mb-10">
              If you&apos;re looking for a data scientist with production experience, a research collaborator,
              or considering my graduate application — I&apos;d love to hear from you.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact" className="btn-primary text-base px-8 py-3.5">
                Get in touch <FiArrowRight size={16} />
              </Link>
              <a
                href={profile.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline text-base px-8 py-3.5"
              >
                <FiLinkedin size={16} /> Connect on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
