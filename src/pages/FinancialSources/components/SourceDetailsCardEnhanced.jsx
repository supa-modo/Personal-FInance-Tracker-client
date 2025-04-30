import React from 'react';
import { formatDate } from '../../../utils/formatters';

const SourceDetailsCardEnhanced = ({ source, getTypeLabel }) => {
  return (
    <div className="mb-0 md:mb-8 bg-slate-800/60 shadow-xl rounded-t-3xl md:rounded-xl overflow-hidden border border-slate-700/50 backdrop-blur-sm hover:shadow-primary-900/20 hover:border-slate-600/50 transition-all duration-300">
      <div className="px-6 py-5 border-b border-slate-700/50">
        <h2 className="text-lg font-semibold text-primary-600">Source Details</h2>
      </div>
      <div className="p-6">
        <dl className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-2">
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-slate-400">Name</dt>
            <dd className="mt-1 text-base text-white">{source?.name}</dd>
          </div>
          
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-slate-400">Type</dt>
            <dd className="mt-1 text-base text-white">{getTypeLabel(source?.type)}</dd>
          </div>
          
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-slate-400">Status</dt>
            <dd className="mt-1 text-base">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium ${
                source?.isActive 
                  ? 'bg-green-900/50 text-green-300 border border-green-700/50' 
                  : 'bg-red-900/50 text-red-300 border border-red-700/50'
              }`}>
                {source?.isActive ? 'Active' : 'Inactive'}
              </span>
            </dd>
          </div>
          
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-slate-400">Created On</dt>
            <dd className="mt-1 text-base text-white">
              {source?.createdAt ? formatDate(source.createdAt, { dateStyle: 'medium' }) : 'N/A'}
            </dd>
          </div>
          
          
          
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-slate-400">Color</dt>
            <dd className="mt-1 flex items-center">
              <div 
                className="h-6 w-6 rounded-md mr-2" 
                style={{ backgroundColor: source?.colorCode }}
              ></div>
              <span className="text-white">{source?.colorCode}</span>
            </dd>
          </div>
          
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-slate-400">Balance Updates</dt>
            <dd className="mt-1 text-base text-white">
              {source?.updates?.length || 0} updates
            </dd>
          </div>

          <div className="sm:col-span-2">
            <dt className="text-sm font-medium text-slate-400">Description</dt>
            <dd className="mt-1 text-base text-white">
              {source?.description || 'No description provided'}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default SourceDetailsCardEnhanced;
