import { createClient } from '@/lib/supabase/server';
import { ProfileRow, ProjectRow, ServiceRow } from '@/types/database';

export async function getPublicProfile(): Promise<ProfileRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('profile')
    .select('*')
    .eq('id', 1)
    .maybeSingle();

  if (error) {
    console.error('Error fetching profile:', error.message);
    return null;
  }

  return data as ProfileRow | null;
}

export async function getPublicProjects(): Promise<ProjectRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('is_published', true)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching published projects:', error.message);
    return [];
  }

  return (data || []) as ProjectRow[];
}

export async function getPublicServices(): Promise<ServiceRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('is_published', true)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching published services:', error.message);
    return [];
  }

  return (data || []) as ServiceRow[];
}
