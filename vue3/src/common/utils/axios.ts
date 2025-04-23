import config from '@/config';

import axios from 'axios';
import { useCustomizerStore } from '@/common/stores/customizer';
import { useAuthStore } from '@/common/stores/auth';
const axiosServices = axios.create({
  baseURL: config.apiUrl,
  withCredentials: false,
  headers: {
    'content-Type': 'application/json',
    'Access-Control-Expose-Headers': 'Access-Token'
  }
});
axiosServices.interceptors.request.use(
  (config) => {
    const customizer = useCustomizerStore();
    customizer.error_message = '';

    customizer.loading = true;

    const token = localStorage.getItem('token');
    if (token) {
      config.headers!['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// interceptor for http
axiosServices.interceptors.response.use(
  (response) => {
    const customizer = useCustomizerStore();
    customizer.loading = false;

    return response;
  },
  async (error) => {
    console.log('error', error.response);
    const customizer = useCustomizerStore();
    customizer.loading = false;
    customizer.error_message = error.response.data || 'error';
    if (error.response.status === 401) {
      const authStore = useAuthStore();
      await authStore.logout();
    }
    return Promise.reject((error.response && error.response.data) || 'Wrong Services');
  }
);

export default axiosServices;
