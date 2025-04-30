import React, { useState, useEffect } from 'react';
import { 
  TbX, 
  TbEdit, 
  TbAlertCircle,
  TbBuildingBank,
  TbPigMoney,
  TbTrendingUp,
  TbCreditCard,
  TbWallet,
  TbCurrencyDollar
} from 'react-icons/tb';
import { FaSave } from "react-icons/fa";

/**
 * EditFinancialSourceModalEnhanced is a modal component that allows users to edit
 * financial source details such as name, type, description, and color. It provides
 * form validation and handles form state management with hooks. The modal is displayed
 * when `isOpen` is true and can be closed using the `onClose` callback. On successful
 * form submission, the `onEdit` callback is triggered with the updated form data.
 *
 * @param {boolean} isOpen - Controls the visibility of the modal.
 * @param {function} onClose - Callback to close the modal.
 * @param {function} onEdit - Callback to handle the form submission with updated data.
 * @param {object} source - The financial source data to be edited.
 */
const EditFinancialSourceModalEnhanced = ({ isOpen, onClose, onEdit, source }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    type: 'BANK_ACCOUNT',
    description: '',
    colorCode: '#4F46E5',
    isActive: true
  });
  
  const [errors, setErrors] = useState({});
  
  // Update form when source changes
  useEffect(() => {
    if (source) {
      setFormData({
        id: source.id,
        name: source.name,
        type: source.type,
        description: source.description || '',
        colorCode: source.colorCode,
        isActive: source.isActive
      });
    }
  }, [source]);
  
  const sourceTypes = [
    { value: 'BANK_ACCOUNT', label: 'Bank Account', icon: <TbBuildingBank className="h-5 w-5" /> },
    { value: 'MONEY_MARKET', label: 'Money Market Fund', icon: <TbPigMoney className="h-5 w-5" /> },
    { value: 'STOCKS', label: 'Stocks', icon: <TbTrendingUp className="h-5 w-5" /> },
    { value: 'MPESA', label: 'M-Pesa', icon: <TbCreditCard className="h-5 w-5" /> },
    { value: 'SACCO', label: 'SACCO', icon: <TbWallet className="h-5 w-5" /> },
    { value: 'OTHER', label: 'Other', icon: <TbCurrencyDollar className="h-5 w-5" /> },
  ];
  
  const colorOptions = [
    '#4F46E5', // Indigo (primary)
    '#EC4899', // Pink
    '#EF4444', // Red
    '#F59E0B', // Amber
    '#10B981', // Emerald
    '#06B6D4', // Cyan
    '#3B82F6', // Blue
    '#6366F1', // Indigo
    '#8B5CF6', // Violet
    '#D946EF', // Fuchsia
    '#F43F5E', // Rose
  ];
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  const handleColorSelect = (color) => {
    setFormData({
      ...formData,
      colorCode: color
    });
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.type) {
      newErrors.type = 'Type is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onEdit(formData);
      setErrors({});
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 text-center">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 bg-slate-900/80 backdrop-blur-[1.5px] transition-opacity" 
          onClick={onClose}
        ></div>

        {/* Modal panel */}
        <div className="inline-block align-bottom bg-slate-800/90 backdrop-blur-xl rounded-2xl px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-full mx-2.5 md:mx-0 sm:max-w-lg sm:w-full sm:p-6 border border-slate-700/50 relative">
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
              <TbEdit className="h-6 w-6 text-primary-300" />
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 className="text-lg leading-6 font-medium text-white">
                Edit Financial Source
              </h3>
              <div className="mt-1">
                <p className="text-sm text-slate-300">
                  Update the details of your financial source
                </p>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-primary-500">
                Name
              </label>
              <div className="mt-1 relative">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`block w-full px-3 py-2.5 border ${
                    errors.name ? 'border-red-500' : 'border-slate-600'
                  } bg-slate-800/50 text-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 placeholder-slate-400`}
                  placeholder="e.g., Savings Account"
                />
                {errors.name && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <TbAlertCircle className="h-5 w-5 text-red-400" />
                  </div>
                )}
              </div>
              {errors.name && (
                <p className="mt-1 text-sm text-red-400">{errors.name}</p>
              )}
            </div>
            
            {/* Type field */}
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-primary-500">
                Type
              </label>
              <div className="mt-1">
                <select
                  name="type"
                  id="type"
                  value={formData.type}
                  onChange={handleChange}
                  className={`block w-full px-3 py-2.5 border ${
                    errors.type ? 'border-red-500' : 'border-slate-600'
                  } bg-slate-800/50 text-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200`}
                >
                  {sourceTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
              {errors.type && (
                <p className="mt-1 text-sm text-red-400">{errors.type}</p>
              )}
            </div>
            
            {/* Description field */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-primary-500">
                Description (Optional)
              </label>
              <div className="mt-1">
                <textarea
                  name="description"
                  id="description"
                  rows="3"
                  value={formData.description}
                  onChange={handleChange}
                  className="block w-full px-3 py-2.5 border border-slate-600 bg-slate-800/50 text-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 placeholder-slate-400"
                  placeholder="Add a description for this financial source"
                />
              </div>
            </div>
            
            {/* Color selection */}
            {/* <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Color
              </label>
              <div className="grid grid-cols-6 gap-2">
                {colorOptions.map(color => (
                  <button
                    key={color}
                    type="button"
                    className={`h-8 w-8 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 ${
                      formData.colorCode === color ? 'ring-2 ring-white' : ''
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorSelect(color)}
                  />
                ))}
              </div>
            </div> */}
            
            {/* Active toggle */}
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => setFormData({...formData, isActive: !formData.isActive})}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none ${
                  formData.isActive ? 'bg-primary-600' : 'bg-slate-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                    formData.isActive ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className="ml-3 text-sm font-medium text-slate-300">
                {formData.isActive ? 'Active' : 'Inactive'}
              </span>
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
                <div className='flex items-center space-x-2'>
                  <FaSave size={19}/>
                  <span>Save Changes</span>
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditFinancialSourceModalEnhanced;
