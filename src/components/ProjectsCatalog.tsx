'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ProjectRow } from '@/types/database';
import { Search, ExternalLink, ChevronDown, Layers, ArrowLeft, Filter } from 'lucide-react';

interface ProjectsCatalogProps {
  projects: ProjectRow[];
}

const ITEMS_PER_PAGE = 6;

export default function ProjectsCatalog({ projects }: ProjectsCatalogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTech, setSelectedTech] = useState<string>('Semua');
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  // Extract unique tech tags from all projects
  const allTechList = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => {
      p.tech_stack?.forEach((t) => {
        if (t.trim()) set.add(t.trim());
      });
    });
    return ['Semua', ...Array.from(set).sort()];
  }, [projects]);

  // Filter projects by search and tech tag
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tech_stack?.some((t) =>
          t.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchTech =
        selectedTech === 'Semua' ||
        project.tech_stack?.some(
          (t) => t.trim().toLowerCase() === selectedTech.toLowerCase()
        );

      return matchSearch && matchTech;
    });
  }, [projects, searchQuery, selectedTech]);

  // Paginated/Lazy-loaded slice
  const displayedProjects = filteredProjects.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProjects.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedTech('Semua');
    setVisibleCount(ITEMS_PER_PAGE);
  };

  return (
    <div className="space-y-12">
      {/* Top Banner & Navigation Breadcrumbs */}
      <div className="space-y-6 pb-8 border-b border-line">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-ink-muted hover:text-accent transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Beranda</span>
        </Link>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 bg-accent/10 border border-accent/20 text-accent text-xs font-mono font-semibold rounded">
              ARSIP LENGKAP REKAM KARYA
            </span>
            <span className="text-xs font-mono text-ink-muted">
              {projects.length} Total Proyek
            </span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl text-ink font-normal leading-tight">
            Katalog Proyek & Solusi Digital
          </h1>
          <p className="text-base sm:text-lg text-ink-muted max-w-3xl font-sans">
            Eksplorasi portofolio proyek lengkap, mulai dari aplikasi web enterprise, platform SaaS, e-commerce, hingga integrasi API berkinerja tinggi.
          </p>
        </div>

        {/* Search and Filters Bar */}
        <div className="pt-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-faint" />
            <input
              type="text"
              placeholder="Cari berdasarkan nama, kata kunci, atau teknologi..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(ITEMS_PER_PAGE);
              }}
              className="w-full pl-10 pr-4 py-2.5 bg-surface border border-line rounded-lg text-sm text-ink placeholder-ink-faint focus:border-accent focus:outline-none transition-colors"
            />
          </div>

          {/* Stats Badge */}
          <div className="text-xs font-mono text-ink-muted flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-accent" />
            <span>Menampilkan <strong>{filteredProjects.length}</strong> dari {projects.length} proyek</span>
          </div>
        </div>

        {/* Tech Tag Pills Filter */}
        {allTechList.length > 1 && (
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="text-xs font-mono text-ink-faint mr-1 uppercase">Filter:</span>
            {allTechList.map((tech) => {
              const isSelected = selectedTech === tech;
              return (
                <button
                  key={tech}
                  type="button"
                  onClick={() => {
                    setSelectedTech(tech);
                    setVisibleCount(ITEMS_PER_PAGE);
                  }}
                  className={`px-3 py-1 text-xs font-mono rounded-md border transition-all ${
                    isSelected
                      ? 'bg-accent text-bg border-accent font-semibold shadow-sm'
                      : 'bg-surface hover:bg-surface-muted text-ink border-line'
                  }`}
                >
                  {tech}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Projects Grid */}
      {displayedProjects.length === 0 ? (
        <div className="py-20 text-center border border-line rounded-xl bg-surface/50 p-8 space-y-4">
          <Layers className="w-12 h-12 text-ink-faint mx-auto" />
          <h3 className="font-serif text-2xl text-ink">Tidak Ada Proyek Ditemukan</h3>
          <p className="text-sm text-ink-muted max-w-md mx-auto font-sans">
            Tidak ada proyek yang sesuai dengan kata kunci &ldquo;{searchQuery}&rdquo; {selectedTech !== 'Semua' && `atau teknologi ${selectedTech}`}.
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="px-5 py-2.5 bg-ink text-bg font-mono text-xs uppercase tracking-wider rounded font-medium hover:bg-accent transition-colors"
          >
            Reset Semua Filter
          </button>
        </div>
      ) : (
        <div className="space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedProjects.map((project, index) => {
              const formattedIndex = String(index + 1).padStart(2, '0');

              return (
                <article
                  key={project.id}
                  className="group flex flex-col bg-surface/50 border border-line rounded-xl overflow-hidden hover:border-accent/40 hover:shadow-lg transition-all duration-300"
                >
                  {/* Visual Preview */}
                  <div className="relative aspect-[16/10] w-full bg-surface-muted overflow-hidden border-b border-line">
                    {project.image_url ? (
                      <Image
                        src={project.image_url}
                        alt={project.title}
                        fill
                        loading="lazy"
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-ink-muted bg-surface">
                        <Layers className="w-10 h-10 text-accent/60 mb-2" />
                        <span className="font-mono text-xs uppercase tracking-wider">
                          Dokumentasi Visual
                        </span>
                      </div>
                    )}

                    {/* Tag index */}
                    <div className="absolute top-3 left-3 px-2 py-0.5 bg-bg/90 backdrop-blur-sm border border-line rounded text-[11px] font-mono font-semibold text-accent shadow-sm">
                      #{formattedIndex}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                    <div className="space-y-2.5">
                      <h3 className="font-serif text-2xl text-ink font-semibold leading-snug group-hover:text-accent transition-colors">
                        {project.title}
                      </h3>

                      <p className="text-sm text-ink-muted leading-relaxed font-sans line-clamp-3">
                        {project.description}
                      </p>
                    </div>

                    {/* Tech Badges & Demo Action */}
                    <div className="space-y-4 pt-3 border-t border-line/60">
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

                      <div className="pt-1">
                        {project.demo_url ? (
                          <a
                            href={project.demo_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-accent hover:text-accent-hover underline underline-offset-4"
                          >
                            <span>Buka Demo Proyek</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        ) : (
                          <span className="text-xs font-mono text-ink-faint italic">
                            Internal System / Private Repo
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Load More Button for Lazy Loading */}
          {hasMore && (
            <div className="pt-4 text-center">
              <button
                type="button"
                onClick={handleLoadMore}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-ink text-bg font-mono text-xs uppercase tracking-wider font-semibold rounded-lg hover:bg-accent transition-all shadow-md"
              >
                <span>Muat Lebih Banyak ({filteredProjects.length - visibleCount} Proyek Tersisa)</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

