import React from 'react';
import { 
  TbCurrencyDollar, 
  TbWallet, 
  TbCalendarStats, 
  TbArrowUpRight, 
  TbArrowDownRight, 
  TbChevronRight 
} from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { formatCurrency, formatDate, getRelativeTimeString } from '../../../utils/formatters';

const StatsCards = ({ netWorth, totalAssets, change, activeSources, sourceData }) => {
  return (
    <div className="px-2 md:px-0 grid grid-cols-1 gap-2.5 md:gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {/* Net worth card */}
      <div className="bg-slate-800/60 overflow-hidden shadow-xl rounded-2xl md:rounded-xl border border-slate-700/50 backdrop-blur-sm hover:shadow-primary-900/20 hover:border-slate-600/50 transition-all duration-300">
        <div className="px-3 md:px-6 py-4 md:py-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-3 shadow-lg shadow-blue-500/20">
              <TbCurrencyDollar className="h-8 w-8 text-white" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm text-slate-400 truncate">
                  Total Net Worth
                </dt>
                <dd className="">
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2">
                    {formatCurrency(netWorth)}
                  </div>
                  {change.amount !== 0 && (
                    <div className={`flex items-baseline text-sm font-semibold ${
                      change.isPositive ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {change.isPositive ? (
                        <TbArrowUpRight className="self-center flex-shrink-0 h-5 w-5" />
                      ) : (
                        <TbArrowDownRight className="self-center flex-shrink-0 h-5 w-5" />
                      )}
                      <span className="ml-1">
                        {change.isPositive ? '+' : ''}
                        {formatCurrency(change.amount)} ({change.isPositive ? '+' : ''}
                        {change.percentage.toFixed(1)}%)
                      </span>
                    </div>
                  )}
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div className="bg-slate-700/30 px-6 py-3">
          <div className="text-sm">
            <Link to="/financial-sources" className=" text-primary-400 hover:text-primary-300 flex items-center">
              View all sources
              <TbChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
      
      {/* Total Assets card */}
      <div className="bg-slate-800/60 overflow-hidden shadow-xl rounded-xl border border-slate-700/50 backdrop-blur-sm hover:shadow-primary-900/20 hover:border-slate-600/50 transition-all duration-300">
        <div className="px-3 md:px-6 py-4 md:py-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-gradient-to-r from-green-400 to-green-600 rounded-xl p-3 shadow-lg shadow-green-500/20">
              <TbWallet className="h-8 w-8 text-white" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm text-slate-400 truncate">
                  Total Assets
                </dt>
                <dd>
                  <div className="text-2xl md:text-3xl font-bold text-white">
                    {formatCurrency(totalAssets)}
                  </div>
                  <div className="mt-1 text-sm text-slate-400">
                    Across {activeSources.length} financial sources
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div className="bg-slate-700/30 px-6 py-3">
          <div className="text-sm">
            <button className=" text-primary-400 hover:text-primary-300 flex items-center">
              View breakdown
              <TbChevronRight className="ml-1 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Last Updated card */}
      <div className="bg-slate-800/60 overflow-hidden shadow-xl rounded-xl border border-slate-700/50 backdrop-blur-sm hover:shadow-primary-900/20 hover:border-slate-600/50 transition-all duration-300">
        <div className="px-3 md:px-6 py-4 md:py-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-gradient-to-r from-purple-400 to-purple-600 rounded-xl p-3 shadow-lg shadow-purple-500/20">
              <TbCalendarStats className="h-8 w-8 text-white" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm text-slate-400 truncate">
                  Last Updated
                </dt>
                <dd>
                  <div className="text-xl font-semibold text-white">
                    {sourceData.length > 0 && sourceData.some(s => s.lastUpdated) ? 
                      formatDate(sourceData.sort((a, b) => 
                        new Date(b.lastUpdated || 0) - new Date(a.lastUpdated || 0)
                      )[0].lastUpdated, { dateStyle: 'medium' }) : 
                      'No updates yet'
                    }
                  </div>
                  <div className="mt-1 text-sm text-slate-400">
                    {sourceData.length > 0 && sourceData.some(s => s.lastUpdated) ? 
                      getRelativeTimeString(sourceData.sort((a, b) => 
                        new Date(b.lastUpdated || 0) - new Date(a.lastUpdated || 0)
                      )[0].lastUpdated) : 
                      'Add your first update'
                    }
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div className="bg-slate-700/30 px-6 py-3">
          <div className="text-sm">
            <button className=" text-primary-400 hover:text-primary-300 flex items-center">
              Update balances
              <TbChevronRight className="ml-1 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCards;
