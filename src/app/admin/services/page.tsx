import React from 'react';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import DeleteServiceButton from '@/components/admin/DeleteServiceButton';
import ToggleServiceButton from '@/components/admin/ToggleServiceButton';
import { ServiceRow } from '@/types/database';
import { formatIDR } from '@/lib/utils';

export const revalidate = 0;

export default async function AdminServicesPage() {
  const supabase = await createClient();
  const { data: services } = await supabase
    .from('services')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });

  const allServices = (services || []) as ServiceRow[];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-6 border-b border-line">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold block">
            MANAJEMEN PENAWARAN
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-ink font-normal mt-1">
            Daftar Layanan
          </h1>
          <p className="text-xs text-ink-muted mt-1 font-sans">
            Total {allServices.length} paket layanan tersimpan dalam database.
          </p>
        </div>

        <Link
          href="/admin/services/new"
          className="px-4 py-2.5 bg-ink text-bg text-xs font-mono uppercase tracking-wider font-semibold hover:bg-accent transition-colors self-start sm:self-auto"
        >
          + Tambah Layanan Baru
        </Link>
      </div>

      {allServices.length === 0 ? (
        <div className="border border-line p-12 text-center bg-surface space-y-3">
          <p className="font-serif italic text-xl text-ink-muted">
            Belum ada paket layanan.
          </p>
          <div className="pt-2">
            <Link
              href="/admin/services/new"
              className="text-xs font-mono uppercase tracking-wider underline text-ink hover:text-accent"
            >
              Buat paket layanan pertama Anda &rarr;
            </Link>
          </div>
        </div>
      ) : (
        <div className="border border-line overflow-x-auto bg-surface">
          <table className="w-full text-left text-sm text-ink">
            <thead className="bg-surface-muted text-[11px] font-mono uppercase tracking-wider text-ink-muted border-b border-line">
              <tr>
                <th className="py-3 px-4">Nama Layanan</th>
                <th className="py-3 px-4">Rentang Estimasi Biaya</th>
                <th className="py-3 px-4 hidden md:table-cell">Deliverables</th>
                <th className="py-3 px-4 text-center">Urutan</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Tindakan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line font-sans">
              {allServices.map((service) => (
                <tr key={service.id} className="hover:bg-bg transition-colors">
                  <td className="py-4 px-4">
                    <div className="max-w-xs sm:max-w-sm">
                      <p className="font-serif text-base text-ink font-semibold">{service.name}</p>
                      <p className="text-xs text-ink-muted line-clamp-1 mt-0.5">{service.description}</p>
                    </div>
                  </td>

                  <td className="py-4 px-4 font-mono text-xs whitespace-nowrap text-ink">
                    <span>{formatIDR(service.price_min)}</span>
                    {service.price_max > service.price_min && (
                      <span className="text-ink-muted"> &ndash; {formatIDR(service.price_max)}</span>
                    )}
                  </td>

                  <td className="py-4 px-4 hidden md:table-cell text-xs font-mono text-ink-muted">
                    {service.features?.length || 0} butir fitur
                  </td>

                  <td className="py-4 px-4 text-center font-mono text-xs text-ink-muted">
                    {service.sort_order}
                  </td>

                  <td className="py-4 px-4 text-center">
                    <ToggleServiceButton
                      id={service.id}
                      isPublished={service.is_published}
                    />
                  </td>

                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-3 text-xs font-mono">
                      <Link
                        href={`/admin/services/${service.id}`}
                        className="text-ink hover:underline"
                      >
                        [Edit]
                      </Link>
                      <DeleteServiceButton id={service.id} name={service.name} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
