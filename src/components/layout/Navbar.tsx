'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { label: 'About', href: '/about' },
  { label: 'Experience', href: '/experience' },
  { label: 'Projects', href: '/projects' },
  { label: 'Publications', href: '/publications' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => {
      const y = window.scrollY;
      setHidden(y > lastY.current && y > 80);
      lastY.current = y;
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-paper/90 backdrop-blur-sm border-b border-rule transition-transform duration-300 ${
        hidden ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="section-container flex items-center justify-between h-14">
        <Link href="/" className="font-mono text-[13px] font-medium tracking-[0.12em] text-ink hover:text-accent transition-colors">
          RRD
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((l) => {
            const active = pathname === l.href || pathname?.startsWith(`${l.href}/`);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`text-sm transition-colors relative pb-[7px] ${
                  active ? 'text-ink' : 'text-graphite hover:text-ink'
                }`}
              >
                {l.label}
                {active && <span className="absolute left-0 -bottom-0 translate-y-[6px] h-px w-full bg-accent" />}
              </Link>
            );
          })}
          <a
            href="/Rezuanur_Rahman_Dip_Resume.pdf"
            download
            className="text-sm text-graphite hover:text-ink transition-colors font-mono"
          >
            résumé
          </a>
          <ThemeToggle />
        </nav>

        <button
          className="lg:hidden text-ink"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className="font-mono text-sm">{open ? 'close' : 'menu'}</span>
        </button>
      </div>
    </header>

    {open && (
      <div className="lg:hidden fixed inset-x-0 bottom-0 top-14 z-40 bg-paper flex flex-col gap-5 px-6 py-8 overflow-y-auto">
        {navLinks.map((l) => {
          const active = pathname === l.href || pathname?.startsWith(`${l.href}/`);
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`text-xl tracking-[-0.01em] ${active ? 'text-accent' : 'text-ink'}`}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          );
        })}
        <a href="/Rezuanur_Rahman_Dip_Resume.pdf" download className="font-mono text-sm text-graphite mt-2">
          résumé
        </a>
        <div className="mt-2">
          <ThemeToggle />
        </div>
      </div>
    )}
    </>
  );
}
