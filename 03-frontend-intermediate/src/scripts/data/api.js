import CONFIG from '../config';
import { getAccessToken } from '../utils/auth';

const ENDPOINTS = {
  REGISTER: `${CONFIG.BASE_URL}/register`,
  LOGIN: `${CONFIG.BASE_URL}/login`,
  STORIES: `${CONFIG.BASE_URL}/stories`,
  SUBSCRIBE: `${CONFIG.BASE_URL}/notifications/subscribe`,
};

function authHeader() {
  return { Authorization: `Bearer ${getAccessToken()}` };
}

async function parseResponse(response) {
  const json = await response.json();
  if (!response.ok || json.error) {
    throw new Error(json.message || `Permintaan gagal (HTTP ${response.status}).`);
  }
  return json;
}

export async function register({ name, email, password }) {
  const response = await fetch(ENDPOINTS.REGISTER, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  return parseResponse(response);
}

export async function login({ email, password }) {
  const response = await fetch(ENDPOINTS.LOGIN, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return parseResponse(response);
}

export async function getStories({ page = 1, size = 20, location = 1 } = {}) {
  const url = `${ENDPOINTS.STORIES}?page=${page}&size=${size}&location=${location}`;
  const response = await fetch(url, { headers: authHeader() });
  return parseResponse(response);
}

export async function addStory({ description, photo, lat, lon }) {
  const formData = new FormData();
  formData.append('description', description);
  formData.append('photo', photo);
  if (lat !== null && lat !== undefined) formData.append('lat', lat);
  if (lon !== null && lon !== undefined) formData.append('lon', lon);

  const response = await fetch(ENDPOINTS.STORIES, {
    method: 'POST',
    headers: authHeader(),
    body: formData,
  });
  return parseResponse(response);
}

/* ---------- Web Push ---------- */

export async function subscribePushNotification({ endpoint, keys }) {
  const response = await fetch(ENDPOINTS.SUBSCRIBE, {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ endpoint, keys }),
  });
  return parseResponse(response);
}

export async function unsubscribePushNotification({ endpoint }) {
  const response = await fetch(ENDPOINTS.SUBSCRIBE, {
    method: 'DELETE',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ endpoint }),
  });
  return parseResponse(response);
}
