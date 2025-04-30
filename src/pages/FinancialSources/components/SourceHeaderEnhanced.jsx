import React from 'react';
import { Link } from 'react-router-dom';
import { 
  TbArrowLeft, 
  TbPencil, 
  TbTrash, 
  TbRefresh,
  TbCurrencyDollar,
  TbEdit
} from 'react-icons/tb';
import { formatCurrency, getRelativeTimeString } from '../../../utils/formatters';

const SourceHeaderEnhanced = ({ 
  source, 
  latestBalance, 
  lastUpdated, 
  onEditClick, 
  onDeleteClick, 
  onUpdateBalanceClick 
}) => {
  return (
    <div className="pb-5 px-2 mb-8">
      {/* Back link */}
      <Link 
        to="/financial-sources" 
        className="inline-flex items-center mb-6 text-sm font-medium text-slate-400 hover:text-primary-400 transition-colors"
      >
        <TbArrowLeft className="mr-1 h-4 w-4" />
        Back to Financial Sources
      </Link>
      
      <div className="bg-slate-800/60 shadow-xl rounded-xl overflow-hidden border border-slate-700/50 backdrop-blur-sm hover:shadow-primary-900/20 hover:border-slate-600/50 transition-all duration-300">
        <div className="px-3 md:px-6 py-3 md:py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="flex items-center">
              <div 
                className="flex-shrink-0 h-12 md:h-16 w-12 md:w-16 rounded-xl shadow-lg flex items-center justify-center"
                style={{ backgroundColor: source?.colorCode }}
              >
                <TbCurrencyDollar className="h-8 w-8 text-white" />
              </div>
              <div className="ml-5">
                <h1 className="text-lg md:text-2xl font-bold text-white">
                  {source?.name}
                </h1>
                <p className="mt-1 text-sm text-slate-400">
                  {source?.description || 'No description'}
                </p>
              </div>
            </div>
            
            <div className="mt-4 md:mt-0 flex md:flex-col flex-row-reverse justify-between md:items-end">
              <div className="text-2xl md:text-3xl font-bold text-primary-500">
                {formatCurrency(latestBalance) }
              </div>
              {lastUpdated && (
                <div className="mt-1 text-sm text-slate-500">
                  Updated {getRelativeTimeString(lastUpdated)}
                </div>
              )}
              {!source?.isActive && (
                <span className="md:mt-2 inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-red-900/50 text-red-300 border border-red-700/50">
                  Inactive
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="px-2 md:px-6 py-4 border-t border-slate-700/50 bg-slate-700/30">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={onUpdateBalanceClick}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-primary-600 hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-300 shadow-lg shadow-primary-900/30"
            >
              <TbRefresh className="mr-2 h-4 w-4" />
              Update Balance
            </button>
            <button
              onClick={onEditClick}
              className="inline-flex items-center px-4 py-2 border border-slate-600 rounded-lg text-sm font-medium text-white bg-slate-700/50 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-all duration-200"
            >
              <TbEdit className="mr-2 h-4 w-4" />
              Edit <span className='hidden lg:inline ml-1'>Source</span>
            </button>
            <button
              onClick={onDeleteClick}
              className="inline-flex items-center px-4 py-2 border border-red-800/50 rounded-lg text-sm font-medium text-red-300 bg-red-900/30 hover:bg-red-900/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200"
            >
              <TbTrash className="mr-2 h-4 w-4" />
              Delete <span className='hidden lg:inline ml-1'>Source</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SourceHeaderEnhanced;
