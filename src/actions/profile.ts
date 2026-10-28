'use server';

import { requireAdmin } from '@/lib/auth-check';
import { uploadImageToStorage, deleteImageFromStorage } from '@/lib/storage';
import { ProfileSchema } from '@/lib/validations';
import { revalidatePath } from 'next/cache';

export interface ProfileActionState {
  error?: string;
  success?: boolean;
}

export async function updateProfileAction(
  _prevState: ProfileActionState | null,
  formData: FormData
): Promise<ProfileActionState> {
  try {
    // 1. Enforce admin check
    const { supabase } = await requireAdmin();

    const name = formData.get('name') as string;
    const headline = formData.get('headline') as string;
    const bio = formData.get('bio') as string;
    const email = formData.get('email') as string;
    const whatsapp = (formData.get('whatsapp') as string) || '';
    let photoUrl = (formData.get('photo_url') as string) || '';
    const currentPhotoUrl = (formData.get('current_photo_url') as string) || '';

    const github = (formData.get('social_github') as string) || '';
    const linkedin = (formData.get('social_linkedin') as string) || '';
    const instagram = (formData.get('social_instagram') as string) || '';

    const skillsRaw = (formData.get('skills') as string) || '';
    const skills = skillsRaw
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    // Check if new photo was uploaded
    const photoFile = formData.get('photo_file') as File | null;
    if (photoFile && photoFile.size > 0 && photoFile.name) {
      const newPhotoUrl = await uploadImageToStorage(supabase, photoFile, 'profile');
      // If upload succeeded and there was an old storage photo, delete the old file
      if (currentPhotoUrl && currentPhotoUrl !== newPhotoUrl) {
        await deleteImageFromStorage(supabase, currentPhotoUrl);
      }
      photoUrl = newPhotoUrl;
    }

    const parsed = ProfileSchema.safeParse({
      name,
      headline,
      bio,
      photo_url: photoUrl,
      email,
      whatsapp,
      socials: {
        github,
        linkedin,
        instagram,
      },
      skills,
    });

    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || 'Validasi gagal';
      return { error: firstError };
    }

    // Upsert or update profile id=1
    const { error: updateError } = await supabase
      .from('profile')
      .upsert({
        id: 1,
        name: parsed.data.name,
        headline: parsed.data.headline,
        bio: parsed.data.bio,
        photo_url: parsed.data.photo_url,
        email: parsed.data.email,
        whatsapp: parsed.data.whatsapp,
        socials: parsed.data.socials,
        skills: parsed.data.skills,
        updated_at: new Date().toISOString(),
      });

    if (updateError) {
      return { error: `Gagal memperbarui profil: ${updateError.message}` };
    }

    revalidatePath('/');
    revalidatePath('/admin');
    revalidatePath('/admin/profile');
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Terjadi kesalahan sistem';
    return { error: message };
  }
}
