import { LitElement, html } from 'lit';
import { t, getLocale, setLocale } from '../localization/i18n.js';
import { authService } from '../api/api-service.js';

export class AppBar extends LitElement {
  createRenderRoot() {
    return this; // Light DOM for full Bootstrap integration
  }

  static properties = {
    activePage: { type: String },
    currentLocale: { type: String },
    user: { type: Object },
  };

  constructor() {
    super();
    this.activePage = 'dashboard';
    this.currentLocale = getLocale();
    this.user = authService.getUser();
  }

  connectedCallback() {
    super.connectedCallback();
    this.user = authService.getUser();
  }

  changeLanguage(locale) {
    setLocale(locale);
    this.currentLocale = locale;
    this.requestUpdate();
  }

  handleLogout(e) {
    e.preventDefault();
    authService.logout();
  }

  render() {
    const isDashboard = this.activePage === 'dashboard';
    const isAdd = this.activePage === 'add';
    const isProfile = this.activePage === 'profile';
    const isLogin = this.activePage === 'login';
    const isRegister = this.activePage === 'register';
    const isLoggedIn = Boolean(this.user);

    return html`
      <!-- Fixed / Sticky Navbar Container -->
      <header class="sticky-top">
        <nav class="navbar navbar-expand-lg navbar-custom py-2 py-lg-3" aria-label="Main Navigation">
          <div class="container-fluid container-lg px-3 px-lg-4">
            <!-- Brand Link -->
            <a class="navbar-brand d-flex align-items-center gap-2" href="index.html">
              <span class="brand-icon-wrapper shadow-sm">
                <i class="bi bi-camera-fill text-white fs-5"></i>
              </span>
              <span class="fw-bold tracking-tight text-dark fs-5 text-truncate" style="max-width: 180px;">
                ${t('appName')}
              </span>
            </a>

            <!-- Mobile Offcanvas Toggle Trigger Button -->
            <button
              class="navbar-toggler border-0 p-2 shadow-none rounded-3"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasNav"
              aria-controls="offcanvasNav"
              aria-expanded="false"
              aria-label="Buka navigasi menu"
            >
              <i class="bi bi-list fs-2 text-primary"></i>
            </button>

            <!-- Desktop View: Menu Links & Action CTA -->
            <div class="collapse navbar-collapse d-none d-lg-flex justify-content-between">
              <ul class="navbar-nav mx-auto mb-2 mb-lg-0 gap-1 gap-xl-2">
                <li class="nav-item">
                  <a class="nav-link px-3 rounded-pill ${isDashboard ? 'active fw-semibold' : ''}" href="index.html">
                    <i class="bi bi-house-door me-1"></i> ${t('navHome')}
                  </a>
                </li>
                ${isLoggedIn ? html`
                  <li class="nav-item">
                    <a class="nav-link px-3 rounded-pill ${isAdd ? 'active fw-semibold' : ''}" href="add.html">
                      <i class="bi bi-plus-circle me-1"></i> ${t('navAddStory')}
                    </a>
                  </li>
                ` : ''}
                <li class="nav-item">
                  <a class="nav-link px-3 rounded-pill ${isProfile ? 'active fw-semibold' : ''}" href="profile.html">
                    <i class="bi bi-person-badge me-1"></i> ${t('developerProfile')}
                  </a>
                </li>
              </ul>

              <div class="d-flex align-items-center gap-3">
                <!-- Language Toggle Button Group -->
                <div class="btn-group btn-group-sm rounded-pill p-1 bg-light border" role="group" aria-label="Pilih Bahasa">
                  <button
                    type="button"
                    class="btn rounded-pill px-2 py-1 ${this.currentLocale === 'id' ? 'btn-primary shadow-sm text-white' : 'btn-light border-0 text-muted'}"
                    @click="${() => this.changeLanguage('id')}"
                    aria-label="Pilih Bahasa Indonesia"
                  >
                    ID
                  </button>
                  <button
                    type="button"
                    class="btn rounded-pill px-2 py-1 ${this.currentLocale === 'en' ? 'btn-primary shadow-sm text-white' : 'btn-light border-0 text-muted'}"
                    @click="${() => this.changeLanguage('en')}"
                    aria-label="Select English Language"
                  >
                    EN
                  </button>
                </div>

                ${isLoggedIn ? html`
                  <div class="d-flex align-items-center gap-2">
                    <span class="small fw-semibold text-secondary d-none d-xl-inline">
                      Hai, ${this.user?.name || 'User'}
                    </span>
                    <button
                      class="btn btn-outline-danger btn-sm rounded-pill px-3 py-1 d-flex align-items-center gap-1"
                      @click="${this.handleLogout}"
                    >
                      <i class="bi bi-box-arrow-right"></i>
                      <span>Keluar</span>
                    </button>
                  </div>
                ` : html`
                  <div class="d-flex align-items-center gap-2">
                    <a href="login.html" class="btn btn-outline-primary btn-sm rounded-pill px-3 py-1 ${isLogin ? 'active' : ''}">
                      Masuk
                    </a>
                    <a href="register.html" class="btn btn-primary btn-sm rounded-pill px-3 py-1 shadow-sm text-white ${isRegister ? 'active' : ''}">
                      Daftar
                    </a>
                  </div>
                `}
              </div>
            </div>
          </div>
        </nav>
      </header>

      <!-- Offcanvas Mobile Sibling: Di luar nav agar top:0 bottom:0 bekerja penuh tanpa terpotong -->
      <div
        class="offcanvas offcanvas-end shadow"
        tabindex="-1"
        id="offcanvasNav"
        aria-labelledby="offcanvasNavLabel"
      >
        <div class="offcanvas-header border-bottom py-3 px-4">
          <div class="d-flex align-items-center gap-2" id="offcanvasNavLabel">
            <span class="brand-icon-wrapper shadow-sm">
              <i class="bi bi-camera-fill text-white fs-6"></i>
            </span>
            <span class="fw-bold fs-6 text-dark">${t('appName')}</span>
          </div>
          <button
            type="button"
            class="btn-close shadow-none"
            data-bs-dismiss="offcanvas"
            aria-label="Tutup menu navigasi"
          ></button>
        </div>

        <div class="offcanvas-body d-flex flex-column justify-content-between p-4">
          <ul class="navbar-nav gap-2">
            <li class="nav-item">
              <a class="nav-link px-3 py-2 rounded-3 ${isDashboard ? 'active fw-semibold' : ''}" href="index.html">
                <i class="bi bi-house-door me-2 text-primary"></i> ${t('navHome')}
              </a>
            </li>
            ${isLoggedIn ? html`
              <li class="nav-item">
                <a class="nav-link px-3 py-2 rounded-3 ${isAdd ? 'active fw-semibold' : ''}" href="add.html">
                  <i class="bi bi-plus-circle me-2 text-primary"></i> ${t('navAddStory')}
                </a>
              </li>
            ` : ''}
            <li class="nav-item">
              <a class="nav-link px-3 py-2 rounded-3 ${isProfile ? 'active fw-semibold' : ''}" href="profile.html">
                <i class="bi bi-person-badge me-2 text-primary"></i> ${t('developerProfile')}
              </a>
            </li>
          </ul>

          <div class="border-top pt-4 mt-auto d-flex flex-column gap-3">
            <div class="d-flex align-items-center justify-content-between bg-light p-2 rounded-3 border">
              <span class="small fw-semibold text-secondary">
                <i class="bi bi-translate me-1"></i> Bahasa
              </span>
              <div class="btn-group btn-group-sm" role="group">
                <button
                  type="button"
                  class="btn rounded-pill px-3 ${this.currentLocale === 'id' ? 'btn-primary text-white shadow-sm' : 'btn-light border-0 text-muted'}"
                  @click="${() => this.changeLanguage('id')}"
                >
                  ID
                </button>
                <button
                  type="button"
                  class="btn rounded-pill px-3 ${this.currentLocale === 'en' ? 'btn-primary text-white shadow-sm' : 'btn-light border-0 text-muted'}"
                  @click="${() => this.changeLanguage('en')}"
                >
                  EN
                </button>
              </div>
            </div>

            ${isLoggedIn ? html`
              <div class="d-flex flex-column gap-2">
                <div class="text-secondary small">
                  Login sebagai: <strong>${this.user?.name || 'User'}</strong>
                </div>
                <button
                  class="btn btn-outline-danger w-100 py-2 rounded-pill d-flex align-items-center justify-content-center gap-2"
                  @click="${this.handleLogout}"
                >
                  <i class="bi bi-box-arrow-right"></i>
                  <span>Keluar (Logout)</span>
                </button>
              </div>
            ` : html`
              <div class="d-grid gap-2">
                <a href="login.html" class="btn btn-outline-primary py-2 rounded-pill fw-semibold">
                  Masuk (Login)
                </a>
                <a href="register.html" class="btn btn-primary py-2 rounded-pill text-white fw-semibold shadow-sm">
                  Daftar Akun Baru
                </a>
              </div>
            `}
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('app-bar', AppBar);
