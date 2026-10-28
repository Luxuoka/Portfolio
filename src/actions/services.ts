'use server';

import { requireAdmin } from '@/lib/auth-check';
import { ServiceSchema } from '@/lib/validations';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export interface ServiceActionState {
  error?: string;
  success?: boolean;
}

export async function createServiceAction(
  _prevState: ServiceActionState | null,
  formData: FormData
): Promise<ServiceActionState> {
  let created = false;
  try {
    const { supabase } = await requireAdmin();

    const name = formData.get('name') as string;
    const priceMin = Number(formData.get('price_min'));
    const priceMax = Number(formData.get('price_max'));
    const description = formData.get('description') as string;
    const sortOrder = Number(formData.get('sort_order')) || 0;
    const isPublished = formData.get('is_published') === 'true' || formData.get('is_published') === 'on';

    const featuresRaw = (formData.get('features') as string) || '';
    const features = featuresRaw
      .split('\n')
      .map((f) => f.trim())
      .filter((f) => f.length > 0);

    const parsed = ServiceSchema.safeParse({
      name,
      price_min: priceMin,
      price_max: priceMax,
      description,
      features,
      sort_order: sortOrder,
      is_published: isPublished,
    });

    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || 'Validasi gagal';
      return { error: firstError };
    }

    const { error: insertError } = await supabase.from('services').insert({
      name: parsed.data.name,
      price_min: parsed.data.price_min,
      price_max: parsed.data.price_max,
      description: parsed.data.description,
      features: parsed.data.features,
      sort_order: parsed.data.sort_order,
      is_published: parsed.data.is_published,
    });

    if (insertError) {
      return { error: `Gagal menambahkan layanan: ${insertError.message}` };
    }

    revalidatePath('/');
    revalidatePath('/admin');
    revalidatePath('/admin/services');
    created = true;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Terjadi kesalahan sistem';
    return { error: message };
  }

  if (created) {
    redirect('/admin/services');
  }

  return { success: true };
}

export async function updateServiceAction(
  id: string,
  _prevState: ServiceActionState | null,
  formData: FormData
): Promise<ServiceActionState> {
  let updated = false;
  try {
    const { supabase } = await requireAdmin();

    const name = formData.get('name') as string;
    const priceMin = Number(formData.get('price_min'));
    const priceMax = Number(formData.get('price_max'));
    const description = formData.get('description') as string;
    const sortOrder = Number(formData.get('sort_order')) || 0;
    const isPublished = formData.get('is_published') === 'true' || formData.get('is_published') === 'on';

    const featuresRaw = (formData.get('features') as string) || '';
    const features = featuresRaw
      .split('\n')
      .map((f) => f.trim())
      .filter((f) => f.length > 0);

    const parsed = ServiceSchema.safeParse({
      name,
      price_min: priceMin,
      price_max: priceMax,
      description,
      features,
      sort_order: sortOrder,
      is_published: isPublished,
    });

    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || 'Validasi gagal';
      return { error: firstError };
    }

    const { error: updateError } = await supabase
      .from('services')
      .update({
        name: parsed.data.name,
        price_min: parsed.data.price_min,
        price_max: parsed.data.price_max,
        description: parsed.data.description,
        features: parsed.data.features,
        sort_order: parsed.data.sort_order,
        is_published: parsed.data.is_published,
      })
      .eq('id', id);

    if (updateError) {
      return { error: `Gagal memperbarui layanan: ${updateError.message}` };
    }

    revalidatePath('/');
    revalidatePath('/admin');
    revalidatePath('/admin/services');
    updated = true;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Terjadi kesalahan sistem';
    return { error: message };
  }

  if (updated) {
    redirect('/admin/services');
  }

  return { success: true };
}

export async function deleteServiceAction(id: string): Promise<{ error?: string }> {
  try {
    const { supabase } = await requireAdmin();

    const { error } = await supabase.from('services').delete().eq('id', id);
    if (error) {
      return { error: `Gagal menghapus layanan: ${error.message}` };
    }

    revalidatePath('/');
    revalidatePath('/admin');
    revalidatePath('/admin/services');
    return {};
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Terjadi kesalahan sistem';
    return { error: message };
  }
}

export async function toggleServicePublishAction(
  id: string,
  currentStatus: boolean
): Promise<{ error?: string }> {
  try {
    const { supabase } = await requireAdmin();

    const { error } = await supabase
      .from('services')
      .update({ is_published: !currentStatus })
      .eq('id', id);

    if (error) {
      return { error: error.message };
    }

    revalidatePath('/');
    revalidatePath('/admin');
    revalidatePath('/admin/services');
    return {};
  } catch (err: unknown) {
    return { error: err instanceof Error ? err.message : 'Terjadi kesalahan' };
  }
}
