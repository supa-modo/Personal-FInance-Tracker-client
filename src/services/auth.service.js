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
    console.log('Logging out user...');
    
    // Call the logout endpoint to clear cookies
    const response = await apiClient.get('/auth/logout');
    console.log('Logout API response:', response.data);
    
    // Remove the user from localStorage
    localStorage.removeItem('user-personal-finance');
    console.log('User data removed from localStorage');
    
    // Clear any cached API data
    if (window.caches) {
      try {
        const cacheNames = await window.caches.keys();
        await Promise.all(
          cacheNames.map(cacheName => {
            return window.caches.delete(cacheName);
          })
        );
        console.log('Browser cache cleared');
      } catch (cacheError) {
        console.warn('Failed to clear browser cache:', cacheError);
      }
    }
    
    // Force reload to ensure all state is cleared
    // This is optional but helps ensure a clean slate
    // window.location.href = '/login';
    
    return { 
      success: true,
      message: response.data?.message || 'Logged out successfully' 
    };
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
    const response = await apiClient.patch('/auth/update-notification-settings', {
      notification_settings: settingsData
    });
    
    if (response.data && response.data.data && response.data.data.user) {
      // Update the user in localStorage with the latest data
      localStorage.setItem('user-personal-finance', JSON.stringify(response.data.data.user));
      return response.data.data.user;
    }
    
    throw new Error('Invalid response from server');
  } catch (error) {
    console.error('Notification settings update failed:', error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || 'Notification settings update failed. Please try again.');
  }
};

/**
 * Request a password reset email
 * @param {string} email - User's email address
 * @returns {Promise<Object>} - Promise resolving to success status
 * @throws {Error} - Throws an error if the request fails
 */
export const forgotPassword = async (email) => {
  try {
    // Validate input
    if (!email) {
      throw new Error('Email is required');
    }

    // Make the API call
    const response = await apiClient.post('/auth/forgot-password', { email });
    
    return response.data;
  } catch (error) {
    console.error('Forgot password request failed:', error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || 'Failed to send password reset email. Please try again.');
  }
};

/**
 * Reset password using token
 * @param {string} token - Password reset token
 * @param {string} password - New password
 * @param {string} passwordConfirm - New password confirmation
 * @returns {Promise<Object>} - Promise resolving to user data
 * @throws {Error} - Throws an error if the password reset fails
 */
export const resetPassword = async (token, password, passwordConfirm) => {
  try {
    console.log('Reset password function called with token:', token.substring(0, 5) + '...');
    
    // Validate input
    if (!token) {
      throw new Error('Reset token is required');
    }
    
    if (!password || !passwordConfirm) {
      throw new Error('Password and confirmation are required');
    }

    if (password !== passwordConfirm) {
      throw new Error('Passwords do not match');
    }

    // Make the API call
    console.log('Sending reset password request to server...');
    const response = await apiClient.post(`/auth/reset-password/${token}`, {
      password,
      passwordConfirm
    });
    
    console.log('Reset password response:', response.data);
    
    // If login is successful after reset, store the user data
    if (response.data && response.data.data && response.data.data.user) {
      console.log('Storing user data after password reset');
      localStorage.setItem('user-personal-finance', JSON.stringify(response.data.data.user));
      
      // If token is provided directly in the response, store it in memory
      if (response.data.token) {
        setToken(response.data.token);
      }
      
      return response.data.data.user;
    }
    
    return response.data;
  } catch (error) {
    console.error('Password reset failed:', error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || 'Password reset failed. Please try again.');
  }
};

/**
 * Sign in with Google
 * @returns {Promise<Object>} - Promise resolving to user data
 * @throws {Error} - Throws an error if Google sign-in fails
 */
export const signInWithGoogle = async () => {
  try {
    // Initiate the Google sign-in flow by getting the redirect URL from the backend
    const response = await apiClient.get('/auth/google');
    
    // If we get a redirect URL, redirect the user to Google's auth page
    if (response.data && response.data.redirectUrl) {
      // Open the Google auth page in the same window
      window.location.href = response.data.redirectUrl;
      return { redirecting: true };
    }
    
    throw new Error('Invalid response from server');
  } catch (error) {
    console.error('Google sign-in failed:', error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || 'Google sign-in failed. Please try again.');
  }
};

/**
 * Sign in with Apple
 * @returns {Promise<Object>} - Promise resolving to user data
 * @throws {Error} - Throws an error if Apple sign-in fails
 */
export const signInWithApple = async () => {
  try {
    // Initiate the Apple sign-in flow
    // The backend will handle the OAuth flow and return user data
    // const response = await apiClient.get('/auth/apple');
    
    // Handle the response from the backend
    // if (response.data && response.data.data && response.data.data.user) {
    //   localStorage.setItem('user-personal-finance', JSON.stringify(response.data.data.user));
      
    //   // If token is provided directly in the response, store it
    //   if (response.data.token) {
    //     setToken(response.data.token);
    //   }
      
    //   return response.data.data.user;
    // }
    
    // If we get a redirect URL instead of user data, return it
    // if (response.data && response.data.redirectUrl) {
    //   window.location.href = response.data.redirectUrl;
    //   return { redirecting: true };
    // }

    setTimeout (()=>{
      console.log("Apple Sign in Not working")
    }, 2000)
    
    throw new Error('Apple Sign In is currently not available.');
  } catch (error) {
    console.error('Apple sign-in failed:', error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || 'Apple Sign In is currently not available.');
  }
};
