import { FiMail, FiLinkedin, FiGithub, FiDownload, FiMapPin } from 'react-icons/fi';
import profile from '../../../data/profile.json';

export default function ContactPage() {
  return (
    <main className="pt-24 pb-20 bg-navy-900 min-h-screen">
      <div className="section-container max-w-2xl">
        <div className="mb-14 text-center">
          <p className="section-label">Say hello</p>
          <h1 className="section-heading text-5xl">Get in touch</h1>
          <p className="section-subheading mx-auto">
            Whether it&apos;s a job opportunity, graduate study inquiry, research collaboration, or just to say hi — my inbox is open.
          </p>
        </div>

        <div className="space-y-5">
          <div className="card space-y-5">
            <h3 className="text-sm font-mono text-surface-400 uppercase tracking-wider">Direct channels</h3>

            <a href={`mailto:${profile.email}`}
              className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-lg bg-accent-500/10 border border-accent-500/20 flex items-center justify-center shrink-0 group-hover:bg-accent-500/20 transition-colors">
                <FiMail size={15} className="text-accent-400" />
              </div>
              <div>
                <p className="text-xs text-surface-500 font-mono">Email</p>
                <p className="text-sm text-surface-200 group-hover:text-accent-300 transition-colors">{profile.email}</p>
              </div>
            </a>

            <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-lg bg-accent-500/10 border border-accent-500/20 flex items-center justify-center shrink-0 group-hover:bg-accent-500/20 transition-colors">
                <FiLinkedin size={15} className="text-accent-400" />
              </div>
              <div>
                <p className="text-xs text-surface-500 font-mono">LinkedIn</p>
                <p className="text-sm text-surface-200 group-hover:text-accent-300 transition-colors">rezuanur-rahman-dip</p>
              </div>
            </a>

            <a href={profile.social.github} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-lg bg-accent-500/10 border border-accent-500/20 flex items-center justify-center shrink-0 group-hover:bg-accent-500/20 transition-colors">
                <FiGithub size={15} className="text-accent-400" />
              </div>
              <div>
                <p className="text-xs text-surface-500 font-mono">GitHub</p>
                <p className="text-sm text-surface-200 group-hover:text-accent-300 transition-colors">rezuanurdip</p>
              </div>
            </a>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-surface-700/20 border border-surface-700/20 flex items-center justify-center shrink-0">
                <FiMapPin size={15} className="text-surface-400" />
              </div>
              <div>
                <p className="text-xs text-surface-500 font-mono">Location</p>
                <p className="text-sm text-surface-300">{profile.location}</p>
              </div>
            </div>
          </div>

          <a href={profile.resumeUrl} download className="btn-outline w-full justify-center py-3">
            <FiDownload size={15} /> Download résumé
          </a>
        </div>
      </div>
    </main>
  );
}
