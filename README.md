# STRIPPIN 📸 – Your Online Photo Strip Studio

> Website foto strip online yang memungkinkan pengguna memilih template, upload foto, dan download hasil strip mereka.

---

## 🗂️ Struktur Folder

```
strippin/
├── index.html          ← Halaman utama (semua halaman ada di sini)
├── css/
│   └── style.css       ← Semua styling (UI, layout, animasi)
├── js/
│   ├── templates.js    ← Data semua template strip (b&w & ceria)
│   └── app.js          ← Logic utama aplikasi
├── assets/             ← (opsional) gambar tambahan
└── README.md           ← Dokumentasi ini
```

---

## 🚀 Step-by-Step: Cara Menjalankan & Upload ke GitHub + Hosting

### STEP 1 – Buka & Test di Komputer (Lokal)
1. Download seluruh folder `strippin/`
2. Buka file `index.html` di browser (Chrome/Firefox/Edge)
3. Klik **Next** untuk mencoba alur: pilih template → upload foto → download hasil

---

### STEP 2 – Upload ke GitHub

1. **Buat akun** di [github.com](https://github.com) (jika belum punya)

2. **Buat repository baru**
   - Klik tombol **+** → **New repository**
   - Nama repo: `strippin` (atau nama lain)
   - Centang: **Public**
   - Centang: **Add a README file**
   - Klik **Create repository**

3. **Upload file**
   - Di halaman repo, klik **Add file** → **Upload files**
   - Drag & drop seluruh isi folder `strippin/` (index.html, folder css/, folder js/)
   - Tulis commit message: `Initial upload - STRIPPIN website`
   - Klik **Commit changes**

4. **Pastikan struktur di GitHub seperti ini:**
   ```
   repo/
   ├── index.html
   ├── css/style.css
   ├── js/templates.js
   ├── js/app.js
   └── README.md
   ```

---

### STEP 3 – Hosting Gratis dengan GitHub Pages

1. Di repo GitHub, klik tab **Settings**
2. Di menu kiri, klik **Pages**
3. Di bagian **Source**, pilih:
   - Branch: `main`
   - Folder: `/ (root)`
4. Klik **Save**
5. Tunggu 1–2 menit, lalu website tersedia di:
   ```
   https://<username>.github.io/strippin/
   ```

> 💡 **Alternatif hosting:** [Netlify](https://netlify.com) – drag & drop folder → langsung live!

---

### STEP 4 – Hosting dengan Netlify (Lebih Mudah)

1. Pergi ke [netlify.com](https://netlify.com) → Sign up gratis
2. Klik **Add new site** → **Deploy manually**
3. Drag & drop seluruh folder `strippin/`
4. Website langsung live dengan URL seperti: `https://strippin-abc123.netlify.app`
5. Bisa custom domain gratis juga!

---

## ✨ Fitur Website

| Fitur | Deskripsi |
|---|---|
| 🎞️ Strip Showcase | Halaman home menampilkan preview strip dengan animasi shuffle |
| 🖼️ 16 Template | 8 template b&w + 8 template ceria bisa dipilih |
| 📷 Upload Foto | Upload foto per slot langsung dari HP/laptop |
| 👁️ Live Preview | Hasil strip terlihat langsung saat upload foto |
| ⬇️ Download | Download strip sebagai gambar PNG |
| 📱 Responsive | Tampilan optimal di HP, tablet, dan desktop |

---

## 🎨 Desain UI/UX

### Target Pengguna
Anak muda 15–25 tahun yang menyukai estetika retro photo booth, suka berbagi foto di sosial media.

### Prinsip UI/UX yang Diterapkan
- **Hierarki Visual** – Nama brand besar di atas, tombol aksi jelas
- **Konsistensi** – Warna maroon (#7A1C1C) sebagai aksen utama di semua halaman
- **Feedback** – Animasi saat shuffle, live preview saat upload foto
- **Affordance** – Tombol next berbentuk lever (seperti mesin foto booth asli)
- **Simplicity** – 3 langkah mudah: pilih → upload → download

### Palet Warna
| Nama | Hex | Penggunaan |
|------|-----|------------|
| Maroon | `#7A1C1C` | Aksen utama, border, teks |
| Cream | `#F8F6F0` | Background |
| Green | `#22C55E` | Tombol next/download |
| Dot Gray | `#D0CEC8` | Polka dot background |

### Tipografi
- **Caveat** (Google Fonts) – Display/handwritten, untuk judul & label → kesan personal & retro
- **DM Sans** – Body text → bersih dan mudah dibaca

---

## 🛠️ Teknologi

- **HTML5** – Struktur halaman
- **CSS3** – Styling, animasi, responsive
- **Vanilla JavaScript** – Logic aplikasi, tanpa framework tambahan
- **html2canvas** – Library untuk export strip ke PNG (dimuat otomatis saat download)
- **Google Fonts** – Caveat + DM Sans

---

## 📋 Kriteria Penilaian & Implementasi

| Kriteria | Implementasi |
|----------|-------------|
| UI/UX | Hierarki visual jelas, konsistensi warna & tipografi, feedback interaktif, affordance lever |
| Desain Visual | Palet harmonis maroon-cream, tipografi handwritten Caveat, layout bersih |
| Fungsionalitas | 4 halaman berfungsi penuh, upload foto, live preview, download PNG |
| Responsivitas | Media queries untuk mobile (480px), tablet (768px), desktop |
| Struktur Kode | Terpisah HTML/CSS/JS, penamaan jelas, komentar kode |
| Hosting | GitHub Pages / Netlify (gratis, stabil) |
| Dokumentasi | README lengkap ini + struktur repo rapi |

---

## 👤 Informasi

- **Nama Website:** STRIPPIN
- **Deskripsi:** Online photo strip studio terinspirasi dari mesin foto booth retro
- **Dibuat dengan:** HTML, CSS, Vanilla JS
