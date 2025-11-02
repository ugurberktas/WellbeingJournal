import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (username, email, password) =>
    api.post('/api/auth/register', { username, email, password }),
  login: (username, password) => {
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);
    return api.post('/api/auth/login', formData, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
  },
  getMe: () => api.get('/api/auth/me'),
};

export const entriesAPI = {
  getAll: () => api.get('/api/entries'),
  getOne: (id) => api.get(`/api/entries/${id}`),
  create: (title, content) => api.post('/api/entries', { title, content }),
  update: (id, title, content) => api.put(`/api/entries/${id}`, { title, content }),
  delete: (id) => api.delete(`/api/entries/${id}`),
  getSummary: () => api.get('/api/entries/stats/summary'),
};

export default api;

