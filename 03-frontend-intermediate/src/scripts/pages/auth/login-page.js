import { login } from '../../data/api';
import { putAccessToken } from '../../utils/auth';
import AuthPresenter from './auth-presenter';

export default class LoginPage {
  #presenter = null;

  async render() {
    return `
      <section class="container auth-container">
        <h1 class="page-title">Masuk</h1>
        <p class="page-subtitle">Masuk untuk melihat dan membagikan cerita.</p>

        <div id="auth-alert" class="alert" role="alert" hidden></div>

        <form id="login-form" class="form" novalidate>
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
                   minlength="8" autocomplete="current-password"
                   placeholder="Minimal 8 karakter"
                   aria-describedby="password-error" />
            <p class="field-error" id="password-error" role="alert"></p>
          </div>

          <button type="submit" id="submit-button" class="btn btn-primary">Masuk</button>
        </form>

        <p class="auth-switch">
          Belum punya akun? <a href="#/register">Daftar di sini</a>
        </p>
      </section>
    `;
  }

  async afterRender() {
    this.#presenter = new AuthPresenter({ view: this, model: { login } });

    const form = document.getElementById('login-form');
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      this.#clearErrors();

      const email = form.email.value.trim();
      const password = form.password.value;

      if (!this.#validate(email, password)) return;

      await this.#presenter.login({ email, password });
    });
  }

  #validate(email, password) {
    let valid = true;
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
    ['email', 'password'].forEach((field) => {
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
    button.textContent = isSubmitting ? 'Memproses...' : 'Masuk';
  }

  showError(message) {
    const el = document.getElementById('auth-alert');
    if (!el) return;
    el.hidden = false;
    el.className = 'alert alert-error';
    el.textContent = message;
  }

  onLoginSuccess({ token, name }) {
    putAccessToken(token, name);
    location.hash = '#/';
  }
}
