import { LitElement, html } from 'lit';
import { storyService, authService } from '../api/api-service.js';
import { formatHumanDate } from '../utils/date-formatter.js';
import { getLocale } from '../localization/i18n.js';

export class StoryDetail extends LitElement {
  createRenderRoot() {
    return this;
  }

  static properties = {
    story: { type: Object },
    loading: { type: Boolean },
    errorMessage: { type: String },
  };

  constructor() {
    super();
    this.story = null;
    this.loading = true;
    this.errorMessage = '';
  }

  async connectedCallback() {
    super.connectedCallback();
    if (!authService.isAuthenticated()) {
      window.location.href = 'login.html';
      return;
    }
    await this.fetchStoryDetail();
  }

  async fetchStoryDetail() {
    this.loading = true;
    this.errorMessage = '';
    try {
      const params = new URLSearchParams(window.location.search);
      const id = params.get('id');

      if (!id) {
        this.errorMessage = 'ID cerita tidak ditemukan.';
        return;
      }

      const res = await storyService.getStoryDetail(id);
      if (res && res.story) {
        this.story = res.story;
      } else {
        this.errorMessage = 'Cerita tidak ditemukan atau telah dihapus.';
      }
    } catch (err) {
      this.errorMessage = err.message || 'Gagal memuat detail cerita dari server.';
    } finally {
      this.loading = false;
      this.requestUpdate();
    }
  }

  render() {
    if (this.loading) {
      return html`
        <div class="card border-0 shadow-sm rounded-4 p-5 text-center bg-white">
          <div class="spinner-border text-primary mx-auto mb-3" style="width: 3rem; height: 3rem;" role="status">
            <span class="visually-hidden">Memuat cerita...</span>
          </div>
          <h5 class="fw-semibold text-secondary">Sedang memuat detail cerita...</h5>
          <p class="text-muted small">Mengambil data langsung dari Story API</p>
        </div>
      `;
    }

    if (this.errorMessage || !this.story) {
      return html`
        <div class="card border-0 shadow-sm rounded-4 p-5 text-center bg-white">
          <div class="mb-3 text-warning">
            <i class="bi bi-exclamation-triangle-fill fs-1"></i>
          </div>
          <h4 class="fw-bold text-dark mb-2">Terjadi Kendala</h4>
          <p class="text-secondary mb-4">${this.errorMessage || 'Cerita tidak ditemukan.'}</p>
          <div>
            <a href="index.html" class="btn btn-primary rounded-pill px-4">
              <i class="bi bi-arrow-left me-1"></i> Kembali ke Dasbor
            </a>
          </div>
        </div>
      `;
    }

    const { name, description, photoUrl, createdAt, lat, lon } = this.story;
    const formattedDate = formatHumanDate(createdAt, getLocale());

    return html`
      <div class="card border-0 shadow-sm rounded-4 overflow-hidden bg-white">
        <div class="position-relative">
          <img
            src="${photoUrl}"
            alt="Momen oleh ${name}"
            class="w-100 object-fit-cover"
            style="max-height: 480px; min-height: 300px;"
            loading="lazy"
          />
          <div class="position-absolute top-0 start-0 m-3">
            <a href="index.html" class="btn btn-light btn-sm rounded-pill shadow-sm d-flex align-items-center gap-1">
              <i class="bi bi-arrow-left"></i>
              <span>Kembali</span>
            </a>
          </div>
        </div>

        <div class="p-4 p-md-5">
          <div class="d-flex flex-wrap justify-content-between align-items-center gap-3 border-bottom pb-3 mb-4">
            <div class="d-flex align-items-center gap-3">
              <div class="avatar-placeholder rounded-circle bg-primary bg-opacity-10 text-primary d-flex align-items-center justify-content-center fw-bold fs-4" style="width: 52px; height: 52px;">
                ${name ? name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div>
                <h3 class="fw-bold text-dark mb-0">${name}</h3>
                <span class="text-muted small">
                  <i class="bi bi-calendar3 me-1"></i> ${formattedDate}
                </span>
              </div>
            </div>

            ${lat && lon ? html`
              <span class="badge bg-light text-dark border px-3 py-2 rounded-pill font-monospace small">
                <i class="bi bi-geo-alt-fill text-danger me-1"></i> ${Number(lat).toFixed(4)}, ${Number(lon).toFixed(4)}
              </span>
            ` : ''}
          </div>

          <div class="story-body">
            <h5 class="fw-bold text-dark mb-3">Kisah Perjalanan</h5>
            <p class="text-secondary lh-lg fs-5" style="white-space: pre-line;">
              ${description}
            </p>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('story-detail', StoryDetail);
