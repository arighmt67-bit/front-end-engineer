import { register } from '../../data/api';
import AuthPresenter from './auth-presenter';

export default class RegisterPage {
  #presenter = null;

  async render() {
    return `
      <section class="container auth-container">
        <h1 class="page-title">Daftar</h1>
        <p class="page-subtitle">Buat akun untuk mulai berbagi cerita.</p>

        <div id="auth-alert" class="alert" role="alert" hidden></div>

        <form id="register-form" class="form" novalidate>
          <div class="form-group">
            <label for="name">Nama</label>
            <input type="text" id="name" name="name" required
                   autocomplete="name" placeholder="Nama lengkap"
                   aria-describedby="name-error" />
            <p class="field-error" id="name-error" role="alert"></p>
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" required
                   autocomplete="email" placeholder="nama@email.com"
                   aria-describedby="email-error" />
            <p class="field-error" id="email-error" role="alert"></p>
          </div>

          <div class="form-group">
            <label for="password">Kata Sandi</label>
            <input type="password" id="password" name="password" required
                   minlength="8" autocomplete="new-password"
                   placeholder="Minimal 8 karakter"
                   aria-describedby="password-error" />
            <p class="field-error" id="password-error" role="alert"></p>
          </div>

          <button type="submit" id="submit-button" class="btn btn-primary">Daftar</button>
        </form>

        <p class="auth-switch">Sudah punya akun? <a href="#/login">Masuk di sini</a></p>
      </section>
    `;
  }

  async afterRender() {
    this.#presenter = new AuthPresenter({ view: this, model: { register } });

    const form = document.getElementById('register-form');
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      this.#clearErrors();

      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const password = form.password.value;

      if (!this.#validate(name, email, password)) return;

      await this.#presenter.register({ name, email, password });
    });
  }

  #validate(name, email, password) {
    let valid = true;
    if (name.length < 3) {
      this.#setFieldError('name', 'Nama minimal 3 karakter.');
      valid = false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      this.#setFieldError('email', 'Format email tidak valid.');
      valid = false;
    }
    if (password.length < 8) {
      this.#setFieldError('password', 'Kata sandi minimal 8 karakter.');
      valid = false;
    }
    return valid;
  }

  #setFieldError(field, message) {
    const el = document.getElementById(`${field}-error`);
    const input = document.getElementById(field);
    if (el) el.textContent = message;
    if (input) input.setAttribute('aria-invalid', 'true');
  }

  #clearErrors() {
    ['name', 'email', 'password'].forEach((field) => {
      const el = document.getElementById(`${field}-error`);
      const input = document.getElementById(field);
      if (el) el.textContent = '';
      if (input) input.removeAttribute('aria-invalid');
    });
    const alert = document.getElementById('auth-alert');
    if (alert) alert.hidden = true;
  }

  setSubmitting(isSubmitting) {
    const button = document.getElementById('submit-button');
    if (!button) return;
    button.disabled = isSubmitting;
    button.textContent = isSubmitting ? 'Memproses...' : 'Daftar';
  }

  showError(message) {
    const el = document.getElementById('auth-alert');
    if (!el) return;
    el.hidden = false;
    el.className = 'alert alert-error';
    el.textContent = message;
  }

  onRegisterSuccess() {
    const el = document.getElementById('auth-alert');
    if (el) {
      el.hidden = false;
      el.className = 'alert alert-success';
      el.textContent = 'Pendaftaran berhasil! Mengalihkan ke halaman masuk...';
    }
    setTimeout(() => {
      location.hash = '#/login';
    }, 1200);
  }
}
