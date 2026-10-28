'use client';

import React, { useState, useTransition } from 'react';
import Image from 'next/image';
import { updateProfileAction, ProfileActionState } from '@/actions/profile';
import { ProfileRow } from '@/types/database';
import { Loader2 } from 'lucide-react';

interface ProfileFormProps {
  initialProfile: ProfileRow | null;
}

export default function ProfileForm({ initialProfile }: ProfileFormProps) {
  const [isPending, startTransition] = useTransition();
  const [state, setState] = useState<ProfileActionState | null>(null);

  const [previewUrl, setPreviewUrl] = useState<string>(initialProfile?.photo_url || '');

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
      const res = await updateProfileAction(null, formData);
      setState(res);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {state?.error && (
        <div className="p-4 border border-accent bg-accent-faint text-accent text-xs font-mono">
          [KESALAHAN]: {state.error}
        </div>
      )}

      {state?.success && (
        <div className="p-4 border border-ink bg-surface text-ink text-xs font-mono">
          [BERHASIL]: Perubahan profil telah disimpan dan diperbarui di halaman publik.
        </div>
      )}

      <input
        type="hidden"
        name="current_photo_url"
        value={initialProfile?.photo_url || ''}
      />

      {/* Photo Section */}
      <div className="border border-line bg-surface p-6 sm:p-8 space-y-4">
        <span className="text-xs font-mono uppercase tracking-widest text-ink-muted block">
          01 / FOTO PROFIL (SUPABASE STORAGE: PORTFOLIO/PROFILE)
        </span>

        <div className="flex flex-col sm:flex-row items-start gap-6 pt-2">
          <div className="relative w-28 h-28 border border-line-dark bg-surface-muted overflow-hidden flex-shrink-0">
            {previewUrl ? (
              <Image
                src={previewUrl}
                alt="Preview Foto"
                fill
                className="object-cover"
                sizes="112px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xs font-mono text-ink-faint">
                [KOSONG]
              </div>
            )}
          </div>

          <div className="space-y-3 flex-1 w-full">
            <div>
              <label className="inline-block px-4 py-2 border border-line-dark bg-bg text-ink text-xs font-mono uppercase tracking-wider font-semibold cursor-pointer hover:bg-surface transition-colors">
                <span>Pilih Berkas Baru (JPG, PNG, WebP &le; 5MB)</span>
                <input
                  type="file"
                  name="photo_file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-ink-muted mb-1">
                Atau tautan URL langsung:
              </label>
              <input
                type="url"
                name="photo_url"
                defaultValue={initialProfile?.photo_url || ''}
                placeholder="https://..."
                className="w-full px-3 py-2 bg-bg border border-line text-xs font-mono text-ink focus:border-ink focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Info */}
      <div className="border border-line bg-surface p-6 sm:p-8 space-y-6">
        <span className="text-xs font-mono uppercase tracking-widest text-ink-muted block">
          02 / IDENTITAS & NARASI
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase tracking-wider text-ink font-semibold">
              Nama Lengkap
            </label>
            <input
              type="text"
              name="name"
              required
              defaultValue={initialProfile?.name || ''}
              className="w-full px-3.5 py-2.5 bg-bg border border-line text-sm text-ink focus:border-ink focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase tracking-wider text-ink font-semibold">
              Headline Profesi
            </label>
            <input
              type="text"
              name="headline"
              required
              defaultValue={initialProfile?.headline || ''}
              className="w-full px-3.5 py-2.5 bg-bg border border-line text-sm text-ink focus:border-ink focus:outline-none"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-mono uppercase tracking-wider text-ink font-semibold">
            Bio Ringkas
          </label>
          <textarea
            name="bio"
            rows={4}
            required
            defaultValue={initialProfile?.bio || ''}
            className="w-full px-3.5 py-2.5 bg-bg border border-line text-sm text-ink leading-relaxed focus:border-ink focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase tracking-wider text-ink font-semibold">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              defaultValue={initialProfile?.email || ''}
              className="w-full px-3.5 py-2.5 bg-bg border border-line text-sm text-ink focus:border-ink focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase tracking-wider text-ink font-semibold">
              WhatsApp (contoh: 6281234567890)
            </label>
            <input
              type="text"
              name="whatsapp"
              defaultValue={initialProfile?.whatsapp || ''}
              placeholder="6281234567890"
              className="w-full px-3.5 py-2.5 bg-bg border border-line text-sm font-mono text-ink focus:border-ink focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Socials & Skills */}
      <div className="border border-line bg-surface p-6 sm:p-8 space-y-6">
        <span className="text-xs font-mono uppercase tracking-widest text-ink-muted block">
          03 / TAUTAN SOSIAL & KEAHLIAN
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase tracking-wider text-ink">GitHub</label>
            <input
              type="url"
              name="social_github"
              defaultValue={initialProfile?.socials?.github || ''}
              placeholder="https://github.com/..."
              className="w-full px-3 py-2 bg-bg border border-line text-xs font-mono text-ink focus:border-ink focus:outline-none"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase tracking-wider text-ink">LinkedIn</label>
            <input
              type="url"
              name="social_linkedin"
              defaultValue={initialProfile?.socials?.linkedin || ''}
              placeholder="https://linkedin.com/in/..."
              className="w-full px-3 py-2 bg-bg border border-line text-xs font-mono text-ink focus:border-ink focus:outline-none"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase tracking-wider text-ink">Instagram</label>
            <input
              type="url"
              name="social_instagram"
              defaultValue={initialProfile?.socials?.instagram || ''}
              placeholder="https://instagram.com/..."
              className="w-full px-3 py-2 bg-bg border border-line text-xs font-mono text-ink focus:border-ink focus:outline-none"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-mono uppercase tracking-wider text-ink font-semibold">
            Daftar Keahlian (pisahkan dengan koma)
          </label>
          <input
            type="text"
            name="skills"
            defaultValue={initialProfile?.skills?.join(', ') || ''}
            placeholder="Next.js, TypeScript, Tailwind CSS, Supabase"
            className="w-full px-3.5 py-2.5 bg-bg border border-line text-sm text-ink focus:border-ink focus:outline-none"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isPending}
          className="px-6 py-3 text-xs font-mono uppercase tracking-wider font-semibold text-bg bg-ink hover:bg-accent disabled:opacity-50 transition-colors flex items-center gap-2"
        >
          {isPending ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Menyimpan...</span>
            </>
          ) : (
            <span>Simpan Perubahan &rarr;</span>
          )}
        </button>
      </div>
    </form>
  );
}
