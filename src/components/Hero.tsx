import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ProfileRow } from '@/types/database';
import { getWhatsAppUrl } from '@/lib/utils';
import { ArrowRight, MessageCircle, Mail } from 'lucide-react';

interface HeroProps {
  profile: ProfileRow | null;
}

export default function Hero({ profile }: HeroProps) {
  const name = profile?.name || 'Alex Pratama';
  const headline = profile?.headline || 'Pengembang Web & Rekayasa Antarmuka';
  const bio =
    profile?.bio ||
    'Fokus membangun website yang terstruktur, cepat diakses, dan mudah dikelola. Bekerja dengan Next.js, TypeScript, dan Supabase untuk kebutuhan produk digital mandiri maupun tim.';
  const photoUrl = profile?.photo_url || '';
  const whatsapp = profile?.whatsapp || '';
  const email = profile?.email || '';
  const socials = profile?.socials || {};

  const waLink = whatsapp
    ? getWhatsAppUrl(whatsapp, `Halo ${name}, saya ingin mendiskusikan kebutuhan pembuatan website.`)
    : '/contact';

  return (
    <section className="pt-14 pb-20 md:pt-20 md:pb-24 border-b border-line">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Top Status & Meta Tagline */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-line text-xs font-mono uppercase tracking-wider">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 rounded-full font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Tersedia untuk Pekerjaan Baru</span>
          </div>
          <span className="text-ink-muted">
            Berbasis di Indonesia &bull; GMT+7
          </span>
        </div>

        {/* Asymmetrical Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 pt-10 items-center">
          
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-8 space-y-7">
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold block">
                Portofolio Pengembang &bull; Rekayasa Perangkat Lunak
              </span>
              <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl tracking-tight text-ink leading-[1.08] font-medium">
                {name}
              </h1>
              <p className="font-serif italic text-2xl sm:text-3xl text-accent font-normal leading-snug">
                {headline}
              </p>
            </div>

            <p className="text-base sm:text-lg text-ink-muted leading-relaxed max-w-2xl font-sans">
              {bio}
            </p>

            {/* Direct Actions */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-sm font-mono">
              {whatsapp ? (
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 bg-ink text-bg font-semibold rounded hover:bg-accent transition-all duration-200 inline-flex items-center gap-2 shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>Mulai Diskusi WhatsApp</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              ) : (
                <Link
                  href="/contact"
                  className="px-6 py-3.5 bg-ink text-bg font-semibold rounded hover:bg-accent transition-all duration-200 inline-flex items-center gap-2 shadow-sm"
                >
                  <span>Mulai Diskusi Proyek</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}

              <Link
                href="/projects"
                className="px-5 py-3.5 bg-surface hover:bg-surface-muted text-ink border border-line rounded font-medium transition-colors inline-flex items-center gap-2"
              >
                <span>Lihat Katalog Proyek</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>

              {email && (
                <a
                  href={`mailto:${email}`}
                  className="inline-flex items-center gap-2 py-3 text-ink-muted hover:text-accent font-medium transition-colors"
                >
                  <Mail className="w-4 h-4 text-accent" />
                  <span className="underline underline-offset-4 decoration-line">{email}</span>
                </a>
              )}
            </div>

            {/* Socials Ledger */}
            {(socials.github || socials.linkedin || socials.instagram) && (
              <div className="pt-6 border-t border-line flex items-center gap-6 text-xs uppercase tracking-wider text-ink-muted font-mono">
                {socials.github && (
                  <a
                    href={socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent transition-colors"
                  >
                    GitHub &nearr;
                  </a>
                )}
                {socials.linkedin && (
                  <a
                    href={socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent transition-colors"
                  >
                    LinkedIn &nearr;
                  </a>
                )}
                {socials.instagram && (
                  <a
                    href={socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent transition-colors"
                  >
                    Instagram &nearr;
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Right Column: Natural Vivid Portrait */}
          <div className="lg:col-span-4 lg:pt-0">
            <div className="relative aspect-[4/5] w-full max-w-xs sm:max-w-sm mx-auto border-2 border-line-dark/20 rounded-xl bg-surface-muted overflow-hidden shadow-lg group">
              {photoUrl ? (
                <Image
                  src={photoUrl}
                  alt={`Potret ${name}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  priority
                  sizes="(max-width: 1024px) 100vw, 360px"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-ink-muted bg-surface">
                  <span className="font-serif text-5xl text-accent font-bold">
                    {name.charAt(0)}
                  </span>
                  <span className="text-xs uppercase tracking-widest font-mono mt-3 text-ink">
                    Foto Profil
                  </span>
                </div>
              )}
              {/* Subtle gradient vignette at bottom */}
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 text-white text-[11px] font-mono tracking-wider">
                {name} &bull; Profil
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
