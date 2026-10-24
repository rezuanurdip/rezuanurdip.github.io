import { FiMail, FiLinkedin, FiGithub, FiDownload } from 'react-icons/fi';
import FigureHeader from '@/components/ui/FigureHeader';
import CoordinateReadout from '@/components/ui/CoordinateReadout';
import profile from '../../../data/profile.json';

export default function ContactPage() {
  const channels = [
    { label: 'Email', value: profile.email, href: `mailto:${profile.email}`, icon: FiMail },
    { label: 'LinkedIn', value: profile.social.linkedin.replace('https://', ''), href: profile.social.linkedin, icon: FiLinkedin },
    { label: 'GitHub', value: profile.social.github.replace('https://', ''), href: profile.social.github, icon: FiGithub },
  ];

  return (
    <main className="pt-28 pb-24 min-h-screen">
      <div className="section-container max-w-page">
        <FigureHeader
          label="SAY HELLO"
          title="Get in touch"
          subheading="A job opportunity, a graduate study inquiry, a research collaboration, or just to say hi — my inbox is open."
        />

        <div className="border-t border-rule max-w-xl">
          {channels.map((c) => (
            <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 py-5 border-b border-rule">
              <c.icon size={16} className="text-graphite group-hover:text-accent transition-colors shrink-0" />
              <div>
                <p className="font-mono text-meta text-graphite uppercase tracking-[0.12em]">{c.label}</p>
                <p className="text-ink group-hover:text-accent transition-colors">{c.value}</p>
              </div>
            </a>
          ))}
          <div className="flex items-center gap-4 py-5 border-b border-rule">
            <div className="w-4 shrink-0" />
            <CoordinateReadout location={profile.location} />
          </div>
        </div>

        <a href={profile.resumeUrl} download className="inline-flex items-center gap-2 text-sm text-ink hover:text-accent transition-colors mt-8">
          <FiDownload size={14} /> Download r&eacute;sum&eacute;
        </a>
      </div>
    </main>
  );
}
