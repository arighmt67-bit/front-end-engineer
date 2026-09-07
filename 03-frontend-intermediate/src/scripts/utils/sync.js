import { getAllOutbox, deleteOutbox, countOutbox } from '../data/database';
import { addStory } from '../data/api';
import { isLoggedIn } from './auth';

/**
 * Sinkronisasi kriteria 4 (Advanced).
 * Cerita yang dibuat saat offline disimpan di IndexedDB (outbox),
 * lalu dikirim otomatis ke API begitu koneksi kembali online.
 */
let isSyncing = false;

export async function pendingCount() {
  try {
    return await countOutbox();
  } catch {
    return 0;
  }
}

export async function syncOutbox() {
  if (isSyncing || !navigator.onLine || !isLoggedIn()) return { sent: 0, failed: 0 };

  isSyncing = true;
  let sent = 0;
  let failed = 0;

  try {
    const entries = await getAllOutbox();

    for (const entry of entries) {
      try {
        await addStory({
          description: entry.description,
          photo: entry.photo,
          lat: entry.lat,
          lon: entry.lon,
        });
        await deleteOutbox(entry.id);
        sent += 1;
      } catch (error) {
        failed += 1;
      }
    }
  } finally {
    isSyncing = false;
  }

  if (sent > 0) {
    document.dispatchEvent(new CustomEvent('outbox-synced', { detail: { sent } }));
  }

  return { sent, failed };
}

/** Dipanggil sekali dari index.js. */
export function initAutoSync() {
  window.addEventListener('online', () => {
    syncOutbox();
  });

  if (navigator.onLine) {
    syncOutbox();
  }
}
