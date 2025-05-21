# 📰 Portal Berita Next.js

Aplikasi portal berita berbasis web yang dibangun menggunakan Next.js (App Router). Aplikasi ini menampilkan berita dari dua sumber:

1. Berita Lokal – yang dapat ditambah, edit, dan hapus oleh admin.
2. Berita Eksternal – yang diambil secara otomatis dari portal berita nyata melalui RSS feed.

Fitur ini dilengkapi autentikasi login menggunakan akun GitHub dengan NextAuth.

---

## ✨ Fitur Utama

- ✍️ Tambah/Edit/Hapus berita lokal
- 🔐 Autentikasi dengan GitHub
- 🌍 Ambil berita terkini dari 3 portal resmi:
  - BBC News
  - Tempo.co
  - VOA Indonesia
- 🧭 Navigasi antar halaman dinamis

---

## 🚀 Cara Instalasi & Menjalankan

### 1. Clone Repository

```bash
git clone <url-repo-anda>
cd nama-folder-proyek
```

### 2. Install Dependency

```bash
npm install
```

### 3. Konfigurasi Environment (.env.local)

Buat file `.env.local` di root proyek, isi dengan:

```
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret
NEXTAUTH_SECRET=your_generated_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

📌 Petunjuk:

- Dapatkan `GITHUB_ID` dan `GITHUB_SECRET` dari https://github.com/settings/developers
- Gunakan callback URL: `http://localhost:3000/api/auth/callback/github`
- Gunakan perintah `openssl rand -base64 32` untuk menghasilkan `NEXTAUTH_SECRET`

### 4. Jalankan Server

```bash
npm run dev
```

Lalu buka di browser:

```
http://localhost:3000
```

---

## 🗂️ Struktur Halaman

| Halaman | Fungsi |
|--------|--------|
| `/` | Beranda, menampilkan daftar berita lokal |
| `/berita/tambah` | Form tambah berita |
| `/berita/[id]` | Detail berita lokal |
| `/berita/[id]/edit` | Form edit berita |
| `/berita/portal` | Berita dari portal RSS (BBC, Tempo, VOA) |

---

## 🛠️ Teknologi yang Digunakan

- Next.js 14 (App Router)
- Tailwind CSS
- NextAuth.js (GitHub login)
- RSS Parser
- RESTful API Routes (Next.js API)

---
