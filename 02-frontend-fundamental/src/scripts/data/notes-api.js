/**
 * Pembungkus Dicoding Notes RESTful API v2.
 * Seluruh permintaan HTTP memakai Fetch API (kriteria wajib 4).
 */
const BASE_URL = 'https://notes-api.dicoding.dev/v2';

async function request(endpoint, options = {}) {
  let response;

  try {
    response = await fetch(`${BASE_URL}${endpoint}`, options);
  } catch (error) {
    // gagal di level jaringan (offline, DNS, CORS)
    throw new Error(
      'Tidak dapat terhubung ke server. Periksa koneksi internet Anda.',
    );
  }

  const responseJson = await response.json();

  if (!response.ok || responseJson.status !== 'success') {
    throw new Error(responseJson.message || 'Permintaan ke server gagal.');
  }

  return responseJson;
}

const NotesApi = {
  async getNotes() {
    const { data } = await request('/notes');
    return data;
  },

  async getArchivedNotes() {
    const { data } = await request('/notes/archived');
    return data;
  },

  async createNote({ title, body }) {
    const { data } = await request('/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, body }),
    });
    return data;
  },

  async deleteNote(id) {
    await request(`/notes/${id}`, { method: 'DELETE' });
  },

  async archiveNote(id) {
    await request(`/notes/${id}/archive`, { method: 'POST' });
  },

  async unarchiveNote(id) {
    await request(`/notes/${id}/unarchive`, { method: 'POST' });
  },
};

export default NotesApi;
