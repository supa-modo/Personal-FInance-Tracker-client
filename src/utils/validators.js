/**
 * Validate an email address
 * @param {string} email - The email to validate
 * @returns {boolean} - Whether the email is valid
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate a password
 * @param {string} password - The password to validate
 * @returns {object} - Validation result with isValid and message
 */
export const validatePassword = (password) => {
  if (!password) {
    return {
      isValid: false,
      message: 'Password is required',
    };
  }
  
  if (password.length < 8) {
    return {
      isValid: false,
      message: 'Password must be at least 8 characters long',
    };
  }
  
  return {
    isValid: true,
    message: '',
  };
};

/**
 * Validate a financial source form
 * @param {object} source - The financial source data
 * @returns {object} - Validation errors (empty if valid)
 */
export const validateFinancialSource = (source) => {
  const errors = {};
  
  if (!source.name || source.name.trim() === '') {
    errors.name = 'Name is required';
  }
  
  if (!source.type) {
    errors.type = 'Type is required';
  }
  
  if (source.initialBalance !== undefined && isNaN(parseFloat(source.initialBalance))) {
    errors.initialBalance = 'Initial balance must be a number';
  }
  
  return errors;
};

/**
 * Validate a balance update form
 * @param {object} update - The balance update data
 * @returns {object} - Validation errors (empty if valid)
 */
export const validateBalanceUpdate = (update) => {
  const errors = {};
  
  if (update.balance === undefined || update.balance === '' || isNaN(parseFloat(update.balance))) {
    errors.balance = 'Balance is required and must be a number';
  }
  
  return errors;
};
