import React from 'react';
import { formatCurrency, formatDate, getRelativeTimeString } from '../../../utils/formatters';
import { getTypeLabel } from '../utils.jsx';

const SourceDetailsCard = ({ source, getLatestBalance }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
      <div className="px-6 py-5 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900">Financial Source Details</h3>
        <p className="mt-1 text-sm text-gray-500">Details and information about this financial source</p>
      </div>
      <div className="divide-y divide-gray-200">
        <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <p className="text-sm font-medium text-gray-500">Name</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm font-medium text-gray-900">{source.name}</p>
          </div>
        </div>
        
        <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <p className="text-sm font-medium text-gray-500">Type</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm font-medium text-gray-900">{getTypeLabel(source.type)}</p>
          </div>
        </div>
        
        <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <p className="text-sm font-medium text-gray-500">Current Balance</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm font-semibold text-gray-900">{formatCurrency(getLatestBalance())}</p>
          </div>
        </div>
        
        <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <p className="text-sm font-medium text-gray-500">Description</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm font-medium text-gray-900">{source.description || 'No description provided'}</p>
          </div>
        </div>
        
        <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <p className="text-sm font-medium text-gray-500">Created At</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm font-medium text-gray-900">
              {formatDate(source.createdAt, { dateStyle: 'full' })}
              <span className="text-xs text-gray-500 ml-2">
                ({getRelativeTimeString(source.createdAt)})
              </span>
            </p>
          </div>
        </div>
        
        <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <p className="text-sm font-medium text-gray-500">Status</p>
          </div>
          <div className="md:col-span-2">
            <span className={`px-2.5 py-0.5 inline-flex text-xs font-medium rounded-full ${
              source.isActive
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-800'
            }`}>
              {source.isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>
        
        {source.lastUpdated && (
          <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1">
              <p className="text-sm font-medium text-gray-500">Last Updated</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm font-medium text-gray-900">
                {formatDate(source.lastUpdated, { dateStyle: 'medium' })}
                <span className="text-xs text-gray-500 ml-2">
                  ({getRelativeTimeString(source.lastUpdated)})
                </span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SourceDetailsCard;
