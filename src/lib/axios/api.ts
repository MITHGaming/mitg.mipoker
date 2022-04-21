import axios from 'axios';
import env from '@/environment';

export const api = axios.create({
  baseURL: env.API.URL,
});

export default api;
