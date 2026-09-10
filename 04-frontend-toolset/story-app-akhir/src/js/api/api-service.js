import axios from 'axios';

const BASE_URL = 'https://story-api.dicoding.dev/v1';

// Saran 3: Dedicated Axios Instance with custom configuration
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor to automatically attach Bearer token if present
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('story_auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor for centralized error extraction
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    let errorMessage = 'Terjadi kesalahan pada server. Coba beberapa saat lagi.';
    if (error.response && error.response.data && error.response.data.message) {
      errorMessage = error.response.data.message;
    } else if (error.message) {
      errorMessage = error.message;
    }
    const customError = new Error(errorMessage);
    customError.status = error.response ? error.response.status : 500;
    return Promise.reject(customError);
  }
);

export const authService = {
  async register({ name, email, password }) {
    const response = await apiClient.post('/register', { name, email, password });
    return response.data;
  },

  async login({ email, password }) {
    const response = await apiClient.post('/login', { email, password });
    if (response.data && response.data.loginResult) {
      const { token, name, userId } = response.data.loginResult;
      localStorage.setItem('story_auth_token', token);
      localStorage.setItem('story_auth_user', JSON.stringify({ name, userId, email }));
    }
    return response.data;
  },

  logout() {
    localStorage.removeItem('story_auth_token');
    localStorage.removeItem('story_auth_user');
    window.location.href = 'login.html';
  },

  getToken() {
    return localStorage.getItem('story_auth_token');
  },

  getUser() {
    try {
      return JSON.parse(localStorage.getItem('story_auth_user') || 'null');
    } catch {
      return null;
    }
  },

  isAuthenticated() {
    return Boolean(this.getToken());
  },
};

export const storyService = {
  async getAllStories({ page = 1, size = 20, location = 0 } = {}) {
    const response = await apiClient.get('/stories', {
      params: { page, size, location },
    });
    return response.data;
  },

  async getStoryDetail(id) {
    const response = await apiClient.get(`/stories/${id}`);
    return response.data;
  },

  async addStory({ description, photo, lat, lon }) {
    const formData = new FormData();
    formData.append('description', description);
    formData.append('photo', photo);
    if (lat !== undefined && lat !== null && lat !== '') {
      formData.append('lat', lat);
    }
    if (lon !== undefined && lon !== null && lon !== '') {
      formData.append('lon', lon);
    }

    const response = await apiClient.post('/stories', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

export default apiClient;
