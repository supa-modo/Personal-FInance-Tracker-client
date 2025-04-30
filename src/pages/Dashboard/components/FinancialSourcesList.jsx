import React from 'react';
import { Link } from 'react-router-dom';
import { 
  TbPlus, 
  TbChevronRight,
  TbWallet
} from 'react-icons/tb';
import { formatCurrency, getRelativeTimeString } from '../../../utils/formatters';

const FinancialSourcesList = ({ sourceData, getTypeIcon, getTypeLabel }) => {
  return (
    <div className="md:mt-8 bg-slate-800/60 shadow-xl md:rounded-xl overflow-hidden border border-slate-700/50 backdrop-blur-sm hover:shadow-primary-900/20 hover:border-slate-600/50 transition-all duration-300">
      <div className="px-4 md:px-6 py-5 border-b border-slate-700/50">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-primary-500">Financial Sources</h2>
          <Link
            to="/financial-sources/new"
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-300 shadow-lg shadow-primary-900/30"
          >
            <TbPlus className="-ml-1 mr-1 h-4 w-4" />
            Add New Source
          </Link>
        </div>
      </div>
      <div className="overflow-hidden">
        <div className="flow-root">
          <ul className="divide-y divide-slate-700/30">
            {sourceData.map((source) => (
              <li key={source.id} className="px-3 md:px-6 py-5 hover:bg-slate-700/30 transition duration-150 ease-in-out">
                <Link to={`/financial-sources/${source.id}`} className="block">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div
                        className="inline-flex items-center justify-center h-12 w-12 rounded-lg shadow-lg"
                        style={{ backgroundColor: source.colorCode }}
                      >
                        {getTypeIcon(source.type)}
                      </div>
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-base font-medium text-white truncate">
                          {source.name}
                        </p>
                        <div className="ml-2 flex-shrink-0 flex">
                          <p className="text-base font-semibold text-white">
                            {formatCurrency(source.balance)}
                          </p>
                        </div>
                      </div>
                      <div className="mt-1 flex items-center justify-between">
                        <p className="text-sm text-slate-400 truncate">
                          {getTypeLabel(source.type)}
                        </p>
                        <div className="ml-2 flex items-center">
                          {source.change !== 0 && (
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${source.isPositive ? 'bg-green-900/50 text-green-300 border border-green-700/50' : 'bg-red-900/50 text-red-300 border border-red-700/50'}`}>
                              {source.isPositive ? '+' : ''}{source.changePercentage.toFixed(1)}%
                            </span>
                          )}
                          {source.lastUpdated && (
                            <span className="ml-2 text-xs text-slate-400">
                              Updated {getRelativeTimeString(source.lastUpdated)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="ml-2">
                      <TbChevronRight className="h-5 w-5 text-slate-400" />
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {sourceData.length === 0 && (
          <div className="px-6 py-10 text-center">
            <TbWallet className="mx-auto h-12 w-12 text-slate-500" />
            <h3 className="mt-2 text-base font-medium text-white">No financial sources</h3>
            <p className="mt-1 text-sm text-slate-400">Get started by adding your first financial source.</p>
            <div className="mt-6">
              <Link
                to="/financial-sources/new"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-500 transition-all duration-300 shadow-lg shadow-primary-900/30"
              >
                <TbPlus className="-ml-1 mr-2 h-5 w-5" />
                Add Financial Source
              </Link>
            </div>
          </div>
        )}
        {sourceData.length > 0 && (
          <div className="px-6 py-4 border-t border-slate-700/50 bg-slate-700/30">
            <Link
              to="/financial-sources"
              className="text-sm font-medium text-primary-400 hover:text-primary-300 flex items-center justify-center"
            >
              View all financial sources
              <TbChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinancialSourcesList;
