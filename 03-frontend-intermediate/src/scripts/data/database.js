import CONFIG from '../config';

/**
 * Pembungkus IndexedDB tanpa dependensi eksternal.
 * Dua object store:
 *  - saved-stories : cerita yang disimpan pengguna (create, read, delete)
 *  - outbox        : cerita yang dibuat saat offline, menunggu sinkronisasi
 */
function openDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(CONFIG.DATABASE_NAME, CONFIG.DATABASE_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;

      if (!db.objectStoreNames.contains(CONFIG.STORE_SAVED)) {
        const store = db.createObjectStore(CONFIG.STORE_SAVED, { keyPath: 'id' });
        store.createIndex('name', 'name', { unique: false });
        store.createIndex('savedAt', 'savedAt', { unique: false });
      }

      if (!db.objectStoreNames.contains(CONFIG.STORE_OUTBOX)) {
        db.createObjectStore(CONFIG.STORE_OUTBOX, {
          keyPath: 'id',
          autoIncrement: true,
        });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function runTransaction(storeName, mode, executor) {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, mode);
    const store = transaction.objectStore(storeName);
    let result;

    try {
      result = executor(store);
    } catch (error) {
      reject(error);
      return;
    }

    transaction.oncomplete = () => {
      db.close();
      resolve(result && result.result !== undefined ? result.result : result);
    };
    transaction.onerror = () => {
      db.close();
      reject(transaction.error);
    };
  });
}

/* ---------- saved-stories: create, read, delete ---------- */

export async function putStory(story) {
  return runTransaction(CONFIG.STORE_SAVED, 'readwrite', (store) =>
    store.put({ ...story, savedAt: story.savedAt || new Date().toISOString() }),
  );
}

export async function getAllStories() {
  return runTransaction(CONFIG.STORE_SAVED, 'readonly', (store) => store.getAll());
}

export async function getStoryById(id) {
  return runTransaction(CONFIG.STORE_SAVED, 'readonly', (store) => store.get(id));
}

export async function deleteStory(id) {
  return runTransaction(CONFIG.STORE_SAVED, 'readwrite', (store) => store.delete(id));
}

/* ---------- outbox: antrean sinkronisasi offline -> online ---------- */

export async function queueOutbox(entry) {
  return runTransaction(CONFIG.STORE_OUTBOX, 'readwrite', (store) =>
    store.add({ ...entry, queuedAt: new Date().toISOString() }),
  );
}

export async function getAllOutbox() {
  return runTransaction(CONFIG.STORE_OUTBOX, 'readonly', (store) => store.getAll());
}

export async function deleteOutbox(id) {
  return runTransaction(CONFIG.STORE_OUTBOX, 'readwrite', (store) => store.delete(id));
}

export async function countOutbox() {
  return runTransaction(CONFIG.STORE_OUTBOX, 'readonly', (store) => store.count());
}
