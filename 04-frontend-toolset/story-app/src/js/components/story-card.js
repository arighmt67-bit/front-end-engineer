import { LitElement, html } from 'lit';
import { formatHumanDate } from '../utils/date-formatter.js';
import { t, getLocale } from '../localization/i18n.js';

export class StoryCard extends LitElement {
  createRenderRoot() {
    return this;
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
    const modalId = `modal-${s.id ? s.id.replace(/[^a-zA-Z0-9]/g, '') : Math.random().toString(36).substring(7)}`;

    return html`
      <div class="card story-card h-100 shadow-sm border-0">
        <div class="story-card__img-wrapper">
          <img
            src="${s.photoUrl || 'https://via.placeholder.com/600x400?text=No+Image'}"
            alt="Foto cerita dari ${s.name || 'Pengguna'}"
            loading="lazy"
            class="card-img-top"
          />
          <span class="badge bg-primary story-card__badge rounded-pill">
            ${s.createdAt ? s.createdAt.substring(0, 10) : '-'}
          </span>
        </div>

        <div class="card-body story-card__body p-4">
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

          <div class="pt-2 border-top d-flex align-items-center justify-content-between">
            <button
              type="button"
              class="btn btn-outline-primary btn-sm rounded-pill px-3"
              data-bs-toggle="modal"
              data-bs-target="#${modalId}"
            >
              Detail Cerita
            </button>
            <span class="badge bg-light text-secondary border rounded-pill">
              ${s.lat ? `${s.lat.toFixed(2)}, ${s.lon.toFixed(2)}` : 'Indonesia'}
            </span>
          </div>
        </div>

        <!-- Bootstrap Modal Component -->
        <div class="modal fade" id="${modalId}" tabindex="-1" aria-labelledby="${modalId}Label" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content border-0 rounded-4 shadow-lg overflow-hidden">
              <div class="modal-header bg-light border-0 py-3">
                <h5 class="modal-title fw-bold" id="${modalId}Label">
                  ${s.name || 'Story Detail'}
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body p-0">
                <img src="${s.photoUrl}" class="w-100" style="max-height: 420px; object-fit: cover;" alt="${s.name}" />
                <div class="p-4">
                  <div class="d-flex align-items-center gap-2 mb-3">
                    <user-badge name="${s.name}"></user-badge>
                    <div>
                      <h6 class="mb-0 fw-bold">${s.name}</h6>
                      <small class="text-muted">${formattedDate}</small>
                    </div>
                  </div>
                  <p class="lead text-dark fs-6">${s.description}</p>
                </div>
              </div>
              <div class="modal-footer border-0 bg-light">
                <button type="button" class="btn btn-secondary btn-sm rounded-pill px-4" data-bs-dismiss="modal">Tutup</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
customElements.define('story-card', StoryCard);
