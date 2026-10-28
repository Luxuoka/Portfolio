import React from 'react';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { ProjectRow, ServiceRow } from '@/types/database';

export const revalidate = 0;

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const [
    { data: profile },
    { data: projects },
    { data: services },
  ] = await Promise.all([
    supabase.from('profile').select('*').eq('id', 1).maybeSingle(),
    supabase.from('projects').select('*').order('created_at', { ascending: false }),
    supabase.from('services').select('*').order('created_at', { ascending: false }),
  ]);

  const allProjects = (projects || []) as ProjectRow[];
  const allServices = (services || []) as ServiceRow[];

  const publishedProjectsCount = allProjects.filter((p) => p.is_published).length;
  const publishedServicesCount = allServices.filter((s) => s.is_published).length;

  return (
    <div className="space-y-10">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-6 border-b border-line">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold block">
            MANAJEMEN KONTEN
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-ink font-normal mt-1">
            Ikhtisar Data Portofolio
          </h1>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-wider">
          <Link
            href="/admin/projects/new"
            className="px-4 py-2.5 bg-ink text-bg font-semibold hover:bg-accent transition-colors"
          >
            + Proyek Baru
          </Link>
          <Link
            href="/admin/services/new"
            className="px-4 py-2.5 border border-line-dark text-ink font-semibold hover:bg-surface transition-colors"
          >
            + Layanan Baru
          </Link>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="border border-line p-6 bg-surface space-y-3">
          <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-ink-muted">
            <span>Profil Utama</span>
            <Link href="/admin/profile" className="text-accent hover:underline">
              Ubah &rarr;
            </Link>
          </div>
          <p className="font-serif text-2xl text-ink font-normal">
            {profile ? profile.name : 'Belum Terisi'}
          </p>
          <p className="text-xs text-ink-muted line-clamp-1 font-sans">
            {profile ? profile.headline : 'Klik ubah untuk melengkapi data.'}
          </p>
        </div>

        {/* Projects Card */}
        <div className="border border-line p-6 bg-surface space-y-3">
          <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-ink-muted">
            <span>Proyek</span>
            <Link href="/admin/projects" className="text-accent hover:underline">
              Kelola &rarr;
            </Link>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-3xl text-ink font-bold">{allProjects.length}</span>
            <span className="font-mono text-xs text-ink-muted">
              ({publishedProjectsCount} dipublikasikan)
            </span>
          </div>
          <p className="text-xs text-ink-muted font-sans">
            Karya dan studi kasus aktif.
          </p>
        </div>

        {/* Services Card */}
        <div className="border border-line p-6 bg-surface space-y-3">
          <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-ink-muted">
            <span>Layanan</span>
            <Link href="/admin/services" className="text-accent hover:underline">
              Kelola &rarr;
            </Link>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-3xl text-ink font-bold">{allServices.length}</span>
            <span className="font-mono text-xs text-ink-muted">
              ({publishedServicesCount} dipublikasikan)
            </span>
          </div>
          <p className="text-xs text-ink-muted font-sans">
            Paket dan estimasi biaya jasa.
          </p>
        </div>
      </div>

      {/* Tables of Recent Records */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 pt-4">
        
        {/* Recent Projects */}
        <div className="space-y-4">
          <div className="flex items-baseline justify-between border-b border-line pb-2">
            <h2 className="font-serif text-xl text-ink font-normal">
              Daftar Proyek Terkini
            </h2>
            <Link href="/admin/projects" className="text-xs font-mono text-ink-muted hover:text-ink">
              Lihat Semua ({allProjects.length}) &rarr;
            </Link>
          </div>

          {allProjects.length === 0 ? (
            <p className="text-xs font-mono text-ink-faint py-4">Belum ada proyek.</p>
          ) : (
            <div className="divide-y divide-line border-b border-line">
              {allProjects.slice(0, 5).map((p) => (
                <div key={p.id} className="py-3 flex items-baseline justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-ink truncate">{p.title}</p>
                    <p className="text-xs text-ink-muted font-sans line-clamp-1">{p.description}</p>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-mono flex-shrink-0">
                    <span className={p.is_published ? 'text-accent' : 'text-ink-faint'}>
                      [{p.is_published ? 'PUBLIK' : 'DRAFT'}]
                    </span>
                    <Link href={`/admin/projects/${p.id}`} className="text-ink hover:underline">
                      Edit
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Services */}
        <div className="space-y-4">
          <div className="flex items-baseline justify-between border-b border-line pb-2">
            <h2 className="font-serif text-xl text-ink font-normal">
              Daftar Layanan Terkini
            </h2>
            <Link href="/admin/services" className="text-xs font-mono text-ink-muted hover:text-ink">
              Lihat Semua ({allServices.length}) &rarr;
            </Link>
          </div>

          {allServices.length === 0 ? (
            <p className="text-xs font-mono text-ink-faint py-4">Belum ada layanan.</p>
          ) : (
            <div className="divide-y divide-line border-b border-line">
              {allServices.slice(0, 5).map((s) => (
                <div key={s.id} className="py-3 flex items-baseline justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-ink truncate">{s.name}</p>
                    <p className="text-xs text-ink-muted font-sans line-clamp-1">{s.description}</p>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-mono flex-shrink-0">
                    <span className={s.is_published ? 'text-accent' : 'text-ink-faint'}>
                      [{s.is_published ? 'PUBLIK' : 'DRAFT'}]
                    </span>
                    <Link href={`/admin/services/${s.id}`} className="text-ink hover:underline">
                      Edit
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
