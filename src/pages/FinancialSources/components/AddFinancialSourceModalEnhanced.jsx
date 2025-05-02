import React, { useState } from "react";
import { PiMoneyWavyDuotone } from "react-icons/pi";
import {
  TbX,
  TbPlus,
  TbAlertCircle,
  TbBuildingBank,
  TbPigMoney,
  TbTrendingUp,
  TbCreditCard,
  TbWallet,
  TbCurrencyDollar,
  TbLoader,
} from "react-icons/tb";
import { motion } from "framer-motion";

const AddFinancialSourceModalEnhanced = ({ isOpen, onClose, onAdd }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    type: "BANK_ACCOUNT",
    institution: "",
    description: "",
    colorCode: "#4F46E5", // Default color - primary indigo
    isActive: true,
  });

  const [errors, setErrors] = useState({});

  const sourceTypes = [
    {
      value: "BANK_ACCOUNT",
      label: "Bank Account",
      icon: <TbBuildingBank className="h-5 w-5" />,
    },
    {
      value: "MONEY_MARKET",
      label: "Money Market Fund",
      icon: <TbPigMoney className="h-5 w-5" />,
    },
    {
      value: "STOCKS",
      label: "Stocks",
      icon: <TbTrendingUp className="h-5 w-5" />,
    },
    {
      value: "MPESA",
      label: "M-Pesa",
      icon: <TbCreditCard className="h-5 w-5" />,
    },
    { value: "SACCO", label: "SACCO", icon: <TbWallet className="h-5 w-5" /> },
    {
      value: "CASH",
      label: "Cash Money",
      icon: <PiMoneyWavyDuotone className="h-5 w-5" />,
    },
    {
      value: "OTHER",
      label: "Other",
      icon: <TbCurrencyDollar className="h-5 w-5" />,
    },
  ];

  const colorOptions = [
    "#4F46E5", // Indigo (primary)
    "#EC4899", // Pink
    "#EF4444", // Red
    "#F59E0B", // Amber
    "#10B981", // Emerald
    "#06B6D4", // Cyan
    "#3B82F6", // Blue
    "#6366F1", // Indigo
    "#8B5CF6", // Violet
    "#D946EF", // Fuchsia
    "#F43F5E", // Rose
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleColorSelect = (color) => {
    setFormData({
      ...formData,
      colorCode: color,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.institution?.trim()) {
      newErrors.institution = "Institution is required";
    }

    if (!formData.type) {
      newErrors.type = "Type is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setLoading(true);
      try {
        // Ensure colorCode is set - use default blue if null
        const dataToSubmit = {
          ...formData,
          colorCode: formData.colorCode || "#3B82F6", // Default to blue if not set
        };

        // Pass the data to the parent component
        await onAdd(dataToSubmit);

        // Reset form
        setFormData({
          name: "",
          type: "BANK_ACCOUNT",
          institution: "",
          description: "",
          colorCode: "#3B82F6",
          isActive: true,
        });
        setErrors({});
        onClose();
      } catch (error) {
        console.error("Error adding financial source:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 text-center ">
        {/* Background overlay */}
        <div
          className="fixed inset-0 bg-slate-900/80 backdrop-blur-[1.5px] transition-opacity"
          onClick={onClose}
        ></div>

        {/* Modal panel */}
        <div className="inline-block align-middle bg-slate-800/90 justify-center backdrop-blur-xl rounded-2xl px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-full sm:max-w-lg sm:w-full mx-2.5 md:mx-0 sm:p-6 border border-slate-700/50 relative">
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
              <TbPlus className="h-6 w-6 text-primary-300" />
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 className="text-lg leading-6 font-medium text-white">
                Add New Financial Source
              </h3>
              <div className="mt-1">
                <p className="text-sm text-slate-300">
                  Create a new financial source to track your assets
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-300"
              >
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
                    errors.name ? "border-red-500" : "border-slate-600"
                  } bg-slate-800/50 text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 placeholder-slate-400`}
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

            {/* Institution field */}
            <div>
              <label
                htmlFor="institution"
                className="block text-sm font-medium text-slate-300"
              >
                Institution
              </label>
              <div className="mt-1 relative">
                <input
                  type="text"
                  name="institution"
                  id="institution"
                  value={formData.institution}
                  onChange={handleChange}
                  className={`block w-full px-3 py-2.5 border ${
                    errors.institution ? "border-red-500" : "border-slate-600"
                  } bg-slate-800/50 text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 placeholder-slate-400`}
                  placeholder="e.g., Savings Account"
                />
                {errors.institution && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <TbAlertCircle className="h-5 w-5 text-red-400" />
                  </div>
                )}
              </div>
              {errors.institution && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.institution}
                </p>
              )}
            </div>

            {/* Type field */}
            <div>
              <label
                htmlFor="type"
                className="block text-sm font-medium text-slate-300"
              >
                Type
              </label>
              <div className="mt-1">
                <select
                  name="type"
                  id="type"
                  value={formData.type}
                  onChange={handleChange}
                  className={`block w-full px-3 py-2.5 border ${
                    errors.type ? "border-red-500" : "border-slate-600"
                  } bg-slate-800/50 text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200`}
                >
                  {sourceTypes.map((type) => (
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
              <label
                htmlFor="description"
                className="block text-sm font-medium text-slate-300"
              >
                Description (Optional)
              </label>
              <div className="mt-1">
                <textarea
                  name="description"
                  id="description"
                  rows="3"
                  value={formData.description}
                  onChange={handleChange}
                  className="block w-full px-3 py-2.5 border border-slate-600 bg-slate-800/50 text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 placeholder-slate-400"
                  placeholder="Add a description for this financial source"
                />
              </div>
            </div>

            {/* Active toggle */}
            <div className="flex items-center">
              <button
                type="button"
                onClick={() =>
                  setFormData({ ...formData, isActive: !formData.isActive })
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none ${
                  formData.isActive ? "bg-primary-600" : "bg-slate-700"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                    formData.isActive ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
              <span className="ml-3 text-sm font-medium text-slate-300">
                {formData.isActive ? "Active" : "Inactive"}
              </span>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <motion.button
                WhileTap={{ scale: 0.97 }}
                type="button"
                onClick={onClose}
                disabled={loading}
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-slate-300 border border-slate-600 rounded-lg hover:bg-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </motion.button>
              <motion.button
                WhileTap={{ scale: 0.97 }}
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-lg hover:bg-primary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <div className="flex items-center space-x-2">
                                {loading ? (
                                  <>
                                    <TbLoader size={19} className="animate-spin" />
                                    <span>Adding...</span>
                                  </>
                                ) : (
                                  <>
                                    <TbPlus size={19} />
                                    <span>Add Source</span>
                                  </>
                                )}
                              </div>
              </motion.button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddFinancialSourceModalEnhanced;
