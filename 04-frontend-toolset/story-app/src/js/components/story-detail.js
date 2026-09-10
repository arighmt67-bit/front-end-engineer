import { LitElement, html } from 'lit';
import initialData from '../../data/DATA.json';
import { formatHumanDate } from '../utils/date-formatter.js';
import { t, getLocale } from '../localization/i18n.js';

export class StoryDetail extends LitElement {
  createRenderRoot() {
    return this; // Light DOM for Bootstrap styles
  }

  static properties = {
    storyId: { type: String },
    story: { type: Object },
    loading: { type: Boolean },
    notFound: { type: Boolean },
    locale: { type: String },
  };

  constructor() {
    super();
    this.storyId = '';
    this.story = null;
    this.loading = true;
    this.notFound = false;
    this.locale = getLocale();
    this.handleLocaleChange = this.handleLocaleChange.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('locale-changed', this.handleLocaleChange);
    // Fetch story details EXACTLY ONCE in the lifecycle, avoiding any render loops
    this.loadStoryDetail();
  }

  disconnectedCallback() {
    window.removeEventListener('locale-changed', this.handleLocaleChange);
    super.disconnectedCallback();
  }

  handleLocaleChange(e) {
    this.locale = e.detail.locale;
    this.requestUpdate();
  }

  loadStoryDetail() {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const id = urlParams.get('id') || this.storyId;
      this.storyId = id;

      if (!id) {
        this.notFound = true;
        this.loading = false;
        return;
      }

      // 1. Check local storage custom stories first
      const localStories = JSON.parse(localStorage.getItem('custom_stories') || '[]');
      let match = localStories.find((item) => item.id === id);

      // 2. Check initial DATA.json
      if (!match && initialData && initialData.listStory) {
        match = initialData.listStory.find((item) => item.id === id);
      }

      if (match) {
        this.story = match;
        this.notFound = false;
      } else {
        this.notFound = true;
      }
    } catch (err) {
      console.error('Error loading story detail:', err);
      this.notFound = true;
    } finally {
      this.loading = false;
    }
  }

  render() {
    if (this.loading) {
      return html`
        <div class="text-center py-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p class="mt-3 text-secondary">Memuat detail cerita...</p>
        </div>
      `;
    }

    if (this.notFound || !this.story) {
      return html`
        <div class="card border-0 shadow-sm rounded-4 p-5 text-center">
          <i class="bi bi-exclamation-triangle fs-1 text-warning mb-3"></i>
          <h4 class="fw-bold text-dark mb-2">${t('storyNotFound')}</h4>
          <p class="text-secondary mb-4">
            Cerita dengan ID <code>${this.storyId}</code> tidak dapat ditemukan pada basis data.
          </p>
          <div>
            <a href="index.html" class="btn btn-primary rounded-pill px-4">
              <i class="bi bi-arrow-left me-1"></i> ${t('backToDashboard')}
            </a>
          </div>
        </div>
      `;
    }

    const s = this.story;
    const formattedDate = formatHumanDate(s.createdAt, this.locale === 'id' ? 'id-ID' : 'en-US');

    return html`
      <div class="card border-0 shadow-sm rounded-4 overflow-hidden mb-4">
        <div class="position-relative">
          <img
            src="${s.photoUrl || 'https://via.placeholder.com/1200x700?text=No+Image'}"
            alt="Foto cerita dari ${s.name || 'Pengguna'}"
            class="w-100"
            style="max-height: 480px; object-fit: cover;"
          />
          <span class="badge bg-primary position-absolute top-0 end-0 m-3 rounded-pill px-3 py-2 shadow">
            <i class="bi bi-calendar-event me-1"></i> ${formattedDate}
          </span>
        </div>

        <div class="card-body p-4 p-lg-5">
          <div class="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4 pb-3 border-bottom">
            <div class="d-flex align-items-center gap-3">
              <user-badge name="${s.name || 'Anonymous'}"></user-badge>
              <div>
                <h4 class="fw-bold mb-0 text-dark">${s.name || 'Anonymous'}</h4>
                <small class="text-secondary">ID Cerita: <code>${s.id}</code></small>
              </div>
            </div>

            <div class="d-flex align-items-center gap-2">
              <span class="badge bg-light text-primary border rounded-pill px-3 py-2">
                <i class="bi bi-geo-alt me-1"></i> ${s.lat ? `${s.lat.toFixed(4)}, ${s.lon.toFixed(4)}` : 'Indonesia'}
              </span>
              <a href="index.html" class="btn btn-outline-secondary btn-sm rounded-pill px-3">
                <i class="bi bi-arrow-left me-1"></i> ${t('backToDashboard')}
              </a>
            </div>
          </div>

          <h5 class="fw-bold text-dark mb-3">Narasi Cerita</h5>
          <p class="text-secondary lead fs-6 mb-4" style="line-height: 1.8; white-space: pre-line;">
            ${s.description || '-'}
          </p>

          <div class="p-4 bg-light rounded-3 border d-flex flex-wrap align-items-center justify-content-between gap-3">
            <div class="d-flex align-items-center gap-2 text-muted small">
              <i class="bi bi-shield-check text-success fs-5"></i>
              <span>Data cerita diverifikasi dan tersimpan dengan aman di ekosistem Story App.</span>
            </div>
            <a href="add.html" class="btn btn-primary btn-sm rounded-pill px-4">
              <i class="bi bi-plus-lg me-1"></i> ${t('addStory')}
            </a>
          </div>
        </div>
      </div>
    `;
  }
}
customElements.define('story-detail', StoryDetail);
