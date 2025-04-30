import React, { useState } from 'react';
import { 
  TbArrowUpRight, 
  TbArrowDownRight, 
  TbCurrencyDollar,
  TbCalendar,
  TbNotes,
  TbChevronDown,
  TbChevronUp,
  TbFilter
} from 'react-icons/tb';
import { formatCurrency, formatDate } from '../../../utils/formatters';

const BalanceUpdatesEnhanced = ({ source }) => {
  const updates = source?.updates || [];
  const [sortOrder, setSortOrder] = useState('desc');
  const [expandedUpdates, setExpandedUpdates] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const [filterType, setFilterType] = useState('all');
  
  // Toggle expanded state for a specific update
  const toggleExpand = (updateId) => {
    setExpandedUpdates(prev => ({
      ...prev,
      [updateId]: !prev[updateId]
    }));
  };
  
  // Sort updates by date (using createdAt which is more reliable)
  const sortedUpdates = [...updates].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
  });
  
  // Calculate change amounts and filter updates by type
  const updatesWithChanges = sortedUpdates.map((update, index, arr) => {
    // For the first update (oldest if asc, newest if desc), we don't have a previous update to compare
    // So we'll just use 0 as the change amount
    let changeAmount = 0;
    
    if (index < arr.length - 1) {
      const nextIndex = sortOrder === 'desc' ? index + 1 : arr.length - 1 - index;
      const prevIndex = sortOrder === 'desc' ? index + 1 : arr.length - 1 - index;
      
      if (prevIndex >= 0 && prevIndex < arr.length) {
        changeAmount = parseFloat(update.balance) - parseFloat(arr[prevIndex].balance);
      }
    } else if (arr.length > 1) {
      // For the last update in the array
      const prevIndex = sortOrder === 'desc' ? 1 : arr.length - 2;
      changeAmount = parseFloat(update.balance) - parseFloat(arr[prevIndex].balance);
    }
    
    return {
      ...update,
      changeAmount
    };
  });
  
  // Filter updates by type (increase/decrease)
  const filteredUpdates = updatesWithChanges.filter(update => {
    if (filterType === 'all') return true;
    if (filterType === 'increase' && update.changeAmount > 0) return true;
    if (filterType === 'decrease' && update.changeAmount < 0) return true;
    return false;
  });
  
  // Toggle sort order
  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc');
  };
  
  return (
    <div className="mb-8 bg-slate-800/60 shadow-xl md:rounded-xl overflow-hidden border border-slate-700/50 backdrop-blur-sm hover:shadow-primary-900/20 hover:border-slate-600/50 transition-all duration-300">
      <div className="px-6 py-5 border-b border-slate-700/50 flex flex-col sm:flex-row sm:items-center justify-between">
        <h2 className="text-lg font-semibold text-primary-600 mb-3 sm:mb-0">Balance Updates</h2>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center px-3 py-1.5 border border-slate-600 rounded-lg text-sm font-medium text-slate-300 bg-slate-700/50 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-all duration-200"
          >
            <TbFilter className="mr-1.5 h-4 w-4" />
            Filter
            {showFilters ? (
              <TbChevronUp className="ml-1.5 h-4 w-4" />
            ) : (
              <TbChevronDown className="ml-1.5 h-4 w-4" />
            )}
          </button>
          
          <button
            onClick={toggleSortOrder}
            className="inline-flex items-center px-3 py-1.5 border border-slate-600 rounded-lg text-sm font-medium text-slate-300 bg-slate-700/50 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-all duration-200"
          >
            {sortOrder === 'desc' ? (
              <>
                <TbChevronDown className="mr-1.5 h-4 w-4" />
                Newest First
              </>
            ) : (
              <>
                <TbChevronUp className="mr-1.5 h-4 w-4" />
                Oldest First
              </>
            )}
          </button>
        </div>
      </div>
      
      {/* Filters panel */}
      {showFilters && (
        <div className="px-6 py-3 bg-slate-700/30 border-b border-slate-700/50">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-slate-400">Show:</span>
            <div className="flex space-x-2">
              <button
                onClick={() => setFilterType('all')}
                className={`px-3 py-1 rounded-lg text-sm ${
                  filterType === 'all' 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                } transition-colors`}
              >
                All
              </button>
              <button
                onClick={() => setFilterType('increase')}
                className={`px-3 py-1 rounded-lg text-sm ${
                  filterType === 'increase' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                } transition-colors`}
              >
                Increases
              </button>
              <button
                onClick={() => setFilterType('decrease')}
                className={`px-3 py-1 rounded-lg text-sm ${
                  filterType === 'decrease' 
                    ? 'bg-red-600 text-white' 
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                } transition-colors`}
              >
                Decreases
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="divide-y divide-slate-700/50">
        {filteredUpdates.length > 0 ? (
          filteredUpdates.map((update) => {
            const isExpanded = expandedUpdates[update.id];
            const isIncrease = update.changeAmount > 0;
            
            return (
              <div 
                key={update.id} 
                className="hover:bg-slate-700/30 transition-colors"
              >
                <div 
                  className="px-6 py-4 cursor-pointer"
                  onClick={() => toggleExpand(update.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`flex-shrink-0 h-10 w-10 rounded-lg shadow-lg flex items-center justify-center ${
                        isIncrease ? 'bg-green-900/50' : 'bg-red-900/50'
                      }`}>
                        {isIncrease ? (
                          <TbArrowUpRight className="h-5 w-5 text-green-400" />
                        ) : (
                          <TbArrowDownRight className="h-5 w-5 text-red-400" />
                        )}
                      </div>
                      
                      <div className="ml-4">
                        <div className="text-sm font-medium text-white">
                          {formatDate(new Date(update.createdAt), { dateStyle: 'medium' })}
                        </div>
                        <div className="text-sm text-slate-400">
                          Balance: {formatCurrency(update.balance)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className={`text-base font-semibold ${
                        isIncrease ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {isIncrease ? '+' : ''}
                        {formatCurrency(update.changeAmount)}
                      </div>
                      <button className="ml-4 text-slate-400">
                        {isExpanded ? (
                          <TbChevronUp className="h-5 w-5" />
                        ) : (
                          <TbChevronDown className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Expanded details */}
                {isExpanded && (
                  <div className="px-6 pb-4 pt-1">
                    <div className="ml-14 pl-4 border-l border-slate-700/50">
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div>
                          <div className="flex items-center text-sm text-slate-400">
                            <TbCurrencyDollar className="mr-1.5 h-4 w-4" />
                            Previous Balance
                          </div>
                          <div className="mt-1 text-white">
                            {formatCurrency(update.balance - update.changeAmount)}
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex items-center text-sm text-slate-400">
                            <TbCalendar className="mr-1.5 h-4 w-4" />
                            Update Time
                          </div>
                          <div className="mt-1 text-white">
                            {formatDate(update.date, { 
                              dateStyle: 'medium', 
                              timeStyle: 'short' 
                            })}
                          </div>
                        </div>
                        
                        {update.notes && (
                          <div className="sm:col-span-2 mt-2">
                            <div className="flex items-center text-sm text-slate-400">
                              <TbNotes className="mr-1.5 h-4 w-4" />
                              Notes
                            </div>
                            <div className="mt-1 text-white">
                              {update.notes}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="px-6 py-10 text-center">
            <div className="text-slate-400 mb-2">No balance updates found</div>
            <p className="text-sm text-slate-500">
              {filterType !== 'all' 
                ? `No ${filterType === 'increase' ? 'increases' : 'decreases'} found. Try changing the filter.` 
                : 'Update the balance to start tracking history'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BalanceUpdatesEnhanced;
