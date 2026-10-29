<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f0c29,50:302b63,100:24243e&height=140&section=header" width="100%" />

# 💼 Portfolio & Professional Services

### *Web Portfolio Modern dengan Portal Admin Terpadu*

Aplikasi portfolio modern dan portal admin untuk menampilkan profil, proyek, dan layanan profesional, dibangun dengan **Next.js App Router**, **TypeScript**, **Tailwind CSS**, dan **Supabase** (Database, Authentication, & Storage).

<br/>

<img src="https://img.shields.io/badge/Next.js_14-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
<img src="https://img.shields.io/badge/React_18-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
<img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
<img src="https://img.shields.io/badge/Supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
<img src="https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white" alt="Zod" />
<img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />

</div>

---

## 📖 Tentang Proyek

Proyek ini terdiri dari dua bagian: **halaman publik** untuk menampilkan profil, proyek, dan paket layanan beserta kisaran harga, serta **portal admin** untuk mengelola seluruh kontennya langsung dari browser tanpa menyentuh kode. Tampilan menggunakan *Dark Glassmorphism Design System* yang modern.

## ✨ Fitur Utama

### 🌐 Halaman Publik

| | Fitur | Deskripsi |
|---|---|---|
| 👤 | **Profil** | Nama, headline profesi, bio, foto, kontak, tautan sosial, dan daftar keahlian. |
| 🗂️ | **Proyek** | Showcase proyek dengan gambar, deskripsi, tech stack, dan link demo. |
| 💰 | **Layanan** | Paket layanan dengan kisaran harga dan daftar fitur / deliverables. |

### 🛡️ Portal Admin

| | Fitur | Deskripsi |
|---|---|---|
| 🔐 | **Login Terproteksi** | Autentikasi Supabase Auth, hanya satu user admin yang diizinkan. |
| 🪪 | **Kelola Profil** | Ubah identitas, bio, keahlian, tautan sosial, dan upload foto profil. |
| 📁 | **Kelola Proyek** | Tambah, ubah, urutkan, dan publish/draft proyek, termasuk upload gambar. |
| 🧾 | **Kelola Layanan** | Atur nama paket, kisaran harga, deskripsi, fitur, urutan, dan status publish. |
| ✅ | **Validasi Server** | Seluruh input divalidasi dengan Zod di sisi server sebelum disimpan. |

## 🛠️ Tech Stack

<p>
  <img src="https://skillicons.dev/icons?i=nextjs,react,ts,tailwind,supabase,postgres,vercel&theme=dark" alt="Tech stack" />
</p>

| Kategori | Teknologi |
|---|---|
| **Framework** | Next.js 14 (App Router) + React 18 + TypeScript |
| **Styling** | Tailwind CSS + Custom Dark Glassmorphism Design System |
| **Backend & Database** | Supabase PostgreSQL |
| **Authentication** | Supabase Auth (`signInWithPassword` & `getUser()`) |
| **Storage** | Supabase Storage (bucket publik `portfolio`, folder `profile/` dan `projects/`) |
| **Validasi** | Zod (schema validation di sisi server) |
| **Deployment** | Vercel |

## 🗄️ Struktur Database Supabase

<details>
<summary><b>1. Tabel <code>profile</code></b> (row <code>id = 1</code>)</summary>

<br/>

| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | integer | Primary key, default 1 |
| `name` | text | Nama lengkap |
| `headline` | text | Headline profesi |
| `bio` | text | Bio ringkas |
| `photo_url` | text | URL foto profil |
| `email` | text | Email kontak |
| `whatsapp` | text | Nomor WhatsApp |
| `socials` | jsonb | Contoh: `{"github": "...", "linkedin": "...", "instagram": "..."}` |
| `skills` | text[] | Daftar keahlian |
| `updated_at` | timestamptz | Waktu pembaruan terakhir |

</details>

<details>
<summary><b>2. Tabel <code>projects</code></b></summary>

<br/>

| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | uuid | Primary key, default `gen_random_uuid()` |
| `title` | text | Judul proyek |
| `description` | text | Deskripsi proyek |
| `image_url` | text | URL gambar |
| `demo_url` | text | Link demo |
| `tech_stack` | text[] | Teknologi yang dipakai |
| `sort_order` | integer | Urutan tampil |
| `is_published` | boolean | Status publish |
| `created_at` | timestamptz | Waktu dibuat |

</details>

<details>
<summary><b>3. Tabel <code>services</code></b></summary>

<br/>

| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | uuid | Primary key, default `gen_random_uuid()` |
| `name` | text | Nama paket layanan |
| `price_min` | numeric | Harga minimum |
| `price_max` | numeric | Harga maksimum (divalidasi `price_max >= price_min`) |
| `description` | text | Deskripsi singkat |
| `features` | text[] | Daftar fitur / deliverables |
| `sort_order` | integer | Urutan tampil |
| `is_published` | boolean | Status publish |
| `created_at` | timestamptz | Waktu dibuat |

</details>

<details>
<summary><b>4. Supabase Storage Bucket</b></summary>

<br/>

- **Nama bucket:** `portfolio` (public bucket)
- **Folder:** `profile/` dan `projects/`

</details>

## ⚙️ Environment Variables

Buat file `.env.local` di root proyek:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key

# Admin User ID (UUID pengguna dari Supabase Authentication > Users)
ADMIN_USER_ID=your-admin-user-uuid
```

> ⚠️ **Catatan Keamanan**
> - Jangan pernah menggunakan `service_role` secret key di client maupun server front-end.
> - Hanya user dengan `id` yang sama persis dengan `ADMIN_USER_ID` yang diizinkan mengakses rute `/admin` dan menjalankan Server Action penulisan data.
> - Jangan meng-commit file `.env.local` ke GitHub.

## 🔐 Cara Mendapatkan `ADMIN_USER_ID`

1. Buka dashboard proyek Supabase Anda.
2. Masuk ke menu **Authentication** → **Users**.
3. Buat user admin baru (atau pilih user yang sudah ada).
4. Salin nilai **User UID** (string UUID, misalnya `a1b2c3d4-e5f6-7890-abcd-ef1234567890`).
5. Tempelkan ke variabel `ADMIN_USER_ID` di `.env.local` atau di dashboard Vercel.

## 💻 Menjalankan di Lingkungan Lokal

**1. Install dependensi**

```bash
npm install
```

**2. Jalankan server pengembangan**

```bash
npm run dev
```

**3. Buka di browser**

| Halaman | URL |
|---|---|
| Halaman Publik | [http://localhost:3000](http://localhost:3000) |
| Portal Admin | [http://localhost:3000/login](http://localhost:3000/login) |

## 🚢 Deploy ke Vercel

1. Push repository ini ke GitHub / GitLab.
2. Buka dashboard [Vercel](https://vercel.com) dan klik **Add New Project**.
3. Import repository Anda.
4. Di bagian **Environment Variables**, tambahkan:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
   - `ADMIN_USER_ID`
5. Klik **Deploy**.
6. Website portfolio Anda sudah aktif dan live di edge network Vercel.

---

<div align="center">

**Dibuat dengan 💜 oleh [Putra Cikal Asmarandana](https://github.com/Luxuoka)**

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:24243e,50:302b63,100:0f0c29&height=100&section=footer" width="100%" />

</div>
