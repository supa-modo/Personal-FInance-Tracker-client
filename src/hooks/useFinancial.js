import { useContext } from 'react';
import { FinancialContext } from '../context/FinancialContext';

// Custom hook to use the financial context
const useFinancial = () => {
  const context = useContext(FinancialContext);
  
  if (!context) {
    throw new Error('useFinancial must be used within a FinancialProvider');
  }
  
  return context;
};

export default useFinancial;
