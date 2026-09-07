import { addStory } from '../../data/api';
import { isLoggedIn } from '../../utils/auth';
import { createMap, L } from '../../utils/map-helper';
import CONFIG from '../../config';
import AddStoryPresenter from './add-story-presenter';

export default class AddStoryPage {
  #presenter = null;
  #map = null;
  #marker = null;
  #stream = null;
  #photoBlob = null;
  #lat = null;
  #lon = null;

  async render() {
    return `
      <section class="container">
        <h1 class="page-title">Tambah Cerita</h1>
        <p class="page-subtitle">
          Bagikan ceritamu lengkap dengan foto dan lokasi.
        </p>

        <div id="add-alert" class="alert" role="alert" hidden></div>

        <form id="add-form" class="form form-add" novalidate>
          <div class="form-group">
            <label for="description">Deskripsi Cerita</label>
            <textarea id="description" name="description" rows="4" required
                      placeholder="Ceritakan pengalamanmu..."
                      aria-describedby="description-error"></textarea>
            <p class="field-error" id="description-error" role="alert"></p>
          </div>

          <fieldset class="form-group">
            <legend>Foto Cerita</legend>

            <div class="photo-actions">
              <label for="photo-input" class="btn btn-secondary">Pilih dari Berkas</label>
              <input type="file" id="photo-input" name="photo" accept="image/*"
                     class="visually-hidden" aria-describedby="photo-error" />

              <button type="button" id="camera-button" class="btn btn-secondary">
                Buka Kamera
              </button>
              <button type="button" id="capture-button" class="btn btn-secondary" hidden>
                Ambil Gambar
              </button>
              <button type="button" id="close-camera-button" class="btn btn-secondary" hidden>
                Tutup Kamera
              </button>
            </div>

            <p class="field-error" id="photo-error" role="alert"></p>

            <video id="camera-preview" class="camera-preview" autoplay playsinline
                   muted hidden aria-label="Pratinjau kamera"></video>
            <canvas id="camera-canvas" class="visually-hidden"></canvas>

            <img id="photo-preview" class="photo-preview" alt="Pratinjau foto cerita"
                 hidden />
          </fieldset>

          <div class="form-group">
            <label id="lokasi-label">Lokasi Cerita</label>
            <p class="map-hint" id="map-instruction">
              Klik pada peta untuk menentukan titik lokasi cerita.
            </p>
            <div id="add-map" class="map" role="application"
                 aria-labelledby="lokasi-label"
                 aria-describedby="map-instruction"></div>
            <p id="coord-display" class="coord-display" role="status" aria-live="polite">
              Belum ada lokasi dipilih.
            </p>
          </div>

          <button type="submit" id="submit-button" class="btn btn-primary">
            Kirim Cerita
          </button>
        </form>
      </section>
    `;
  }

  async afterRender() {
    if (!isLoggedIn()) {
      location.hash = '#/login';
      return;
    }

    this.#presenter = new AddStoryPresenter({ view: this, model: { addStory } });

    this.#setupMap();
    this.#setupPhotoInput();
    this.#setupCamera();
    this.#setupForm();

    // Tutup kamera saat berpindah halaman (media stream wajib dihentikan).
    window.addEventListener('hashchange', this.#stopCamera, { once: true });
    window.addEventListener('beforeunload', this.#stopCamera);
  }

  #setupMap() {
    const container = document.getElementById('add-map');
    this.#map = createMap(container, { center: CONFIG.DEFAULT_LOCATION, zoom: 5 });

    this.#map.on('click', (event) => {
      const { lat, lng } = event.latlng;
      this.#lat = lat;
      this.#lon = lng;

      if (this.#marker) {
        this.#marker.setLatLng([lat, lng]);
      } else {
        this.#marker = L.marker([lat, lng]).addTo(this.#map);
      }
      this.#marker.bindPopup('Lokasi cerita dipilih di sini.').openPopup();

      const display = document.getElementById('coord-display');
      if (display) {
        display.textContent = `Lokasi dipilih: ${lat.toFixed(5)}, ${lng.toFixed(5)}`;
      }
    });
  }

  #setupPhotoInput() {
    const input = document.getElementById('photo-input');
    input.addEventListener('change', () => {
      const file = input.files && input.files[0];
      if (!file) return;

      if (file.size > 1024 * 1024) {
        this.#setFieldError('photo', 'Ukuran foto maksimal 1 MB.');
        input.value = '';
        return;
      }

      this.#setFieldError('photo', '');
      this.#photoBlob = file;
      this.#showPreview(URL.createObjectURL(file));
      this.#stopCamera();
    });
  }

  #setupCamera() {
    const cameraButton = document.getElementById('camera-button');
    const captureButton = document.getElementById('capture-button');
    const closeButton = document.getElementById('close-camera-button');
    const video = document.getElementById('camera-preview');
    const canvas = document.getElementById('camera-canvas');

    cameraButton.addEventListener('click', async () => {
      try {
        this.#stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = this.#stream;
        video.hidden = false;
        captureButton.hidden = false;
        closeButton.hidden = false;
        cameraButton.hidden = true;
        this.#setFieldError('photo', '');
      } catch (error) {
        this.#setFieldError(
          'photo',
          'Tidak dapat mengakses kamera. Pastikan izin kamera diberikan.',
        );
      }
    });

    captureButton.addEventListener('click', () => {
      if (!this.#stream) return;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (!blob) return;
          this.#photoBlob = new File([blob], 'kamera.jpg', { type: 'image/jpeg' });
          this.#showPreview(URL.createObjectURL(blob));
          this.#stopCamera();
        },
        'image/jpeg',
        0.85,
      );
    });

    closeButton.addEventListener('click', () => this.#stopCamera());
  }

  /** Menghentikan seluruh track agar indikator kamera benar-benar mati. */
  #stopCamera = () => {
    if (this.#stream) {
      this.#stream.getTracks().forEach((track) => track.stop());
      this.#stream = null;
    }

    const video = document.getElementById('camera-preview');
    const cameraButton = document.getElementById('camera-button');
    const captureButton = document.getElementById('capture-button');
    const closeButton = document.getElementById('close-camera-button');

    if (video) {
      video.srcObject = null;
      video.hidden = true;
    }
    if (cameraButton) cameraButton.hidden = false;
    if (captureButton) captureButton.hidden = true;
    if (closeButton) closeButton.hidden = true;
  };

  #showPreview(url) {
    const preview = document.getElementById('photo-preview');
    if (!preview) return;
    preview.src = url;
    preview.hidden = false;
  }

  #setupForm() {
    const form = document.getElementById('add-form');
    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const description = document.getElementById('description').value.trim();
      let valid = true;

      this.#setFieldError('description', '');

      if (description.length < 5) {
        this.#setFieldError('description', 'Deskripsi minimal 5 karakter.');
        valid = false;
      }
      if (!this.#photoBlob) {
        this.#setFieldError('photo', 'Foto wajib dipilih atau diambil dari kamera.');
        valid = false;
      }
      if (!valid) return;

      await this.#presenter.submit({
        description,
        photo: this.#photoBlob,
        lat: this.#lat,
        lon: this.#lon,
      });
    });
  }

  #setFieldError(field, message) {
    const el = document.getElementById(`${field}-error`);
    if (el) el.textContent = message;
  }

  setSubmitting(isSubmitting) {
    const button = document.getElementById('submit-button');
    if (!button) return;
    button.disabled = isSubmitting;
    button.textContent = isSubmitting ? 'Mengirim...' : 'Kirim Cerita';
  }

  showError(message) {
    const el = document.getElementById('add-alert');
    if (!el) return;
    el.hidden = false;
    el.className = 'alert alert-error';
    el.textContent = message;
  }

  /** Cerita masuk antrean offline. */
  onQueued() {
    this.#stopCamera();
    const el = document.getElementById('add-alert');
    if (el) {
      el.hidden = false;
      el.className = 'alert alert-success';
      el.textContent =
        'Anda sedang offline. Cerita disimpan di perangkat dan akan dikirim otomatis saat koneksi kembali.';
    }
    setTimeout(() => {
      location.hash = '#/';
    }, 2000);
  }

  onSuccess() {
    this.#stopCamera();
    const el = document.getElementById('add-alert');
    if (el) {
      el.hidden = false;
      el.className = 'alert alert-success';
      el.textContent = 'Cerita berhasil dikirim! Mengalihkan ke beranda...';
    }
    setTimeout(() => {
      location.hash = '#/';
    }, 1200);
  }
}
