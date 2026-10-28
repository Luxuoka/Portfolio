import React from 'react';
import { ProfileRow } from '@/types/database';
import { getWhatsAppUrl } from '@/lib/utils';
import { MessageCircle, Mail, Clock, ArrowRight } from 'lucide-react';

interface ContactProps {
  profile: ProfileRow | null;
}

export default function Contact({ profile }: ContactProps) {
  const email = profile?.email || '';
  const whatsapp = profile?.whatsapp || '';
  const name = profile?.name || 'Developer';

  const waUrl = whatsapp
    ? getWhatsAppUrl(whatsapp, `Halo ${name}, saya ingin mendiskusikan kebutuhan pembuatan website.`)
    : '#';

  return (
    <section id="contact" className="py-24 border-b border-line">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-12 border-b border-line items-baseline">
          <div className="md:col-span-4">
            <span className="px-2.5 py-1 bg-accent/10 border border-accent/20 text-accent text-xs font-mono font-semibold rounded inline-block">
              04 / INISIASI PROYEK
            </span>
          </div>
          <div className="md:col-span-8">
            <h2 className="font-serif text-3xl sm:text-4xl text-ink font-normal leading-tight">
              Mari diskusikan arsitektur dan kebutuhan sistem digital Anda.
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="pt-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-6 space-y-5">
            <p className="text-lg text-ink leading-relaxed font-normal">
              Kirimkan ringkasan rencana proyek, estimasi jadwal, atau pertanyaan spesifik mengenai teknologi web yang ingin Anda bangun.
            </p>
            
            <div className="flex items-center gap-3 p-4 bg-surface rounded-lg border border-line text-xs font-mono text-ink">
              <Clock className="w-4 h-4 text-accent shrink-0" />
              <span>Respon aktif &bull; Senin &ndash; Jumat (09:00 &ndash; 18:00 WIB)</span>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-5">
            {whatsapp && (
              <div className="p-6 border border-emerald-500/20 bg-emerald-500/5 rounded-xl space-y-3 group hover:border-emerald-500 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-emerald-800 font-mono text-xs uppercase font-semibold">
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                    <span>WhatsApp Langsung</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-semibold">
                    Cepat Balas
                  </span>
                </div>
                <p className="text-2xl font-mono text-ink font-bold tracking-tight">
                  +{whatsapp}
                </p>
                <div className="pt-1">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-emerald-800 hover:text-emerald-950 underline underline-offset-4"
                  >
                    <span>Buka Obrolan WhatsApp</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            )}

            {email && (
              <div className="p-6 border border-accent/20 bg-accent/5 rounded-xl space-y-3 group hover:border-accent transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-accent font-mono text-xs uppercase font-semibold">
                    <Mail className="w-4 h-4 text-accent" />
                    <span>Surat Elektronik</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-accent/10 text-accent rounded font-semibold">
                    Resmi & Detil
                  </span>
                </div>
                <p className="text-xl font-mono text-ink font-semibold truncate">
                  {email}
                </p>
                <div className="pt-1">
                  <a
                    href={`mailto:${email}`}
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-accent hover:text-accent-hover underline underline-offset-4"
                  >
                    <span>Kirim Email Langsung</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
