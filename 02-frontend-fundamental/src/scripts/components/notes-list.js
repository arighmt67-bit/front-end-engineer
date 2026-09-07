import './note-item.js';

/**
 * <notes-list empty-message="...">
 * Custom element wadah daftar catatan. Layout memakai CSS Grid.
 * Custom attribute: empty-message (pesan saat daftar kosong).
 */
class NotesList extends HTMLElement {
  static observedAttributes = ['empty-message'];

  constructor() {
    super();
    this._notes = [];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    if (this.isConnected) this.render();
  }

  get emptyMessage() {
    return this.getAttribute('empty-message') || 'Belum ada catatan.';
  }

  /** Setter data: dipanggil dari index.js setelah data API diterima */
  set notes(value) {
    this._notes = Array.isArray(value) ? value : [];
    this.render();
  }

  get notes() {
    return this._notes;
  }

  render() {
    this.innerHTML = '';

    if (this._notes.length === 0) {
      const empty = document.createElement('p');
      empty.classList.add('notes-empty');
      empty.textContent = this.emptyMessage;
      this.append(empty);
      return;
    }

    const grid = document.createElement('div');
    grid.classList.add('notes-grid');
    grid.setAttribute('role', 'list');

    this._notes.forEach((note) => {
      const item = document.createElement('note-item');
      item.setAttribute('role', 'listitem');
      item.setAttribute('note-id', note.id);
      item.setAttribute('note-title', note.title);
      item.setAttribute('note-body', note.body);
      item.setAttribute('created-at', note.createdAt);
      item.setAttribute('archived', String(Boolean(note.archived)));
      grid.append(item);
    });

    this.append(grid);
  }
}

customElements.define('notes-list', NotesList);
