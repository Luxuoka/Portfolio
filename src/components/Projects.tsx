'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ProjectRow } from '@/types/database';
import { ExternalLink, ChevronDown, ChevronUp, ArrowRight, Layers } from 'lucide-react';

interface ProjectsProps {
  projects: ProjectRow[];
  initialDisplayCount?: number;
}

export default function Projects({ projects, initialDisplayCount = 2 }: ProjectsProps) {
  const [displayCount, setDisplayCount] = useState(initialDisplayCount);
  const hasMore = projects.length > displayCount;
  const isExpanded = displayCount > initialDisplayCount;

  const visibleProjects = projects.slice(0, displayCount);

  const handleToggleLoad = () => {
    if (hasMore) {
      // Load all or next batch (load all projects)
      setDisplayCount(projects.length);
    } else {
      // Collapse back
      setDisplayCount(initialDisplayCount);
      // Smooth scroll back to section top
      const section = document.getElementById('projects');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="projects" className="py-20 border-b border-line">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-line">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 bg-accent/10 border border-accent/20 text-accent text-xs font-mono font-semibold rounded">
                02 / REKAM KARYA
              </span>
              <span className="text-xs font-mono text-ink-muted">
                {projects.length} Proyek Terdaftar
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-ink font-normal leading-tight">
              Pilihan pekerjaan dengan performa tinggi & arsitektur bersih.
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono uppercase tracking-wider text-accent hover:text-accent-hover bg-accent/5 hover:bg-accent/15 border border-accent/20 rounded transition-all"
            >
              <span>Buka Katalog Lengkap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Empty State */}
        {projects.length === 0 ? (
          <div className="py-16 text-center border-b border-line">
            <p className="font-serif italic text-xl text-ink-muted">
              Belum ada proyek yang dipublikasikan saat ini.
            </p>
            <p className="text-xs font-mono text-ink-faint mt-2 uppercase tracking-widest">
              Daftar proyek akan diperbarui melalui panel kurasi.
            </p>
          </div>
        ) : (
          <div className="pt-12 space-y-12">
            
            {/* Grid Layout: Compact, Modern 2-Column Responsive Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              {visibleProjects.map((project, index) => {
                const formattedIndex = String(index + 1).padStart(2, '0');

                return (
                  <article
                    key={project.id}
                    className="group flex flex-col bg-surface/50 border border-line rounded-lg overflow-hidden hover:border-accent/40 hover:shadow-md transition-all duration-300"
                  >
                    {/* Visual Preview (No grayscale, vivid natural colors, lazy loaded) */}
                    <div className="relative aspect-[16/10] w-full bg-surface-muted overflow-hidden border-b border-line">
                      {project.image_url ? (
                        <Image
                          src={project.image_url}
                          alt={project.title}
                          fill
                          loading="lazy"
                          className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 550px"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center text-ink-muted bg-surface">
                          <Layers className="w-10 h-10 text-accent/60 mb-2" />
                          <span className="font-mono text-xs tracking-wider uppercase">
                            Dokumentasi Sistem
                          </span>
                        </div>
                      )}

                      {/* Floating Index Tag */}
                      <div className="absolute top-3 left-3 px-2.5 py-1 bg-bg/90 backdrop-blur-sm border border-line rounded text-xs font-mono font-semibold text-accent shadow-sm">
                        #{formattedIndex}
                      </div>
                    </div>

                    {/* Content Details */}
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                      <div className="space-y-3">
                        <h3 className="font-serif text-2xl text-ink font-medium leading-snug group-hover:text-accent transition-colors">
                          {project.title}
                        </h3>

                        <p className="text-sm text-ink-muted leading-relaxed font-sans line-clamp-3">
                          {project.description}
                        </p>
                      </div>

                      {/* Tech Stack Badges */}
                      <div className="space-y-4 pt-2 border-t border-line/60">
                        {project.tech_stack && project.tech_stack.length > 0 && (
                          <div className="flex flex-wrap gap-1.5">
                            {project.tech_stack.map((tech, i) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 text-[11px] font-mono bg-accent/10 text-accent border border-accent/20 rounded font-medium"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Demo Link */}
                        {project.demo_url ? (
                          <a
                            href={project.demo_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-accent hover:text-accent-hover underline underline-offset-4 transition-colors"
                          >
                            <span>Buka Hasil Kerja</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        ) : (
                          <span className="text-xs font-mono text-ink-faint italic">
                            Internal System / Private Repo
                          </span>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Load More / View All Project Controls */}
            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
              {projects.length > initialDisplayCount && (
                <button
                  type="button"
                  onClick={handleToggleLoad}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-ink text-bg font-mono text-xs uppercase tracking-wider font-semibold rounded hover:bg-accent transition-colors shadow-sm"
                >
                  {hasMore ? (
                    <>
                      <span>Lihat Lainnya ({projects.length - displayCount} Proyek Lagi)</span>
                      <ChevronDown className="w-4 h-4" />
                    </>
                  ) : isExpanded ? (
                    <>
                      <span>Ciutkan Proyek</span>
                      <ChevronUp className="w-4 h-4" />
                    </>
                  ) : null}
                </button>
              )}

              <Link
                href="/projects"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-surface hover:bg-surface-muted text-ink border border-line font-mono text-xs uppercase tracking-wider font-medium rounded transition-colors"
              >
                <span>Halaman Arsip Semua Proyek &rarr;</span>
              </Link>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
