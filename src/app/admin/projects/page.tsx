import React from 'react';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import Image from 'next/image';
import DeleteProjectButton from '@/components/admin/DeleteProjectButton';
import ToggleProjectButton from '@/components/admin/ToggleProjectButton';
import { ProjectRow } from '@/types/database';

export const revalidate = 0;

export default async function AdminProjectsPage() {
  const supabase = await createClient();
  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });

  const allProjects = (projects || []) as ProjectRow[];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-6 border-b border-line">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold block">
            MANAJEMEN ARSIP
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-ink font-normal mt-1">
            Daftar Proyek
          </h1>
          <p className="text-xs text-ink-muted mt-1 font-sans">
            Total {allProjects.length} proyek tersimpan dalam database.
          </p>
        </div>

        <Link
          href="/admin/projects/new"
          className="px-4 py-2.5 bg-ink text-bg text-xs font-mono uppercase tracking-wider font-semibold hover:bg-accent transition-colors self-start sm:self-auto"
        >
          + Tambah Proyek Baru
        </Link>
      </div>

      {allProjects.length === 0 ? (
        <div className="border border-line p-12 text-center bg-surface space-y-3">
          <p className="font-serif italic text-xl text-ink-muted">
            Belum ada data proyek.
          </p>
          <div className="pt-2">
            <Link
              href="/admin/projects/new"
              className="text-xs font-mono uppercase tracking-wider underline text-ink hover:text-accent"
            >
              Buat proyek pertama Anda &rarr;
            </Link>
          </div>
        </div>
      ) : (
        <div className="border border-line overflow-x-auto bg-surface">
          <table className="w-full text-left text-sm text-ink">
            <thead className="bg-surface-muted text-[11px] font-mono uppercase tracking-wider text-ink-muted border-b border-line">
              <tr>
                <th className="py-3 px-4">Pratinjau</th>
                <th className="py-3 px-4">Judul & Deskripsi</th>
                <th className="py-3 px-4 hidden md:table-cell">Tech Stack</th>
                <th className="py-3 px-4 text-center">Urutan</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Tindakan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line font-sans">
              {allProjects.map((project) => (
                <tr key={project.id} className="hover:bg-bg transition-colors">
                  <td className="py-4 px-4 w-24">
                    <div className="relative aspect-[16/10] w-20 border border-line-dark bg-surface-muted overflow-hidden">
                      {project.image_url ? (
                        <Image
                          src={project.image_url}
                          alt={project.title}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[10px] font-mono text-ink-faint">
                          N/A
                        </div>
                      )}
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    <div className="max-w-xs sm:max-w-md">
                      <p className="font-serif text-base text-ink font-semibold">{project.title}</p>
                      <p className="text-xs text-ink-muted line-clamp-1 mt-0.5">{project.description}</p>
                      {project.demo_url && (
                        <a
                          href={project.demo_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] font-mono text-accent hover:underline inline-block mt-1"
                        >
                          Demo Link &nearr;
                        </a>
                      )}
                    </div>
                  </td>

                  <td className="py-4 px-4 hidden md:table-cell">
                    <div className="flex flex-wrap gap-1 max-w-xs text-xs font-mono text-ink-muted">
                      {project.tech_stack?.slice(0, 3).map((t, idx) => (
                        <span key={idx} className="after:content-[','] last:after:content-['']">
                          {t}
                        </span>
                      ))}
                      {project.tech_stack && project.tech_stack.length > 3 && (
                        <span className="text-ink-faint">+{project.tech_stack.length - 3}</span>
                      )}
                    </div>
                  </td>

                  <td className="py-4 px-4 text-center font-mono text-xs text-ink-muted">
                    {project.sort_order}
                  </td>

                  <td className="py-4 px-4 text-center">
                    <ToggleProjectButton
                      id={project.id}
                      isPublished={project.is_published}
                    />
                  </td>

                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-3 text-xs font-mono">
                      <Link
                        href={`/admin/projects/${project.id}`}
                        className="text-ink hover:underline"
                      >
                        [Edit]
                      </Link>
                      <DeleteProjectButton
                        id={project.id}
                        imageUrl={project.image_url}
                        title={project.title}
                      />
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
