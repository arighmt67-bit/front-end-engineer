/**
 * Presenter halaman "Cerita Tersimpan" (arsitektur MVP).
 * Mengelola data IndexedDB tanpa menyentuh DOM.
 */
export default class SavedPresenter {
  #view;
  #model;
  #stories = [];

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }

  async loadStories() {
    this.#view.showLoading();
    try {
      this.#stories = await this.#model.getAllStories();
      this.#render();
    } catch (error) {
      this.#view.showError(`Gagal membaca IndexedDB: ${error.message}`);
    } finally {
      this.#view.hideLoading();
    }
  }

  /** Interaktivitas kriteria 4 (Skilled): pencarian + pengurutan. */
  applyFilter({ keyword = '', sort = 'newest' } = {}) {
    this.#render({ keyword, sort });
  }

  #render({ keyword = '', sort = 'newest' } = {}) {
    const query = keyword.trim().toLowerCase();

    let result = this.#stories.filter((story) => {
      if (!query) return true;
      return (
        (story.name || '').toLowerCase().includes(query) ||
        (story.description || '').toLowerCase().includes(query)
      );
    });

    result = [...result].sort((a, b) => {
      if (sort === 'name') return (a.name || '').localeCompare(b.name || '');
      const timeA = new Date(a.savedAt || a.createdAt).getTime();
      const timeB = new Date(b.savedAt || b.createdAt).getTime();
      return sort === 'oldest' ? timeA - timeB : timeB - timeA;
    });

    if (result.length === 0) {
      this.#view.showEmpty(this.#stories.length === 0);
      return;
    }

    this.#view.showStories(result);
  }

  async removeStory(id) {
    try {
      await this.#model.deleteStory(id);
      this.#stories = this.#stories.filter((story) => story.id !== id);
      this.#view.showInfo('Cerita dihapus dari penyimpanan offline.');
      this.#render(this.#view.getFilterState());
    } catch (error) {
      this.#view.showError(`Gagal menghapus: ${error.message}`);
    }
  }
}
