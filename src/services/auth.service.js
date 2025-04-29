import { post } from './api';

/**
 * Authentication service for handling user authentication
 */

/**
 * Login a user
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise} - Promise with user data
 */
export const login = async (email, password) => {
  try {
    // For now, we'll use dummy data instead of API call
    if (email === 'user@example.com' && password === 'password') {
      const userData = {
        id: '1',
        name: 'Test User',
        email: 'user@example.com',
      };
      
      // Store the user in localStorage
      localStorage.setItem('user-personal-finance', JSON.stringify(userData));
      
      return userData;
    } else {
      throw new Error('Invalid email or password');
    }
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

/**
 * Register a new user
 * @param {string} name - User name
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise} - Promise with user data
 */
export const register = async (name, email, password) => {
  try {
    // For now, we'll use dummy data instead of API call
    const userData = {
      id: '1',
      name,
      email,
    };
    
    // Store the user in localStorage
    localStorage.setItem('user-personal-finance', JSON.stringify(userData));
    
    return userData;
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
};

/**
 * Logout the current user
 * @returns {Promise} - Promise with success status
 */
export const logout = async () => {
  try {
    // Remove the user from localStorage
    localStorage.removeItem('user-personal-finance');
    
    return { success: true };
  } catch (error) {
    console.error('Logout failed:', error);
    throw error;
  }
};

/**
 * Get the current user
 * @returns {object|null} - User data or null if not logged in
 */
export const getCurrentUser = () => {
  try {
    const user = localStorage.getItem('user-personal-finance');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};
