import axios from 'axios';

/**
 * API service for handling all API requests
 */

// API base URL from environment variables
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

// Debug information for troubleshooting
console.log('API Service initialized with URL:', API_URL);
console.log('Running in environment:', import.meta.env.MODE);

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Always send cookies with requests
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Utility function to check if we're in production
const isProduction = () => {
  return import.meta.env.MODE === 'production' || 
         window.location.hostname !== 'localhost';
};

// Store token in memory (not accessible via JavaScript)
let inMemoryToken = null;

// Function to set the in-memory token
const setToken = (token) => {
  inMemoryToken = token;
  
  // Store in localStorage for persistence across page refreshes
  if (token) {
    localStorage.setItem('jwt-personal-finance', token);
    console.log('Token stored in localStorage and memory');
  } else {
    localStorage.removeItem('jwt-personal-finance');
    console.log('Token removed from localStorage and memory');
  }
};

// Function to get the in-memory token
const getToken = () => {
  // Try to restore from localStorage if not in memory
  if (!inMemoryToken) {
    inMemoryToken = localStorage.getItem('jwt-personal-finance');
    if (inMemoryToken) {
      console.log('Token restored from localStorage');
    }
  }
  return inMemoryToken;
};

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Always ensure withCredentials is set to true for all requests
    config.withCredentials = true;
    
    // Add token to Authorization header for all requests
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    // Check for token in response and store it in memory
    if (response.data && response.data.token) {
      setToken(response.data.token);
      console.log('Token received and stored in memory');
    }
    return response;
  },
  (error) => {
    // Handle authentication errors
    if (error.response && error.response.status === 401) {
      console.error('Authentication error:', error.response.data);
      
      // Clear user data and token
      localStorage.removeItem('user-personal-finance');
      if (!isProduction()) {
        localStorage.removeItem('auth-token-dev');
      }
      inMemoryToken = null;
      
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
export { API_URL, setToken, getToken };

