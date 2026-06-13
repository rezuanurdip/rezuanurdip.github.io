'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiMenu, FiX, FiDownload } from 'react-icons/fi';

const navLinks = [
  { label: 'About',        href: '/about' },
  { label: 'Experience',   href: '/experience' },
  { label: 'Projects',     href: '/projects' },
  { label: 'Publications', href: '/publications' },
  { label: 'Blog',         href: '/blog' },
  { label: 'Contact',      href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-navy-900/90 backdrop-blur-md border-b border-surface-700/20 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="section-container flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-display font-bold text-lg text-surface-50 hover:text-accent-400 transition-colors">
          RRD<span className="text-accent-400">.</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-surface-300 hover:text-accent-400 font-medium transition-colors relative group"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent-400 transition-all duration-200 group-hover:w-full" />
            </Link>
          ))}
          <a
            href="/Rezuanur_Rahman_Dip_Resume.pdf"
            download
            className="flex items-center gap-2 text-sm px-4 py-2 border border-accent-500/50 text-accent-400 hover:bg-accent-500/10 rounded-lg font-medium transition-all duration-200"
          >
            <FiDownload size={14} />
            Résumé
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-surface-300 hover:text-accent-400 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden bg-navy-900/98 backdrop-blur-md border-t border-surface-700/20 px-6 py-6 flex flex-col gap-5">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-surface-200 hover:text-accent-400 font-medium transition-colors"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <a
            href="/Rezuanur_Rahman_Dip_Resume.pdf"
            download
            className="flex items-center gap-2 text-sm w-fit px-4 py-2 border border-accent-500/50 text-accent-400 rounded-lg font-medium"
          >
            <FiDownload size={14} /> Résumé
          </a>
        </div>
      )}
    </header>
  );
}
