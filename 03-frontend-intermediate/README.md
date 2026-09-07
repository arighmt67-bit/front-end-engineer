# Story App

Aplikasi berbagi cerita berbasis **Single-Page Application** untuk submission
*Belajar Pengembangan Web Intermediate* (Dicoding). Data bersumber dari
**Dicoding Story API**.

## Fitur

| Kriteria | Implementasi |
|---|---|
| SPA & transisi halaman | Hash routing, arsitektur **MVP**, **View Transition API** dengan animasi kustom |
| Data & peta | Daftar cerita + peta Leaflet dengan marker & popup, sinkronisasi list↔peta, **3 tile layer** + layer control |
| Tambah data | Form + unggah berkas, **tangkapan kamera langsung** (media stream), pilih lokasi via klik peta, validasi input |
| Aksesibilitas | Skip to content, teks alternatif, HTML semantik, label pada tiap input, navigasi keyboard penuh |

## Menjalankan

```bash
npm install
npm run dev      # mode pengembangan
npm run build    # build produksi ke folder dist/
npm run preview  # pratinjau hasil build
```

Aplikasi berjalan di `http://localhost:5173`.

## Struktur

```
src/
├── index.html
├── scripts/
│   ├── config.js              # BASE_URL & konstanta
│   ├── index.js               # entry point
│   ├── data/api.js            # semua panggilan Story API
│   ├── pages/
│   │   ├── app.js             # shell aplikasi + routing + skip to content
│   │   ├── home/              # home-page.js (View) + home-presenter.js (Presenter)
│   │   ├── add/               # add-story-page.js + add-story-presenter.js
│   │   ├── auth/              # login, register, auth-presenter.js
│   │   └── about/
│   ├── routes/                # hash routing
│   └── utils/                 # auth, map-helper, view transition
└── styles/styles.css
```

## Arsitektur MVP

Setiap halaman dengan data dipisah menjadi:

- **View** (`*-page.js`) — hanya mengurus DOM, tidak tahu asal data.
- **Presenter** (`*-presenter.js`) — mengatur alur, memanggil model, memerintah view. Tidak menyentuh DOM.
- **Model** (`data/api.js`) — komunikasi dengan Story API.

## Akses peta

Tile layer yang dipakai (OpenStreetMap, OpenTopoMap, CARTO) gratis dan tanpa API key.
