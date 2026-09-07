# Front-End Web Engineer Portfolio Showcase

Repositori ini merupakan showcase terpadu dan monorepo portofolio untuk seluruh proyek submission pada **Dicoding Front-End Web Developer Learning Path**, mencakup evolusi pengembangan antarmuka web modern dari dasar hingga level enterprise-ready:
1. **Front-End Web untuk Pemula** (DOM Manipulation, Form Validation, & LocalStorage Persistence)
2. **Fundamental Front-End Web Development** (Custom Elements / Web Components, ES6+ Modular, & Webpack Bundler)
3. **Pengembangan Web Intermediate** (Single-Page Application / SPA, Progressive Web App / PWA, IndexedDB Offline Sync, & Push Notification)

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

---

## 👤 Author

* **Nama**: Ari Rahmat Romadhon
* **GitHub**: [@arighmt67-bit](https://github.com/arighmt67-bit)
* **LinkedIn**: [Ari Rahmat Romadhon](https://www.linkedin.com/in/arirahmatr/)
* **Platform**: Dicoding Indonesia - Front-End Web Developer Learning Path
