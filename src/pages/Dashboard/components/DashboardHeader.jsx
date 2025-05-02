import React from 'react';
import { Link } from 'react-router-dom';
import { TbPlus, TbRefresh } from 'react-icons/tb';

const DashboardHeader = ({ timePeriod, setTimePeriod, isRefreshing, refreshDashboardData }) => {
  return (
    <div className="pb-4 px-4 md:px-0 md:mb-4 sm:flex sm:items-center sm:justify-between">
      <h1 className="text-[1.35rem] sm:text-2xl md:text-3xl font-bold text-white ">Financial Dashboard</h1>
      <div className="mt-3 sm:mt-0 sm:ml-4 flex space-x-2 md:space-x-3">
        <div className="relative inline-block text-left w-[35%] md:w-auto">
          <select
            value={timePeriod}
            onChange={(e) => setTimePeriod(e.target.value)}
            className="block pl-3 pr-2 md:pr-10 py-2 text-sm border border-slate-800 bg-slate-800 text-white rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
          >
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="quarter">Last Quarter</option>
            <option value="year">Last Year</option>
          </select>
        </div>
        <Link
          to="/financial-sources"
          className="inline-flex w-full items-center px-4 py-2 border border-transparent rounded-md shadow-lg text-sm font-medium text-white bg-primary-600 hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-300 shadow-primary-900/30"
        >
          <TbPlus className="-ml-1 mr-2 h-5 w-5" />
          Add Financial Source
        </Link>
        <button 
          onClick={refreshDashboardData}
          disabled={isRefreshing}
          className="flex items-center justify-center p-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
          title="Refresh dashboard data"
        >
          <TbRefresh className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
        </button>
      </div>
    </div>
  );
};

export default DashboardHeader;
