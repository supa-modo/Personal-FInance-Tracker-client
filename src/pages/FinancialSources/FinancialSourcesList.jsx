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
  TbCheck,
  TbChevronRight,
  TbCurrencyDollar,
  TbWallet,
  TbCreditCard,
  TbPigMoney,
  TbBuildingBank,
  TbTrendingUp,
  TbAlertCircle,
  TbRefresh,
  TbAdjustments
} from 'react-icons/tb';
import MainLayout from '../../components/layout/MainLayout';
import useFinancial from '../../hooks/useFinancial';
import { formatCurrency, formatDate, getRelativeTimeString } from '../../utils/formatters';
import AddFinancialSourceModal from './components/AddFinancialSourceModal';
import DeleteModal from './components/DeleteModal';
import EditFinancialSourceModal from './components/EditFinancialSourceModal';

const FinancialSourcesList = () => {
  const { financialSources, loading, error, deleteFinancialSource, addFinancialSource, updateFinancialSource } = useFinancial();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [showInactive, setShowInactive] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [sourceToDelete, setSourceToDelete] = useState(null);
  const [sourceToEdit, setSourceToEdit] = useState(null);
  
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
  
  const handleAddSource = (newSource) => {
    addFinancialSource(newSource);
    setIsAddModalOpen(false);
  };
  
  const handleEditSource = (updatedSource) => {
    updateFinancialSource(updatedSource);
    setIsEditModalOpen(false);
    setSourceToEdit(null);
  };
  
  const handleEditClick = (source) => {
    setSourceToEdit(source);
    setIsEditModalOpen(true);
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
  
  // Helper function to get type icon
  const getTypeIcon = (type) => {
    switch (type) {
      case 'BANK_ACCOUNT': return <TbBuildingBank className="h-5 w-5 text-white" />;
      case 'MONEY_MARKET': return <TbPigMoney className="h-5 w-5 text-white" />;
      case 'STOCKS': return <TbTrendingUp className="h-5 w-5 text-white" />;
      case 'MPESA': return <TbCreditCard className="h-5 w-5 text-white" />;
      case 'SACCO': return <TbWallet className="h-5 w-5 text-white" />;
      case 'OTHER': return <TbCurrencyDollar className="h-5 w-5 text-white" />;
      default: return <TbCurrencyDollar className="h-5 w-5 text-white" />;
    }
  };
  
  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-500 mx-auto"></div>
            <p className="mt-6 text-gray-600 font-medium">Loading your financial sources...</p>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  if (error) {
    return (
      <MainLayout>
        <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <TbAlertCircle className="h-6 w-6 text-red-500" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-red-800">Error Loading Financial Sources</h3>
              <p className="mt-1 text-sm text-red-700">
                {error}
              </p>
              <button 
                className="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                onClick={() => window.location.reload()}
              >
                <TbRefresh className="-ml-1 mr-2 h-4 w-4" />
                Retry
              </button>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      {/* Page header */}
      <div className="pb-5 mb-6 sm:flex sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Financial Sources</h1>
        <div className="mt-3 sm:mt-0 sm:ml-4">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <TbPlus className="-ml-1 mr-2 h-5 w-5" />
            Add New Source
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-8 bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
        <div className="px-6 py-5 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
            <button 
              onClick={() => {
                setSearchTerm('');
                setFilterType('');
                setShowInactive(false);
              }}
              className="text-sm text-primary-600 hover:text-primary-500 flex items-center"
            >
              <TbX className="mr-1 h-4 w-4" />
              Clear filters
            </button>
          </div>
        </div>
        <div className="px-6 py-5">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {/* Search */}
            <div className="relative rounded-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <TbSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md shadow-sm"
                placeholder="Search sources"
              />
            </div>
            
            {/* Type filter */}
            <div>
              <label htmlFor="type-filter" className="block text-sm font-medium text-gray-700 mb-1">Source Type</label>
              <div className="relative">
                <select
                  id="type-filter"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md shadow-sm"
                >
                  <option value="">All Types</option>
                  {sourceTypes.map(type => (
                    <option key={type} value={type}>{getTypeLabel(type)}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <TbFilter className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Show inactive toggle */}
            <div className="flex items-center">
              <div className="flex items-center h-full">
                <div className="relative inline-flex items-center">
                  <div className="flex items-center">
                    <input
                      id="show-inactive"
                      type="checkbox"
                      checked={showInactive}
                      onChange={(e) => setShowInactive(e.target.checked)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="show-inactive" className="ml-2 block text-sm font-medium text-gray-700">
                      Show inactive sources
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Financial sources list */}
      <div className="mt-6 bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
        <div className="px-6 py-5 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Financial Sources</h2>
            <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {sourcesWithBalance.length} {sourcesWithBalance.length === 1 ? 'source' : 'sources'}
            </span>
          </div>
        </div>
        
        {sourcesWithBalance.length > 0 ? (
          <div className="overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {sourcesWithBalance.map((source) => (
                <li key={source.id} className={`${!source.isActive ? 'bg-gray-50' : ''} hover:bg-gray-50 transition duration-150 ease-in-out`}>
                  <div className="px-6 py-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div
                          className="inline-flex items-center justify-center h-12 w-12 rounded-lg"
                          style={{ backgroundColor: source.colorCode }}
                        >
                          {getTypeIcon(source.type)}
                        </div>
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className={`text-base font-medium ${source.isActive ? 'text-gray-900' : 'text-gray-500'}`}>
                              {source.name}
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                              {getTypeLabel(source.type)}
                              {source.description && (
                                <span className="ml-2 text-gray-400">• {source.description}</span>
                              )}
                            </p>
                          </div>
                          <div className="ml-2 flex-shrink-0 flex flex-col items-end">
                            <p className="text-base font-semibold text-gray-900">
                              {formatCurrency(source.balance)}
                            </p>
                            <div className="mt-1 flex items-center">
                              <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                source.isActive
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}>
                                {source.isActive ? 'Active' : 'Inactive'}
                              </span>
                              {source.lastUpdated && (
                                <span className="ml-2 text-xs text-gray-500">
                                  Updated {getRelativeTimeString(source.lastUpdated)}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 flex justify-end space-x-3">
                          <Link
                            to={`/financial-sources/${source.id}`}
                            className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                          >
                            <TbEye className="-ml-0.5 mr-1.5 h-4 w-4" />
                            View
                          </Link>
                          <button
                            onClick={() => handleEditClick(source)}
                            className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                          >
                            <TbPencil className="-ml-0.5 mr-1.5 h-4 w-4" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteClick(source)}
                            className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          >
                            <TbTrash className="-ml-0.5 mr-1.5 h-4 w-4" />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="px-6 py-10 text-center">
            <TbWallet className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-base font-medium text-gray-900">No financial sources found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by creating a new financial source.
            </p>
            <div className="mt-6">
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <TbPlus className="-ml-1 mr-2 h-5 w-5" />
                Add Financial Source
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete confirmation modal */}
      <DeleteModal 
        isOpen={isDeleteModalOpen}
        source={sourceToDelete}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSourceToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
      />
      {/* Add Financial Source Modal */}
      <AddFinancialSourceModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddSource}
      />

      {/* Edit Financial Source Modal */}
      <EditFinancialSourceModal 
        isOpen={isEditModalOpen}
        source={sourceToEdit}
        onClose={() => {
          setIsEditModalOpen(false);
          setSourceToEdit(null);
        }}
        onSubmit={handleEditSource}
      />
    </MainLayout>
  );
};

export default FinancialSourcesList;
