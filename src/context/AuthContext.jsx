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

  // Check if the current route is a public route that doesn't require authentication
  const isPublicRoute = () => {
    const publicRoutes = [
      '/login', 
      '/register', 
      '/forgot-password',
      '/reset-password'
      
    ];

    const currentPath = window.location.pathname;
    return publicRoutes.some(
      (route) =>
        currentPath === route ||
        (route === "/reset-password" &&
          currentPath.startsWith("/reset-password/"))
    );
  };

  // Effect to check if the user is already logged in
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        // First try to get user from localStorage for quick loading
        const storedUser = authService.getCurrentUser();
        if (storedUser) {
          setUser(storedUser);
        }

        // Skip backend validation for public routes
        if (isPublicRoute()) {
          console.log(
            "Public route detected, skipping backend authentication check"
          );
          setLoading(false);
          return;
        }

        // Log the environment and authentication attempt
        console.log(`Checking authentication in ${import.meta.env.MODE} mode`);

        // Then validate with the backend and get fresh data
        const currentUser = await authService.fetchCurrentUser();
        if (currentUser) {
          console.log("User authenticated successfully with backend");
          setUser(currentUser);
        } else if (storedUser) {
          // If backend says no user but we had one in localStorage, clear it
          console.log(
            "Backend authentication failed, clearing local user data"
          );
          setUser(null);
          // Redirect to login if we're not already there
          if (!window.location.pathname.includes("/login")) {
            window.location.href = "/login";
          }
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        setError("Failed to restore session");

        // If we're on a public route, don't show the error
        if (isPublicRoute()) {
          setError(null);
        }
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

      // Clear user state
      setUser(null);

      // Force clear any cached authentication state
      localStorage.removeItem("user-personal-finance");

      // Redirect to login page
      window.location.href = "/login";

      return { success: true };
    } catch (error) {
      console.error("Logout error:", error);
      setError(error.message);

      // Still clear user state even if API call fails
      setUser(null);
      localStorage.removeItem("user-personal-finance");

      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Function to handle Google sign-in
  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      setError(null);

      // Call the Google sign-in service
      const userData = await authService.signInWithGoogle();

      // If we're redirecting to Google OAuth, don't update the user state
      if (userData && userData.redirecting) {
        return { redirecting: true };
      }

      // Update the state with user data
      setUser(userData);
      return userData;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Function to handle Apple sign-in
  const signInWithApple = async () => {
    try {
      setLoading(true);
      setError(null);

      // Call the Apple sign-in service
      const userData = await authService.signInWithApple();

      // If we're redirecting to Apple OAuth, don't update the user state
      // if (userData && userData.redirecting) {
      //   return { redirecting: true };
      // }

      // Update the state with user data
      // setUser(userData);
      return userData;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Function to update user password
  const updatePassword = async (passwordData) => {
    try {
      setLoading(true);
      setError(null);

      // Validate password data
      if (
        !passwordData.currentPassword ||
        !passwordData.newPassword ||
        !passwordData.newPasswordConfirm
      ) {
        throw new Error("All password fields are required");
      }

      if (passwordData.newPassword !== passwordData.newPasswordConfirm) {
        throw new Error("New password and confirmation do not match");
      }

      // Call the update password service
      const updatedUser = await authService.updatePassword(
        passwordData.currentPassword,
        passwordData.newPassword,
        passwordData.newPasswordConfirm
      );

      // Update the state with the latest user data
      setUser(updatedUser);

      return updatedUser;
    } catch (error) {
      console.error("Password update error:", error);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Function to update user profile
  const updateProfile = async (profileData) => {
    try {
      setLoading(true);
      setError(null);

      // Call the update profile service
      const updatedUser = await authService.updateProfile(profileData);

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

  // Function to update notification settings
  const updateNotificationSettings = async (settingsData) => {
    try {
      setLoading(true);
      setError(null);

      // Call the update notification settings service
      const updatedUser = await authService.updateNotificationSettings(
        settingsData
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

  // Provide the context value
  const contextValue = {
    user,
    isAuthenticated: !!user,
    loading,
    error,
    login,
    register,
    logout,
    signInWithGoogle,
    signInWithApple,
    updatePassword,
    updateProfile,
    updateNotificationSettings,
  };

  // Return the provider
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
