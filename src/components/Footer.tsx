import React from 'react';
import Link from 'next/link';
import { ProfileSocials } from '@/types/database';

interface FooterProps {
  name?: string;
  socials?: ProfileSocials;
}

export default function Footer({ name = 'Portfolio', socials = {} }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-14 bg-surface/60 border-t border-line text-xs font-mono">
      <div className="max-w-6xl mx-auto px-6 space-y-8">
        
        {/* Navigation & Branding Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-line">
          <div>
            <Link href="/" className="font-serif text-xl text-ink font-semibold hover:text-accent transition-colors">
              {name}
            </Link>
            <p className="text-xs text-ink-muted mt-1 font-sans">
              Pengembangan website modern, arsitektur performa tinggi, & integrasi sistem backend.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 uppercase tracking-wider text-xs">
            <Link href="/" className="text-ink-muted hover:text-accent transition-colors">
              Beranda
            </Link>
            <Link href="/projects" className="text-ink-muted hover:text-accent transition-colors">
              Proyek
            </Link>
            <Link href="/services" className="text-ink-muted hover:text-accent transition-colors">
              Layanan
            </Link>
            <Link href="/contact" className="text-ink-muted hover:text-accent transition-colors">
              Kontak
            </Link>
          </div>
        </div>

        {/* Bottom Metadata & Socials */}
        <div className="flex flex-col sm:flex-row items-baseline justify-between gap-6 text-ink-muted">
          <div>
            <p className="tracking-wide">
              &copy; {currentYear} <span className="text-ink font-medium">{name}</span>. Seluruh hak cipta dilindungi.
            </p>
            <p className="text-[11px] text-ink-faint mt-1">
              Next.js 14 App Router &bull; Supabase Database &bull; Tailwind CSS.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-5 uppercase tracking-wider">
            {socials.github && (
              <a
                href={socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink hover:text-accent transition-colors"
              >
                GitHub &nearr;
              </a>
            )}
            {socials.linkedin && (
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink hover:text-accent transition-colors"
              >
                LinkedIn &nearr;
              </a>
            )}
            {socials.instagram && (
              <a
                href={socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink hover:text-accent transition-colors"
              >
                Instagram &nearr;
              </a>
            )}
          </div>
        </div>

      </div>
    </footer>
  );
}
