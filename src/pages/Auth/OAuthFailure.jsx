import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { TbAlertCircle } from 'react-icons/tb';

/**
 * OAuthFailure component handles failed OAuth authentication
 * It displays an error message and provides a link back to the login page
 */
const OAuthFailure = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Extract error message from URL if present
  const params = new URLSearchParams(location.search);
  const errorMessage = params.get('error') || 'Authentication failed';

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="max-w-md w-full bg-slate-800 rounded-lg shadow-lg p-8 text-center">
        <div className="flex justify-center mb-4">
          <TbAlertCircle className="h-16 w-16 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-4">Authentication Failed</h1>
        <p className="text-gray-300 mb-6">{errorMessage}</p>
        <button
          onClick={() => navigate('/login')}
          className="w-full bg-primary-500 hover:bg-primary-600 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default OAuthFailure;
