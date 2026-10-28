'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavbarProps {
  name?: string;
}

export default function Navbar({ name = 'Portfolio' }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Beranda', code: '00' },
    { href: '/projects', label: 'Proyek', code: '01' },
    { href: '/services', label: 'Layanan', code: '02' },
    { href: '/contact', label: 'Kontak', code: '03' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 bg-bg/95 backdrop-blur-md border-b border-line shadow-sm">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Name / Brand */}
        <Link href="/" className="group flex items-baseline gap-2">
          <span className="font-serif text-xl tracking-tight text-ink group-hover:text-accent font-semibold transition-colors">
            {name}
          </span>
          <span className="hidden sm:inline-block text-[11px] uppercase tracking-widest text-accent font-mono font-medium">
            / {pathname === '/' ? 'Index' : pathname.replace('/', '').toUpperCase()}
          </span>
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-7 text-xs uppercase tracking-wider font-medium">
          {navLinks.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 transition-colors py-1 ${
                  active
                    ? 'text-accent font-semibold border-b-2 border-accent'
                    : 'text-ink-muted hover:text-ink'
                }`}
              >
                <span className={`font-mono text-[10px] ${active ? 'text-accent' : 'text-accent/70'}`}>
                  {item.code}
                </span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Action / Mobile Button */}
        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-accent/10 hover:bg-accent hover:text-bg text-accent text-xs font-mono font-medium rounded transition-all border border-accent/20"
          >
            <span>Hubungi</span>
            <span aria-hidden="true">&rarr;</span>
          </Link>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-xs uppercase tracking-widest font-mono text-ink p-1.5 border border-line rounded hover:bg-surface transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? '[ Tutup ]' : '[ Menu ]'}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-b border-line bg-surface/98 backdrop-blur-md px-6 py-6 space-y-3 text-sm font-medium animate-fadeIn">
          {navLinks.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between py-2 border-b border-line/60 ${
                  active ? 'text-accent font-semibold' : 'text-ink hover:text-accent'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-accent">{item.code}</span>
                  <span>{item.label}</span>
                </div>
                {active && (
                  <span className="text-xs font-mono text-accent">[Aktif]</span>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
