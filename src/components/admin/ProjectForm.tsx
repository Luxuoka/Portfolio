'use client';

import React, { useState, useTransition } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { createProjectAction, updateProjectAction, ProjectActionState } from '@/actions/projects';
import { ProjectRow } from '@/types/database';
import { Loader2 } from 'lucide-react';

interface ProjectFormProps {
  initialData?: ProjectRow | null;
  isEdit?: boolean;
}

export default function ProjectForm({ initialData, isEdit = false }: ProjectFormProps) {
  const [isPending, startTransition] = useTransition();
  const [state, setState] = useState<ProjectActionState | null>(null);

  const [previewUrl, setPreviewUrl] = useState<string>(initialData?.image_url || '');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      let res: ProjectActionState;
      if (isEdit && initialData?.id) {
        res = await updateProjectAction(initialData.id, null, formData);
      } else {
        res = await createProjectAction(null, formData);
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
          href="/admin/projects"
          className="text-xs font-mono uppercase tracking-widest text-ink-muted hover:text-ink transition-colors"
        >
          &larr; Kembali ke Daftar Proyek
        </Link>
      </div>

      <div className="border border-line-dark bg-surface p-6 sm:p-10 space-y-6">
        <div className="border-b border-line pb-4">
          <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold block">
            MANAJEMEN ARSIP
          </span>
          <h1 className="font-serif text-3xl text-ink font-normal mt-1">
            {isEdit ? 'Ubah Informasi Proyek' : 'Tambah Proyek Baru'}
          </h1>
        </div>

        {state?.error && (
          <div className="p-4 border border-accent bg-accent-faint text-accent text-xs font-mono">
            [KESALAHAN]: {state.error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {isEdit && (
            <input
              type="hidden"
              name="current_image_url"
              value={initialData?.image_url || ''}
            />
          )}

          {/* Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase tracking-wider text-ink font-semibold">
              Judul Proyek
            </label>
            <input
              type="text"
              name="title"
              required
              defaultValue={initialData?.title || ''}
              placeholder="Contoh: Sistem Manajemen Konten Editorial"
              className="w-full px-3.5 py-2.5 bg-bg border border-line text-sm text-ink focus:border-ink focus:outline-none"
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase tracking-wider text-ink font-semibold">
              Deskripsi Singkat
            </label>
            <textarea
              name="description"
              rows={4}
              required
              defaultValue={initialData?.description || ''}
              placeholder="Tuliskan tujuan proyek, fitur teknis utama, dan solusi implementasi..."
              className="w-full px-3.5 py-2.5 bg-bg border border-line text-sm text-ink leading-relaxed focus:border-ink focus:outline-none"
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-3 p-5 border border-line bg-bg">
            <span className="text-xs font-mono uppercase tracking-wider text-ink font-semibold block">
              Berkas Dokumentasi Gambar (Supabase Storage: portfolio/projects)
            </span>

            <div className="flex flex-col sm:flex-row items-start gap-5">
              <div className="relative aspect-[16/10] w-full sm:w-48 border border-line-dark bg-surface-muted overflow-hidden flex-shrink-0">
                {previewUrl ? (
                  <Image
                    src={previewUrl}
                    alt="Preview"
                    fill
                    className="object-cover"
                    sizes="192px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs font-mono text-ink-faint">
                    [TIDAK ADA GAMBAR]
                  </div>
                )}
              </div>

              <div className="space-y-2 flex-1 w-full">
                <label className="inline-block px-3.5 py-2 border border-line-dark bg-surface text-ink text-xs font-mono uppercase tracking-wider font-semibold cursor-pointer hover:bg-surface-muted transition-colors">
                  <span>Pilih Berkas Foto (&le; 5MB)</span>
                  <input
                    type="file"
                    name="image_file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
                <input
                  type="url"
                  name="image_url"
                  defaultValue={initialData?.image_url || ''}
                  placeholder="Atau tempel URL gambar langsung"
                  className="w-full px-3 py-2 bg-bg border border-line text-xs font-mono text-ink focus:border-ink focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Demo URL & Sort Order */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase tracking-wider text-ink font-semibold">
                URL Live Demo (Opsional)
              </label>
              <input
                type="url"
                name="demo_url"
                defaultValue={initialData?.demo_url || ''}
                placeholder="https://..."
                className="w-full px-3.5 py-2.5 bg-bg border border-line text-sm font-mono text-ink focus:border-ink focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
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
          </div>

          {/* Tech Stack */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase tracking-wider text-ink font-semibold">
              Tech Stack (pisahkan dengan koma)
            </label>
            <input
              type="text"
              name="tech_stack"
              defaultValue={initialData?.tech_stack?.join(', ') || ''}
              placeholder="Next.js, TypeScript, PostgreSQL, Tailwind"
              className="w-full px-3.5 py-2.5 bg-bg border border-line text-sm text-ink focus:border-ink focus:outline-none"
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
              Publikasikan di halaman publik utama
            </label>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-6 border-t border-line">
            <Link
              href="/admin/projects"
              className="px-4 py-2.5 border border-line text-xs font-mono uppercase tracking-wider text-ink hover:border-ink transition-colors"
            >
              Batal
            </Link>
            <button
              type="submit"
              disabled={isPending}
              className="px-6 py-2.5 bg-ink text-bg text-xs font-mono uppercase tracking-wider font-semibold hover:bg-accent disabled:opacity-50 transition-colors flex items-center gap-2"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Menyimpan...</span>
                </>
              ) : (
                <span>{isEdit ? 'Perbarui Proyek &rarr;' : 'Simpan Proyek &rarr;'}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
