import axios from 'axios';
import env from '@/environment';

export const api = axios.create({
  baseURL: env.API.URL,
  withCredentials: true,
});

export default api;
