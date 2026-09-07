# Notes App — Integrasi dengan RESTful API

Aplikasi pencatatan berbasis **HTML, CSS, dan JavaScript murni** (tanpa React/Angular/Vue),
dibundel dengan **webpack** dan mengambil seluruh datanya dari
**[Dicoding Notes API v2](https://notes-api.dicoding.dev/v2)**.

Submission ini merupakan lanjutan dari Proyek Pertama (Notes App dengan Web Component
dan CSS Grid); seluruh kriteria submission sebelumnya tetap dipertahankan.

## Cara menjalankan

```bash
npm install          # pasang dependencies (node_modules TIDAK disertakan dalam ZIP)
npm run start-dev    # mode development via webpack-dev-server -> http://localhost:9000
npm run build        # build produksi ke folder dist/
npm run format       # merapikan kode dengan Prettier
```

Tidak ada berkas environment yang perlu diisi. Aplikasi membutuhkan koneksi internet
karena seluruh data diambil dari Dicoding Notes API v2.

## Struktur proyek

```
notes-app/
├── src/
│   ├── templates/index.html          # template untuk html-webpack-plugin
│   ├── scripts/
│   │   ├── index.js                  # entry point: impor komponen + orkestrasi API
│   │   ├── components/               # custom element (Web Component)
│   │   │   ├── app-bar.js
│   │   │   ├── note-form.js
│   │   │   ├── notes-list.js
│   │   │   ├── note-item.js
│   │   │   ├── note-counter.js
│   │   │   └── loading-indicator.js
│   │   ├── data/notes-api.js         # pembungkus Fetch API ke Notes API v2
│   │   └── utils/format-date.js
│   └── styles/style.css
├── webpack.common.js / webpack.dev.js / webpack.prod.js
├── .prettierrc
└── package.json
```

## Pemenuhan kriteria wajib

**1. Mempertahankan kriteria submission sebelumnya**
Enam custom element (`<app-bar>`, `<note-form>`, `<notes-list>`, `<note-item>`,
`<note-counter>`, `<loading-indicator>`) dengan `customElements.define`,
`observedAttributes`, dan `attributeChangedCallback`. CSS Grid dipakai pada dua tingkat:
`.app-layout` untuk tata letak halaman dan `.notes-grid` untuk daftar catatan
(`repeat(auto-fill, minmax(240px, 1fr))`). Formulir tetap memakai `input type="text"`
untuk judul dan `<textarea>` untuk isi catatan, lengkap dengan realtime validation.

**2. RESTful API sebagai sumber data**
Seluruh data dumi lokal sudah dihapus. Data berasal dari `https://notes-api.dicoding.dev/v2`:

| Fitur | Endpoint |
|---|---|
| Menampilkan daftar catatan | `GET /notes` |
| Menambahkan catatan baru | `POST /notes` |
| Menghapus catatan | `DELETE /notes/{id}` |
| Daftar arsip | `GET /notes/archived` |
| Arsipkan / batal arsip | `POST /notes/{id}/archive` dan `/unarchive` |

**3. webpack sebagai module bundler**
Konfigurasi dipisah `webpack.common.js`, `webpack.dev.js`, dan `webpack.prod.js`
digabung dengan `webpack-merge`. `html-webpack-plugin` membangkitkan `index.html`
dari `src/templates/index.html`. `npm run start-dev` menjalankan `webpack-dev-server`
pada port 9000, `npm run build` menghasilkan bundel produksi di `dist/`.

**4. Fetch API**
Seluruh permintaan HTTP dilakukan melalui `fetch()` di `src/scripts/data/notes-api.js`,
menggunakan `async/await`, dan kegagalan jaringan maupun respons non-`success`
dilempar sebagai `Error` untuk ditangani pemanggilnya.

**5. Indikator loading**
`<loading-indicator>` adalah custom element tersendiri yang ditampilkan pada setiap
proses request: memuat daftar, menyimpan, menghapus, mengarsipkan, dan membatalkan arsip.

## Pemenuhan kriteria opsional

**1. Fitur arsip catatan**
Terdapat tab "Catatan Aktif" dan "Arsip". Setiap kartu memiliki tombol
"Arsipkan"/"Batal Arsip" yang memanggil endpoint archive/unarchive lalu memuat ulang daftar.

**2. Feedback saat terjadi error**
Menggunakan **sweetalert2**: dialog error saat request gagal, dialog konfirmasi
sebelum menghapus catatan, dan notifikasi sukses setelah aksi berhasil.

**3. Efek pergerakan halus / animasi**
Menggunakan **anime.js** untuk animasi kemunculan kartu catatan secara bertahap
(`anime.stagger`), ditambah transisi CSS pada tombol dan spinner loading.

**4. Prettier sebagai code formatter**
`prettier` terdaftar pada `devDependencies`, konfigurasi ada di `.prettierrc`
(beserta `.prettierignore`), dan tersedia skrip `npm run format`.

## Catatan tambahan

- Isi catatan dirender memakai `textContent` (bukan `innerHTML`) untuk mencegah injeksi HTML.
- Ketika daftar kosong, `<notes-list>` menampilkan pesan dari atribut `empty-message`,
  yang berbeda antara tampilan catatan aktif dan tampilan arsip.
- Responsive diuji pada 1440x900, 820x1180, dan 390x844: tidak ada scroll horizontal
  maupun elemen yang bertumpuk.
