import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  TbPlus, 
  TbPencil, 
  TbTrash, 
  TbEye, 
  TbSearch,
  TbFilter,
  TbX,
  TbCheck
} from 'react-icons/tb';
import MainLayout from '../../components/layout/MainLayout';
import useFinancial from '../../hooks/useFinancial';
import { formatCurrency, formatDate } from '../../utils/formatters';

const FinancialSourcesList = () => {
  const { financialSources, loading, error, deleteFinancialSource } = useFinancial();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [showInactive, setShowInactive] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [sourceToDelete, setSourceToDelete] = useState(null);
  
  // Filter sources based on search term, type, and active status
  const filteredSources = financialSources.filter(source => {
    const matchesSearch = source.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (source.description && source.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = filterType === '' || source.type === filterType;
    const matchesStatus = showInactive || source.isActive;
    
    return matchesSearch && matchesType && matchesStatus;
  });
  
  // Get the latest balance for each source
  const sourcesWithBalance = filteredSources.map(source => {
    const updates = source.updates || [];
    const latestUpdate = updates.length > 0 
      ? updates.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0] 
      : null;
    
    return {
      ...source,
      balance: latestUpdate ? parseFloat(latestUpdate.balance) : 0,
      lastUpdated: latestUpdate ? latestUpdate.createdAt : null,
    };
  });
  
  // Handle delete confirmation
  const handleDeleteClick = (source) => {
    setSourceToDelete(source);
    setIsDeleteModalOpen(true);
  };
  
  // Handle delete confirmation
  const handleDeleteConfirm = async () => {
    if (sourceToDelete) {
      try {
        await deleteFinancialSource(sourceToDelete.id);
        setIsDeleteModalOpen(false);
        setSourceToDelete(null);
      } catch (error) {
        console.error('Error deleting financial source:', error);
      }
    }
  };
  
  // Get unique source types
  const sourceTypes = [...new Set(financialSources.map(source => source.type))];
  
  // Map source types to readable labels
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
  
  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading financial sources...</div>
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
                Error loading financial sources
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
  
  return (
    <MainLayout>
      {/* Page header */}
      <div className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold leading-6 text-gray-900">Financial Sources</h1>
        <div className="mt-3 sm:mt-0 sm:ml-4">
          <Link
            to="/financial-sources/new"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <TbPlus className="-ml-1 mr-2 h-5 w-5" />
            Add New Source
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-6 bg-white shadow rounded-lg p-4">
        <div className="sm:flex sm:items-center sm:justify-between">
          {/* Search */}
          <div className="relative rounded-md shadow-sm max-w-xs w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <TbSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
              placeholder="Search sources"
            />
          </div>

          {/* Filters */}
          <div className="mt-4 sm:mt-0 flex flex-wrap gap-2">
            {/* Type filter */}
            <div className="relative inline-block text-left">
              <div>
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  id="type-filter"
                  aria-expanded="true"
                  aria-haspopup="true"
                  onClick={() => document.getElementById('type-dropdown').classList.toggle('hidden')}
                >
                  <TbFilter className="-ml-1 mr-2 h-5 w-5" />
                  {filterType ? getTypeLabel(filterType) : 'All Types'}
                </button>
              </div>
              <div
                id="type-dropdown"
                className="hidden origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="type-filter"
              >
                <div className="py-1" role="none">
                  <button
                    onClick={() => {
                      setFilterType('');
                      document.getElementById('type-dropdown').classList.add('hidden');
                    }}
                    className="text-gray-700 block px-4 py-2 text-sm w-full text-left hover:bg-gray-100"
                    role="menuitem"
                  >
                    All Types
                  </button>
                  {sourceTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        setFilterType(type);
                        document.getElementById('type-dropdown').classList.add('hidden');
                      }}
                      className="text-gray-700 block px-4 py-2 text-sm w-full text-left hover:bg-gray-100"
                      role="menuitem"
                    >
                      {getTypeLabel(type)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Show inactive toggle */}
            <button
              type="button"
              onClick={() => setShowInactive(!showInactive)}
              className={`inline-flex items-center px-4 py-2 border ${
                showInactive
                  ? 'border-primary-600 bg-primary-50 text-primary-700'
                  : 'border-gray-300 bg-white text-gray-700'
              } rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2`}
            >
              {showInactive ? (
                <TbCheck className="-ml-1 mr-2 h-5 w-5" />
              ) : (
                <TbX className="-ml-1 mr-2 h-5 w-5" />
              )}
              Show Inactive
            </button>
          </div>
        </div>
      </div>

      {/* Financial sources list */}
      <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-md">
        {sourcesWithBalance.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {sourcesWithBalance.map((source) => (
              <li key={source.id} className={`${!source.isActive ? 'bg-gray-50' : ''}`}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div
                        className="w-4 h-4 rounded-full mr-3"
                        style={{ backgroundColor: source.colorCode }}
                      ></div>
                      <p className={`text-sm font-medium ${source.isActive ? 'text-primary-600' : 'text-gray-500'}`}>
                        {source.name}
                      </p>
                    </div>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        source.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {source.isActive ? 'Active' : 'Inactive'}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        {getTypeLabel(source.type)}
                      </p>
                      <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                        {formatCurrency(source.balance)}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <p>
                        Last updated{' '}
                        {source.lastUpdated
                          ? formatDate(source.lastUpdated, { dateStyle: 'medium' })
                          : 'never'}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 flex justify-end space-x-2">
                    <Link
                      to={`/financial-sources/${source.id}`}
                      className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      <TbEye className="-ml-0.5 mr-1 h-4 w-4" />
                      View
                    </Link>
                    <Link
                      to={`/financial-sources/${source.id}/edit`}
                      className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      <TbPencil className="-ml-0.5 mr-1 h-4 w-4" />
                      Edit
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDeleteClick(source)}
                      className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <TbTrash className="-ml-0.5 mr-1 h-4 w-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-12">
            <p className="text-sm text-gray-500">No financial sources found</p>
            <div className="mt-6">
              <Link
                to="/financial-sources/new"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <TbPlus className="-ml-1 mr-2 h-5 w-5" />
                Add New Source
              </Link>
            </div>
          </div>
        )}
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
                        Are you sure you want to delete <span className="font-semibold">{sourceToDelete?.name}</span>?
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
    </MainLayout>
  );
};

export default FinancialSourcesList;
