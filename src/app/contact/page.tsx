import type { Metadata } from 'next';
import Link from 'next/link';
import { getPublicProfile } from '@/lib/data';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getWhatsAppUrl } from '@/lib/utils';
import { MessageCircle, Mail, ArrowLeft, ArrowRight, Clock, MapPin, CheckCircle2 } from 'lucide-react';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Hubungi & Mulai Diskusi Proyek | Portofolio Pengembang',
  description: 'Mulai inisiasi proyek website, konsultasi arsitektur digital, atau penawaran kerja sama teknis.',
};

export default async function ContactPage() {
  const profile = await getPublicProfile();
  const name = profile?.name || 'Developer';
  const whatsapp = profile?.whatsapp || '';
  const email = profile?.email || '';

  const waUrl = whatsapp
    ? getWhatsAppUrl(whatsapp, `Halo ${name}, saya ingin mendiskusikan rencana pembuatan website / sistem digital.`)
    : '#';

  return (
    <div className="min-h-screen bg-bg text-ink flex flex-col justify-between">
      <Navbar name={name} />

      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-12 md:py-16 space-y-16">
        
        {/* Header Breadcrumb & Introduction */}
        <div className="space-y-6 pb-8 border-b border-line">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-ink-muted hover:text-accent transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Beranda</span>
          </Link>

          <div className="space-y-3">
            <span className="px-2.5 py-1 bg-accent/10 border border-accent/20 text-accent text-xs font-mono font-semibold rounded inline-block">
              KOMUNIKASI & INISIASI
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl text-ink font-normal leading-tight">
              Mulai Kolaborasi & Diskusi Proyek
            </h1>
            <p className="text-base sm:text-lg text-ink-muted max-w-3xl font-sans">
              Punya ide produk, kebutuhan peremajaan sistem lama, atau butuh arsitek web profesional? Mari bicarakan langkah awal bersama.
            </p>
          </div>
        </div>

        {/* Contact Channels Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Main Direct Channels */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-serif text-2xl text-ink font-medium">
              Saluran Komunikasi Langsung
            </h2>

            {whatsapp && (
              <div className="p-7 border border-emerald-500/30 bg-emerald-500/5 rounded-2xl space-y-4 hover:border-emerald-500 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5 text-emerald-800 font-mono text-xs uppercase font-semibold">
                    <MessageCircle className="w-5 h-5 text-emerald-600" />
                    <span>WhatsApp Langsung</span>
                  </div>
                  <span className="text-[11px] font-mono px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded font-bold">
                    Respon Tercepat
                  </span>
                </div>

                <div>
                  <p className="text-3xl font-mono text-ink font-bold tracking-tight">
                    +{whatsapp}
                  </p>
                  <p className="text-xs text-ink-muted mt-1 font-sans">
                    Cocok untuk diskusi ringkas, konsultasi cepat via obrolan, atau panggilan terjadwal.
                  </p>
                </div>

                <div className="pt-2">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 bg-emerald-700 text-white font-mono text-xs uppercase tracking-wider font-semibold rounded-lg hover:bg-emerald-800 transition-colors shadow-sm"
                  >
                    <span>Buka Obrolan WhatsApp</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            )}

            {email && (
              <div className="p-7 border border-accent/30 bg-accent/5 rounded-2xl space-y-4 hover:border-accent transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5 text-accent font-mono text-xs uppercase font-semibold">
                    <Mail className="w-5 h-5 text-accent" />
                    <span>Surat Elektronik Resmi</span>
                  </div>
                  <span className="text-[11px] font-mono px-2.5 py-1 bg-accent/15 text-accent rounded font-bold">
                    Proposal & Dokumen
                  </span>
                </div>

                <div>
                  <p className="text-2xl font-mono text-ink font-bold truncate">
                    {email}
                  </p>
                  <p className="text-xs text-ink-muted mt-1 font-sans">
                    Kirimkan dokumen TOR, brief proyek lengkap, atau penawaran formal via email.
                  </p>
                </div>

                <div className="pt-2">
                  <a
                    href={`mailto:${email}`}
                    className="inline-flex items-center gap-2 px-5 py-3 bg-ink text-bg font-mono text-xs uppercase tracking-wider font-semibold rounded-lg hover:bg-accent transition-colors shadow-sm"
                  >
                    <span>Kirim Email Langsung</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Consultation Guide Card */}
          <div className="lg:col-span-5 bg-surface border border-line rounded-2xl p-7 space-y-6">
            <h3 className="font-serif text-xl font-medium text-ink">
              Hal yang Perlu Disiapkan
            </h3>
            
            <p className="text-xs text-ink-muted leading-relaxed font-sans">
              Agar estimasi waktu dan biaya dapat dihitung lebih cepat dan akurat, Anda dapat menyertakan:
            </p>

            <ul className="space-y-3 text-xs text-ink font-sans">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span>Tujuan utama website atau sistem (portofolio, e-commerce, SaaS, dsb.)</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span>Contoh referensi tampilan atau alur yang Anda sukai</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span>Target jadwal peluncuran (deadline proyek)</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span>Rencana integrasi pihak ketiga (payment gateway, auth, database khusus)</span>
              </li>
            </ul>

            <div className="pt-4 border-t border-line space-y-2 text-xs font-mono text-ink-muted">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-accent" />
                <span>Waktu Aktif: Sen &ndash; Jum, 09:00 &ndash; 18:00 WIB</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-accent" />
                <span>Lokasi: Indonesia (UTC+07:00)</span>
              </div>
            </div>
          </div>

        </div>

      </main>

      <Footer name={name} socials={profile?.socials} />
    </div>
  );
}

