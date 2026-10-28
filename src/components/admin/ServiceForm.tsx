'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import { createServiceAction, updateServiceAction, ServiceActionState } from '@/actions/services';
import { ServiceRow } from '@/types/database';
import { Loader2 } from 'lucide-react';

interface ServiceFormProps {
  initialData?: ServiceRow | null;
  isEdit?: boolean;
}

export default function ServiceForm({ initialData, isEdit = false }: ServiceFormProps) {
  const [isPending, startTransition] = useTransition();
  const [state, setState] = useState<ServiceActionState | null>(null);

  const [priceMin, setPriceMin] = useState<number>(initialData?.price_min ?? 1000000);
  const [priceMax, setPriceMax] = useState<number>(initialData?.price_max ?? 3000000);

  const isPriceInvalid = priceMax < priceMin;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isPriceInvalid) {
      setState({
        error: 'Harga maksimum (price_max) harus lebih besar atau sama dengan harga minimum (price_min).',
      });
      return;
    }

    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      let res: ServiceActionState;
      if (isEdit && initialData?.id) {
        res = await updateServiceAction(initialData.id, null, formData);
      } else {
        res = await createServiceAction(null, formData);
      }
      if (res?.error) {
        setState(res);
      }
    });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <Link
          href="/admin/services"
          className="text-xs font-mono uppercase tracking-widest text-ink-muted hover:text-ink transition-colors"
        >
          &larr; Kembali ke Daftar Layanan
        </Link>
      </div>

      <div className="border border-line-dark bg-surface p-6 sm:p-10 space-y-6">
        <div className="border-b border-line pb-4">
          <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold block">
            MANAJEMEN PENAWARAN
          </span>
          <h1 className="font-serif text-3xl text-ink font-normal mt-1">
            {isEdit ? 'Ubah Informasi Layanan' : 'Tambah Layanan Baru'}
          </h1>
        </div>

        {state?.error && (
          <div className="p-4 border border-accent bg-accent-faint text-accent text-xs font-mono">
            [KESALAHAN]: {state.error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase tracking-wider text-ink font-semibold">
              Nama Paket Layanan
            </label>
            <input
              type="text"
              name="name"
              required
              defaultValue={initialData?.name || ''}
              placeholder="Contoh: Pembuatan Website Korporat & Arsip Digital"
              className="w-full px-3.5 py-2.5 bg-bg border border-line text-sm text-ink focus:border-ink focus:outline-none"
            />
          </div>

          {/* Pricing Range */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-5 border border-line bg-bg">
            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase tracking-wider text-ink font-semibold">
                Harga Minimum (IDR)
              </label>
              <input
                type="number"
                name="price_min"
                required
                min={0}
                step={50000}
                value={priceMin}
                onChange={(e) => setPriceMin(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-surface border border-line text-sm font-mono text-ink focus:border-ink focus:outline-none"
              />
              <p className="text-[11px] font-mono text-ink-faint">
                IDR {new Intl.NumberFormat('id-ID').format(priceMin || 0)}
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase tracking-wider text-ink font-semibold">
                Harga Maksimum (IDR)
              </label>
              <input
                type="number"
                name="price_max"
                required
                min={0}
                step={50000}
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className={`w-full px-3.5 py-2.5 bg-surface border text-sm font-mono text-ink focus:outline-none ${
                  isPriceInvalid ? 'border-accent text-accent' : 'border-line focus:border-ink'
                }`}
              />
              <p className={`text-[11px] font-mono ${isPriceInvalid ? 'text-accent font-semibold' : 'text-ink-faint'}`}>
                {isPriceInvalid
                  ? '[PERINGATAN]: Harga maksimum harus >= harga minimum!'
                  : `IDR ${new Intl.NumberFormat('id-ID').format(priceMax || 0)}`}
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase tracking-wider text-ink font-semibold">
              Deskripsi Singkat
            </label>
            <textarea
              name="description"
              rows={3}
              required
              defaultValue={initialData?.description || ''}
              placeholder="Jelaskan tujuan paket layanan ini, target bisnis, dan kepraktisannya..."
              className="w-full px-3.5 py-2.5 bg-bg border border-line text-sm text-ink leading-relaxed focus:border-ink focus:outline-none"
            />
          </div>

          {/* Features */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase tracking-wider text-ink font-semibold">
              Cakupan Fitur / Deliverables (satu per baris)
            </label>
            <textarea
              name="features"
              rows={5}
              defaultValue={initialData?.features?.join('\n') || ''}
              placeholder={'Desain antarmuka bersih & responsif\nIntegrasi database PostgreSQL (Supabase)\nPanel kurasi konten internal\nOptimasi kecepatan & SEO dasar\nPanduan serah terima sistem'}
              className="w-full px-3.5 py-2.5 bg-bg border border-line text-sm font-mono text-ink leading-relaxed focus:border-ink focus:outline-none"
            />
            <p className="text-[11px] font-mono text-ink-faint">
              Tiap baris baru akan otomatis ditampilkan sebagai satu butir checklist di halaman publik.
            </p>
          </div>

          {/* Sort Order */}
          <div className="space-y-1.5 max-w-xs">
            <label className="text-xs font-mono uppercase tracking-wider text-ink font-semibold">
              Urutan Urut (sort_order)
            </label>
            <input
              type="number"
              name="sort_order"
              defaultValue={initialData?.sort_order ?? 0}
              className="w-full px-3.5 py-2.5 bg-bg border border-line text-sm font-mono text-ink focus:border-ink focus:outline-none"
            />
          </div>

          {/* Published */}
          <div className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              id="is_published"
              name="is_published"
              value="true"
              defaultChecked={initialData ? initialData.is_published : true}
              className="w-4 h-4 rounded-none accent-ink cursor-pointer"
            />
            <label htmlFor="is_published" className="text-xs font-mono uppercase tracking-wider text-ink cursor-pointer select-none">
              Tampilkan di halaman publik
            </label>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-6 border-t border-line">
            <Link
              href="/admin/services"
              className="px-4 py-2.5 border border-line text-xs font-mono uppercase tracking-wider text-ink hover:border-ink transition-colors"
            >
              Batal
            </Link>
            <button
              type="submit"
              disabled={isPending || isPriceInvalid}
              className="px-6 py-2.5 bg-ink text-bg text-xs font-mono uppercase tracking-wider font-semibold hover:bg-accent disabled:opacity-50 transition-colors flex items-center gap-2"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Menyimpan...</span>
                </>
              ) : (
                <span>{isEdit ? 'Perbarui Layanan &rarr;' : 'Simpan Layanan &rarr;'}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
