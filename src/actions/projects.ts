'use server';

import { requireAdmin } from '@/lib/auth-check';
import { uploadImageToStorage, deleteImageFromStorage } from '@/lib/storage';
import { ProjectSchema } from '@/lib/validations';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export interface ProjectActionState {
  error?: string;
  success?: boolean;
}

export async function createProjectAction(
  _prevState: ProjectActionState | null,
  formData: FormData
): Promise<ProjectActionState> {
  let created = false;
  try {
    const { supabase } = await requireAdmin();

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const demoUrl = (formData.get('demo_url') as string) || '';
    const sortOrder = Number(formData.get('sort_order')) || 0;
    const isPublished = formData.get('is_published') === 'true' || formData.get('is_published') === 'on';

    const techStackRaw = (formData.get('tech_stack') as string) || '';
    const techStack = techStackRaw
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    let imageUrl = (formData.get('image_url') as string) || '';
    const imageFile = formData.get('image_file') as File | null;
    if (imageFile && imageFile.size > 0 && imageFile.name) {
      imageUrl = await uploadImageToStorage(supabase, imageFile, 'projects');
    }

    const parsed = ProjectSchema.safeParse({
      title,
      description,
      image_url: imageUrl,
      demo_url: demoUrl,
      tech_stack: techStack,
      sort_order: sortOrder,
      is_published: isPublished,
    });

    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || 'Validasi gagal';
      return { error: firstError };
    }

    const { error: insertError } = await supabase.from('projects').insert({
      title: parsed.data.title,
      description: parsed.data.description,
      image_url: parsed.data.image_url,
      demo_url: parsed.data.demo_url,
      tech_stack: parsed.data.tech_stack,
      sort_order: parsed.data.sort_order,
      is_published: parsed.data.is_published,
    });

    if (insertError) {
      return { error: `Gagal menambahkan proyek: ${insertError.message}` };
    }

    revalidatePath('/');
    revalidatePath('/admin');
    revalidatePath('/admin/projects');
    created = true;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Terjadi kesalahan sistem';
    return { error: message };
  }

  if (created) {
    redirect('/admin/projects');
  }

  return { success: true };
}

export async function updateProjectAction(
  id: string,
  _prevState: ProjectActionState | null,
  formData: FormData
): Promise<ProjectActionState> {
  let updated = false;
  try {
    const { supabase } = await requireAdmin();

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const demoUrl = (formData.get('demo_url') as string) || '';
    const sortOrder = Number(formData.get('sort_order')) || 0;
    const isPublished = formData.get('is_published') === 'true' || formData.get('is_published') === 'on';

    const techStackRaw = (formData.get('tech_stack') as string) || '';
    const techStack = techStackRaw
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    let imageUrl = (formData.get('image_url') as string) || '';
    const currentImageUrl = (formData.get('current_image_url') as string) || '';

    const imageFile = formData.get('image_file') as File | null;
    if (imageFile && imageFile.size > 0 && imageFile.name) {
      const newImageUrl = await uploadImageToStorage(supabase, imageFile, 'projects');
      if (currentImageUrl && currentImageUrl !== newImageUrl) {
        await deleteImageFromStorage(supabase, currentImageUrl);
      }
      imageUrl = newImageUrl;
    }

    const parsed = ProjectSchema.safeParse({
      title,
      description,
      image_url: imageUrl,
      demo_url: demoUrl,
      tech_stack: techStack,
      sort_order: sortOrder,
      is_published: isPublished,
    });

    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || 'Validasi gagal';
      return { error: firstError };
    }

    const { error: updateError } = await supabase
      .from('projects')
      .update({
        title: parsed.data.title,
        description: parsed.data.description,
        image_url: parsed.data.image_url,
        demo_url: parsed.data.demo_url,
        tech_stack: parsed.data.tech_stack,
        sort_order: parsed.data.sort_order,
        is_published: parsed.data.is_published,
      })
      .eq('id', id);

    if (updateError) {
      return { error: `Gagal memperbarui proyek: ${updateError.message}` };
    }

    revalidatePath('/');
    revalidatePath('/admin');
    revalidatePath('/admin/projects');
    updated = true;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Terjadi kesalahan sistem';
    return { error: message };
  }

  if (updated) {
    redirect('/admin/projects');
  }

  return { success: true };
}

export async function deleteProjectAction(id: string, imageUrl?: string): Promise<{ error?: string }> {
  try {
    const { supabase } = await requireAdmin();

    if (imageUrl) {
      await deleteImageFromStorage(supabase, imageUrl);
    }

    const { error: deleteError } = await supabase.from('projects').delete().eq('id', id);
    if (deleteError) {
      return { error: `Gagal menghapus proyek: ${deleteError.message}` };
    }

    revalidatePath('/');
    revalidatePath('/admin');
    revalidatePath('/admin/projects');
    return {};
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Terjadi kesalahan sistem';
    return { error: message };
  }
}

export async function toggleProjectPublishAction(
  id: string,
  currentStatus: boolean
): Promise<{ error?: string }> {
  try {
    const { supabase } = await requireAdmin();

    const { error } = await supabase
      .from('projects')
      .update({ is_published: !currentStatus })
      .eq('id', id);

    if (error) {
      return { error: error.message };
    }

    revalidatePath('/');
    revalidatePath('/admin');
    revalidatePath('/admin/projects');
    return {};
  } catch (err: unknown) {
    return { error: err instanceof Error ? err.message : 'Terjadi kesalahan' };
  }
}
