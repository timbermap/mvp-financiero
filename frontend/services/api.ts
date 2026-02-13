// frontend/services/api.ts
import axios from 'axios';
import { auth } from '@/lib/firebase';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Interceptor: Se ejecuta antes de cada petición (request)
api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    // Obtenemos el token JWT fresco de Firebase
    const token = await user.getIdToken();
    // Lo pegamos en la cabecera Authorization
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;