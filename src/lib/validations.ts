import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().trim().email('Format email tidak valid'),
  password: z.string().min(1, 'Password tidak boleh kosong'),
});

export const ProfileSchema = z.object({
  name: z.string().trim().min(2, 'Nama minimal 2 karakter').max(100),
  headline: z.string().trim().min(3, 'Headline minimal 3 karakter').max(150),
  bio: z.string().trim().min(10, 'Bio minimal 10 karakter').max(2000),
  photo_url: z.string().trim().url('URL foto tidak valid').or(z.literal('')).default(''),
  email: z.string().trim().email('Format email tidak valid'),
  whatsapp: z
    .string()
    .trim()
    .regex(/^[0-9+() -]*$/, 'Format nomor WhatsApp tidak valid')
    .optional()
    .default(''),
  socials: z
    .object({
      github: z.string().trim().url('URL GitHub tidak valid').or(z.literal('')).optional().default(''),
      linkedin: z.string().trim().url('URL LinkedIn tidak valid').or(z.literal('')).optional().default(''),
      instagram: z.string().trim().url('URL Instagram tidak valid').or(z.literal('')).optional().default(''),
    })
    .default({}),
  skills: z.array(z.string().trim()).default([]),
});

export const ProjectSchema = z.object({
  title: z.string().trim().min(2, 'Judul proyek minimal 2 karakter').max(150),
  description: z.string().trim().min(5, 'Deskripsi proyek minimal 5 karakter').max(2000),
  image_url: z.string().trim().url('URL gambar tidak valid').or(z.literal('')).default(''),
  demo_url: z.string().trim().url('URL Demo tidak valid').or(z.literal('')).optional().default(''),
  tech_stack: z.array(z.string().trim()).default([]),
  sort_order: z.coerce.number().int().default(0),
  is_published: z.boolean().default(true),
});

export const ServiceSchema = z
  .object({
    name: z.string().trim().min(2, 'Nama layanan minimal 2 karakter').max(150),
    price_min: z.coerce.number().min(0, 'Harga minimum tidak boleh negatif'),
    price_max: z.coerce.number().min(0, 'Harga maksimum tidak boleh negatif'),
    description: z.string().trim().min(5, 'Deskripsi layanan minimal 5 karakter').max(2000),
    features: z.array(z.string().trim()).default([]),
    sort_order: z.coerce.number().int().default(0),
    is_published: z.boolean().default(true),
  })
  .refine((data) => data.price_max >= data.price_min, {
    message: 'Harga maksimum (price_max) harus lebih besar atau sama dengan harga minimum (price_min)',
    path: ['price_max'],
  });

export type LoginInput = z.infer<typeof LoginSchema>;
export type ProfileInput = z.infer<typeof ProfileSchema>;
export type ProjectInput = z.infer<typeof ProjectSchema>;
export type ServiceInput = z.infer<typeof ServiceSchema>;
