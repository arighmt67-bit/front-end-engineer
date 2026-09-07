export default class AuthPresenter {
  #view;
  #model;

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }

  async login({ email, password }) {
    this.#view.setSubmitting(true);
    try {
      const result = await this.#model.login({ email, password });
      this.#view.onLoginSuccess(result.loginResult);
    } catch (error) {
      this.#view.showError(error.message);
    } finally {
      this.#view.setSubmitting(false);
    }
  }

  async register({ name, email, password }) {
    this.#view.setSubmitting(true);
    try {
      await this.#model.register({ name, email, password });
      this.#view.onRegisterSuccess();
    } catch (error) {
      this.#view.showError(error.message);
    } finally {
      this.#view.setSubmitting(false);
    }
  }
}
