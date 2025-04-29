import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  TbArrowLeft, 
  TbPencil, 
  TbTrash, 
  TbPlus,
  TbCurrencyDollar,
  TbCalendar,
  TbNotes,
  TbChartLine
} from 'react-icons/tb';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import MainLayout from '../../components/layout/MainLayout';
import useFinancial from '../../hooks/useFinancial';
import { formatCurrency, formatDate } from '../../utils/formatters';

const FinancialSourceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    financialSources, 
    loading, 
    error, 
    deleteFinancialSource,
    addBalanceUpdate
  } = useFinancial();
  
  const [source, setSource] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [updateForm, setUpdateForm] = useState({
    balance: '',
    notes: '',
  });
  const [updateErrors, setUpdateErrors] = useState({});
  
  // Find the source by ID
  useEffect(() => {
    if (!loading && financialSources.length > 0) {
      const foundSource = financialSources.find(s => s.id === id);
      
      if (foundSource) {
        setSource(foundSource);
      } else {
        // Source not found, redirect to list
        navigate('/financial-sources');
      }
    }
  }, [id, financialSources, loading, navigate]);
  
  // Get the latest balance
  const getLatestBalance = () => {
    if (!source || !source.updates || source.updates.length === 0) {
      return 0;
    }
    
    const latestUpdate = source.updates.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    )[0];
    
    return parseFloat(latestUpdate.balance);
  };
  
  // Handle delete confirmation
  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };
  
  // Handle delete confirmation
  const handleDeleteConfirm = async () => {
    try {
      await deleteFinancialSource(id);
      navigate('/financial-sources');
    } catch (error) {
      console.error('Error deleting financial source:', error);
    }
  };
  
  // Handle update modal open
  const handleUpdateClick = () => {
    setUpdateForm({
      balance: getLatestBalance().toString(),
      notes: '',
    });
    setUpdateErrors({});
    setIsUpdateModalOpen(true);
  };
  
  // Handle update form change
  const handleUpdateFormChange = (e) => {
    const { name, value } = e.target;
    setUpdateForm({
      ...updateForm,
      [name]: value,
    });
    
    // Clear error when user types
    if (updateErrors[name]) {
      setUpdateErrors({
        ...updateErrors,
        [name]: '',
      });
    }
  };
  
  // Validate update form
  const validateUpdateForm = () => {
    const errors = {};
    
    if (!updateForm.balance) {
      errors.balance = 'Balance is required';
    } else if (isNaN(parseFloat(updateForm.balance))) {
      errors.balance = 'Balance must be a number';
    }
    
    setUpdateErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Handle update form submit
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    
    if (validateUpdateForm()) {
      try {
        await addBalanceUpdate(id, {
          balance: parseFloat(updateForm.balance),
          notes: updateForm.notes,
        });
        
        setIsUpdateModalOpen(false);
      } catch (error) {
        console.error('Error updating balance:', error);
      }
    }
  };
  
  // Map source type to readable label
  const getTypeLabel = (type) => {
    switch (type) {
      case 'BANK_ACCOUNT':
        return 'Bank Account';
      case 'MONEY_MARKET':
        return 'Money Market Fund';
      case 'STOCKS':
        return 'Stocks';
      case 'MPESA':
        return 'M-Pesa';
      case 'SACCO':
        return 'SACCO';
      case 'OTHER':
        return 'Other';
      default:
        return type;
    }
  };
  
  // Prepare data for line chart
  const getChartData = () => {
    if (!source || !source.updates || source.updates.length === 0) {
      return [];
    }
    
    return source.updates
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      .map(update => ({
        date: formatDate(update.createdAt, { month: 'short', day: 'numeric' }),
        balance: parseFloat(update.balance),
      }));
  };
  
  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading financial source details...</div>
        </div>
      </MainLayout>
    );
  }
  
  if (error) {
    return (
      <MainLayout>
        <div className="bg-red-50 p-4 rounded-md">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Error loading financial source details
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  if (!source) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Financial source not found</div>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      {/* Page header */}
      <div className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
        <div className="flex items-center">
          <Link
            to="/financial-sources"
            className="inline-flex items-center mr-4 text-sm font-medium text-primary-600 hover:text-primary-500"
          >
            <TbArrowLeft className="mr-1 h-5 w-5" />
            Back to Sources
          </Link>
          <h1 className="text-2xl font-bold leading-6 text-gray-900 flex items-center">
            <div
              className="w-4 h-4 rounded-full mr-3"
              style={{ backgroundColor: source.colorCode }}
            ></div>
            {source.name}
            <span className={`ml-3 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
              source.isActive
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-800'
            }`}>
              {source.isActive ? 'Active' : 'Inactive'}
            </span>
          </h1>
        </div>
        <div className="mt-3 flex sm:mt-0 sm:ml-4">
          <button
            type="button"
            onClick={handleUpdateClick}
            className="inline-flex items-center mr-3 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <TbPlus className="-ml-1 mr-2 h-5 w-5" />
            Update Balance
          </button>
          <Link
            to={`/financial-sources/${id}/edit`}
            className="inline-flex items-center mr-3 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <TbPencil className="-ml-1 mr-2 h-5 w-5" />
            Edit
          </Link>
          <button
            type="button"
            onClick={handleDeleteClick}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <TbTrash className="-ml-1 mr-2 h-5 w-5" />
            Delete
          </button>
        </div>
      </div>

      {/* Source details */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Details card */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Financial Source Details</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Details and information about this financial source.</p>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Name</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{source.name}</dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Type</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{getTypeLabel(source.type)}</dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Current Balance</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 font-semibold">
                  {formatCurrency(getLatestBalance())}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Description</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {source.description || 'No description provided'}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Created At</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {formatDate(source.createdAt, { dateStyle: 'full' })}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Status</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    source.isActive
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {source.isActive ? 'Active' : 'Inactive'}
                  </span>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Balance history chart */}
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Balance History</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Historical balance data for this financial source.</p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <div className="h-72 p-4">
              {getChartData().length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={getChartData()}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip formatter={(value) => formatCurrency(value)} />
                    <Line
                      type="monotone"
                      dataKey="balance"
                      name="Balance"
                      stroke={source.colorCode}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-gray-500">No balance history available</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Balance update history */}
      <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">Balance Updates</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">History of all balance updates for this source.</p>
          </div>
          <button
            type="button"
            onClick={handleUpdateClick}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <TbPlus className="-ml-1 mr-2 h-5 w-5" />
            Add Update
          </button>
        </div>
        <div className="border-t border-gray-200">
          {source.updates && source.updates.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Balance
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Notes
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {source.updates
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .map((update) => (
                      <tr key={update.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(update.createdAt, { dateStyle: 'medium', timeStyle: 'short' })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {formatCurrency(update.balance)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {update.notes || 'No notes'}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <TbChartLine className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No balance updates</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by adding a balance update.</p>
              <div className="mt-6">
                <button
                  type="button"
                  onClick={handleUpdateClick}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  <TbPlus className="-ml-1 mr-2 h-5 w-5" />
                  Add Balance Update
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete confirmation modal */}
      {isDeleteModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <TbTrash className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Delete Financial Source</h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete <span className="font-semibold">{source.name}</span>?
                        This action cannot be undone and all associated balance history will be permanently removed.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleDeleteConfirm}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Update balance modal */}
      {isUpdateModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleUpdateSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 sm:mx-0 sm:h-10 sm:w-10">
                      <TbCurrencyDollar className="h-6 w-6 text-primary-600" />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">Update Balance</h3>
                      <div className="mt-4 space-y-4">
                        {/* Balance field */}
                        <div>
                          <label htmlFor="balance" className="block text-sm font-medium text-gray-700">
                            Current Balance
                          </label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <TbCurrencyDollar className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              type="text"
                              name="balance"
                              id="balance"
                              value={updateForm.balance}
                              onChange={handleUpdateFormChange}
                              className={`block w-full pl-10 pr-3 py-2 border ${
                                updateErrors.balance ? 'border-red-300' : 'border-gray-300'
                              } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
                              placeholder="0.00"
                            />
                          </div>
                          {updateErrors.balance && (
                            <p className="mt-2 text-sm text-red-600">{updateErrors.balance}</p>
                          )}
                        </div>

                        {/* Notes field */}
                        <div>
                          <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                            Notes (optional)
                          </label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <TbNotes className="h-5 w-5 text-gray-400" />
                            </div>
                            <textarea
                              name="notes"
                              id="notes"
                              value={updateForm.notes}
                              onChange={handleUpdateFormChange}
                              rows="3"
                              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                              placeholder="Add notes about this update (e.g., 'Monthly interest', 'Deposit', etc.)"
                            ></textarea>
                          </div>
                        </div>

                        {/* Date info */}
                        <div className="flex items-center text-sm text-gray-500">
                          <TbCalendar className="mr-2 h-5 w-5" />
                          <span>
                            Update will be recorded as of {formatDate(new Date(), { dateStyle: 'full' })}
                          </span>
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
                    Save Update
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsUpdateModalOpen(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default FinancialSourceDetail;
