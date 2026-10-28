import type { Metadata } from 'next';
import { getPublicProfile, getPublicProjects } from '@/lib/data';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProjectsCatalog from '@/components/ProjectsCatalog';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Rekam Karya & Katalog Proyek | Portofolio Pengembang',
  description: 'Daftar portofolio lengkap rekayasa perangkat lunak, sistem web, dan arsitektur produk digital.',
};

export default async function ProjectsPage() {
  const [profile, projects] = await Promise.all([
    getPublicProfile(),
    getPublicProjects(),
  ]);

  return (
    <div className="min-h-screen bg-bg text-ink flex flex-col justify-between">
      <Navbar name={profile?.name || 'Portfolio'} />

      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-12 md:py-16">
        <ProjectsCatalog projects={projects} />
      </main>

      <Footer name={profile?.name || 'Portfolio'} socials={profile?.socials} />
    </div>
  );
}

