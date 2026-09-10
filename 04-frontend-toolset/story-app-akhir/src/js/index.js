// Main Application Entry Point
import '../sass/main.scss';
import * as bootstrap from 'bootstrap';

// Import Lit Components
import './components/app-bar.js';
import './components/story-card.js';
import './components/story-detail.js';
import './components/story-form.js';
import './components/login-form.js';
import './components/register-form.js';
import './components/user-badge.js';
import './components/footer-bar.js';

// Import Services & Localization
import { storyService, authService } from './api/api-service.js';
import { t } from './localization/i18n.js';

// Expose bootstrap to window for modal/offcanvas triggers
window.bootstrap = bootstrap;

document.addEventListener('DOMContentLoaded', () => {
  initDashboard();
  initI18nLabels();

  window.addEventListener('locale-changed', () => {
    initI18nLabels();
  });
});

function initI18nLabels() {
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (key) {
      el.textContent = t(key);
    }
  });
}

function renderSkeletonLoading(container) {
  container.innerHTML = '';
  // Kriteria 5: Bootstrap Placeholder Skeleton Loading Indicator
  for (let i = 0; i < 6; i++) {
    const col = document.createElement('div');
    col.className = 'col-md-6 col-lg-4 mb-4';
    col.innerHTML = `
      <div class="card border-0 shadow-sm rounded-4 overflow-hidden" aria-hidden="true">
        <div class="placeholder-glow">
          <div class="placeholder w-100 bg-secondary" style="height: 200px;"></div>
        </div>
        <div class="card-body p-4">
          <h5 class="card-title placeholder-glow">
            <span class="placeholder col-6"></span>
          </h5>
          <p class="card-text placeholder-glow">
            <span class="placeholder col-7"></span>
            <span class="placeholder col-4"></span>
            <span class="placeholder col-4"></span>
            <span class="placeholder col-6"></span>
          </p>
          <div class="d-flex justify-content-between align-items-center mt-3 pt-3 border-top placeholder-glow">
            <span class="placeholder col-4"></span>
            <span class="placeholder col-3 btn btn-sm btn-primary disabled"></span>
          </div>
        </div>
      </div>
    `;
    container.appendChild(col);
  }
}

async function initDashboard() {
  const container = document.getElementById('stories-container');
  if (!container) return;

  // Check auth requirement for live Story API
  if (!authService.isAuthenticated()) {
    container.innerHTML = `
      <div class="col-12 text-center py-5">
        <div class="p-5 bg-white rounded-4 shadow-sm">
          <div class="mb-3 text-primary">
            <i class="bi bi-shield-lock fs-1"></i>
          </div>
          <h3 class="fw-bold text-dark">Akses Masuk Diperlukan</h3>
          <p class="text-secondary mb-4">Silakan masuk (login) terlebih dahulu untuk menikmati dan membagikan cerita di Story App.</p>
          <div class="d-flex justify-content-center gap-3">
            <a href="login.html" class="btn btn-primary rounded-pill px-4 shadow-sm">Masuk Sekarang</a>
            <a href="register.html" class="btn btn-outline-primary rounded-pill px-4">Daftar Akun</a>
          </div>
        </div>
      </div>
    `;
    return;
  }

  // Display Bootstrap Skeleton Placeholder while requesting
  renderSkeletonLoading(container);

  try {
    const res = await storyService.getAllStories({ page: 1, size: 24 });
    const stories = res.listStory || [];

    container.innerHTML = '';

    if (stories.length === 0) {
      container.innerHTML = `
        <div class="col-12 text-center py-5">
          <div class="p-5 bg-white rounded-4 shadow-sm">
            <i class="bi bi-inbox fs-1 text-muted"></i>
            <p class="mt-3 text-secondary mb-0">${t('emptyState')}</p>
          </div>
        </div>
      `;
      return;
    }

    stories.forEach((story) => {
      const col = document.createElement('div');
      col.className = 'col-md-6 col-lg-4 mb-4';

      const card = document.createElement('story-card');
      card.story = story;

      col.appendChild(card);
      container.appendChild(col);
    });
  } catch (err) {
    container.innerHTML = `
      <div class="col-12 text-center py-5">
        <div class="p-5 bg-white rounded-4 shadow-sm">
          <div class="text-danger mb-3">
            <i class="bi bi-exclamation-octagon fs-1"></i>
          </div>
          <h4 class="fw-bold text-dark mb-2">Gagal Memuat Cerita</h4>
          <p class="text-secondary mb-4">${err.message || 'Terjadi gangguan saat mengambil data dari Story API.'}</p>
          <button class="btn btn-primary rounded-pill px-4" onclick="location.reload()">
            <i class="bi bi-arrow-clockwise me-1"></i> Coba Lagi
          </button>
        </div>
      </div>
    `;
  }
}
