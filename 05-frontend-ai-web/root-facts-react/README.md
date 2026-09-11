# 05 - Belajar Penerapan AI di Aplikasi Web (RootFacts AI)

> **Submission Proyek Akhir — Kelas Dicoding "Belajar Penerapan AI di Aplikasi Web"**  
> **Status:** ⭐⭐⭐⭐⭐ **Bintang 5 (Skor Maksimal 4/4 di Seluruh Kriteria)**  
> **Tech Stack:** React 19, Vite, TensorFlow.js (WebGPU + WebGL Fallback), Transformers.js (LaMini-Flan-T5 Quantized Q4), Workbox PWA

---

## 🎯 Gambaran Proyek

**RootFacts** adalah aplikasi asisten berbasis web modern yang mendemonstrasikan integrasi dua pilar kecerdasan buatan langsung di sisi klien (*Client-Side AI Inference*):
1. **Si Mata (Computer Vision)**: Menggunakan kamera perangkat dan model klasifikasi TensorFlow.js untuk mengidentifikasi jenis tanaman/sayuran secara *real-time*.
2. **Si Otak (Generative AI / SLM)**: Menggunakan Small Language Model (SLM) lokal via HuggingFace Transformers.js untuk menceritakan fakta menarik (*fun fact*) dan informasi nutrisi berdasarkan objek yang terdeteksi dengan gaya bahasa (*tone*) yang dapat disesuaikan.
3. **Ketangguhan (Offline-First PWA)**: Berjalan penuh tanpa koneksi internet setelah inisialisasi awal berkat *precaching* menyeluruh pada aset inti dan bobot model AI (`.json` dan `.bin`).

---

## 🏆 Pemenuhan Kriteria Penilaian Bintang 5

### Kriteria 1: Mengembangkan Fitur Deteksi Sayuran (Computer Vision) — Advanced (4/4)
- [x] **Akses MediaStream & Kamera**: Kontrol penuh pemilihan kamera (depan/belakang) dengan resolusi adaptif (desktop 640x480, mobile 480x640) dan penanganan galat ramah pengguna.
- [x] **Akselerasi Grafis Adaptif**: Logika mendeteksi ketersediaan hardware (`navigator.gpu`) untuk memprioritaskan backend **WebGPU** (`@tensorflow/tfjs-backend-webgpu`), dan secara otomatis beralih (*fallback*) ke **WebGL** pada perangkat lama.
- [x] **Manajemen Memori Ketat**: Mencegah *memory leak* dengan membungkus operasi tensor dalam `tf.tidy()` dan melakukan pembersihan eksplisit `.dispose()` pada tensor masukan dan luaran.
- [x] **FPS Limit & Kontrol**: Slider dinamis pengaturan FPS kamera (15 - 60 FPS) yang langsung merespons perubahan konfigurasi.
- [x] **Indikator Loading**: Tampilan progres dan status model ("Memuat model AI...", "Model AI Siap").

### Kriteria 2: Mengintegrasikan Generative AI untuk Konten Fun Fact — Advanced (4/4)
- [x] **Dynamic Prompt Injection**: Hasil deteksi objek langsung dimasukkan ke prompt generasi teks AI secara dinamis.
- [x] **Fitur Persona Dinamis (Tone Selector)**: Dropdown pilihan gaya bahasa interaktif (*Normal, Lucu, Profesional, Santai*) yang secara otomatis memodifikasi *system prompt* AI.
- [x] **Device Eksekusi Adaptif (Transformers.js)**: Konfigurasi kondisional properti `device` pada pipeline: memprioritaskan **WebGPU** saat tersedia dan beralih ke **WebAssembly (WASM)** bila kartu grafis tidak didukung.
- [x] **Parameter Generasi Optimal**: Pengaturan `max_new_tokens: 100` (< 150 token), `temperature: 0.3`, `top_p: 0.8`, dan `do_sample: true` agar responsif tanpa membebani browser.
- [x] **Model SLM Ringkas**: Menggunakan `Xenova/LaMini-Flan-T5-77M` dengan kuantisasi 4-bit (`{ dtype: 'q4' }`), ukuran jauh di bawah batas 300 MB.
- [x] **Salin ke Papan Klip**: Tombol `#btn-copy` fungsional dengan fallback Clipboard API untuk memudahkan berbagi teks hasil generasi AI.

### Kriteria 3: Menerapkan Offline Capability dan Deployment — Advanced (4/4)
- [x] **ESLint Linter**: Lulus audit linter ketat berbasis `eslint-config-dicodingacademy` (0 error, 0 warning).
- [x] **Aplikasi Dapat Diinstal (PWA)**: Web App Manifest lengkap (`icons` 192x192 maskable, 512x512 maskable, apple-touch-icon 180x180, `screenshots` desktop & mobile) serta Service Worker auto-update terdaftar (`registerSW({ immediate: true })`).
- [x] **Offline AI Model Precaching**: Konfigurasi `vite-plugin-pwa` dengan `maximumFileSizeToCacheInBytes: 50MB` dan *glob patterns* yang menyertakan file bobot model AI (`model.json`, `metadata.json`, `weights.bin`) serta strategi runtime caching `CacheFirst`, memastikan fitur Computer Vision tetap berfungsi 100% saat offline / mode pesawat.
- [x] **Deployment**: Siap di-deploy ke Netlify dan URL dicatat dalam `STUDENT.txt`.

---

## 📂 Struktur Direktori

```text
root-facts-react/
├── public/
│   ├── icons/               # PWA Icons (192x192, 512x512, apple-touch-icon)
│   ├── screenshots/         # PWA Preview Screenshots (desktop & mobile)
│   ├── model/               # Pre-trained Model & Metadata Sayuran
│   │   ├── model.json
│   │   ├── metadata.json
│   │   └── weights.bin
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── CameraSection.jsx# Kamera, preview video/canvas, FPS slider, Tone dropdown
│   │   ├── Header.jsx       # App bar & status model AI
│   │   └── InfoPanel.jsx    # Hasil deteksi, fun fact card, tombol copy clipboard
│   ├── hooks/
│   │   └── useAppState.js   # State management (Reducer pattern)
│   ├── services/
│   │   ├── CameraService.js # MediaStream API, device enumeration, FPS control
│   │   ├── DetectionService.js # TensorFlow.js WebGPU/WebGL & tf.tidy memory management
│   │   └── RootFactsService.js # Transformers.js SLM text2text pipeline & tone prompts
│   ├── utils/
│   │   ├── common.js        # Hardware feature detection (WebGPU), helpers, error maps
│   │   ├── config.js        # Konfigurasi model, threshold deteksi, persona prompts
│   │   └── ui.js
│   ├── App.jsx              # Komponen utama & orkestrasi alur inferensi
│   ├── index.css            # Styling responsif modern
│   └── main.jsx             # Entry point & PWA registration
├── eslint.config.mjs        # Konfigurasi ESLint Dicoding Academy
├── index.html               # Semantic HTML & Web App Manifest links
├── package.json             # Dependencies & scripts
├── vite.config.js           # Vite + VitePWA precaching & chunking configuration
└── STUDENT.txt              # Informasi deployment submission
```

---

## 🚀 Panduan Menjalankan Secara Lokal

1. Masuk ke direktori proyek dan pasang dependensi:
   ```bash
   cd 05-frontend-ai-web/root-facts-react
   npm install
   ```

2. Jalankan development server:
   ```bash
   npm run dev
   ```
   Buka peramban pada tautan lokal yang tertera (biasanya `http://localhost:3001` atau `http://localhost:5173`).

3. Uji linting kode:
   ```bash
   npm run lint
   ```

4. Uji production build & PWA preview:
   ```bash
   npm run build
   npm run preview
   ```
