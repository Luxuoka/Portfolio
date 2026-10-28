# Portfolio & Professional Services Web Application

Aplikasi portfolio modern dan portal admin yang dibangun dengan Next.js App Router, TypeScript, Tailwind CSS, dan Supabase Backend (Database, Authentication, & Storage).

---

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router) + React 18 + TypeScript
- **Styling**: Tailwind CSS + Custom Dark Glassmorphism Design System
- **Backend & Database**: Supabase PostgreSQL
- **Authentication**: Supabase Auth (`supabase.auth.signInWithPassword` & `supabase.auth.getUser()`)
- **Storage**: Supabase Storage (Bucket publik: `portfolio`, folder `profile/` dan `projects/`)
- **Validation**: Zod (Schema validation di sisi server)
- **Deployment**: Vercel

---

## 🗄️ Struktur Database Supabase

Aplikasi menggunakan tabel-tabel berikut yang sudah disiapkan di database Supabase:

### 1. `profile` (Row `id = 1`)
- `id`: integer (primary key, default 1)
- `name`: text
- `headline`: text
- `bio`: text
- `photo_url`: text
- `email`: text
- `whatsapp`: text
- `socials`: jsonb (e.g. `{"github": "...", "linkedin": "...", "instagram": "..."}`)
- `skills`: text[]
- `updated_at`: timestamptz

### 2. `projects`
- `id`: uuid (primary key, default `gen_random_uuid()`)
- `title`: text
- `description`: text
- `image_url`: text
- `demo_url`: text
- `tech_stack`: text[]
- `sort_order`: integer
- `is_published`: boolean
- `created_at`: timestamptz

### 3. `services`
- `id`: uuid (primary key, default `gen_random_uuid()`)
- `name`: text
- `price_min`: numeric
- `price_max`: numeric (divalidasi `price_max >= price_min`)
- `description`: text
- `features`: text[]
- `sort_order`: integer
- `is_published`: boolean
- `created_at`: timestamptz

### 4. Supabase Storage Bucket
- **Nama Bucket**: `portfolio` (Public bucket)
- **Folder**: `profile/` dan `projects/`

---

## ⚙️ Environment Variables

Buat file `.env.local` di root proyek:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key

# Admin User ID (UUID pengguna dari Supabase Authentication > Users)
ADMIN_USER_ID=your-admin-user-uuid
```

> **Catatan Keamanan**:
> - Jangan pernah menggunakan `service_role` secret key di client maupun server front-end.
> - Hanya user dengan `id` sama persis dengan `ADMIN_USER_ID` yang diizinkan mengakses rute `/admin` dan menjalankan Server Action penulisan data.

---

## 🔐 Cara Mendapatkan `ADMIN_USER_ID`

1. Buka dashboard proyek Supabase Anda.
2. Masuk ke menu **Authentication** > **Users**.
3. Buat user admin baru (atau pilih user yang sudah ada).
4. Salin nilai **User UID** (berupa string UUID, misal `a1b2c3d4-e5f6-7890-abcd-ef1234567890`).
5. Tempelkan UID tersebut ke variabel `ADMIN_USER_ID` di file `.env.local` atau dashboard Vercel.

---

## 💻 Menjalankan di Lingkungan Lokal

1. Install dependensi:
   ```bash
   npm install
   ```
2. Jalankan server pengembangan:
   ```bash
   npm run dev
   ```
3. Buka browser:
   - Halaman Publik: [http://localhost:3000](http://localhost:3000)
   - Portal Admin: [http://localhost:3000/login](http://localhost:3000/login)

---

## 🚢 Langkah Deploy ke Vercel

1. Push repository ini ke GitHub / GitLab.
2. Buka dashboard [Vercel](https://vercel.com) dan klik **Add New Project**.
3. Import repository Anda.
4. Di bagian **Environment Variables**, tambahkan:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
   - `ADMIN_USER_ID`
5. Klik **Deploy**.
6. Website portfolio Anda sudah aktif dan live secara global di edge network Vercel!
