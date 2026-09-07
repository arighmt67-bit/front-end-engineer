import { queueOutbox } from '../../data/database';

export default class AddStoryPresenter {
  #view;
  #model;

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }

  async submit({ description, photo, lat, lon }) {
    this.#view.setSubmitting(true);

    // Offline: simpan ke outbox IndexedDB, kirim otomatis saat online (Advanced).
    if (!navigator.onLine) {
      try {
        await queueOutbox({ description, photo, lat, lon });
        this.#view.onQueued();
      } catch (error) {
        this.#view.showError(`Gagal menyimpan cerita offline: ${error.message}`);
      } finally {
        this.#view.setSubmitting(false);
      }
      return;
    }

    try {
      await this.#model.addStory({ description, photo, lat, lon });
      this.#view.onSuccess();
    } catch (error) {
      // Jaringan sempat putus di tengah kirim -> jangan sampai cerita hilang.
      try {
        await queueOutbox({ description, photo, lat, lon });
        this.#view.onQueued();
      } catch {
        this.#view.showError(error.message);
      }
    } finally {
      this.#view.setSubmitting(false);
    }
  }
}
