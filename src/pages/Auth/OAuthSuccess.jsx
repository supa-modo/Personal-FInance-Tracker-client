import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { setToken } from '../../services/api.service';
import { TbLoader2 } from 'react-icons/tb';
import apiClient from '../../services/api.service';

/**
 * OAuthSuccess component handles the redirect from OAuth providers
 * It extracts the token from the URL and sets it in the auth context
 */
const OAuthSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  useEffect(() => {
    const handleOAuthRedirect = async () => {
      try {
        // Get the token from the URL query parameters
        const params = new URLSearchParams(location.search);
        const token = params.get('token');

        if (!token) {
          console.error('No token found in redirect URL');
          navigate('/login?error=Authentication failed');
          return;
        }

        // Store the token
        setToken(token);

        // Get the current user data from the server
        const response = await apiClient.get('/auth/me');
        
        if (response.data && response.data.data && response.data.data.user) {
          // Store user data in localStorage
          localStorage.setItem('user-personal-finance', JSON.stringify(response.data.data.user));
          
          // Force a page refresh to reload the app with the authenticated user
          window.location.href = '/dashboard';
        } else {
          throw new Error('Invalid user data received');
        }
      } catch (error) {
        console.error('Error handling OAuth redirect:', error);
        navigate('/login?error=Authentication failed');
      }
    };

    handleOAuthRedirect();
  }, [location, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="text-center mx-auto">
      <TbLoader2 className='w-10 h-10 text-primary-500 animate-spin'/>
        <h1 className="text-lg font-bold text-white mb-4">Completing authentication...</h1>
      </div>
    </div>
  );
};

export default OAuthSuccess;
