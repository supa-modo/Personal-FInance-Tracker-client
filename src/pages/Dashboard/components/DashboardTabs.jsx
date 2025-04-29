import React from 'react';

const DashboardTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="mb-6 border-b border-slate-700/50">
      <nav className="-mb-px flex space-x-8">
        <button
          onClick={() => setActiveTab('overview')}
          className={`${
            activeTab === 'overview' 
              ? 'border-primary-500 text-primary-400' 
              : 'border-transparent text-slate-400 hover:text-slate-300 hover:border-slate-500'
          } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-all duration-200`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('assets')}
          className={`${
            activeTab === 'assets' 
              ? 'border-primary-500 text-primary-400' 
              : 'border-transparent text-slate-400 hover:text-slate-300 hover:border-slate-500'
          } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-all duration-200`}
        >
          Assets
        </button>
        <button
          onClick={() => setActiveTab('trends')}
          className={`${
            activeTab === 'trends' 
              ? 'border-primary-500 text-primary-400' 
              : 'border-transparent text-slate-400 hover:text-slate-300 hover:border-slate-500'
          } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-all duration-200`}
        >
          Trends
        </button>
      </nav>
    </div>
  );
};

export default DashboardTabs;
