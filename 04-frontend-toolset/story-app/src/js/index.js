// Main Application Entry Point
import '../sass/main.scss';
import * as bootstrap from 'bootstrap';

// Import Lit Components
import './components/app-bar.js';
import './components/story-card.js';
import './components/story-form.js';
import './components/user-badge.js';
import './components/footer-bar.js';

// Import Data & Localization
import initialData from '../data/DATA.json';
import { t, getLocale } from './localization/i18n.js';

// Expose bootstrap to window for modal/offcanvas triggers
window.bootstrap = bootstrap;

document.addEventListener('DOMContentLoaded', () => {
  initDashboard();
  initI18nLabels();

  window.addEventListener('locale-changed', () => {
    initI18nLabels();
    initDashboard();
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

function initDashboard() {
  const container = document.getElementById('stories-container');
  if (!container) return;

  // Retrieve user-added stories from localStorage combined with DATA.json
  const localStories = JSON.parse(localStorage.getItem('custom_stories') || '[]');
  const allStories = [...localStories, ...(initialData.listStory || [])];

  container.innerHTML = '';

  if (allStories.length === 0) {
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

  allStories.forEach((story) => {
    const col = document.createElement('div');
    col.className = 'col-md-6 col-lg-4 mb-4';

    const card = document.createElement('story-card');
    card.story = story;

    col.appendChild(card);
    container.appendChild(col);
  });
}
