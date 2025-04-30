import React from 'react';
import { 
  TbSearch, 
  TbFilter, 
  TbX, 
  TbCheck, 
  TbAdjustments 
} from 'react-icons/tb';

const SourcesFilter = ({ 
  searchTerm, 
  setSearchTerm, 
  filterType, 
  setFilterType, 
  showInactive, 
  setShowInactive, 
  sourceTypes, 
  getTypeLabel,
  resetFilters
}) => {
  return (
    <div className="mb-8 mx-2.5 md:mx-0 bg-slate-800/60 shadow-xl rounded-xl overflow-hidden border border-slate-700/50 backdrop-blur-sm hover:shadow-primary-900/20 hover:border-slate-600/50 transition-all duration-300">
      <div className="px-4 md:px-6 py-3 md:py-5 border-b border-slate-700/50">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Filters</h2>
          <button 
            onClick={resetFilters}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/50 transition-colors"
            title="Reset filters"
          >
            <TbX className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div className="p-3 md:p-6">
        <div className="grid grid-cols-1 gap-3 md:gap-6 md:grid-cols-3">
          {/* Search input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <TbSearch className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2.5 border border-slate-600 bg-slate-800/50 text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 placeholder-slate-400"
              placeholder="Search sources..."
            />
            {searchTerm && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button
                  onClick={() => setSearchTerm('')}
                  className="text-slate-400 hover:text-white"
                >
                  <TbX className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
          
          {/* Type filter */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <TbFilter className="h-5 w-5 text-slate-400" />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="block w-full pl-10 pr-10 py-2.5 border border-slate-600 bg-slate-800/50 text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 appearance-none"
            >
              <option value="">All Types</option>
              {sourceTypes.map(type => (
                <option key={type} value={type}>{getTypeLabel(type)}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <TbAdjustments className="h-5 w-5 text-slate-400" />
            </div>
          </div>
          
          {/* Show inactive toggle */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowInactive(!showInactive)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none ${
                showInactive ? 'bg-primary-600' : 'bg-slate-700'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                  showInactive ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className="text-sm font-medium text-slate-300">
              {showInactive ? 'Showing inactive sources' : 'Only active sources'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SourcesFilter;
