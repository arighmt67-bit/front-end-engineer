import { LitElement, html } from 'lit';
import { authService } from '../api/api-service.js';

export class RegisterForm extends LitElement {
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

    const name = form.elements['name'].value.trim();
    const email = form.elements['email'].value.trim();
    const password = form.elements['password'].value;

    if (password.length < 8) {
      this.errorMessage = 'Password minimal harus 8 karakter!';
      return;
    }

    this.loading = true;
    try {
      await authService.register({ name, email, password });
      this.successMessage = 'Registrasi berhasil! Mengalihkan ke halaman login...';
      form.reset();
      form.classList.remove('was-validated');
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 1500);
    } catch (err) {
      this.errorMessage = err.message || 'Registrasi gagal. Email mungkin sudah terdaftar.';
    } finally {
      this.loading = false;
    }
  }

  render() {
    return html`
      <div class="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white">
        <div class="text-center mb-4">
          <div class="d-inline-flex align-items-center justify-content-center bg-success bg-opacity-10 text-success rounded-circle mb-3" style="width: 64px; height: 64px;">
            <i class="bi bi-person-plus fs-2"></i>
          </div>
          <h2 class="fw-bold text-dark">Buat Akun Baru</h2>
          <p class="text-secondary small">Daftar akun Story App untuk berbagi kisah inspiratif Anda</p>
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
            <label for="name" class="form-label fw-semibold text-dark">Nama Lengkap</label>
            <div class="input-group has-validation">
              <span class="input-group-text bg-light border-end-0 text-muted"><i class="bi bi-person"></i></span>
              <input
                type="text"
                class="form-control bg-light border-start-0 ps-0"
                id="name"
                name="name"
                placeholder="Contoh: Ari Rahmat"
                required
              />
              <div class="invalid-feedback">Nama lengkap wajib diisi.</div>
            </div>
          </div>

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
                placeholder="Buat kata sandi aman"
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
              <div class="invalid-feedback">Kata sandi wajib diisi minimal 8 karakter.</div>
            </div>
          </div>

          <button
            type="submit"
            class="btn btn-success w-100 py-2 rounded-pill fw-semibold shadow-sm d-flex align-items-center justify-content-center gap-2"
            ?disabled="${this.loading}"
          >
            ${this.loading ? html`
              <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              <span>Mendaftarkan Akun...</span>
            ` : html`
              <span>Daftar Sekarang</span>
              <i class="bi bi-check2-circle"></i>
            `}
          </button>
        </form>

        <div class="text-center mt-4 pt-3 border-top">
          <p class="text-secondary small mb-0">
            Sudah memiliki akun? <a href="login.html" class="text-success fw-semibold text-decoration-none">Masuk di sini</a>
          </p>
        </div>
      </div>
    `;
  }
}

customElements.define('register-form', RegisterForm);
