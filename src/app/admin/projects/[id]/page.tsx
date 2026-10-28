import React from 'react';
import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import ProjectForm from '@/components/admin/ProjectForm';
import { ProjectRow } from '@/types/database';

export const revalidate = 0;

interface EditProjectPageProps {
  params: {
    id: string;
  };
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const supabase = await createClient();
  const { data: project } = await supabase
    .from('projects')
    .select('*')
    .eq('id', params.id)
    .maybeSingle();

  if (!project) {
    notFound();
  }

  return <ProjectForm initialData={project as ProjectRow} isEdit={true} />;
}
