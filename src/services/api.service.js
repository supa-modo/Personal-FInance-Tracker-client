import axios from 'axios';

/**
 * API service for handling all API requests
 */

// API base URL from environment variables
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Always send cookies with requests
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Always ensure withCredentials is set to true for all requests
    config.withCredentials = true;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle authentication errors
    if (error.response && error.response.status === 401) {
      // Clear user data from localStorage on auth errors
      localStorage.removeItem('user-personal-finance');
      
      // Only redirect to login if we're not already on the login page
      if (!window.location.pathname.includes('/login')) {
        console.log('Authentication error, redirecting to login');
        // Use a small delay to avoid redirect loops
        setTimeout(() => {
          window.location.href = '/login';
        }, 100);
      }
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;
export { API_URL };
