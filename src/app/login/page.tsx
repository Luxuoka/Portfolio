'use client';

import React, { useTransition, useState } from 'react';
import { loginAction, ActionState } from '@/actions/auth';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

export default function LoginPage() {
  const [isPending, startTransition] = useTransition();
  const [state, setState] = useState<ActionState | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await loginAction(null, formData);
      if (res?.error) {
        setState(res);
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-bg text-ink">
      <div className="w-full max-w-md space-y-8">
        
        {/* Back Link */}
        <div>
          <Link
            href="/"
            className="text-xs font-mono uppercase tracking-widest text-ink-muted hover:text-ink transition-colors inline-flex items-center gap-2"
          >
            <span>&larr; Kembali ke Beranda</span>
          </Link>
        </div>

        {/* Minimalist Box */}
        <div className="border border-line-dark bg-surface p-8 sm:p-10 space-y-6">
          <div className="space-y-1.5 border-b border-line pb-5">
            <span className="text-[11px] font-mono uppercase tracking-widest text-accent font-semibold block">
              Autentikasi Internal
            </span>
            <h1 className="font-serif text-3xl text-ink font-normal">
              Masuk Panel Admin
            </h1>
            <p className="text-xs text-ink-muted leading-relaxed font-sans">
              Akses khusus untuk mengelola rekam karya, profil, dan penawaran layanan.
            </p>
          </div>

          {state?.error && (
            <div className="p-3.5 border border-accent bg-accent-faint text-accent text-xs font-mono">
              [PERINGATAN]: {state.error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="block text-xs font-mono uppercase tracking-wider text-ink font-semibold"
              >
                Surel / Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="admin@email.com"
                className="w-full px-3.5 py-2.5 bg-bg border border-line text-sm text-ink placeholder-ink-faint focus:border-ink focus:outline-none transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="block text-xs font-mono uppercase tracking-wider text-ink font-semibold"
              >
                Kata Sandi
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 bg-bg border border-line text-sm text-ink placeholder-ink-faint focus:border-ink focus:outline-none transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full py-3 px-4 text-xs font-mono uppercase tracking-wider font-semibold text-bg bg-ink hover:bg-accent disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Memverifikasi...</span>
                </>
              ) : (
                <span>Masuk Sekarang &rarr;</span>
              )}
            </button>
          </form>
        </div>

        <p className="text-center font-mono text-[11px] text-ink-faint">
          Sesi diamankan oleh Supabase Authentication
        </p>
      </div>
    </div>
  );
}
