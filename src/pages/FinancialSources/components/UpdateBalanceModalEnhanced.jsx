import React, { useState, useEffect } from 'react';
import { 
  TbX, 
  TbCurrencyDollar, 
  TbAlertCircle,
  TbArrowUpRight,
  TbArrowDownRight,
  TbChartPie,
  TbRefresh
} from 'react-icons/tb';
import { formatCurrency } from '../../../utils/formatters';

const UpdateBalanceModalEnhanced = ({ isOpen, onClose, onSubmit, source, currentBalance }) => {
  const [formData, setFormData] = useState({
    balance: '',
    notes: '',
  });
  
  const [errors, setErrors] = useState({});
  const [balanceChange, setBalanceChange] = useState({
    amount: 0,
    isPositive: true,
    percentage: 0
  });
  
  // Reset form when source changes
  useEffect(() => {
    if (source && isOpen) {
      setFormData({
        balance: currentBalance ? currentBalance.toString() : '',
        notes: '',
      });
      setErrors({});
    }
  }, [source, isOpen, currentBalance]);
  
  // Calculate balance change
  useEffect(() => {
    if (formData.balance && currentBalance !== null && currentBalance !== undefined) {
      const newBalance = parseFloat(formData.balance);
      const oldBalance = parseFloat(currentBalance);
      
      if (!isNaN(newBalance) && !isNaN(oldBalance) && oldBalance !== 0) {
        const change = newBalance - oldBalance;
        const percentage = (change / oldBalance) * 100;
        
        setBalanceChange({
          amount: change,
          isPositive: change >= 0,
          percentage: percentage
        });
      } else {
        setBalanceChange({
          amount: 0,
          isPositive: true,
          percentage: 0
        });
      }
    }
  }, [formData.balance, currentBalance]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // For balance field, only allow numbers and decimal point
    if (name === 'balance') {
      if (value === '' || /^[0-9]*\.?[0-9]*$/.test(value)) {
        setFormData({
          ...formData,
          [name]: value
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.balance.trim()) {
      newErrors.balance = 'Balance is required';
    } else if (isNaN(parseFloat(formData.balance))) {
      newErrors.balance = 'Balance must be a valid number';
    } else if (parseFloat(formData.balance) < 0) {
      newErrors.balance = 'Balance cannot be negative';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        balance: parseFloat(formData.balance),
        notes: formData.notes.trim(),
        sourceId: source?.id
      });
      
      // Reset form
      setFormData({
        balance: '',
        notes: '',
      });
      setErrors({});
      
      // Close the modal
      onClose();
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 text-center ">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm transition-opacity" 
          onClick={onClose}
        ></div>

        {/* Modal panel */}
        <div className="inline-block align-bottom bg-slate-800/90 backdrop-blur-xl rounded-2xl w-full mx-3 md:mx-0 px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6 border border-slate-700/50 relative">
          {/* Close button */}
          <div className="absolute top-3 right-3">
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/50 transition-colors"
            >
              <TbX className="h-5 w-5" />
            </button>
          </div>
          
          <div className="sm:flex sm:items-start mb-4">
            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary-900/50 sm:mx-0 sm:h-10 sm:w-10 border border-primary-700/50">
              <TbChartPie className="h-6 w-6 text-primary-300" />
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 className="text-lg leading-6 font-medium text-white">
                Update Balance
              </h3>
              <div className="mt-1">
                <p className="text-sm text-slate-300">
                  Update the balance for <span className="font-semibold text-primary-500">{source?.name}</span>
                </p>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Current balance display */}
            {currentBalance !== null && currentBalance !== undefined && (
              <div className="bg-slate-700/30 rounded-xl p-4 border border-slate-600/50">
                <div className="text-sm text-slate-400">Current Balance</div>
                <div className="text-xl font-semibold text-white">
                  {formatCurrency(currentBalance)}
                </div>
              </div>
            )}
            
            {/* Balance field */}
            <div>
              <label htmlFor="balance" className="block text-sm font-medium text-primary-500/80">
                New Balance
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <TbCurrencyDollar className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  name="balance"
                  id="balance"
                  value={formData.balance}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-12 py-2.5 border ${
                    errors.balance ? 'border-red-500' : 'border-slate-600'
                  } bg-slate-800/50 text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 placeholder-slate-400`}
                  placeholder="0.00"
                />
                {errors.balance && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <TbAlertCircle className="h-5 w-5 text-red-400" />
                  </div>
                )}
              </div>
              {errors.balance && (
                <p className="mt-1 text-sm text-red-400">{errors.balance}</p>
              )}
              
              {/* Balance change indicator */}
              {formData.balance && currentBalance !== null && currentBalance !== undefined && balanceChange.amount !== 0 && (
                <div className="mt-2 flex items-center">
                  <div className={`flex items-center text-sm font-medium ${
                    balanceChange.isPositive ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {balanceChange.isPositive ? (
                      <TbArrowUpRight className="h-4 w-4 mr-1" />
                    ) : (
                      <TbArrowDownRight className="h-4 w-4 mr-1" />
                    )}
                    <span>
                      {balanceChange.isPositive ? '+' : ''}
                      {formatCurrency(balanceChange.amount)} ({balanceChange.isPositive ? '+' : ''}
                      {balanceChange.percentage.toFixed(2)}%)
                    </span>
                  </div>
                </div>
              )}
            </div>
            
            {/* Notes field */}
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-primary-500/80">
                Notes (Optional)
              </label>
              <div className="mt-1">
                <textarea
                  name="notes"
                  id="notes"
                  rows="3"
                  value={formData.notes}
                  onChange={handleChange}
                  className="block w-full px-3 py-2.5 border border-slate-600 bg-slate-800/50 text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 placeholder-slate-400"
                  placeholder="Add notes about this balance update"
                />
              </div>
            </div>
            
            <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 pt-3 border-t border-slate-700/50">
              <button
                type="button"
                className="inline-flex justify-center w-full rounded-xl border border-slate-600 px-4 py-2.5 bg-slate-700/50 text-base font-medium text-slate-300 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 sm:text-sm transition-all duration-200"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="mt-3 sm:mt-0 inline-flex justify-center w-full rounded-xl border border-transparent px-4 py-2.5 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:text-sm transition-all duration-200"
              >
                <div className='flex items-center'>
                  <TbRefresh className="h-5 w-5 mr-2" />
                  <span>Update Balance</span>
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateBalanceModalEnhanced;
