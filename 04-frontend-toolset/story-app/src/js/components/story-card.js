import { LitElement, html } from 'lit';
import { formatHumanDate } from '../utils/date-formatter.js';
import { getLocale } from '../localization/i18n.js';

export class StoryCard extends LitElement {
  createRenderRoot() {
    return this; // Light DOM for Bootstrap styles
  }

  static properties = {
    story: { type: Object },
    locale: { type: String },
  };

  constructor() {
    super();
    this.story = {};
    this.locale = getLocale();
    this.handleLocaleChange = this.handleLocaleChange.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('locale-changed', this.handleLocaleChange);
  }

  disconnectedCallback() {
    window.removeEventListener('locale-changed', this.handleLocaleChange);
    super.disconnectedCallback();
  }

  handleLocaleChange(e) {
    this.locale = e.detail.locale;
    this.requestUpdate();
  }

  render() {
    const s = this.story || {};
    const formattedDate = formatHumanDate(s.createdAt, this.locale === 'id' ? 'id-ID' : 'en-US');
    const detailUrl = `detail.html?id=${encodeURIComponent(s.id || '')}`;

    return html`
      <div class="card story-card h-100 shadow-sm border-0">
        <div class="story-card__img-wrapper">
          <a href="${detailUrl}">
            <img
              src="${s.photoUrl || 'https://via.placeholder.com/600x400?text=No+Image'}"
              alt="Foto cerita dari ${s.name || 'Pengguna'}"
              loading="lazy"
              class="card-img-top"
            />
          </a>
          <span class="badge bg-primary story-card__badge rounded-pill">
            ${s.createdAt ? s.createdAt.substring(0, 10) : '-'}
          </span>
        </div>

        <div class="card-body story-card__body p-4 d-flex flex-column">
          <div class="d-flex align-items-center justify-content-between mb-3">
            <div class="d-flex align-items-center gap-2">
              <user-badge name="${s.name || 'Anonymous'}"></user-badge>
              <div>
                <h6 class="card-title mb-0 fw-bold text-dark">${s.name || 'Anonymous'}</h6>
                <small class="text-muted d-block" style="font-size: 0.78rem;">
                  ${formattedDate}
                </small>
              </div>
            </div>
          </div>

          <p class="card-text text-secondary line-clamp-3 mb-4 flex-grow-1">
            ${s.description || '-'}
          </p>

          <div class="pt-3 border-top d-flex align-items-center justify-content-between mt-auto">
            <a
              href="${detailUrl}"
              class="btn btn-outline-primary btn-sm rounded-pill px-3 fw-semibold"
            >
              <i class="bi bi-eye me-1"></i> Detail Cerita
            </a>
            <span class="badge bg-light text-secondary border rounded-pill px-2 py-1">
              ${s.lat ? `${s.lat.toFixed(2)}, ${s.lon.toFixed(2)}` : 'Indonesia'}
            </span>
          </div>
        </div>
      </div>
    `;
  }
}
customElements.define('story-card', StoryCard);
