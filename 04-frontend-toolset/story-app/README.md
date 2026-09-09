# Story App - Dicoding Front-End Toolset Showcase

Aplikasi web modern berbasis **Lit Web Components**, **Modular Sass (`@use`)**, dan **Bootstrap 5** yang dibangun untuk memenuhi kriteria submission bintang 5 kelas **Belajar Toolset untuk Pengembangan Front-End Web** di Dicoding Indonesia.

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Tech Stack](https://img.shields.io/badge/tech-Lit%20%7C%20Sass%20%7C%20Bootstrap5%20%7C%20Webpack5-blue)
![Rating](https://img.shields.io/badge/Dicoding-Bintang%205-gold)

---

## 🌟 Fitur & Pemenuhan Kriteria Bintang 5

### 1. Kriteria Utama
* **Story Dummy Data (`DATA.json`)**: Menggunakan struktur data resmi Dicoding yang dirender ke dalam kartu cerita interaktif dan mendukung penambahan data baru via `localStorage`.
* **Dua Halaman Fungsional**:
  * **Dasbor (`index.html`)**: Menampilkan galeri cerita, hero banner, navigasi offcanvas, dan modal detail.
  * **Tambah Cerita (`add.html`)**: Formulir unggah foto momen dengan pratinjau langsung (*live preview*) dan deskripsi cerita.
* **Form Validation Bootstrap**: Validasi interaktif *client-side* Bootstrap (`needs-validation` & `was-validated`) untuk memastikan input foto dan deskripsi (min. 10 karakter) terisi dengan benar.
* **Desain Eksklusif (Non-Money Tracker)**: Tampilan visual modern dengan Bootstrap Offcanvas menu, custom card hover elevation, dialog modal pop-up, serta typography gradients.
* **Modular Sass (`@use`)**: Seluruh styling kustom menggunakan arsitektur modern Sass tanpa `@import`:
  * `src/sass/_variables.scss`: Deklarasi tema warna, bayangan, dan override komponen Bootstrap.
  * `src/sass/_mixins.scss`: Mixin untuk Glassmorphism, flex centering, card interactive state dengan ampersand (`&`).
  * `src/sass/main.scss`: Penggabungan modular via `@use 'variables' as v;` dan `@use 'mixins' as m;`.

### 2. Kriteria Bintang 5 (Saran Terpenuhi Penuh)
1. **Kustomisasi Minimal 5 Komponen Bootstrap**: Melakukan penyesuaian styling dan variabel pada:
   - Buttons (`$btn-border-radius`, `$btn-padding-y`, `$btn-padding-x`)
   - Cards (`$card-border-radius`, `$card-box-shadow`, `$card-border-width`)
   - Navbar & Offcanvas (`$offcanvas-horizontal-width`, `$offcanvas-border-color`)
   - Forms (`$input-border-radius`, `$input-focus-border-color`)
   - Badges & Alerts (`$badge-border-radius`, `$alert-border-radius`)
2. **Minimal 2 Komponen Lit dengan Shadow DOM**:
   - `<user-badge>`: Avatar inisial dinamis dengan gradient dan isolasi styling berbasis Shadow DOM.
   - `<footer-bar>`: Komponen footer gelap modern dengan Lit CSS stylesheet terisolasi.
   *(Komponen `<app-bar>`, `<story-card>`, dan `<story-form>` menggunakan Light DOM untuk integrasi Bootstrap modal, offcanvas, dan form validation).*
3. **Lit Localization (i18n)**:
   - Modul `src/js/localization/i18n.js` menyediakan dukungan multi-bahasa: **Bahasa Indonesia (ID)** dan **English (EN)**.
   - Pilihan bahasa dapat diganti secara instan melalui sakelar di navigation bar.
4. **Format Tanggal Human-Readable**:
   - Tanggal ISO 8601 pada properti `createdAt` diformat otomatis menggunakan JavaScript murni (`Intl.DateTimeFormat`), menghasilkan format ramah pengguna (contoh: *Minggu, 8 Januari 2023, 13.34*).
5. **Private GitHub Repository & Screenshot**:
   - Berkas bukti tangkapan layar repositori private tersimpan di `screenshots/github-repo-private.png`.

---

## 📁 Struktur Proyek

```text
story-app/
├── screenshots/
│   └── github-repo-private.png     # Bukti tangkapan layar repositori privat
├── src/
│   ├── data/
│   │   └── DATA.json               # Dataset dummy story
│   ├── js/
│   │   ├── components/             # 5 Web Components berbasis Lit
│   │   │   ├── app-bar.js          # Navbar + Offcanvas navigasi & switch bahasa
│   │   │   ├── footer-bar.js       # [Shadow DOM] Footer aplikasi terisolasi
│   │   │   ├── story-card.js       # Kartu cerita + trigger modal detail
│   │   │   ├── story-form.js       # Formulir tambah cerita + Bootstrap validation
│   │   │   └── user-badge.js       # [Shadow DOM] Custom avatar profil
│   │   ├── localization/
│   │   │   └── i18n.js             # Kamus terjemahan ID & EN
│   │   ├── utils/
│   │   │   └── date-formatter.js   # Konversi ISO 8601 ke tanggal ramah manusia
│   │   └── index.js                # Entry point utama aplikasi
│   ├── public/
│   │   └── favicon.png             # Favicon aset
│   ├── domain/sass/                # Styling modular Sass
│   │   ├── _mixins.scss
│   │   ├── _variables.scss
│   │   └── main.scss
│   └── views/
│       ├── add.html                # Halaman formulir tambah story
│       └── index.html              # Halaman dasbor story
├── package.json
├── webpack.common.js
├── webpack.dev.js
└── webpack.prod.js
```

---

## 🚀 Cara Menjalankan Proyek Secara Lokal

1. **Instal Dependensi:**
   ```bash
   npm install
   ```

2. **Jalankan Development Server:**
   ```bash
   npm run start-dev
   ```
   Aplikasi akan terbuka otomatis di `http://localhost:8080/`.

3. **Build untuk Produksi:**
   ```bash
   npm run build
   ```
   Output bundle siap saji akan di-generate pada folder `dist/`.

---

## 👤 Pengembang

* **Nama**: Ari Rahmat Romadhon
* **GitHub**: [@arighmt67-bit](https://github.com/arighmt67-bit)
* **LinkedIn**: [Ari Rahmat Romadhon](https://www.linkedin.com/in/arirahmatr/)
