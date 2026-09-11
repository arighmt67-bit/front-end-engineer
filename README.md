# Front-End Web Engineer Portfolio Showcase

Repositori ini merupakan showcase terpadu dan monorepo portofolio untuk seluruh proyek submission pada **Dicoding Front-End Web Developer Learning Path**, mencakup evolusi pengembangan antarmuka web modern dari dasar hingga level enterprise-ready:
1. **Front-End Web untuk Pemula** (DOM Manipulation, Form Validation, & LocalStorage Persistence)
2. **Fundamental Front-End Web Development** (Custom Elements / Web Components, ES6+ Modular, & Webpack Bundler)
3. **Pengembangan Web Intermediate** (Single-Page Application / SPA, Progressive Web App / PWA, IndexedDB Offline Sync, & Push Notification)
4. **Belajar Toolset untuk Pengembangan Front-End Web** (Lit Web Components v3, Modular Sass `@use`, Bootstrap 5 Component Customization, & Webpack 5)
5. **Belajar Penerapan AI di Aplikasi Web** (Client-Side AI Inference, TensorFlow.js WebGPU/WebGL Adaptive Backend, HuggingFace Transformers.js SLM Local Generation, & Offline-First AI PWA)

---

## 🗺️ Learning Path & Project Directory

```text
front-end-engineer/
├── 01-frontend-pemula/             # Belajar Membuat Front-End Web untuk Pemula
│   ├── index.html                  # Semantic HTML5 & responsive layout
│   ├── main.js                     # DOM event-driven logic & custom events
│   ├── style.css                   # Custom CSS layout & UI components
│   └── README.md
│
├── 02-frontend-fundamental/        # Belajar Fundamental Front-End Web Development
│   ├── src/scripts/components/     # Web Components (<app-bar>, <note-item>, dll)
│   ├── src/scripts/data/           # REST API client (Fetch & Async/Await)
│   ├── webpack.common.js           # Production & development build configuration
│   ├── package.json
│   └── README.md
│
├── 03-frontend-intermediate/       # Belajar Pengembangan Web Intermediate
│   ├── src/scripts/pages/          # Client-side SPA routing & View Transitions
│   ├── src/scripts/data/           # IndexedDB implementation (Outbox & Saved Stories)
│   ├── src/public/sw.js            # Service Worker (Cache-first, Network-first strategy)
│   ├── src/public/manifest.*       # Web App Manifest (Installable PWA)
│   ├── vite.config.js              # Modern tooling & build pipeline
│   ├── package.json
│   └── README.md
│
├── 04-frontend-toolset/            # Belajar Toolset untuk Pengembangan Front-End Web
│   └── story-app/                  # Modern Story App (Lit v3, Sass @use, Bootstrap 5)
│       ├── src/js/components/      # 5 Lit Components (Shadow DOM + Light DOM)
│       ├── src/sass/               # Strict Sass Modular Architecture
│       ├── screenshots/            # Private GitHub Repository Evidence
│       ├── webpack.common.js
│       ├── package.json
│       └── README.md
│
├── 05-frontend-ai-web/             # Belajar Penerapan AI di Aplikasi Web (Bintang 5)
│   └── root-facts-react/           # RootFacts AI Assistant (React 19 + TensorFlow.js + Transformers.js)
│       ├── src/services/           # DetectionService (WebGPU), RootFactsService (SLM), CameraService
│       ├── src/components/         # CameraSection, InfoPanel, Header
│       ├── public/model/           # Pre-trained Vision Model (.json & .bin)
│       ├── vite.config.js          # VitePWA with AI weights precaching (50MB cap)
│       ├── eslint.config.mjs       # ESLint Dicoding Style Guide (0 warning, 0 error)
│       ├── package.json
│       └── README.md
│
└── README.md                       # Master Showcase & Technical Competency Matrix
```

---

## 🛠️ Ringkasan Modul & Technical Competencies

### 1. [01-frontend-pemula](./01-frontend-pemula) — Expense Tracker App
* **Tech Stack**: HTML5 Semantic, CSS3 Grid/Flexbox, Vanilla JavaScript (ES6).
* **Fokus Proyek**:
  * Pembangunan aplikasi pelacak keuangan interaktif berbasis Vanilla JS tanpa dependensi framework.
  * Manajemen state lokal menggunakan `localStorage` untuk persistensi data transaksi.
  * Penerapan arsitektur Event-Driven menggunakan Custom Event (`transaction:updated`) untuk sinkronisasi mutasi data dan antarmuka secara bersih.

### 2. [02-frontend-fundamental](./02-frontend-fundamental) — Notes App
* **Tech Stack**: Web Components (Custom Elements, Shadow DOM), Webpack 5, ES6 Modules, Fetch API, PostCSS.
* **Fokus Proyek**:
  * Arsitektur komponen antarmuka mandiri (*reusable Web Components*) seperti `<note-item>`, `<notes-list>`, dan `<app-bar>`.
  * Konfigurasi workflow bundler modern: Webpack (`webpack-merge`, `babel-loader`, `html-webpack-plugin`, environment separation).
  * Integrasi API asinkron (*RESTful API*) dengan penanganan status loading, error handling, dan render dinamis.

### 3. [03-frontend-intermediate](./03-frontend-intermediate) — Story App
* **Tech Stack**: SPA Routing, Progressive Web Apps (PWA), Service Worker, IndexedDB, Web Push Notification, Leaflet JS, Vite.
* **Fokus Proyek**:
  * **Single-Page Application (SPA)**: Custom client-side router dengan dukungan URL parsing dan integrasi View Transition API.
  * **PWA & Offline First**: Service Worker dengan strategi caching berlapis (Cache-First untuk static assets dan Network-First untuk dynamic API), lengkap dengan Web App Manifest agar dapat diinstal di mobile & desktop.
  * **IndexedDB & Background Sync**: Fitur penyimpanan cerita lokal (*saved stories*) serta sistem *outbox* otomatis yang mengirimkan postingan saat koneksi online kembali.
  * **Hardware & Web API**: Pemanfaatan Geolocation & Camera API (`getUserMedia` + Canvas) serta integrasi Web Push Notification via standar VAPID.

### 4. [04-frontend-toolset](./04-frontend-toolset/story-app) — Story App (Bintang 5)
* **Tech Stack**: Lit Web Components v3, Sass Modular (`@use`), Bootstrap 5, Webpack 5, Web Components Shadow DOM.
* **Fokus Proyek & Kriteria Bintang 5**:
  * **Arsitektur Web Components (Lit v3)**: Mengimplementasikan 5 Lit Components (`<app-bar>`, `<story-card>`, `<story-form>`, `<user-badge>`, `<footer-bar>`), dengan 2 komponen wajib mengaktifkan isolasi ketat **Shadow DOM** (`<user-badge>` dan `<footer-bar>`).
  * **Modular Sass Berstandar Baru**: Penerapan arsitektur Sass modern bebas `@import` dengan `@use`, mixin, nesting, dan operator `&`.
  * **Kustomisasi Bootstrap 5**: Override variabel Sass pada 5 komponen inti (Buttons, Cards, Navbar & Offcanvas, Forms, dan Badges/Alerts).
  * **Lit Localization (i18n)**: Sistem multi-bahasa reaktif (Bahasa Indonesia & English).
  * **Format Tanggal Human-Readable**: Konversi format tanggal ISO 8601 ke bahasa manusia menggunakan JavaScript native `Intl.DateTimeFormat`.

### 5. [05-frontend-ai-web](./05-frontend-ai-web/root-facts-react) — RootFacts AI App (Bintang 5)
* **Tech Stack**: React 19, Vite, TensorFlow.js (`tfjs-backend-webgpu`), HuggingFace Transformers.js, Workbox PWA, Lucide React.
* **Fokus Proyek & Kriteria Bintang 5**:
  * **Computer Vision Adaptif (TensorFlow.js)**: Identifikasi objek sayuran real-time dari stream kamera dengan akselerasi **WebGPU** adaptif (fallback otomatis ke WebGL).
  * **Manajemen Memori Bersih**: Pemanfaatan `tf.tidy()` dan pembersihan eksplisit `.dispose()` pada tensor untuk mencegah kebocoran memori pada browser.
  * **Generative AI Lokal (Transformers.js)**: Generasi fakta menarik dinamis menggunakan Small Language Model (SLM) `Xenova/LaMini-Flan-T5-77M` (kuantisasi 4-bit, < 300MB) langsung di sisi klien dengan backend hardware adaptif (WebGPU/WASM).
  * **Persona Dinamis (Tone Selector)**: Penyesuaian gaya bahasa teks AI secara interaktif (*Normal, Lucu, Profesional, Santai*).
  * **Fitur Clipboard**: Salin teks hasil generasi AI langsung ke papan klip dengan fallback API teruji.
  * **PWA & Offline AI Model**: Web App Manifest lengkap, installable di desktop/mobile, serta *precaching* model AI (`model.json`, `metadata.json`, `weights.bin`) di Service Worker sehingga deteksi Computer Vision tetap berfungsi 100% tanpa internet.

---

## 👤 Author

* **Nama**: Ari Rahmat Romadhon
* **GitHub**: [@arighmt67-bit](https://github.com/arighmt67-bit)
* **LinkedIn**: [Ari Rahmat Romadhon](https://www.linkedin.com/in/arirahmatr/)
* **Platform**: Dicoding Indonesia - Front-End Web Developer Learning Path
