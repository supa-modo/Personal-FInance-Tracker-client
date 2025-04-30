import React, { createContext, useState, useEffect } from 'react';
import * as authService from '../services/auth.service';

// Create the authentication context
export const AuthContext = createContext();

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  // State for the current user
  const [user, setUser] = useState(null);
  // State for loading status
  const [loading, setLoading] = useState(true);
  // State for authentication error
  const [error, setError] = useState(null);

  // Effect to check if the user is already logged in
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        // First try to get user from localStorage for quick loading
        const storedUser = authService.getCurrentUser();
        if (storedUser) {
          setUser(storedUser);
        }
        
        // Then validate with the backend and get fresh data
        const currentUser = await authService.fetchCurrentUser();
        if (currentUser) {
          setUser(currentUser);
        } else if (storedUser) {
          // If backend says no user but we had one in localStorage, clear it
          setUser(null);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        setError('Failed to restore session');
      } finally {
        setLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  // Function to handle user login
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      // Call the login service
      const userData = await authService.login(email, password);
      
      // Update the state
      setUser(userData);
      return userData;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Function to handle user registration
  const register = async (name, email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      // Call the register service
      const userData = await authService.register(name, email, password);
      
      // Update the state
      setUser(userData);
      return userData;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Function to handle user logout
  const logout = async () => {
    try {
      setLoading(true);
      
      // Call the logout service
      await authService.logout();
      
      // Update the state
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear the user state even if API call fails
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Function to update user password
  const updatePassword = async (currentPassword, newPassword, newPasswordConfirm) => {
    try {
      setLoading(true);
      setError(null);
      
      // Call the update password service
      const updatedUser = await authService.updatePassword(
        currentPassword,
        newPassword,
        newPasswordConfirm
      );
      
      // Update the state
      setUser(updatedUser);
      return updatedUser;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Create the context value
  const contextValue = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    updatePassword,
    isAuthenticated: !!user,
  };

  // Return the provider
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
