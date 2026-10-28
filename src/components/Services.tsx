import React from 'react';
import Link from 'next/link';
import { ServiceRow } from '@/types/database';
import { formatIDR, getWhatsAppUrl } from '@/lib/utils';
import { Check, ArrowRight, MessageSquare } from 'lucide-react';

interface ServicesProps {
  services: ServiceRow[];
  whatsapp?: string;
}

export default function Services({ services, whatsapp = '' }: ServicesProps) {
  return (
    <section id="services" className="py-20 border-b border-line bg-surface/40">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-line">
          <div className="space-y-3">
            <span className="px-2.5 py-1 bg-accent/10 border border-accent/20 text-accent text-xs font-mono font-semibold rounded inline-block">
              03 / LAYANAN & BIAYA
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-ink font-normal leading-tight">
              Skema pengerjaan transparan berdasarkan cakupan teknis.
            </h2>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono uppercase tracking-wider text-accent hover:text-accent-hover bg-accent/5 hover:bg-accent/15 border border-accent/20 rounded transition-all shrink-0"
          >
            <span>Rincian Semua Layanan</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Empty State */}
        {services.length === 0 ? (
          <div className="py-16 text-center border-b border-line">
            <p className="font-serif italic text-xl text-ink-muted">
              Daftar penawaran layanan sedang disesuaikan.
            </p>
          </div>
        ) : (
          <div className="pt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const formattedIndex = String(index + 1).padStart(2, '0');
              const waUrl = whatsapp
                ? getWhatsAppUrl(
                    whatsapp,
                    `Halo, saya ingin menanyakan detail untuk paket layanan "${service.name}".`
                  )
                : '/contact';

              return (
                <div
                  key={service.id}
                  className="bg-bg border border-line rounded-xl p-7 flex flex-col justify-between space-y-6 hover:border-accent/50 hover:shadow-md transition-all duration-300 group"
                >
                  <div className="space-y-4">
                    {/* Header badge & package name */}
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-accent font-semibold px-2.5 py-1 bg-accent/10 rounded">
                        PAKET [{formattedIndex}]
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl text-ink leading-snug group-hover:text-accent transition-colors font-medium">
                      {service.name}
                    </h3>

                    <p className="text-sm text-ink-muted leading-relaxed font-sans">
                      {service.description}
                    </p>

                    {/* Features list with checkmarks */}
                    {service.features && service.features.length > 0 && (
                      <div className="pt-3 border-t border-line/70 space-y-2">
                        <span className="text-[11px] font-mono text-accent uppercase tracking-wider font-semibold block">
                          Cakupan Pekerjaan:
                        </span>
                        <ul className="space-y-2 text-xs text-ink">
                          {service.features.map((item, i) => (
                            <li key={i} className="flex items-start gap-2.5">
                              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                              <span className="font-sans leading-tight">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Pricing & CTA */}
                  <div className="pt-4 border-t border-line space-y-4">
                    <div>
                      <span className="text-[11px] font-mono text-ink-muted uppercase tracking-wider block">
                        Estimasi Investasi
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
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-ink text-bg text-xs font-mono font-semibold rounded hover:bg-accent transition-colors shadow-sm"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Pilih & Diskusi</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
