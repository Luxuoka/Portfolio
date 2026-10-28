'use server';

import { createClient } from '@/lib/supabase/server';
import { LoginSchema } from '@/lib/validations';
import { redirect } from 'next/navigation';

export interface ActionState {
  error?: string;
  success?: boolean;
}

export async function loginAction(
  _prevState: ActionState | null,
  formData: FormData
): Promise<ActionState> {
  const email = formData.get('email');
  const password = formData.get('password');

  const parsed = LoginSchema.safeParse({ email, password });
  if (!parsed.success) {
    return { error: 'Email atau kata sandi tidak valid' };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error || !data.user) {
    return { error: 'Email atau kata sandi salah' };
  }

  const adminUserId = process.env.ADMIN_USER_ID;
  if (!adminUserId || data.user.id !== adminUserId) {
    await supabase.auth.signOut();
    return { error: 'Akses ditolak: Akun ini bukan administrator sistem.' };
  }

  redirect('/admin');
}

export async function logoutAction(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/login');
}
