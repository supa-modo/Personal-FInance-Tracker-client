import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { setToken } from '../../services/api.service';
import { TbAlertTriangleFilled, TbLoader2, TbShieldCheckFilled } from 'react-icons/tb';
import apiClient from '../../services/api.service';
import { FiCheck } from 'react-icons/fi';

/**
 * OAuthSuccess component handles the redirect from OAuth providers
 * It extracts the token from the URL and sets it in the auth context
 */
const OAuthSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [debugInfo, setDebugInfo] = useState({});
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const handleOAuthRedirect = async () => {
      try {
        // Get the token from the URL query parameters
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        
        setDebugInfo(prev => ({ ...prev, tokenReceived: !!token }));

        if (!token) {
          console.error('No token found in redirect URL');
          setError('No authentication token found');
          setTimeout(() => navigate('/login?error=Authentication failed'), 3000);
          return;
        }

        console.log('OAuth token received:', token.substring(0, 10) + '...');
        
        // Store the token in localStorage directly to ensure it persists
        localStorage.setItem('jwt-personal-finance', token);
        
        // Also set it in the API client for immediate use
        setToken(token);
        setDebugInfo(prev => ({ ...prev, tokenSet: true, tokenStoredInLocalStorage: true }));
        
        try {
          // Get the current user data from the server
          console.log('Fetching user data from /auth/me endpoint...');
          const response = await apiClient.get('/auth/me');
          
          console.log('Response received:', response);
          setDebugInfo(prev => ({ ...prev, responseReceived: true, responseStatus: response.status }));
          
          if (response.data && response.data.data && response.data.data.user) {
            const userData = response.data.data.user;
            console.log('User data received successfully:', userData.email);
            setDebugInfo(prev => ({ 
              ...prev, 
              userDataReceived: true, 
              email: userData.email,
              userId: userData._id
            }));
            
            // Store user data in localStorage
            localStorage.setItem('user-personal-finance', JSON.stringify(userData));
            setDebugInfo(prev => ({ ...prev, userDataStored: true }));
            
            // Set success state to show success message
            setSuccess(true);
            setIsLoading(false);
            
            // Wait a moment before redirecting to ensure localStorage is updated
            setTimeout(() => {
              // Force a page refresh to reload the app with the authenticated user
              console.log('Authentication successful, redirecting to dashboard...');
              window.location.href = '/dashboard';
            }, 2000);
          } else {
            console.error('Invalid user data structure:', response.data);
            setDebugInfo(prev => ({ ...prev, invalidUserData: true, responseData: JSON.stringify(response.data) }));
            throw new Error('Invalid user data received');
          }
        } catch (apiError) {
          console.error('Error fetching user data:', apiError);
          setDebugInfo(prev => ({ 
            ...prev, 
            apiError: true, 
            errorMessage: apiError.message,
            errorResponse: apiError.response ? JSON.stringify(apiError.response.data) : 'No response data'
          }));
          setError(`Error fetching user data: ${apiError.message}`); 
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error handling OAuth redirect:', error);
        setError('Authentication failed');
        setTimeout(() => navigate('/login?error=Authentication failed'), 2000);
      } finally {
        setIsLoading(false);
      }
    };

    handleOAuthRedirect();
  }, [location, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="text-center mx-3 md:mx-auto p-6 md:p-8 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 max-w-md w-full">
        {isLoading ? (
          <>
            <TbLoader2 className='w-10 h-10 text-primary-500 animate-spin mx-auto mb-4'/>
            <h1 className="text-lg font-bold text-white mb-2">Completing authentication...</h1>
            <p className="text-slate-400 text-sm mb-4">Please wait while we set up your session</p>
            
            {/* Debug information */}
            {/* <div className="mt-4 text-left border-t border-slate-700 pt-4">
              <h3 className="text-xs font-semibold text-slate-400 mb-2">Debug Information:</h3>
              <div className="bg-slate-900/50 p-3 rounded text-xs text-left overflow-auto max-h-40">
                <pre className="text-slate-400 whitespace-pre-wrap break-all">
                  {JSON.stringify(debugInfo, null, 2)}
                </pre>
              </div>
            </div> */}
          </>
        ) : error ? (
          <>
              <TbAlertTriangleFilled className="w-10 h-10 text-red-500 mx-auto mb-2 md:mb-3" />  
            <h1 className="text-lg font-bold text-white mb-2">Authentication Error</h1>
            <p className="text-red-400 mb-4">{error}</p>
            <p className="text-slate-400 text-sm mb-4">Redirecting to login page...</p>
            
            {/* Debug information */}
            {/* <div className="mt-4 text-left border-t border-slate-700 pt-4">
              <h3 className="text-xs font-semibold text-slate-400 mb-2">Debug Information:</h3>
              <div className="bg-slate-900/50 p-3 rounded text-xs text-left overflow-auto max-h-40">
                <pre className="text-slate-400 whitespace-pre-wrap break-all">
                  {JSON.stringify(debugInfo, null, 2)}
                </pre>
              </div>
            </div> */}
          </>
        ) : (
          <>
            <TbShieldCheckFilled className="text-green-500 mx-auto text-4xl mb-4"/>
            <h1 className="text-lg font-bold text-white mb-2">Authentication Successful</h1>
            <p className="text-slate-400 text-sm mb-4">Redirecting to dashboard...</p>
            
            {/* Debug information */}
            {/* <div className="mt-4 text-left border-t border-slate-700 pt-4">
              <h3 className="text-xs font-semibold text-slate-400 mb-2">Debug Information:</h3>
              <div className="bg-slate-900/50 p-3 rounded text-xs text-left overflow-auto max-h-40">
                <pre className="text-slate-400 whitespace-pre-wrap break-all">
                  {JSON.stringify(debugInfo, null, 2)}
                </pre>
              </div>
            </div> */}
          </>
        )}
      </div>
    </div>
  );
};

export default OAuthSuccess;
