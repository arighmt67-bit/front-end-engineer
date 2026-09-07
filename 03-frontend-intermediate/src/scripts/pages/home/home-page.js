import { getStories } from '../../data/api';
import { showFormattedDate } from '../../utils';
import { createMap, L } from '../../utils/map-helper';
import { isLoggedIn } from '../../utils/auth';
import { putStory, deleteStory, getAllStories } from '../../data/database';
import CONFIG from '../../config';
import HomePresenter from './home-presenter';

export default class HomePage {
  #presenter = null;
  #map = null;
  #markers = new Map();

  async render() {
    return `
      <section class="container">
        <h1 class="page-title">Jelajahi Cerita</h1>
        <p class="page-subtitle">
          Kumpulan cerita dari pengguna Dicoding beserta lokasinya.
        </p>

        <div id="story-loading" class="loading" role="status" aria-live="polite" hidden>
          <span class="spinner" aria-hidden="true"></span> Memuat cerita...
        </div>

        <div id="story-alert" class="alert" role="alert" hidden></div>

        <div class="home-layout">
          <div class="home-list-wrapper">
            <h2 class="section-title" id="daftar-cerita">Daftar Cerita</h2>
            <ul id="story-list" class="story-list" aria-labelledby="daftar-cerita"></ul>
          </div>

          <div class="home-map-wrapper">
            <h2 class="section-title" id="peta-cerita">Peta Cerita</h2>
            <div id="map" class="map" role="application"
                 aria-label="Peta persebaran lokasi cerita"></div>
            <p class="map-hint">
              Klik salah satu kartu cerita untuk menyorot lokasinya di peta.
            </p>
          </div>
        </div>
      </section>
    `;
  }

  async afterRender() {
    if (!isLoggedIn()) {
      this.showError('Anda harus masuk terlebih dahulu untuk melihat cerita.');
      location.hash = '#/login';
      return;
    }

    this.#presenter = new HomePresenter({
      view: this,
      model: { getStories },
    });

    await this.#presenter.loadStories();
  }

  showLoading() {
    const el = document.getElementById('story-loading');
    if (el) el.hidden = false;
  }

  hideLoading() {
    const el = document.getElementById('story-loading');
    if (el) el.hidden = true;
  }

  showError(message) {
    const el = document.getElementById('story-alert');
    if (!el) return;
    el.hidden = false;
    el.className = 'alert alert-error';
    el.textContent = message;
  }

  showEmpty() {
    const list = document.getElementById('story-list');
    if (list) {
      list.innerHTML =
        '<li class="empty-state">Belum ada cerita yang dibagikan.</li>';
    }
  }

  showStories(stories) {
    const list = document.getElementById('story-list');
    if (!list) return;

    list.innerHTML = stories
      .map(
        (story) => `
        <li class="story-item">
          <article class="story-card" tabindex="0" role="button"
                   data-id="${story.id}"
                   aria-label="Sorot lokasi cerita ${this.#escape(story.name)} di peta">
            <img class="story-thumb" src="${story.photoUrl}"
                 alt="Foto cerita dari ${this.#escape(story.name)}" loading="lazy" />
            <div class="story-body">
              <h3 class="story-name">${this.#escape(story.name)}</h3>
              <p class="story-date">
                <time datetime="${story.createdAt}">${showFormattedDate(story.createdAt)}</time>
              </p>
              <p class="story-desc">${this.#escape(story.description)}</p>
              <p class="story-coord">
                ${
                  story.lat !== null && story.lon !== null
                    ? `Lokasi: ${Number(story.lat).toFixed(3)}, ${Number(story.lon).toFixed(3)}`
                    : 'Lokasi tidak dicantumkan'
                }
              </p>
              <button type="button" class="btn btn-save" data-save="${story.id}">
                Simpan Offline
              </button>
            </div>
          </article>
        </li>`,
      )
      .join('');

    this.#bindSaveButtons(stories);
  }

  /** Create & delete IndexedDB langsung dari kartu cerita (kriteria 4). */
  async #bindSaveButtons(stories) {
    let savedIds = new Set();
    try {
      const saved = await getAllStories();
      savedIds = new Set(saved.map((item) => item.id));
    } catch (error) {
      console.warn('IndexedDB tidak dapat dibaca:', error.message);
    }

    document.querySelectorAll('[data-save]').forEach((button) => {
      const id = button.dataset.save;
      const story = stories.find((item) => item.id === id);

      const paint = (isSaved) => {
        button.textContent = isSaved ? 'Hapus dari Tersimpan' : 'Simpan Offline';
        button.classList.toggle('is-saved', isSaved);
      };

      paint(savedIds.has(id));

      button.addEventListener('click', async (event) => {
        event.stopPropagation();
        button.disabled = true;
        try {
          if (savedIds.has(id)) {
            await deleteStory(id);
            savedIds.delete(id);
            paint(false);
          } else {
            await putStory(story);
            savedIds.add(id);
            paint(true);
          }
        } catch (error) {
          this.showError(`Gagal menyimpan ke IndexedDB: ${error.message}`);
        } finally {
          button.disabled = false;
        }
      });
    });
  }

  showMap(stories) {
    const container = document.getElementById('map');
    if (!container) return;

    this.#map = createMap(container, { center: CONFIG.DEFAULT_LOCATION, zoom: 5 });

    stories.forEach((story) => {
      const marker = L.marker([story.lat, story.lon]).addTo(this.#map);
      marker.bindPopup(`
        <div class="popup">
          <strong>${this.#escape(story.name)}</strong><br />
          <img src="${story.photoUrl}" alt="Foto cerita dari ${this.#escape(story.name)}"
               style="width:150px;margin:.4rem 0;border-radius:6px" />
          <p style="margin:0">${this.#escape(story.description).slice(0, 90)}</p>
        </div>
      `);
      this.#markers.set(story.id, marker);
    });

    if (stories.length > 0) {
      this.#map.fitBounds(stories.map((s) => [s.lat, s.lon]), { padding: [40, 40] });
    }

    this.#bindListToMap();
  }

  /** Sinkronisasi list <-> peta: interaktivitas kriteria 2 (Skilled). */
  #bindListToMap() {
    const cards = document.querySelectorAll('.story-card');

    const focusStory = (card) => {
      const marker = this.#markers.get(card.dataset.id);
      if (!marker || !this.#map) return;

      cards.forEach((c) => c.classList.remove('is-active'));
      card.classList.add('is-active');

      this.#map.flyTo(marker.getLatLng(), 10, { duration: 0.6 });
      marker.openPopup();
    };

    cards.forEach((card) => {
      card.addEventListener('click', () => focusStory(card));
      card.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          focusStory(card);
        }
      });
    });
  }

  #escape(text = '') {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}
