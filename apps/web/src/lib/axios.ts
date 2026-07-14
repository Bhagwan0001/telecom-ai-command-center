import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://telecom-ai-command-center-production.up.railway.app/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// --- Request Interceptor ---
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// --- Response Interceptor ---
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Placeholder: handle 401 token refresh logic here
    return Promise.reject(error);
  }
);

export { apiClient };
