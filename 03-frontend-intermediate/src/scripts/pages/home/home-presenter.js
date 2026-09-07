/**
 * Presenter (arsitektur MVP) - kriteria 1 Advance.
 * Tidak menyentuh DOM sama sekali; hanya mengatur alur data dari model ke view.
 */
export default class HomePresenter {
  #view;
  #model;

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }

  async loadStories() {
    this.#view.showLoading();
    try {
      const response = await this.#model.getStories({ location: 1, size: 30 });
      const stories = response.listStory || [];

      if (stories.length === 0) {
        this.#view.showEmpty();
        return;
      }

      this.#view.showStories(stories);
      this.#view.showMap(stories.filter((s) => s.lat !== null && s.lon !== null));
    } catch (error) {
      this.#view.showError(error.message);
    } finally {
      this.#view.hideLoading();
    }
  }
}
