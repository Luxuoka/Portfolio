import React from 'react';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { logoutAction } from '@/actions/auth';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const adminUserId = process.env.ADMIN_USER_ID;

  if (!user || !adminUserId || user.id !== adminUserId) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-bg text-ink flex flex-col font-sans">
      {/* Top Admin Navigation Header */}
      <header className="border-b border-line bg-bg sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            
            {/* Title / Identity */}
            <div className="flex items-baseline gap-3">
              <Link href="/admin" className="font-serif text-xl tracking-tight text-ink font-semibold">
                Kurasi Admin
              </Link>
              <span className="hidden sm:inline-block font-mono text-[10px] uppercase tracking-widest text-ink-faint">
                [Supabase SSR]
              </span>
            </div>

            {/* Navigation Tabs */}
            <nav className="hidden md:flex items-center gap-6 text-xs font-mono uppercase tracking-wider text-ink-muted">
              <Link
                href="/admin"
                className="hover:text-ink transition-colors"
              >
                Ikhtisar
              </Link>
              <Link
                href="/admin/profile"
                className="hover:text-ink transition-colors"
              >
                Profil
              </Link>
              <Link
                href="/admin/projects"
                className="hover:text-ink transition-colors"
              >
                Proyek
              </Link>
              <Link
                href="/admin/services"
                className="hover:text-ink transition-colors"
              >
                Layanan
              </Link>
            </nav>

            {/* Public Link & Logout */}
            <div className="flex items-center gap-5 text-xs font-mono uppercase tracking-wider">
              <Link
                href="/"
                target="_blank"
                className="text-ink-muted hover:text-ink underline underline-offset-4 decoration-line hover:decoration-ink transition-colors"
              >
                Lihat Publik &nearr;
              </Link>

              <form action={logoutAction}>
                <button
                  type="submit"
                  className="px-3 py-1.5 border border-line hover:border-ink text-ink font-medium transition-colors"
                >
                  Keluar
                </button>
              </form>
            </div>
          </div>

          {/* Mobile Tab Links */}
          <div className="md:hidden flex items-center gap-4 overflow-x-auto py-2.5 border-t border-line text-xs font-mono uppercase tracking-wider text-ink-muted">
            <Link href="/admin" className="hover:text-ink whitespace-nowrap">
              Ikhtisar
            </Link>
            <Link href="/admin/profile" className="hover:text-ink whitespace-nowrap">
              Profil
            </Link>
            <Link href="/admin/projects" className="hover:text-ink whitespace-nowrap">
              Proyek
            </Link>
            <Link href="/admin/services" className="hover:text-ink whitespace-nowrap">
              Layanan
            </Link>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-10">
        {children}
      </main>
    </div>
  );
}
