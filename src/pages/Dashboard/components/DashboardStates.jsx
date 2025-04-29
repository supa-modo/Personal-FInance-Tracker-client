import React from 'react';
import { TbAlertCircle, TbRefresh } from 'react-icons/tb';

export const LoadingState = () => {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-500 mx-auto"></div>
        <p className="mt-6 text-slate-300 font-medium">Loading your financial dashboard...</p>
      </div>
    </div>
  );
};

export const ErrorState = ({ error, onRetry }) => {
  return (
    <div className="bg-red-900/20 border-l-4 border-red-500 p-6 mb-6 rounded-lg shadow-lg">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <TbAlertCircle className="h-6 w-6 text-red-400" />
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-medium text-red-300">Error Loading Dashboard</h3>
          <p className="mt-1 text-sm text-red-200">
            {error}
          </p>
          <button 
            className="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300"
            onClick={() => window.location.reload()}
          >
            <TbRefresh className="-ml-1 mr-2 h-4 w-4" />
            Retry
          </button>
        </div>
      </div>
    </div>
  );
};
