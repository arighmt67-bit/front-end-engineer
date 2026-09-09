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
        <div class="container">
          <a class="navbar-brand d-flex align-items-center gap-2" href="index.html">
            <span class="fs-3">📖</span>
            <span class="brand-gradient fs-4">${t('appTitle')}</span>
          </a>

          <!-- Offcanvas Toggler -->
          <button
            class="navbar-toggler border-0 shadow-none"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNav"
            aria-controls="offcanvasNav"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <!-- Offcanvas Component -->
          <div
            class="offcanvas offcanvas-end"
            tabindex="-1"
            id="offcanvasNav"
            aria-labelledby="offcanvasNavLabel"
          >
            <div class="offcanvas-header border-bottom">
              <h5 class="offcanvas-title brand-gradient fw-bold" id="offcanvasNavLabel">
                ${t('appTitle')}
              </h5>
              <button
                type="button"
                class="btn-close text-reset shadow-none"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div class="offcanvas-body d-flex flex-column flex-lg-row justify-content-lg-between align-items-lg-center gap-3">
              <ul class="navbar-nav mx-auto gap-2">
                <li class="nav-item">
                  <a
                    class="nav-link px-3 fw-semibold rounded-pill ${isDashboard ? 'active bg-primary text-white' : 'text-secondary'}"
                    href="index.html"
                  >
                    ${t('dashboard')}
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link px-3 fw-semibold rounded-pill ${isAdd ? 'active bg-primary text-white' : 'text-secondary'}"
                    href="add.html"
                  >
                    ${t('addStory')}
                  </a>
                </li>
              </ul>

              <div class="d-flex align-items-center gap-2 pt-3 pt-lg-0 border-top border-lg-0">
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
                <a href="add.html" class="btn btn-primary btn-sm rounded-pill px-3 shadow-sm">
                  ${t('addStory')}
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
