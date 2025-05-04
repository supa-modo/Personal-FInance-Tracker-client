import React, { createContext, useState, useEffect } from 'react';
import {
  getFinancialSources,
  getFinancialSourceById,
  createFinancialSource as apiCreateSource,
  updateFinancialSource as apiUpdateSource,
  deleteFinancialSource as apiDeleteSource,
  addBalanceUpdate as apiAddBalanceUpdate,
  getNetWorth as apiGetNetWorth,
  getHistoricalNetWorth as apiGetHistoricalNetWorth
} from '../services/financial.service';

// Create the financial context
export const FinancialContext = createContext();

// Create the FinancialProvider component
export const FinancialProvider = ({ children }) => {
  // State for financial sources
  const [financialSources, setFinancialSources] = useState([]);
  // State for loading status
  const [loading, setLoading] = useState(true);
  // State for error
  const [error, setError] = useState(null);

  // Effect to load financial sources from API
  useEffect(() => {
    

    loadFinancialSources();
  }, []);

  const loadFinancialSources = async () => {
    try {
      setLoading(true);
      
      const financialSources = await getFinancialSources();
      setFinancialSources(financialSources);
    } catch (error) {
      console.error('Error loading financial sources:', error);
      setError('Failed to load financial data');
    } finally {
      setLoading(false);
    }
  };

  // Function to add a new financial source
  const addFinancialSource = async(source) => {
    try {
      // Prepare source data for API
      const sourceData = {
        name: source.name,
        type: source.type,
        institution: source.institution || '', 
        description: source.description || '',
        colorCode: source.colorCode || '#4CAF50',
        initialBalance: source.initialBalance || 0,
        notes: source.notes || 'Initial balance'
      };

      // Create source through API
      const newSource = await apiCreateSource(sourceData);
      
      // Refresh sources from API
      await loadFinancialSources();
      
      return newSource;
    } catch (error) {
      console.error('Error adding financial source:', error);
      setError('Failed to add financial source');
      throw error;
    }
  };

  // Function to update a financial source
  const updateFinancialSource = async(id, updates) => {
    try {
      // Update source through API
      const updatedSource = await apiUpdateSource(id, updates);
      
      // Refresh sources from API
      await loadFinancialSources();
      
      return updatedSource;
    } catch (error) {
      console.error('Error updating financial source:', error);
      setError('Failed to update financial source');
      throw error;
    }
  };

  // Function to delete a financial source
  const deleteFinancialSource = async(id) => {
    try {
      // Delete source through API
      await apiDeleteSource(id);
      
      // Refresh sources from API
      await loadFinancialSources();
      
      return true;
    } catch (error) {
      console.error('Error deleting financial source:', error);
      setError('Failed to delete financial source');
      throw error;
    }
  };

  // Function to add a balance update to a financial source
  const addBalanceUpdate = async (sourceId, update) => {
    try {
      // Add balance update through API
      const updatedSource = await apiAddBalanceUpdate(sourceId, update);
      
      // Refresh sources from API
      await loadFinancialSources();
      
      return updatedSource;
    } catch (error) {
      console.error('Error adding balance update:', error);
      setError('Failed to add balance update');
      throw error;
    }
  };

  // Function to get the current net worth
  const getNetWorth = async () => {
    try {
      // Get net worth through API
      return await apiGetNetWorth();
    } catch (error) {
      console.error('Error calculating net worth:', error);
      return 0;
    }
  };

  // Function to get historical net worth data
  const getHistoricalNetWorth = async (period = 'month') => {
    try {
      // Get historical net worth data through API
      return await apiGetHistoricalNetWorth(period);
    } catch (error) {
      console.error('Error calculating historical net worth:', error);
      return [];
    }
  };

  // State for net worth
  const [netWorth, setNetWorth] = useState(0);
  const [historicalData, setHistoricalData] = useState([]);

  // Load net worth data only when financial sources change
  useEffect(() => {
    // Only load net worth and historical data when financial sources are first loaded
    // or when they change in a meaningful way (added/removed/updated)
    if (financialSources.length > 0) {
      // Use a ref to track if this is the initial load
      const initialDataLoad = !netWorth && historicalData.length === 0;
      
      // Only load data if it's the initial load or if sources have changed
      if (initialDataLoad) {
        loadNetWorth();
        loadHistoricalData('month');
      }
    }
  }, [financialSources, netWorth, historicalData.length]);

  // Load net worth with debouncing to prevent excessive API calls
  const loadNetWorth = async () => {
    try {
      // Only fetch if we don't already have a value or if it's been explicitly requested
      const worth = await apiGetNetWorth();
      
      // Only update state if the value has changed
      if (worth !== netWorth) {
        setNetWorth(worth);
      }
    } catch (error) {
      console.error('Error loading net worth:', error);
    }
  };

  // Load historical data with period tracking to prevent duplicate calls
  const loadHistoricalData = async (period = 'month') => {
    // Store the last requested period to avoid duplicate calls
    const lastPeriod = loadHistoricalData.lastPeriod;
    loadHistoricalData.lastPeriod = period;
    
    // Skip if we already have data for this period and it's not an explicit refresh
    if (lastPeriod === period && historicalData.length > 0) {
      return historicalData;
    }
    
    try {
      const data = await apiGetHistoricalNetWorth(period);
      
      // Only update state if we got new data
      if (data && Array.isArray(data) && 
          (historicalData.length !== data.length || JSON.stringify(data) !== JSON.stringify(historicalData))) {
        setHistoricalData(data);
      }
      return data;
    } catch (error) {
      console.error('Error loading historical data:', error);
      return historicalData;
    }
  };
  
  // Initialize the last period
  loadHistoricalData.lastPeriod = null;

  // Create the context value
  const contextValue = {
    financialSources,
    loading,
    error,
    netWorth,
    historicalData,
    addFinancialSource,
    updateFinancialSource,
    deleteFinancialSource,
    addBalanceUpdate,
    loadFinancialSources,
    getNetWorth: loadNetWorth,  // Replace with function that updates state
    getHistoricalNetWorth: loadHistoricalData,  // Replace with function that updates state
    refreshData: loadFinancialSources
  };

  // Return the provider
  return (
    <FinancialContext.Provider value={contextValue}>
      {children}
    </FinancialContext.Provider>
  );
};

export default FinancialProvider;
