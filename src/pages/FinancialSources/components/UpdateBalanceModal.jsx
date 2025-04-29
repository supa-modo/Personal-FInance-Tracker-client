import React from 'react';
import { TbCurrencyDollar, TbNotes } from 'react-icons/tb';

const UpdateBalanceModal = ({ 
  isOpen, 
  updateForm, 
  updateErrors, 
  onClose, 
  onSubmit, 
  onChange 
}) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed z-50 inset-0 overflow-y-auto" style={{ zIndex: 100 }}>
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 bg-opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <form onSubmit={onSubmit}>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 sm:mx-0 sm:h-10 sm:w-10">
                  <TbCurrencyDollar className="h-6 w-6 text-primary-600" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Update Balance
                  </h3>
                  <div className="mt-4 space-y-4">
                    <div>
                      <label htmlFor="balance" className="block text-sm font-medium text-gray-700">
                        New Balance
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">KES</span>
                        </div>
                        <input
                          type="text"
                          name="balance"
                          id="balance"
                          value={updateForm.balance}
                          onChange={onChange}
                          className={`block w-full pl-12 pr-12 sm:text-sm rounded-md ${
                            updateErrors.balance 
                              ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500' 
                              : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500'
                          }`}
                          placeholder="0.00"
                          aria-describedby="balance-currency"
                        />
                      </div>
                      {updateErrors.balance && (
                        <p className="mt-2 text-sm text-red-600" id="balance-error">
                          {updateErrors.balance}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                        Notes (Optional)
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="notes"
                          name="notes"
                          rows={3}
                          value={updateForm.notes}
                          onChange={onChange}
                          className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="Add any notes about this balance update..."
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Save
              </button>
              <button
                type="button"
                onClick={onClose}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateBalanceModal;
