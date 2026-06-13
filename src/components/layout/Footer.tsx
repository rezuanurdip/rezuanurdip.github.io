import Link from 'next/link';
import { FiLinkedin, FiGithub, FiMail } from 'react-icons/fi';
import { SiGooglescholar } from 'react-icons/si';
import profile from '../../../data/profile.json';

export default function Footer() {
  return (
    <footer className="border-t border-surface-700/20 bg-navy-900 py-10">
      <div className="section-container flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <p className="font-display font-bold text-surface-200">
            {profile.name}
          </p>
          <p className="text-sm text-surface-400 mt-0.5">{profile.title}</p>
        </div>

        <div className="flex items-center gap-5">
          <a
            href={profile.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-surface-400 hover:text-accent-400 transition-colors"
            aria-label="LinkedIn"
          >
            <FiLinkedin size={18} />
          </a>
          <a
            href={profile.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-surface-400 hover:text-accent-400 transition-colors"
            aria-label="GitHub"
          >
            <FiGithub size={18} />
          </a>
          <a
            href={profile.social.scholar}
            target="_blank"
            rel="noopener noreferrer"
            className="text-surface-400 hover:text-accent-400 transition-colors"
            aria-label="Google Scholar"
          >
            <SiGooglescholar size={18} />
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="text-surface-400 hover:text-accent-400 transition-colors"
            aria-label="Email"
          >
            <FiMail size={18} />
          </a>
        </div>

        <p className="text-xs text-surface-500">
          © {new Date().getFullYear()} {profile.name.split(' ')[0]}. Built with Next.js.
        </p>
      </div>
    </footer>
  );
}
