import { LitElement, html } from 'lit';
import { authService } from '../api/api-service.js';

export class LoginForm extends LitElement {
  createRenderRoot() {
    return this;
  }

  static properties = {
    showPassword: { type: Boolean },
    loading: { type: Boolean },
    errorMessage: { type: String },
    successMessage: { type: String },
  };

  constructor() {
    super();
    this.showPassword = false;
    this.loading = false;
    this.errorMessage = '';
    this.successMessage = '';
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  async handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    this.errorMessage = '';
    this.successMessage = '';

    if (!form.checkValidity()) {
      e.stopPropagation();
      form.classList.add('was-validated');
      return;
    }

    const email = form.elements['email'].value.trim();
    const password = form.elements['password'].value;

    if (password.length < 8) {
      this.errorMessage = 'Password minimal harus 8 karakter!';
      return;
    }

    this.loading = true;
    try {
      await authService.login({ email, password });
      this.successMessage = 'Login berhasil! Mengarahkan ke dasbor...';
      form.reset();
      form.classList.remove('was-validated');
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1000);
    } catch (err) {
      this.errorMessage = err.message || 'Login gagal. Periksa kembali email dan password Anda.';
    } finally {
      this.loading = false;
    }
  }

  render() {
    return html`
      <div class="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white">
        <div class="text-center mb-4">
          <div class="d-inline-flex align-items-center justify-content-center bg-primary bg-opacity-10 text-primary rounded-circle mb-3" style="width: 64px; height: 64px;">
            <i class="bi bi-box-arrow-in-right fs-2"></i>
          </div>
          <h2 class="fw-bold text-dark">Masuk ke Story App</h2>
          <p class="text-secondary small">Jelajahi berbagai cerita dan bagikan momen seru Anda</p>
        </div>

        ${this.errorMessage ? html`
          <div class="alert alert-danger alert-dismissible fade show rounded-3 mb-4" role="alert">
            <div class="d-flex align-items-center gap-2">
              <i class="bi bi-exclamation-triangle-fill fs-5"></i>
              <div>${this.errorMessage}</div>
            </div>
            <button type="button" class="btn-close" @click="${() => { this.errorMessage = ''; }}" aria-label="Close"></button>
          </div>
        ` : ''}

        ${this.successMessage ? html`
          <div class="alert alert-success alert-dismissible fade show rounded-3 mb-4" role="alert">
            <div class="d-flex align-items-center gap-2">
              <i class="bi bi-check-circle-fill fs-5"></i>
              <div>${this.successMessage}</div>
            </div>
          </div>
        ` : ''}

        <form class="needs-validation" novalidate @submit="${this.handleSubmit}">
          <div class="mb-3">
            <label for="email" class="form-label fw-semibold text-dark">Alamat Email</label>
            <div class="input-group has-validation">
              <span class="input-group-text bg-light border-end-0 text-muted"><i class="bi bi-envelope"></i></span>
              <input
                type="email"
                class="form-control bg-light border-start-0 ps-0"
                id="email"
                name="email"
                placeholder="nama@email.com"
                required
              />
              <div class="invalid-feedback">Masukkan format email yang valid.</div>
            </div>
          </div>

          <div class="mb-4">
            <div class="d-flex justify-content-between align-items-center mb-1">
              <label for="password" class="form-label fw-semibold text-dark mb-0">Kata Sandi</label>
              <small class="text-muted">Min. 8 karakter</small>
            </div>
            <div class="input-group has-validation">
              <span class="input-group-text bg-light border-end-0 text-muted"><i class="bi bi-lock"></i></span>
              <input
                type="${this.showPassword ? 'text' : 'password'}"
                class="form-control bg-light border-start-0 border-end-0 ps-0"
                id="password"
                name="password"
                minlength="8"
                placeholder="Masukkan kata sandi"
                required
              />
              <button
                class="btn btn-light border border-start-0 text-muted"
                type="button"
                @click="${this.togglePasswordVisibility}"
                aria-label="Toggle password visibility"
              >
                <i class="bi ${this.showPassword ? 'bi-eye-slash' : 'bi-eye'}"></i>
              </button>
              <div class="invalid-feedback">Password wajib diisi dan minimal 8 karakter.</div>
            </div>
          </div>

          <button
            type="submit"
            class="btn btn-primary w-100 py-2 rounded-pill fw-semibold shadow-sm d-flex align-items-center justify-content-center gap-2"
            ?disabled="${this.loading}"
          >
            ${this.loading ? html`
              <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              <span>Memproses Masuk...</span>
            ` : html`
              <span>Masuk Sekarang</span>
              <i class="bi bi-arrow-right"></i>
            `}
          </button>
        </form>

        <div class="text-center mt-4 pt-3 border-top">
          <p class="text-secondary small mb-0">
            Belum punya akun? <a href="register.html" class="text-primary fw-semibold text-decoration-none">Daftar di sini</a>
          </p>
        </div>
      </div>
    `;
  }
}

customElements.define('login-form', LoginForm);
