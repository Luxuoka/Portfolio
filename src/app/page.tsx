import { getPublicProfile, getPublicProjects, getPublicServices } from '@/lib/data';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Services from '@/components/Services';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export const revalidate = 0;

export default async function HomePage() {
  const [profile, projects, services] = await Promise.all([
    getPublicProfile(),
    getPublicProjects(),
    getPublicServices(),
  ]);

  return (
    <main className="min-h-screen bg-bg text-ink flex flex-col justify-between">
      <Navbar name={profile?.name || 'Portfolio'} />

      <div>
        <Hero profile={profile} />
        <Skills skills={profile?.skills || []} />
        <Projects projects={projects} />
        <Services services={services} whatsapp={profile?.whatsapp} />
        <Contact profile={profile} />
      </div>

      <Footer name={profile?.name || 'Portfolio'} socials={profile?.socials} />
    </main>
  );
}
