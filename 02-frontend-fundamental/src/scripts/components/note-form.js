/**
 * <note-form max-title-length="50" min-body-length="10" submit-label="...">
 * Custom element formulir tambah catatan.
 *
 * Custom attribute:
 *   - max-title-length : batas maksimum karakter judul
 *   - min-body-length  : minimum karakter isi catatan
 *   - submit-label     : teks tombol submit
 *
 * Realtime validation: pesan kesalahan muncul saat pengguna MENGETIK
 * (event `input`), bukan saat tombol submit diklik.
 */
class NoteForm extends HTMLElement {
  static observedAttributes = [
    'max-title-length',
    'min-body-length',
    'submit-label',
  ];

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    if (this.isConnected) this.render();
  }

  get maxTitleLength() {
    const value = Number.parseInt(this.getAttribute('max-title-length'), 10);
    return Number.isNaN(value) ? 50 : value;
  }

  get minBodyLength() {
    const value = Number.parseInt(this.getAttribute('min-body-length'), 10);
    return Number.isNaN(value) ? 10 : value;
  }

  get submitLabel() {
    return this.getAttribute('submit-label') || 'Simpan Catatan';
  }

  render() {
    this.innerHTML = `
      <form class="note-form" novalidate>
        <div class="form-field" data-field="title">
          <label for="note-title">Judul Catatan</label>
          <input
            id="note-title"
            name="title"
            type="text"
            placeholder="Contoh: Rencana belajar pekan ini"
            maxlength="${this.maxTitleLength}"
            autocomplete="off"
            required
            aria-describedby="title-validation"
          />
          <div class="field-meta">
            <p class="validation-message" id="title-validation" aria-live="polite"></p>
            <span class="char-counter" data-counter="title">0/${this.maxTitleLength}</span>
          </div>
        </div>

        <div class="form-field" data-field="body">
          <label for="note-body">Isi Catatan</label>
          <textarea
            id="note-body"
            name="body"
            placeholder="Tuliskan detail catatanmu di sini..."
            required
            aria-describedby="body-validation"
          ></textarea>
          <div class="field-meta">
            <p class="validation-message" id="body-validation" aria-live="polite"></p>
            <span class="char-counter" data-counter="body">0 karakter</span>
          </div>
        </div>

        <button type="submit" class="submit-button" disabled>${this.submitLabel}</button>
      </form>
    `;

    this._form = this.querySelector('form');
    this._titleInput = this.querySelector('#note-title');
    this._bodyInput = this.querySelector('#note-body');
    this._submitButton = this.querySelector('.submit-button');

    this._attachListeners();
  }

  _attachListeners() {
    // realtime: divalidasi setiap ketikan
    this._titleInput.addEventListener('input', () => {
      this._validateTitle();
      this._refreshSubmitState();
    });

    this._bodyInput.addEventListener('input', () => {
      this._validateBody();
      this._refreshSubmitState();
    });

    // blur juga divalidasi supaya field kosong yang ditinggalkan tetap ditandai
    this._titleInput.addEventListener('blur', () => this._validateTitle());
    this._bodyInput.addEventListener('blur', () => this._validateBody());

    this._form.addEventListener('submit', (event) => {
      event.preventDefault();

      const titleValid = this._validateTitle();
      const bodyValid = this._validateBody();
      if (!titleValid || !bodyValid) {
        this._refreshSubmitState();
        return;
      }

      this.dispatchEvent(
        new CustomEvent('note-submit', {
          detail: {
            title: this._titleInput.value.trim(),
            body: this._bodyInput.value.trim(),
          },
          bubbles: true,
        }),
      );

      this._resetForm();
    });
  }

  _validateTitle() {
    const field = this.querySelector('[data-field="title"]');
    const message = field.querySelector('.validation-message');
    const counter = field.querySelector('[data-counter="title"]');
    const value = this._titleInput.value;
    const trimmed = value.trim();

    counter.textContent = `${value.length}/${this.maxTitleLength}`;
    counter.classList.toggle('is-over', value.length >= this.maxTitleLength);

    let error = '';
    if (trimmed.length === 0) {
      error =
        value.length === 0
          ? 'Judul catatan wajib diisi.'
          : 'Judul tidak boleh hanya spasi.';
    } else if (trimmed.length < 3) {
      error = 'Judul minimal 3 karakter.';
    }

    return this._applyState(field, message, error, value.length > 0);
  }

  _validateBody() {
    const field = this.querySelector('[data-field="body"]');
    const message = field.querySelector('.validation-message');
    const counter = field.querySelector('[data-counter="body"]');
    const value = this._bodyInput.value;
    const trimmed = value.trim();

    counter.textContent = `${value.length} karakter`;

    let error = '';
    if (trimmed.length === 0) {
      error =
        value.length === 0
          ? 'Isi catatan wajib diisi.'
          : 'Isi catatan tidak boleh hanya spasi.';
    } else if (trimmed.length < this.minBodyLength) {
      error = `Isi catatan minimal ${this.minBodyLength} karakter (saat ini ${trimmed.length}).`;
    }

    return this._applyState(field, message, error, value.length > 0);
  }

  _applyState(field, messageElement, error, isTouched) {
    messageElement.textContent = error;
    field.classList.toggle('is-invalid', Boolean(error) && isTouched);
    field.classList.toggle('is-valid', !error && isTouched);
    return error === '';
  }

  _refreshSubmitState() {
    const titleFilled = this._titleInput.value.trim().length >= 3;
    const bodyFilled =
      this._bodyInput.value.trim().length >= this.minBodyLength;
    this._submitButton.disabled = !(titleFilled && bodyFilled);
  }

  _resetForm() {
    this._form.reset();
    this.querySelectorAll('.form-field').forEach((field) => {
      field.classList.remove('is-valid', 'is-invalid');
      field.querySelector('.validation-message').textContent = '';
    });
    this.querySelector('[data-counter="title"]').textContent =
      `0/${this.maxTitleLength}`;
    this.querySelector('[data-counter="title"]').classList.remove('is-over');
    this.querySelector('[data-counter="body"]').textContent = '0 karakter';
    this._submitButton.disabled = true;
    this._titleInput.focus();
  }
}

customElements.define('note-form', NoteForm);
