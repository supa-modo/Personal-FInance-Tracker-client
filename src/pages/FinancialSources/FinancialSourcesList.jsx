import React, { useState } from 'react';
import { 
  TbCurrencyDollar,
  TbWallet,
  TbCreditCard,
  TbPigMoney,
  TbBuildingBank,
  TbTrendingUp,
  TbAlertCircle,
  TbRefresh,
  TbAdjustments,
  TbLoader
} from 'react-icons/tb';
import MainLayout from '../../components/layout/MainLayout';
import useFinancial from '../../hooks/useFinancial';
import SourcesFilter from './components/SourcesFilter';
import SourcesList from './components/SourcesList';
import AddFinancialSourceModalEnhanced from './components/AddFinancialSourceModalEnhanced';
import DeleteModalEnhanced from './components/DeleteModalEnhanced';
import EditFinancialSourceModalEnhanced from './components/EditFinancialSourceModalEnhanced';
import SourcesHeader from './components/SourcesHeader';

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
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-500"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <TbLoader className="h-8 w-8 text-primary-500 animate-pulse" />
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  if (error) {
    return (
      <MainLayout>
        <div className="bg-red-900/30 backdrop-blur-sm border border-red-700/50 text-red-300 mx-3 md:mx-1 px-6 py-5 rounded-xl relative mb-6 shadow-lg">
          <div className="flex items-center">
            <TbAlertCircle className="h-6 w-6 mr-3" />
            <div>
              <h3 className="text-lg font-medium text-red-300">Error Loading Financial Sources</h3>
              <p className="mt-1 text-sm text-red-400">
                {error}
              </p>
              <button 
                className="mt-3 inline-flex items-center px-4 py-2 border border-red-700/50 rounded-lg text-sm font-medium text-white bg-red-700/50 hover:bg-red-700/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200"
                onClick={() => window.location.reload()}
              >
                <TbRefresh className="mr-2 h-4 w-4" />
                Retry
              </button>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <>
    
    <MainLayout>
      {/* Page header */}
      <SourcesHeader onAddClick={() => setIsAddModalOpen(true)} />

      {/* Filters */}
      <SourcesFilter 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterType={filterType}
        setFilterType={setFilterType}
        showInactive={showInactive}
        setShowInactive={setShowInactive}
        sourceTypes={sourceTypes}
        getTypeLabel={getTypeLabel}
        onClearFilters={() => {
          setSearchTerm('');
          setFilterType('');
          setShowInactive(false);
        }}
      />

      {/* Financial sources list */}
      <SourcesList 
        sources={sourcesWithBalance}
        getTypeIcon={getTypeIcon}
        getTypeLabel={getTypeLabel}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
      />

      
    </MainLayout>

    {/* Modals */}
    <AddFinancialSourceModalEnhanced 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddSource}
      />
      
      <EditFinancialSourceModalEnhanced 
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSourceToEdit(null);
        }}
        onEdit={handleEditSource}
        source={sourceToEdit}
      />
      
      <DeleteModalEnhanced 
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSourceToDelete(null);
        }}
        onDelete={handleDeleteConfirm}
        itemName={sourceToDelete?.name}
        itemType="financial source"
      />
    </>
    
  );
};

export default FinancialSourcesList;
