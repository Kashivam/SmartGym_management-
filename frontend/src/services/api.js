import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' },
});

// Attach token on every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('apexgym_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const authService = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
};

export const membershipService = {
  getPlans: () => api.get('/memberships/plans'),
  purchase: (plan) => api.post('/memberships/purchase', { plan }),
  getMy: () => api.get('/memberships/my'),
};

export const bookingService = {
  getSlots: (day) => api.get(`/bookings/slots?day=${day}`),
  book: (data) => api.post('/bookings', data),
  cancel: (id) => api.delete(`/bookings/${id}`),
  getMyBookings: () => api.get('/bookings/my'),
};

export const trainerService = {
  getAll: () => api.get('/trainers'),
};

export const userService = {
  getDashboard: () => api.get('/users/dashboard'),
};

export default api;
