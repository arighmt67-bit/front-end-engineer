/**
 * Entry point aplikasi (di-bundel oleh webpack).
 * Seluruh custom element diimpor DI SINI setelah masing-masing berkas
 * memanggil customElements.define(). Tanpa impor ini custom element
 * tidak akan ter-upgrade dan halaman tampak kosong.
 */
import '../styles/style.css';

import Swal from 'sweetalert2';
import anime from 'animejs/lib/anime.es.js';

import './components/app-bar.js';
import './components/note-counter.js';
import './components/note-form.js';
import './components/notes-list.js';
import './components/loading-indicator.js';

import NotesApi from './data/notes-api.js';

const notesListElement = document.querySelector('notes-list');
const noteFormElement = document.querySelector('note-form');
const noteCounterElement = document.querySelector('note-counter');
const loadingElement = document.querySelector('loading-indicator');
const tabButtons = document.querySelectorAll('.tab-button');

let currentView = 'active';

function showLoading(message) {
  loadingElement.show(message);
  notesListElement.hidden = true;
}

function hideLoading() {
  loadingElement.hide();
  notesListElement.hidden = false;
}

function showError(error) {
  Swal.fire({
    icon: 'error',
    title: 'Terjadi Kesalahan',
    text: error.message || 'Permintaan ke server gagal.',
    confirmButtonColor: '#00adb5',
  });
}

function showSuccess(title) {
  Swal.fire({
    icon: 'success',
    title,
    showConfirmButton: false,
    timer: 1400,
    timerProgressBar: true,
  });
}

/** Animasi kemunculan kartu catatan (kriteria opsional 3). */
function animateNotes() {
  const cards = notesListElement.querySelectorAll('note-item');
  if (cards.length === 0) return;

  anime({
    targets: cards,
    translateY: [18, 0],
    opacity: [0, 1],
    delay: anime.stagger(45),
    duration: 480,
    easing: 'easeOutCubic',
  });
}

async function renderNotes() {
  showLoading(
    currentView === 'archived'
      ? 'Memuat catatan arsip...'
      : 'Memuat catatan dari server...',
  );

  try {
    const notes =
      currentView === 'archived'
        ? await NotesApi.getArchivedNotes()
        : await NotesApi.getNotes();

    // catatan terbaru tampil paling atas
    const sorted = [...notes].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    );

    notesListElement.setAttribute(
      'empty-message',
      currentView === 'archived'
        ? 'Belum ada catatan yang diarsipkan.'
        : 'Belum ada catatan. Tulis catatan pertamamu di formulir sebelah.',
    );
    notesListElement.notes = sorted;
    noteCounterElement.setAttribute('total', String(sorted.length));
    animateNotes();
  } catch (error) {
    notesListElement.notes = [];
    noteCounterElement.setAttribute('total', '0');
    showError(error);
  } finally {
    hideLoading();
  }
}

noteFormElement.addEventListener('note-submit', async (event) => {
  const { title, body } = event.detail;

  showLoading('Menyimpan catatan...');
  try {
    await NotesApi.createNote({ title, body });
    showSuccess('Catatan berhasil disimpan');
    currentView = 'active';
    syncTabState();
    await renderNotes();
  } catch (error) {
    showError(error);
    hideLoading();
  }
});

document.addEventListener('note-delete', async (event) => {
  const { id, title } = event.detail;

  const confirmation = await Swal.fire({
    icon: 'warning',
    title: 'Hapus catatan?',
    text: `"${title}" akan dihapus permanen.`,
    showCancelButton: true,
    confirmButtonText: 'Ya, hapus',
    cancelButtonText: 'Batal',
    confirmButtonColor: '#e05263',
    cancelButtonColor: '#393e46',
  });

  if (!confirmation.isConfirmed) return;

  showLoading('Menghapus catatan...');
  try {
    await NotesApi.deleteNote(id);
    showSuccess('Catatan berhasil dihapus');
    await renderNotes();
  } catch (error) {
    showError(error);
    hideLoading();
  }
});

document.addEventListener('note-archive-toggle', async (event) => {
  const { id, archived } = event.detail;

  showLoading(
    archived ? 'Mengembalikan catatan...' : 'Mengarsipkan catatan...',
  );
  try {
    if (archived) {
      await NotesApi.unarchiveNote(id);
      showSuccess('Catatan dikembalikan dari arsip');
    } else {
      await NotesApi.archiveNote(id);
      showSuccess('Catatan berhasil diarsipkan');
    }
    await renderNotes();
  } catch (error) {
    showError(error);
    hideLoading();
  }
});

function syncTabState() {
  tabButtons.forEach((button) => {
    const isActive = button.dataset.view === currentView;
    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-selected', String(isActive));
  });
}

tabButtons.forEach((button) => {
  button.addEventListener('click', async () => {
    if (button.dataset.view === currentView) return;
    currentView = button.dataset.view;
    syncTabState();
    await renderNotes();
  });
});

renderNotes();
