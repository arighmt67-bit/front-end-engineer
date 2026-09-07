import { getAllStories, deleteStory } from '../../data/database';
import { showFormattedDate } from '../../utils';
import SavedPresenter from './saved-presenter';

export default class SavedPage {
  #presenter = null;

  async render() {
    return `
      <section class="container">
        <h1 class="page-title">Cerita Tersimpan</h1>
        <p class="page-subtitle">
          Cerita berikut disimpan di IndexedDB sehingga tetap dapat dibaca
          walau perangkat sedang offline.
        </p>

        <div id="saved-alert" class="alert" role="alert" hidden></div>

        <div class="filter-bar">
          <div class="form-group">
            <label for="saved-search">Cari cerita</label>
            <input type="search" id="saved-search" class="input"
                   placeholder="Ketik nama atau isi cerita..."
                   aria-describedby="saved-search-hint" />
            <p class="map-hint" id="saved-search-hint">
              Pencarian berlaku pada nama pembuat dan deskripsi cerita.
            </p>
          </div>

          <div class="form-group">
            <label for="saved-sort">Urutkan</label>
            <select id="saved-sort" class="input">
              <option value="newest">Terbaru disimpan</option>
              <option value="oldest">Terlama disimpan</option>
              <option value="name">Nama (A-Z)</option>
            </select>
          </div>
        </div>

        <div id="saved-loading" class="loading" role="status" aria-live="polite" hidden>
          <span class="spinner" aria-hidden="true"></span> Memuat data tersimpan...
        </div>

        <ul id="saved-list" class="story-list" aria-label="Daftar cerita tersimpan"></ul>
      </section>
    `;
  }

  async afterRender() {
    this.#presenter = new SavedPresenter({
      view: this,
      model: { getAllStories, deleteStory },
    });

    const search = document.getElementById('saved-search');
    const sort = document.getElementById('saved-sort');

    const onChange = () => this.#presenter.applyFilter(this.getFilterState());
    search.addEventListener('input', onChange);
    sort.addEventListener('change', onChange);

    await this.#presenter.loadStories();
  }

  getFilterState() {
    const search = document.getElementById('saved-search');
    const sort = document.getElementById('saved-sort');
    return {
      keyword: search ? search.value : '',
      sort: sort ? sort.value : 'newest',
    };
  }

  showLoading() {
    const el = document.getElementById('saved-loading');
    if (el) el.hidden = false;
  }

  hideLoading() {
    const el = document.getElementById('saved-loading');
    if (el) el.hidden = true;
  }

  showError(message) {
    const el = document.getElementById('saved-alert');
    if (!el) return;
    el.hidden = false;
    el.className = 'alert alert-error';
    el.textContent = message;
  }

  showInfo(message) {
    const el = document.getElementById('saved-alert');
    if (!el) return;
    el.hidden = false;
    el.className = 'alert alert-success';
    el.textContent = message;
  }

  showEmpty(isCompletelyEmpty) {
    const list = document.getElementById('saved-list');
    if (!list) return;
    list.innerHTML = `<li class="empty-state">${
      isCompletelyEmpty
        ? 'Belum ada cerita tersimpan. Tekan tombol "Simpan Offline" pada halaman beranda.'
        : 'Tidak ada cerita yang cocok dengan pencarian Anda.'
    }</li>`;
  }

  showStories(stories) {
    const list = document.getElementById('saved-list');
    if (!list) return;

    list.innerHTML = stories
      .map(
        (story) => `
        <li class="story-item">
          <article class="story-card">
            <img class="story-thumb" src="${story.photoUrl}"
                 alt="Foto cerita dari ${this.#escape(story.name)}" loading="lazy" />
            <div class="story-body">
              <h2 class="story-name">${this.#escape(story.name)}</h2>
              <p class="story-date">
                <time datetime="${story.createdAt}">${showFormattedDate(story.createdAt)}</time>
              </p>
              <p class="story-desc">${this.#escape(story.description)}</p>
              <button type="button" class="btn btn-danger" data-delete="${story.id}">
                Hapus dari Tersimpan
              </button>
            </div>
          </article>
        </li>`,
      )
      .join('');

    list.querySelectorAll('[data-delete]').forEach((button) => {
      button.addEventListener('click', () => {
        this.#presenter.removeStory(button.dataset.delete);
      });
    });
  }

  #escape(text = '') {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}
