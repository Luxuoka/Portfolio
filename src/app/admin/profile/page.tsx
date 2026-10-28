import React from 'react';
import { createClient } from '@/lib/supabase/server';
import ProfileForm from '@/components/admin/ProfileForm';
import { ProfileRow } from '@/types/database';

export const revalidate = 0;

export default async function AdminProfilePage() {
  const supabase = await createClient();
  const { data: profile } = await supabase
    .from('profile')
    .select('*')
    .eq('id', 1)
    .maybeSingle();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="border-b border-line pb-4">
        <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold block">
          KONFIGURASI
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-ink font-normal mt-1">
          Kelola Profil
        </h1>
        <p className="text-xs text-ink-muted mt-1">
          Perbarui identitas, biodata, keahlian teknis, dan tautan media sosial.
        </p>
      </div>

      <ProfileForm initialProfile={profile as ProfileRow | null} />
    </div>
  );
}
