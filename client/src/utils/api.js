import axios from 'axios';
import { getToken } from './auth';

const api = axios.create({
  baseURL: 'https://job-backend-y1l8.vercel.app/api/'
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
