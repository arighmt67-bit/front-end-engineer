/**
 * <note-counter label="catatan" total="0">
 * Custom element untuk menampilkan jumlah catatan.
 * Custom attribute: total, label -- perubahan attribute langsung merender ulang.
 */
class NoteCounter extends HTMLElement {
  static observedAttributes = ['total', 'label'];

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    if (this.isConnected) this.render();
  }

  get total() {
    const value = Number.parseInt(this.getAttribute('total'), 10);
    return Number.isNaN(value) ? 0 : value;
  }

  get label() {
    return this.getAttribute('label') || 'item';
  }

  render() {
    this.classList.add('note-counter');
    this.setAttribute('role', 'status');
    this.setAttribute('aria-live', 'polite');
    this.innerHTML = `
      <span class="note-counter__value">${this.total}</span>
      <span class="note-counter__label">${this.label}</span>
    `;
  }
}

customElements.define('note-counter', NoteCounter);
