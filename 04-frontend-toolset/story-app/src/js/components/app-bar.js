import { LitElement, html } from 'lit';
import { t, getLocale, setLocale } from '../localization/i18n.js';

export class AppBar extends LitElement {
  createRenderRoot() {
    return this; // Light DOM to integrate cleanly with Bootstrap Navbar & Offcanvas
  }

  static properties = {
    activePage: { type: String },
    currentLang: { type: String },
  };

  constructor() {
    super();
    this.activePage = 'dashboard';
    this.currentLang = getLocale();
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
    this.currentLang = e.detail.locale;
    this.requestUpdate();
  }

  changeLang(lang) {
    setLocale(lang);
  }

  render() {
    const isDashboard = this.activePage === 'dashboard';
    const isAdd = this.activePage === 'add';
    const isProfile = this.activePage === 'profile';

    return html`
      <!-- Sticky Navigation Bar Header -->
      <header class="sticky-top">
        <nav class="navbar navbar-expand-lg navbar-custom py-3" aria-label="Main Navigation">
          <div class="container">
            <a class="navbar-brand d-flex align-items-center gap-2" href="index.html">
              <span class="fs-3">📖</span>
              <span class="brand-gradient fs-4">${t('appTitle')}</span>
            </a>

            <!-- Offcanvas Toggler Button for Mobile -->
            <button
              class="navbar-toggler border-0 shadow-none p-2"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasNav"
              aria-controls="offcanvasNav"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>

            <!-- Desktop Horizontal Navbar Items -->
            <div class="collapse navbar-collapse d-none d-lg-flex justify-content-between align-items-center">
              <ul class="navbar-nav mx-auto gap-2">
                <li class="nav-item">
                  <a
                    class="nav-link px-3 py-2 fw-semibold rounded-pill ${isDashboard ? 'active bg-primary text-white' : 'text-secondary'}"
                    href="index.html"
                  >
                    ${t('dashboard')}
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link px-3 py-2 fw-semibold rounded-pill ${isAdd ? 'active bg-primary text-white' : 'text-secondary'}"
                    href="add.html"
                  >
                    ${t('addStory')}
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link px-3 py-2 fw-semibold rounded-pill ${isProfile ? 'active bg-primary text-white' : 'text-secondary'}"
                    href="profile.html"
                  >
                    ${t('developerProfile')}
                  </a>
                </li>
              </ul>

              <div class="d-flex align-items-center gap-3">
                <div class="btn-group btn-group-sm rounded-pill overflow-hidden border" role="group" aria-label="Language Selector">
                  <button
                    type="button"
                    class="btn ${this.currentLang === 'id' ? 'btn-primary' : 'btn-light'}"
                    @click="${() => this.changeLang('id')}"
                  >
                    🇮🇩 ID
                  </button>
                  <button
                    type="button"
                    class="btn ${this.currentLang === 'en' ? 'btn-primary' : 'btn-light'}"
                    @click="${() => this.changeLang('en')}"
                  >
                    🇬🇧 EN
                  </button>
                </div>

                <a href="add.html" class="btn btn-primary btn-sm rounded-pill px-3 py-2 shadow-sm">
                  <i class="bi bi-plus-lg me-1"></i> ${t('addStory')}
                </a>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <!-- Sibling Offcanvas Component placed OUTSIDE of <nav> for Full Viewport Height (top:0 bottom:0) -->
      <div
        class="offcanvas offcanvas-end"
        tabindex="-1"
        id="offcanvasNav"
        aria-labelledby="offcanvasNavLabel"
      >
        <div class="offcanvas-header border-bottom px-4 py-3">
          <div class="d-flex align-items-center gap-2">
            <span class="fs-4">📖</span>
            <h5 class="offcanvas-title brand-gradient fw-bold mb-0" id="offcanvasNavLabel">
              ${t('appTitle')}
            </h5>
          </div>
          <button
            type="button"
            class="btn-close text-reset shadow-none"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>

        <div class="offcanvas-body p-4 d-flex flex-column justify-content-between">
          <ul class="navbar-nav gap-2">
            <li class="nav-item">
              <a
                class="nav-link px-3 py-2 fw-semibold rounded-pill ${isDashboard ? 'active bg-primary text-white' : 'text-secondary'}"
                href="index.html"
              >
                <i class="bi bi-grid-fill me-2"></i> ${t('dashboard')}
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link px-3 py-2 fw-semibold rounded-pill ${isAdd ? 'active bg-primary text-white' : 'text-secondary'}"
                href="add.html"
              >
                <i class="bi bi-plus-circle-fill me-2"></i> ${t('addStory')}
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link px-3 py-2 fw-semibold rounded-pill ${isProfile ? 'active bg-primary text-white' : 'text-secondary'}"
                href="profile.html"
              >
                <i class="bi bi-person-badge-fill me-2"></i> ${t('developerProfile')}
              </a>
            </li>
          </ul>

          <div class="pt-4 border-top">
            <div class="d-flex align-items-center justify-content-between mb-3">
              <span class="text-muted small">Pilih Bahasa:</span>
              <div class="btn-group btn-group-sm rounded-pill overflow-hidden border" role="group">
                <button
                  type="button"
                  class="btn ${this.currentLang === 'id' ? 'btn-primary' : 'btn-light'}"
                  @click="${() => this.changeLang('id')}"
                >
                  🇮🇩 ID
                </button>
                <button
                  type="button"
                  class="btn ${this.currentLang === 'en' ? 'btn-primary' : 'btn-light'}"
                  @click="${() => this.changeLang('en')}"
                >
                  🇬🇧 EN
                </button>
              </div>
            </div>

            <a href="add.html" class="btn btn-primary w-100 rounded-pill py-2 shadow-sm text-center">
              <i class="bi bi-plus-lg me-1"></i> ${t('addStory')}
            </a>
          </div>
        </div>
      </div>
    `;
  }
}
customElements.define('app-bar', AppBar);
