import axios from "axios";

// API base URL from environment variables or default
export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

// User storage key
export const USER_KEY = "user-personal-finance";

// Configure axios to include credentials (cookies) for all requests
axios.defaults.withCredentials = true;

// Enable debug logging based on environment variable
export const ENABLE_DEBUG_LOGGING = import.meta.env.VITE_ENABLE_DEBUG_LOGGING === "true";

// Create axios instance with auth interceptors
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000, // 15 seconds
});

// Configure axios to include credentials (cookies)
apiClient.defaults.withCredentials = true;

// Add request interceptor for authentication
apiClient.interceptors.request.use(
  (config) => {
    // We don't need to add an Authorization header because the JWT token
    // is already being sent in the HTTP-only cookie by the browser automatically
    // when withCredentials is set to true
    
    // Debug logging
    if (ENABLE_DEBUG_LOGGING) {
      console.debug(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    }
    
    return config;
  },
  (error) => {
    console.error("API Request Error:", error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    // Debug logging
    if (ENABLE_DEBUG_LOGGING) {
      console.debug(`API Response: ${response.status} ${response.config.url}`);
    }
    return response;  
  },
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code that falls out of the range of 2xx
      if (ENABLE_DEBUG_LOGGING) {
        console.error(
          `API Error ${error.response.status}: ${error.response.data?.message || JSON.stringify(error.response.data)}`
        );
      }

      // Handle 401 Unauthorized errors (token expired or invalid)
      if (error.response.status === 401) {
        // Clear auth data from localStorage
        localStorage.removeItem(USER_KEY);
        
        // Only redirect to login if not already on login page and not a background API check
        const isLoginPage = window.location.pathname.includes('/login');
        const isRegisterPage = window.location.pathname.includes('/register');
        const isAuthEndpoint = error.config.url.includes('/auth/me');
        
        // Don't redirect if we're on login/register page or if this is just a background check
        if (!isLoginPage && !isRegisterPage && !isAuthEndpoint) {
          console.log('Redirecting to login due to 401 error');
          window.location.href = '/login';
        }
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error("API No Response:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("API Error:", error.message);
    }
    return Promise.reject(error);
  }
);

/**
 * Wrapper for API calls to handle common error scenarios
 * @param {Function} apiCall - The API call function to execute
 * @param {any} defaultValue - Default value to return on error
 * @returns {Promise<any>} - Response data or default value
 */
export const safeApiCall = async (apiCall, defaultValue = null) => {
  try {
    const result = await apiCall();
    return result;
  } catch (error) {
    console.error("API call failed:", error);
    return defaultValue;
  }
};

export default {
  API_BASE_URL,
  apiClient,
  safeApiCall,
  ENABLE_DEBUG_LOGGING,
};
