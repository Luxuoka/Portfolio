import type { Metadata } from 'next';
import Link from 'next/link';
import { getPublicProfile, getPublicServices } from '@/lib/data';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { formatIDR, getWhatsAppUrl } from '@/lib/utils';
import { Check, ArrowRight, ArrowLeft, MessageSquare, ShieldCheck, Zap, GitBranch, Headphones } from 'lucide-react';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Layanan & Paket Biaya | Portofolio Pengembang',
  description: 'Skema pengerjaan website terstruktur, performa tinggi, dan biaya transparan.',
};

export default async function ServicesPage() {
  const [profile, services] = await Promise.all([
    getPublicProfile(),
    getPublicServices(),
  ]);

  const whatsapp = profile?.whatsapp || '';
  const name = profile?.name || 'Developer';

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
              SKEMA PENAWARAN & INVESTASI
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl text-ink font-normal leading-tight">
              Layanan Rekayasa Web & Solusi Digital
            </h1>
            <p className="text-base sm:text-lg text-ink-muted max-w-3xl font-sans">
              Setiap proyek dikerjakan dengan standar arsitektur modern, performa tinggi, keamanan teruji, serta kode bersih yang siap di-scale.
            </p>
          </div>
        </div>

        {/* Services Listing */}
        <div className="space-y-8">
          <h2 className="font-serif text-2xl sm:text-3xl text-ink font-medium">
            Paket Layanan Tersedia
          </h2>

          {services.length === 0 ? (
            <div className="py-16 text-center border border-line rounded-xl bg-surface/40 p-8">
              <p className="font-serif italic text-xl text-ink-muted">
                Daftar penawaran layanan sedang disesuaikan.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => {
                const formattedIndex = String(index + 1).padStart(2, '0');
                const waUrl = whatsapp
                  ? getWhatsAppUrl(
                      whatsapp,
                      `Halo ${name}, saya tertarik mendiskusikan paket layanan "${service.name}".`
                    )
                  : '/contact';

                return (
                  <div
                    key={service.id}
                    className="bg-surface/50 border border-line rounded-xl p-8 flex flex-col justify-between space-y-6 hover:border-accent/50 hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="space-y-4">
                      <span className="font-mono text-xs text-accent font-semibold px-2.5 py-1 bg-accent/10 rounded inline-block">
                        PAKET [{formattedIndex}]
                      </span>

                      <h3 className="font-serif text-2xl text-ink leading-snug group-hover:text-accent transition-colors font-semibold">
                        {service.name}
                      </h3>

                      <p className="text-sm text-ink-muted leading-relaxed font-sans">
                        {service.description}
                      </p>

                      {service.features && service.features.length > 0 && (
                        <div className="pt-4 border-t border-line/70 space-y-2.5">
                          <span className="text-[11px] font-mono text-accent uppercase tracking-wider font-semibold block">
                            Cakupan & Fitur Pengerjaan:
                          </span>
                          <ul className="space-y-2 text-xs text-ink font-sans">
                            {service.features.map((item, i) => (
                              <li key={i} className="flex items-start gap-2.5">
                                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                <span className="leading-tight">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    <div className="pt-5 border-t border-line space-y-4">
                      <div>
                        <span className="text-[11px] font-mono text-ink-muted uppercase tracking-wider block">
                          Rentang Biaya / Investasi:
                        </span>
                        <p className="text-xl font-mono font-bold text-accent mt-0.5">
                          {formatIDR(service.price_min)}
                          {service.price_max > service.price_min && (
                            <span className="text-xs font-normal text-ink-muted block mt-0.5">
                              s/d {formatIDR(service.price_max)}
                            </span>
                          )}
                        </p>
                      </div>

                      <a
                        href={waUrl}
                        target={whatsapp ? '_blank' : undefined}
                        rel={whatsapp ? 'noopener noreferrer' : undefined}
                        className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-ink text-bg text-xs font-mono font-semibold rounded-lg hover:bg-accent transition-all shadow-sm"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Konsultasi Paket Ini</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Workflow Roadmap / Standard of Work */}
        <div className="pt-8 space-y-8 border-t border-line">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold block">
              METODOLOGI REKAYASA
            </span>
            <h2 className="font-serif text-3xl text-ink font-normal">
              Bagaimana Proses Pengerjaan Dilakukan?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-surface/40 border border-line rounded-lg space-y-3">
              <div className="w-9 h-9 rounded-md bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-ink">1. Penyelarasan Kebutuhan</h3>
              <p className="text-xs text-ink-muted leading-relaxed font-sans">
                Diskusi spesifikasi teknis, alur pengguna, pemilihan stack, dan kepastian deliverables.
              </p>
            </div>

            <div className="p-6 bg-surface/40 border border-line rounded-lg space-y-3">
              <div className="w-9 h-9 rounded-md bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                <GitBranch className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-ink">2. Arsitektur & Prototyping</h3>
              <p className="text-xs text-ink-muted leading-relaxed font-sans">
                Perancangan skema database, desain antarmuka responsif, dan struktur API yang rapi.
              </p>
            </div>

            <div className="p-6 bg-surface/40 border border-line rounded-lg space-y-3">
              <div className="w-9 h-9 rounded-md bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-ink">3. Pengembangan & Testing</h3>
              <p className="text-xs text-ink-muted leading-relaxed font-sans">
                Coding terstruktur, pengujian fungsionalitas, optimasi Core Web Vitals, dan keamanan.
              </p>
            </div>

            <div className="p-6 bg-surface/40 border border-line rounded-lg space-y-3">
              <div className="w-9 h-9 rounded-md bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                <Headphones className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-ink">4. Deployment & Handover</h3>
              <p className="text-xs text-ink-muted leading-relaxed font-sans">
                Peluncuran ke production server, penyerahan dokumentasi teknis, dan dukungan purna jual.
              </p>
            </div>
          </div>
        </div>

      </main>

      <Footer name={name} socials={profile?.socials} />
    </div>
  );
}

