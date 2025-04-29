import React, { createContext, useState, useEffect } from 'react';

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

  // Effect to check if the user is already logged in (from localStorage)
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        // Check if there's a user in localStorage
        const storedUser = localStorage.getItem('user-personal-finance');
        
        if (storedUser) {
          // Parse the stored user
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
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
      
      // For now, we'll use dummy data
      // In a real app, this would be an API call
      if (email === 'user@example.com' && password === 'password') {
        const userData = {
          id: '1',
          name: 'Test User',
          email: 'user@example.com',
        };
        
        // Store the user in localStorage
        localStorage.setItem('user-personal-finance', JSON.stringify(userData));
        
        // Update the state
        setUser(userData);
        return userData;
      } else {
        throw new Error('Invalid email or password');
      }
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
      
      // For now, we'll use dummy data
      // In a real app, this would be an API call
      const userData = {
        id: '1',
        name,
        email,
      };
      
      // Store the user in localStorage
      localStorage.setItem('user-personal-finance', JSON.stringify(userData));
      
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
  const logout = () => {
    // Remove the user from localStorage
    localStorage.removeItem('user-personal-finance');
    
    // Update the state
    setUser(null);
  };

  // Create the context value
  const contextValue = {
    user,
    loading,
    error,
    login,
    register,
    logout,
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
