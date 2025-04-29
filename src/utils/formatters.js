/**
 * Format a number as currency
 * @param {number} amount - The amount to format
 * @param {Object} options - Formatting options
 * @param {string} options.currency - The currency code (default: KES)
 * @param {string} options.notation - The notation to use (default: standard)
 * @returns {string} - The formatted currency string
 */
export const formatCurrency = (amount, options = {}) => {
  // Handle case where amount is not a number
  if (amount === undefined || amount === null) {
    return '—';
  }
  
  const {
    currency = 'KES',
    notation = 'standard',
    minimumFractionDigits = 2,
    maximumFractionDigits = 2
  } = options;
  
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency,
    notation,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(amount);
};

/**
 * Format a date string
 * @param {string} dateString - The date string to format
 * @param {object} options - Intl.DateTimeFormat options
 * @returns {string} - The formatted date string
 */
export const formatDate = (dateString, options = {}) => {
  const date = new Date(dateString);
  
  // Check if dateStyle or timeStyle are provided
  if (options.dateStyle || options.timeStyle) {
    // If dateStyle or timeStyle are used, we can't mix them with individual date components
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }
  
  // Default options if dateStyle/timeStyle aren't used
  const defaultOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options,
  };
  
  return new Intl.DateTimeFormat('en-US', defaultOptions).format(date);
};

/**
 * Format a percentage
 * @param {number} value - The value to format as percentage
 * @param {number} decimals - Number of decimal places
 * @returns {string} - The formatted percentage string
 */
export const formatPercentage = (value, decimals = 2) => {
  return `${(value * 100).toFixed(decimals)}%`;
};

/**
 * Get a short relative time string (e.g., "2 days ago")
 * @param {string} dateString - The date string
 * @returns {string} - The relative time string
 */
export const getRelativeTimeString = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  if (diffInSeconds < 60) {
    return 'just now';
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  }
  
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
  }
  
  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`;
};
