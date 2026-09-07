export default class AboutPage {
  async render() {
    return `
      <section class="container">
        <h1 class="page-title">Tentang Aplikasi</h1>
        <p class="page-subtitle">Story App - berbagi cerita beserta lokasinya.</p>

        <article class="about-card">
          <h2>Apa itu Story App?</h2>
          <p>
            Story App adalah aplikasi Single-Page Application untuk membagikan cerita
            lengkap dengan foto dan titik lokasi. Data diambil dari
            <strong>Dicoding Story API</strong>.
          </p>

          <h2>Fitur Utama</h2>
          <ul class="about-list">
            <li>Navigasi antarhalaman tanpa memuat ulang (hash routing + View Transition API).</li>
            <li>Daftar cerita yang tersinkron dengan peta digital berbasis Leaflet.</li>
            <li>Beberapa pilihan tile layer peta melalui layer control.</li>
            <li>Tambah cerita dengan unggah berkas maupun tangkapan kamera langsung.</li>
            <li>Pemilihan lokasi lewat klik pada peta.</li>
            <li>Dukungan aksesibilitas: skip to content, label input, dan navigasi keyboard.</li>
          </ul>

          <h2>Teknologi</h2>
          <ul class="about-list">
            <li>Vanilla JavaScript dengan arsitektur Model-View-Presenter.</li>
            <li>Vite sebagai build tool.</li>
            <li>Leaflet untuk peta digital.</li>
          </ul>
        </article>
      </section>
    `;
  }

  async afterRender() {}
}
