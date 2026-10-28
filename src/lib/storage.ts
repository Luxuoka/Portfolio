import { SupabaseClient } from '@supabase/supabase-js';
import crypto from 'crypto';

export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
export const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB
export const STORAGE_BUCKET = 'portfolio';

export function validateImageFile(file: File): { valid: boolean; error?: string } {
  if (!file) {
    return { valid: false, error: 'File tidak ditemukan' };
  }

  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: 'Format file tidak didukung. Hanya diperbolehkan JPG, PNG, atau WebP.',
    };
  }

  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    return {
      valid: false,
      error: 'Ukuran file melebihi batas maksimal 5 MB.',
    };
  }

  return { valid: true };
}

/**
 * Extracts storage relative path from a full Supabase public URL
 * Example: https://xyz.supabase.co/storage/v1/object/public/portfolio/profile/abc.webp -> "profile/abc.webp"
 */
export function extractStoragePath(publicUrl: string): string | null {
  if (!publicUrl) return null;
  const marker = `/storage/v1/object/public/${STORAGE_BUCKET}/`;
  const index = publicUrl.indexOf(marker);
  if (index !== -1) {
    return publicUrl.substring(index + marker.length);
  }
  return null;
}

/**
 * Uploads an image file to Supabase Storage bucket 'portfolio'
 * Uses authenticated server client session
 */
export async function uploadImageToStorage(
  supabase: SupabaseClient,
  file: File,
  folder: 'profile' | 'projects'
): Promise<string> {
  const validation = validateImageFile(file);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  const extension = file.name.split('.').pop()?.toLowerCase() || 'webp';
  const fileName = `${folder}/${crypto.randomUUID()}.${extension}`;
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const { error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(fileName, buffer, {
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    throw new Error(`Gagal mengunggah file ke Supabase Storage: ${error.message}`);
  }

  const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(fileName);
  return data.publicUrl;
}

/**
 * Deletes an image from Supabase Storage bucket 'portfolio' if it exists
 */
export async function deleteImageFromStorage(
  supabase: SupabaseClient,
  publicUrl: string
): Promise<boolean> {
  const path = extractStoragePath(publicUrl);
  if (!path) return false;

  try {
    const { error } = await supabase.storage.from(STORAGE_BUCKET).remove([path]);
    if (error) {
      console.error(`Error deleting storage file [${path}]:`, error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error(`Failed to delete storage file [${path}]:`, err);
    return false;
  }
}
