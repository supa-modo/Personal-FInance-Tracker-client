import apiClient, { setToken } from './api.service';

/**
 * Authentication service for handling user authentication
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
    // Validate input
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    console.log('Attempting login with email:', email);

    // Make the API call with credentials
    const response = await apiClient.post('/auth/login', {
      email,
      password
    });
    
    // Store user data in localStorage
    if (response.data && response.data.data && response.data.data.user) {
      // The JWT token is stored in an HttpOnly cookie by the server
      // We only need to store the user data
      localStorage.setItem('user-personal-finance', JSON.stringify(response.data.data.user));
      
      // If token is provided directly in the response, store it in memory
      if (response.data.token) {
        setToken(response.data.token);
        console.log('Token received and stored during login');
      }
      
      console.log('Login successful, user data stored');
      return response.data.data.user;
    }
    
    throw new Error('Invalid response from server');
  } catch (error) {
    console.error('Login failed:', error.response?.data?.message || error.message);
    // Clear any existing user data from localStorage on login error
    localStorage.removeItem('user-personal-finance');
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
    const response = await apiClient.post('/auth/register', {
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
    await apiClient.get('/auth/logout');
    
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
    const response = await apiClient.get('/auth/me');
    
    if (response.data && response.data.data && response.data.data.user) {
      // Update localStorage with latest user data
      localStorage.setItem('user-personal-finance', JSON.stringify(response.data.data.user));
      return response.data.data.user;
    }
    
    // If we get here with a successful response but no user data,
    // clear any existing user data from localStorage
    localStorage.removeItem('user-personal-finance');
    return null;
  } catch (error) {
    console.error('Error fetching current user:', error.response?.data?.message || error.message);
    // Clear any existing user data from localStorage on auth error
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('user-personal-finance');
    }
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
    // Ensure we have all required parameters
    if (!currentPassword || !newPassword || !newPasswordConfirm) {
      throw new Error('All password fields are required');
    }

    // Ensure new password and confirmation match
    if (newPassword !== newPasswordConfirm) {
      throw new Error('New password and confirmation do not match');
    }

    // Make the API call with proper credentials
    const response = await apiClient.patch('/auth/update-password', {
      currentPassword,
      newPassword,
      newPasswordConfirm
    });
    
    if (response.data && response.data.data && response.data.data.user) {
      // Update the user in localStorage with the latest data
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
    const response = await apiClient.patch('/auth/update-profile', profileData);
    
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
    const response = await apiClient.patch('/auth/update-notification-settings', settingsData);
    
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
