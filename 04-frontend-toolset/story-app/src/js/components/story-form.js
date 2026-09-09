import { LitElement, html } from 'lit';
import { t } from '../localization/i18n.js';

export class StoryForm extends LitElement {
  createRenderRoot() {
    return this;
  }

  static properties = {
    imagePreview: { type: String },
    validated: { type: Boolean },
    alertSuccess: { type: Boolean },
  };

  constructor() {
    super();
    this.imagePreview = '';
    this.validated = false;
    this.alertSuccess = false;
  }

  handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        this.imagePreview = event.target.result;
        this.requestUpdate();
      };
      reader.readAsDataURL(file);
    } else {
      this.imagePreview = '';
      this.requestUpdate();
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = e.target;

    if (!form.checkValidity()) {
      e.stopPropagation();
      this.validated = true;
      form.classList.add('was-validated');
      return;
    }

    const description = form.elements['description'].value;
    const newStory = {
      id: `story-${Date.now()}`,
      name: 'Ari Rahmat (You)',
      description: description,
      photoUrl: this.imagePreview || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600',
      createdAt: new Date().toISOString(),
      lat: -6.2088,
      lon: 106.8456
    };

    const savedStories = JSON.parse(localStorage.getItem('custom_stories') || '[]');
    savedStories.unshift(newStory);
    localStorage.setItem('custom_stories', JSON.stringify(savedStories));

    this.alertSuccess = true;
    form.reset();
    form.classList.remove('was-validated');
    this.imagePreview = '';
    this.requestUpdate();

    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1200);
  }

  render() {
    return html`
      <div class="form-card p-4 p-md-5">
        ${this.alertSuccess ? html`
          <div class="alert alert-success alert-dismissible fade show rounded-4 shadow-sm mb-4" role="alert">
            <div class="d-flex align-items-center gap-2">
              <div>
                <strong>Berhasil!</strong> ${t('successAlert')} Mengarahkan ke dasbor...
              </div>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
        ` : ''}

        <form class="needs-validation" novalidate @submit="${this.handleSubmit}">
          <div class="row g-4">
            <div class="col-lg-5">
              <label for="photo" class="form-label fw-bold text-dark">
                ${t('formPhoto')}
              </label>
              
              <div class="image-preview-container mb-3">
                ${this.imagePreview ? html`
                  <img src="${this.imagePreview}" alt="${t('previewText')}" />
                ` : html`
                  <div class="text-center p-3 text-muted">
                    <span class="small fw-semibold">${t('previewText')}</span>
                  </div>
                `}
              </div>

              <input
                type="file"
                class="form-control form-control-lg fs-6 rounded-3"
                id="photo"
                name="photo"
                accept="image/png, image/jpeg, image/webp"
                required
                @change="${this.handleImageChange}"
              />
              <div class="invalid-feedback">
                ${t('formPhotoInvalid')}
              </div>
              <div class="form-text small mt-2">
                ${t('formPhotoHelp')}
              </div>
            </div>

            <div class="col-lg-7 d-flex flex-column justify-content-between">
              <div>
                <label for="description" class="form-label fw-bold text-dark">
                  ${t('formDescription')}
                </label>
                <textarea
                  class="form-control form-control-lg fs-6 rounded-3"
                  id="description"
                  name="description"
                  rows="8"
                  placeholder="${t('formDescriptionPlaceholder')}"
                  required
                  minlength="10"
                ></textarea>
                <div class="invalid-feedback">
                  ${t('formDescriptionInvalid')}
                </div>
                <div class="form-text small mt-2">
                  Minimal 10 karakter untuk menjelaskan cerita momen ini.
                </div>
              </div>

              <div class="d-flex align-items-center justify-content-end gap-2 mt-4 pt-3 border-top">
                <a href="index.html" class="btn btn-outline-secondary btn-lg fs-6 rounded-pill px-4">
                  ${t('cancelButton')}
                </a>
                <button type="submit" class="btn btn-primary btn-lg fs-6 rounded-pill px-5 shadow-sm">
                  ${t('submitButton')}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    `;
  }
}
customElements.define('story-form', StoryForm);
