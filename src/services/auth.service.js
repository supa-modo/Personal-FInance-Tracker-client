import axios from 'axios';

/**
 * Authentication service for handling user authentication
 */

// API base URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

// Configure axios to include credentials (cookies)
axios.defaults.withCredentials = true;

/**
 * Login a user
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise} - Promise with user data
 */
/**
 * Logs in a user with the specified email and password.
 * Sends a POST request to the authentication endpoint and
 * stores the user data in localStorage if successful.
 * 
 * @param {string} email - User's email address.
 * @param {string} password - User's password.
 * @returns {Promise<Object>} - Promise resolving to user data.
 * @throws {Error} - Throws an error if login fails.
 */
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password
    });
    
    // Store user data in localStorage
    if (response.data && response.data.data && response.data.data.user) {
      // The JWT token is stored in an HttpOnly cookie by the server
      // We only need to store the user data
      localStorage.setItem('user-personal-finance', JSON.stringify(response.data.data.user));
      return response.data.data.user;
    }
    
    throw new Error('Invalid response from server');
  } catch (error) {
    console.error('Login failed:', error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || 'Login failed. Please try again.');
  }
};

/**
 * Register a new user
 * @param {string} name - User name
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} - Promise resolving to user data.
 * @throws {Error} - Throws an error if registration fails.
 */
export const register = async (name, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, {
      name,
      email,
      password,
      passwordConfirm: password // Backend requires password confirmation
    });
    
    // Store user data in localStorage
    if (response.data && response.data.data && response.data.data.user) {
      localStorage.setItem('user-personal-finance', JSON.stringify(response.data.data.user));
      return response.data.data.user;
    }
    
    throw new Error('Invalid response from server');
  } catch (error) {
    console.error('Registration failed:', error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || 'Registration failed. Please try again.');
  }
};

/**
 * Logout the current user
 * @returns {Promise<Object>} - Promise resolving to success status.
 * @throws {Error} - Throws an error if logout fails.
 */
export const logout = async () => {
  try {
    // Call the logout endpoint to clear cookies
    await axios.get(`${API_URL}/auth/logout`);
    
    // Remove the user from localStorage
    localStorage.removeItem('user-personal-finance');
    
    return { success: true };
  } catch (error) {
    console.error('Logout failed:', error.response?.data?.message || error.message);
    // Still remove from localStorage even if API call fails
    localStorage.removeItem('user-personal-finance');
    throw new Error(error.response?.data?.message || 'Logout failed. Please try again.');
  }
};

/**
 * Get the current user from the API
 * @returns {Promise<Object>} - Promise resolving to user data.
 * @throws {Error} - Throws an error if user retrieval fails.
 */
export const fetchCurrentUser = async () => {
  try {
    const response = await axios.get(`${API_URL}/auth/me`);
    
    if (response.data && response.data.data && response.data.data.user) {
      // Update localStorage with latest user data
      localStorage.setItem('user-personal-finance', JSON.stringify(response.data.data.user));
      return response.data.data.user;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching current user:', error.response?.data?.message || error.message);
    return null;
  }
};

/**
 * Get the current user from localStorage
 * @returns {object|null} - User data or null if not logged in
 */
export const getCurrentUser = () => {
  try {
    const user = localStorage.getItem('user-personal-finance');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error getting current user from localStorage:', error);
    return null;
  }
};

/**
 * Update user password
 * @param {string} currentPassword - Current password
 * @param {string} newPassword - New password
 * @param {string} newPasswordConfirm - New password confirmation
 * @returns {Promise<Object>} - Promise resolving to updated user data.
 * @throws {Error} - Throws an error if password update fails.
 */
export const updatePassword = async (currentPassword, newPassword, newPasswordConfirm) => {
  try {
    const response = await axios.patch(`${API_URL}/auth/update-password`, {
      currentPassword,
      newPassword,
      newPasswordConfirm
    });
    
    if (response.data && response.data.data && response.data.data.user) {
      localStorage.setItem('user-personal-finance', JSON.stringify(response.data.data.user));
      return response.data.data.user;
    }
    
    throw new Error('Invalid response from server');
  } catch (error) {
    console.error('Password update failed:', error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || 'Password update failed. Please try again.');
  }
};

/**
 * Update user profile information
 * @param {object} profileData - Profile data with name and email
 * @returns {Promise<Object>} - Promise resolving to updated user data.
 * @throws {Error} - Throws an error if profile update fails.
 */
export const updateProfile = async (profileData) => {
  try {
    const response = await axios.patch(`${API_URL}/auth/update-profile`, profileData);
    
    if (response.data && response.data.data && response.data.data.user) {
      localStorage.setItem('user-personal-finance', JSON.stringify(response.data.data.user));
      return response.data.data.user;
    }
    
    throw new Error('Invalid response from server');
  } catch (error) {
    console.error('Profile update failed:', error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || 'Profile update failed. Please try again.');
  }
};

/**
 * Update user notification settings
 * @param {object} settingsData - Notification settings data
 * @returns {Promise<Object>} - Promise resolving to updated user data.
 * @throws {Error} - Throws an error if notification settings update fails.
 */
export const updateNotificationSettings = async (settingsData) => {
  try {
    const response = await axios.patch(`${API_URL}/auth/update-notification-settings`, settingsData);
    
    if (response.data && response.data.data && response.data.data.user) {
      localStorage.setItem('user-personal-finance', JSON.stringify(response.data.data.user));
      return response.data.data.user;
    }
    
    throw new Error('Invalid response from server');
  } catch (error) {
    console.error('Notification settings update failed:', error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || 'Notification settings update failed. Please try again.');
  }
};
