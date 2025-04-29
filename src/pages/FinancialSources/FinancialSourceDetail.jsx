import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import useFinancial from '../../hooks/useFinancial';

// Import components
import SourceHeader from './components/SourceHeader';
import SourceDetailsCard from './components/SourceDetailsCard';
import BalanceChart from './components/BalanceChart';
import BalanceUpdates from './components/BalanceUpdates';
import DeleteModal from './components/DeleteModal';
import UpdateBalanceModal from './components/UpdateBalanceModal';
import EditFinancialSourceModal from './components/EditFinancialSourceModal';

// Import utilities
import { getChartData, getLatestBalance } from './utils.jsx';
import { TbAlertCircle, TbRefresh, TbArrowLeft } from 'react-icons/tb';

const FinancialSourceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    financialSources, 
    loading, 
    error, 
    deleteFinancialSource,
    addBalanceUpdate,
    updateFinancialSource
  } = useFinancial();
  
  const [source, setSource] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
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
  
  // Handle delete click
  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };
  
  const handleDeleteConfirm = async () => {
    try {
      await deleteFinancialSource(id);
      navigate('/financial-sources');
    } catch (error) {
      console.error('Error deleting financial source:', error);
    }
  };
  
  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };
  
  const handleEditSource = (updatedSource) => {
    updateFinancialSource(updatedSource);
    setIsEditModalOpen(false);
    // Update the local source state to reflect changes immediately
    setSource(prev => ({ ...prev, ...updatedSource }));
  };
  
  // Handle update modal open
  const handleUpdateClick = () => {
    setUpdateForm({
      balance: source.balance || getLatestBalance(source) || '',
      notes: '',
    });
    setUpdateErrors({});
    setIsUpdateModalOpen(true);
  };
  
  // Handle update form change
  const handleUpdateFormChange = (e) => {
    const { name, value } = e.target;
    setUpdateForm(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field if it exists
    if (updateErrors[name]) {
      setUpdateErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };
  
  // Handle form submission
  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    const errors = {};
    if (!updateForm.balance) {
      errors.balance = 'Balance is required';
    } else if (isNaN(updateForm.balance)) {
      errors.balance = 'Balance must be a number';
    }
    
    if (Object.keys(errors).length > 0) {
      setUpdateErrors(errors);
      return;
    }
    
    // Add balance update
    addBalanceUpdate(source.id, {
      balance: parseFloat(updateForm.balance),
      notes: updateForm.notes,
      createdAt: new Date().toISOString(),
    });
    
    // Close modal and reset form
    setIsUpdateModalOpen(false);
    setUpdateForm({ balance: '', notes: '' });
    setUpdateErrors({});
  };
  
  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-500 mx-auto"></div>
            <p className="mt-6 text-gray-600 font-medium">Loading financial source details...</p>
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
              <h3 className="text-lg font-medium text-red-800">Error Loading Financial Source</h3>
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
  
  if (!source) {
    return (
      <MainLayout>
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <TbAlertCircle className="h-6 w-6 text-yellow-500" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-yellow-800">Financial Source Not Found</h3>
              <p className="mt-1 text-sm text-yellow-700">
                The financial source you are looking for does not exist or has been deleted.
              </p>
              <div className="mt-4">
                <Link
                  to="/financial-sources"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                >
                  <TbArrowLeft className="-ml-1 mr-2 h-5 w-5" />
                  Back to Financial Sources
                </Link>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  // Prepare chart data
  const chartData = getChartData(source);
  
  return (
    <MainLayout>
      {/* Source header with actions */}
      <SourceHeader 
        source={source} 
        id={id} 
        handleUpdateClick={handleUpdateClick} 
        handleDeleteClick={handleDeleteClick}
        handleEditClick={handleEditClick}
      />

      {/* Main content */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Source details card */}
        <SourceDetailsCard source={source} getLatestBalance={() => getLatestBalance(source)} />
        
        {/* Balance chart */}
        <BalanceChart chartData={chartData} />
      </div>
      
      {/* Balance updates list */}
      <div className="mt-6">
        <BalanceUpdates source={source} />
      </div>
      
      {/* Delete confirmation modal */}
      <DeleteModal 
        isOpen={isDeleteModalOpen} 
        source={source} 
        onClose={() => setIsDeleteModalOpen(false)} 
        onConfirm={handleDeleteConfirm} 
      />
      
      {/* Update balance modal */}
      <UpdateBalanceModal 
        isOpen={isUpdateModalOpen} 
        updateForm={updateForm} 
        updateErrors={updateErrors} 
        onClose={() => setIsUpdateModalOpen(false)} 
        onSubmit={handleUpdateSubmit} 
        onChange={handleUpdateFormChange} 
      />
      
      {/* Edit financial source modal */}
      <EditFinancialSourceModal 
        isOpen={isEditModalOpen} 
        source={source} 
        onClose={() => setIsEditModalOpen(false)} 
        onSubmit={handleEditSource} 
      />
    </MainLayout>
  );
};

export default FinancialSourceDetail;
