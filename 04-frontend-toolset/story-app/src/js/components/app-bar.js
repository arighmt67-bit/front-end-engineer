import { LitElement, html } from 'lit';
import { t, getLocale, setLocale } from '../localization/i18n.js';

export class AppBar extends LitElement {
  createRenderRoot() {
    return this; // Light DOM to leverage Bootstrap Navbar & Offcanvas
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

    return html`
      <nav class="navbar navbar-expand-lg navbar-custom sticky-top py-3">
        <div class="container-fluid container-lg px-3 px-lg-4">
          <a class="navbar-brand d-flex align-items-center gap-2 me-auto" href="index.html">
            <span class="fs-3">📖</span>
            <span class="brand-gradient fs-4">${t('appTitle')}</span>
          </a>

          <!-- Offcanvas Toggler Button -->
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

          <!-- Offcanvas Navigation Panel (Responsive) -->
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
            
            <div class="offcanvas-body p-4 p-lg-0 d-flex flex-column flex-lg-row justify-content-lg-between align-items-lg-center">
              <ul class="navbar-nav mx-lg-auto mb-3 mb-lg-0 gap-2">
                <li class="nav-item">
                  <a
                    class="nav-link px-3 py-2 fw-semibold rounded-pill ${isDashboard ? 'active bg-primary text-white' : 'text-secondary'}"
                    href="index.html"
                  >
                    <i class="bi bi-grid-fill me-1 d-lg-none"></i> ${t('dashboard')}
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link px-3 py-2 fw-semibold rounded-pill ${isAdd ? 'active bg-primary text-white' : 'text-secondary'}"
                    href="add.html"
                  >
                    <i class="bi bi-plus-circle-fill me-1 d-lg-none"></i> ${t('addStory')}
                  </a>
                </li>
              </ul>

              <div class="d-flex flex-column flex-lg-row align-items-stretch align-items-lg-center gap-3 pt-3 pt-lg-0 border-top border-lg-0 mt-auto mt-lg-0">
                <div class="d-flex align-items-center justify-content-between justify-content-lg-start gap-2">
                  <span class="text-muted small d-lg-none">Bahasa / Language:</span>
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

                <a href="add.html" class="btn btn-primary btn-sm rounded-pill px-3 py-2 shadow-sm text-center">
                  <i class="bi bi-plus-lg me-1"></i> ${t('addStory')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    `;
  }
}
customElements.define('app-bar', AppBar);
