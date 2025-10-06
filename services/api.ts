// Fix: Manually define types for `import.meta.env` to resolve TypeScript errors
// in environments where Vite's client types cannot be found. This makes the
// file self-sufficient and corrects the type information for environment variables.
interface ImportMetaEnv {
  readonly [key: string]: string | boolean | undefined;
  readonly VITE_API_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

import axios from 'axios';
import useAuthStore from '../store/authStore';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
});

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access, e.g., by logging out the user
      useAuthStore.getState().logout();
      window.location.hash = '/signin';
    }
    return Promise.reject(error);
  }
);

export default api;
