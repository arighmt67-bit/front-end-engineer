import { LitElement, html } from 'lit';
import { storyService, authService } from '../api/api-service.js';

export class StoryForm extends LitElement {
  createRenderRoot() {
    return this;
  }

  static properties = {
    imagePreview: { type: String },
    loading: { type: Boolean },
    alertSuccess: { type: Boolean },
    errorMessage: { type: String },
  };

  constructor() {
    super();
    this.imagePreview = '';
    this.loading = false;
    this.alertSuccess = false;
    this.errorMessage = '';
    this.selectedFile = null;
  }

  connectedCallback() {
    super.connectedCallback();
    if (!authService.isAuthenticated()) {
      window.location.href = 'login.html';
    }
  }

  handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1024 * 1024) {
        this.errorMessage = 'Ukuran file foto maksimal adalah 1MB!';
        e.target.value = '';
        this.imagePreview = '';
        this.selectedFile = null;
        this.requestUpdate();
        return;
      }
      this.errorMessage = '';
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (event) => {
        this.imagePreview = event.target.result;
        this.requestUpdate();
      };
      reader.readAsDataURL(file);
    } else {
      this.imagePreview = '';
      this.selectedFile = null;
      this.requestUpdate();
    }
  }

  async handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    this.errorMessage = '';

    if (!form.checkValidity() || !this.selectedFile) {
      e.stopPropagation();
      form.classList.add('was-validated');
      if (!this.selectedFile) {
        this.errorMessage = 'Silakan pilih berkas gambar cerita Anda.';
      }
      return;
    }

    const description = form.elements['description'].value.trim();
    this.loading = true;

    try {
      await storyService.addStory({
        description,
        photo: this.selectedFile,
      });

      this.alertSuccess = true;
      form.reset();
      form.classList.remove('was-validated');
      this.imagePreview = '';
      this.selectedFile = null;
      this.requestUpdate();

      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1200);
    } catch (err) {
      this.errorMessage = err.message || 'Gagal menambahkan cerita. Pastikan Anda sudah login.';
    } finally {
      this.loading = false;
    }
  }

  render() {
    return html`
      <div class="form-card p-4 p-md-5 bg-white rounded-4 shadow-sm">
        ${this.alertSuccess ? html`
          <div class="alert alert-success alert-dismissible fade show rounded-4 shadow-sm mb-4" role="alert">
            <div class="d-flex align-items-center gap-2">
              <i class="bi bi-check-circle-fill fs-5"></i>
              <div>
                <strong>Berhasil!</strong> Cerita baru Anda berhasil diunggah ke Story API. Mengarahkan ke dasbor...
              </div>
            </div>
          </div>
        ` : ''}

        ${this.errorMessage ? html`
          <div class="alert alert-danger alert-dismissible fade show rounded-4 shadow-sm mb-4" role="alert">
            <div class="d-flex align-items-center gap-2">
              <i class="bi bi-exclamation-triangle-fill fs-5"></i>
              <div>${this.errorMessage}</div>
            </div>
            <button type="button" class="btn-close" @click="${() => { this.errorMessage = ''; }}" aria-label="Close"></button>
          </div>
        ` : ''}

        <form class="needs-validation" novalidate @submit="${this.handleSubmit}">
          <div class="row g-4">
            <div class="col-lg-5">
              <label for="photo" class="form-label fw-bold text-dark">
                Foto Cerita
              </label>
              
              <div class="image-preview-container mb-3 bg-light rounded-4 border d-flex align-items-center justify-content-center overflow-hidden" style="min-height: 240px; max-height: 300px;">
                ${this.imagePreview ? html`
                  <img src="${this.imagePreview}" alt="Pratinjau Foto" class="img-fluid w-100 h-100 object-fit-cover" />
                ` : html`
                  <div class="text-center p-4 text-muted">
                    <i class="bi bi-image fs-1 d-block mb-2 text-secondary"></i>
                    <span class="small fw-semibold">Pratinjau Foto Momen</span>
                    <p class="small text-muted mb-0 mt-1">Pilih foto format JPG/PNG (Maks 1MB)</p>
                  </div>
                `}
              </div>

              <input
                type="file"
                class="form-control"
                id="photo"
                name="photo"
                accept="image/*"
                required
                @change="${this.handleImageChange}"
                ?disabled="${this.loading}"
              />
              <div class="invalid-feedback">Pilih berkas foto yang valid (maks 1MB).</div>
            </div>

            <div class="col-lg-7 d-flex flex-column justify-content-between">
              <div>
                <div class="mb-4">
                  <label for="description" class="form-label fw-bold text-dark">
                    Deskripsi Cerita
                  </label>
                  <textarea
                    class="form-control"
                    id="description"
                    name="description"
                    rows="6"
                    placeholder="Ceritakan momen seru atau pengalaman menarik yang terjadi di foto ini..."
                    required
                    minlength="10"
                    ?disabled="${this.loading}"
                  ></textarea>
                  <div class="invalid-feedback">Tuliskan deskripsi cerita minimal 10 karakter.</div>
                </div>
              </div>

              <div class="d-flex gap-2 justify-content-end mt-4">
                <a href="index.html" class="btn btn-light px-4 py-2 rounded-pill fw-semibold border">
                  Batal
                </a>
                <button
                  type="submit"
                  class="btn btn-primary px-4 py-2 rounded-pill fw-semibold shadow-sm d-flex align-items-center gap-2"
                  ?disabled="${this.loading}"
                >
                  ${this.loading ? html`
                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    <span>Mengunggah...</span>
                  ` : html`
                    <i class="bi bi-cloud-arrow-up"></i>
                    <span>Bagikan Cerita</span>
                  `}
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
