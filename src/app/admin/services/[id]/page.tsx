import React from 'react';
import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import ServiceForm from '@/components/admin/ServiceForm';
import { ServiceRow } from '@/types/database';

export const revalidate = 0;

interface EditServicePageProps {
  params: {
    id: string;
  };
}

export default async function EditServicePage({ params }: EditServicePageProps) {
  const supabase = await createClient();
  const { data: service } = await supabase
    .from('services')
    .select('*')
    .eq('id', params.id)
    .maybeSingle();

  if (!service) {
    notFound();
  }

  return <ServiceForm initialData={service as ServiceRow} isEdit={true} />;
}
