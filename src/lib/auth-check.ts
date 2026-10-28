import { createClient } from '@/lib/supabase/server';
import { User } from '@supabase/supabase-js';

/**
 * Enforces admin authorization on the server.
 * Uses supabase.auth.getUser() and verifies user.id === process.env.ADMIN_USER_ID.
 * Throws an Error if unauthorized.
 */
export async function requireAdmin(): Promise<{
  supabase: Awaited<ReturnType<typeof createClient>>;
  user: User;
}> {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  const adminUserId = process.env.ADMIN_USER_ID;

  if (error || !user || !adminUserId || user.id !== adminUserId) {
    throw new Error('Unauthorized: Akses ditolak. Sesi admin diperlukan.');
  }

  return { supabase, user };
}
