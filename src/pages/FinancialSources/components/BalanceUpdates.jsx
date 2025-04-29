import React from 'react';
import { formatCurrency, formatDate, getRelativeTimeString } from '../../../utils/formatters';
import { TbArrowUpRight, TbArrowDownRight, TbNotes } from 'react-icons/tb';

const BalanceUpdates = ({ source }) => {
  // Sort updates by date (newest first)
  const sortedUpdates = [...(source.balanceUpdates || [])].sort((a, b) => 
    new Date(b.createdAt) - new Date(a.createdAt)
  );

  // Calculate balance change between updates
  const updatesWithChange = sortedUpdates.map((update, index) => {
    const previousBalance = index < sortedUpdates.length - 1 ? sortedUpdates[index + 1].balance : 0;
    const change = update.balance - previousBalance;
    const isIncrease = change >= 0;
    
    return {
      ...update,
      change,
      isIncrease
    };
  });

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
      <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Balance Updates</h3>
          <p className="mt-1 text-sm text-gray-500">History of all balance updates for this source</p>
        </div>
        <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
          {updatesWithChange.length} {updatesWithChange.length === 1 ? 'update' : 'updates'}
        </span>
      </div>
      
      {updatesWithChange.length > 0 ? (
        <div className="overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {updatesWithChange.map((update, index) => (
              <li key={update.id || index} className="hover:bg-gray-50 transition duration-150 ease-in-out">
                <div className="px-6 py-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
                        update.isIncrease ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        {update.isIncrease ? (
                          <TbArrowUpRight className="h-5 w-5 text-green-600" />
                        ) : (
                          <TbArrowDownRight className="h-5 w-5 text-red-600" />
                        )}
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">
                          {formatDate(update.createdAt, { dateStyle: 'medium' })}
                        </p>
                        <p className="text-xs text-gray-500">
                          {getRelativeTimeString(update.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900">
                        {formatCurrency(update.balance)}
                      </p>
                      {index < updatesWithChange.length - 1 && (
                        <p className={`text-xs font-medium ${
                          update.isIncrease ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {update.isIncrease ? '+' : ''}{formatCurrency(update.change)}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  {update.notes && (
                    <div className="mt-2 ml-14">
                      <div className="flex items-start">
                        <TbNotes className="h-4 w-4 text-gray-400 mt-0.5 mr-1" />
                        <p className="text-sm text-gray-500">{update.notes}</p>
                      </div>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="px-6 py-10 text-center">
          <p className="text-sm text-gray-500">No balance updates yet.</p>
        </div>
      )}
    </div>
  );
};

export default BalanceUpdates;
