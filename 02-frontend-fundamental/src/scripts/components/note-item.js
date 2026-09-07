import { formatDate } from '../utils/format-date.js';

/**
 * <note-item note-id="..." note-title="..." note-body="..." created-at="..." archived>
 * Custom element untuk satu kartu catatan.
 * Custom attribute: note-id, note-title, note-body, created-at, archived.
 */
class NoteItem extends HTMLElement {
  static observedAttributes = [
    'note-id',
    'note-title',
    'note-body',
    'created-at',
    'archived',
  ];

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    if (this.isConnected) this.render();
  }

  get noteId() {
    return this.getAttribute('note-id') || '';
  }

  get noteTitle() {
    return this.getAttribute('note-title') || '(Tanpa judul)';
  }

  get noteBody() {
    return this.getAttribute('note-body') || '';
  }

  get createdAt() {
    return this.getAttribute('created-at') || '';
  }

  get archived() {
    return this.getAttribute('archived') === 'true';
  }

  render() {
    this.classList.add('note-item');
    this.innerHTML = '';

    const title = document.createElement('h3');
    title.classList.add('note-item__title');
    title.textContent = this.noteTitle;

    const date = document.createElement('p');
    date.classList.add('note-item__date');
    date.textContent = formatDate(this.createdAt);

    const body = document.createElement('p');
    body.classList.add('note-item__body');
    body.textContent = this.noteBody;

    const actions = document.createElement('div');
    actions.classList.add('note-item__actions');

    const archiveButton = document.createElement('button');
    archiveButton.type = 'button';
    archiveButton.classList.add('note-action', 'note-action--archive');
    archiveButton.textContent = this.archived ? 'Batal Arsip' : 'Arsipkan';
    archiveButton.addEventListener('click', () => {
      this.dispatchEvent(
        new CustomEvent('note-archive-toggle', {
          detail: { id: this.noteId, archived: this.archived },
          bubbles: true,
        }),
      );
    });

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.classList.add('note-action', 'note-action--delete');
    deleteButton.textContent = 'Hapus';
    deleteButton.addEventListener('click', () => {
      this.dispatchEvent(
        new CustomEvent('note-delete', {
          detail: { id: this.noteId, title: this.noteTitle },
          bubbles: true,
        }),
      );
    });

    actions.append(archiveButton, deleteButton);
    this.append(title, date, body, actions);
  }
}

customElements.define('note-item', NoteItem);
