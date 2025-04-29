import React, { useState } from 'react';
import { 
  TbCurrencyDollar, 
  TbWallet, 
  TbPalette, 
  TbNotes,
  TbBuildingBank,
  TbPigMoney,
  TbTrendingUp,
  TbCreditCard
} from 'react-icons/tb';

const AddFinancialSourceModal = ({ isOpen, onClose, onSubmit }) => {
  const [form, setForm] = useState({
    name: '',
    type: 'BANK_ACCOUNT',
    initialBalance: '',
    colorCode: '#4f46e5',
    description: '',
    isActive: true
  });
  
  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  
  if (!isOpen) return null;
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };
  
  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!form.name.trim()) {
        newErrors.name = 'Name is required';
      }
      
      if (!form.type) {
        newErrors.type = 'Type is required';
      }
    }
    
    if (step === 2) {
      if (form.initialBalance !== '' && isNaN(parseFloat(form.initialBalance))) {
        newErrors.initialBalance = 'Initial balance must be a number';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };
  
  const handlePrevStep = () => {
    setCurrentStep(prev => prev - 1);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateStep(currentStep)) {
      onSubmit({
        ...form,
        initialBalance: form.initialBalance ? parseFloat(form.initialBalance) : 0
      });
    }
  };
  
  const sourceTypes = [
    { id: 'BANK_ACCOUNT', label: 'Bank Account', icon: <TbBuildingBank className="h-5 w-5" /> },
    { id: 'MONEY_MARKET', label: 'Money Market Fund', icon: <TbPigMoney className="h-5 w-5" /> },
    { id: 'STOCKS', label: 'Stocks', icon: <TbTrendingUp className="h-5 w-5" /> },
    { id: 'MPESA', label: 'M-Pesa', icon: <TbCreditCard className="h-5 w-5" /> },
    { id: 'SACCO', label: 'SACCO', icon: <TbWallet className="h-5 w-5" /> },
    { id: 'OTHER', label: 'Other', icon: <TbCurrencyDollar className="h-5 w-5" /> }
  ];
  
  const colorOptions = [
    '#4f46e5', // Indigo
    '#0891b2', // Cyan
    '#0d9488', // Teal
    '#16a34a', // Green
    '#ca8a04', // Yellow
    '#ea580c', // Orange
    '#dc2626', // Red
    '#be185d', // Pink
    '#7e22ce', // Purple
    '#1e40af'  // Blue
  ];
  
  return (
    <div className="fixed z-50 inset-0 overflow-y-auto bg-black/50 backdrop-blur-[1.5px]" >
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
        

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <form onSubmit={handleSubmit}>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="mb-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Add Financial Source
                  </h3>
                  <div className="flex items-center">
                    <span className="text-xs text-gray-500 mr-2">Step {currentStep} of 2</span>
                    <div className="flex space-x-1">
                      <div className={`h-2 w-8 rounded-full ${currentStep === 1 ? 'bg-primary-600' : 'bg-gray-200'}`}></div>
                      <div className={`h-2 w-8 rounded-full ${currentStep === 2 ? 'bg-primary-600' : 'bg-gray-200'}`}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {currentStep === 1 && (
                <div className="space-y-4">
                  {/* Name field */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={form.name}
                        onChange={handleChange}
                        className={`shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                          errors.name ? 'border-red-300' : ''
                        }`}
                        placeholder="e.g., Savings Account"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                      )}
                    </div>
                  </div>
                  
                  {/* Type field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {sourceTypes.map(type => (
                        <div 
                          key={type.id}
                          onClick={() => setForm({...form, type: type.id})}
                          className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                            form.type === type.id 
                              ? 'border-primary-500 bg-primary-50 text-primary-700' 
                              : 'border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          <div className={`flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-md ${
                            form.type === type.id ? 'bg-primary-100' : 'bg-gray-100'
                          }`}>
                            {type.icon}
                          </div>
                          <span className="ml-3 text-sm font-medium">{type.label}</span>
                        </div>
                      ))}
                    </div>
                    {errors.type && (
                      <p className="mt-1 text-sm text-red-600">{errors.type}</p>
                    )}
                  </div>
                </div>
              )}
              
              {currentStep === 2 && (
                <div className="space-y-4">
                  {/* Initial Balance field */}
                  <div>
                    <label htmlFor="initialBalance" className="block text-sm font-medium text-gray-700">
                      Initial Balance
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">KES</span>
                      </div>
                      <input
                        type="text"
                        name="initialBalance"
                        id="initialBalance"
                        value={form.initialBalance}
                        onChange={handleChange}
                        className={`block w-full pl-12 pr-12 sm:text-sm rounded-md ${
                          errors.initialBalance 
                            ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500' 
                            : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500'
                        }`}
                        placeholder="0.00"
                      />
                    </div>
                    {errors.initialBalance && (
                      <p className="mt-1 text-sm text-red-600">{errors.initialBalance}</p>
                    )}
                    <p className="mt-1 text-xs text-gray-500">Leave blank if you want to add balance later</p>
                  </div>
                  
                  {/* Color selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Color
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {colorOptions.map(color => (
                        <div 
                          key={color}
                          onClick={() => setForm({...form, colorCode: color})}
                          className={`h-8 w-8 rounded-full cursor-pointer border-2 ${
                            form.colorCode === color ? 'border-gray-900' : 'border-transparent'
                          }`}
                          style={{ backgroundColor: color }}
                        ></div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Description field */}
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Description (Optional)
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="description"
                        name="description"
                        rows={3}
                        value={form.description}
                        onChange={handleChange}
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Add any notes or details about this financial source..."
                      />
                    </div>
                  </div>
                  
                  {/* Active status */}
                  <div className="flex items-center">
                    <input
                      id="isActive"
                      name="isActive"
                      type="checkbox"
                      checked={form.isActive}
                      onChange={handleChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">
                      Active
                    </label>
                  </div>
                </div>
              )}
            </div>
            
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              {currentStep === 1 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Create
                </button>
              )}
              
              {currentStep === 2 && (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Back
                </button>
              )}
              
              <button
                type="button"
                onClick={onClose}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:w-auto sm:text-sm"
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

export default AddFinancialSourceModal;
