import React from "react";
import { TbAlertCircle, TbLoader2, TbRefresh } from "react-icons/tb";
import MainLayout from "../../../components/layout/MainLayout";

export const LoadingState = () => {
  return (
    <div className="flex items-center h-[calc(100vh-12rem)] justify-center">
      <div className=" flex flex-col items-center justify-center">
        <TbLoader2 className="h-12 w-12 text-primary-500 animate-spin" />
        <p className="text-sm font-medium mt-4 md:text-base">
          Loading Your Financial Dashboard...
        </p>
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
          <h3 className="text-lg font-medium text-red-300">
            Error Loading Dashboard
          </h3>
          <p className="mt-1 text-sm text-red-200">{error}</p>
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
