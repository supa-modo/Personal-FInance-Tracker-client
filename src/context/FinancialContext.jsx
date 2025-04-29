import React, { createContext, useState, useEffect } from 'react';

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

  // Effect to load financial sources from localStorage or API
  useEffect(() => {
    const loadFinancialSources = async () => {
      try {
        setLoading(true);
        
        // Check if there are financial sources in localStorage
        const storedSources = localStorage.getItem('financialSources');
        
        if (storedSources) {
          // Parse the stored sources
          const parsedSources = JSON.parse(storedSources);
          setFinancialSources(parsedSources);
        } else {
          // If no sources in localStorage, use dummy data
          const dummySources = [
            {
              id: '1',
              name: 'Savings Account',
              type: 'BANK_ACCOUNT',
              description: 'Primary savings account',
              colorCode: '#4CAF50',
              isActive: true,
              createdAt: new Date().toISOString(),
              updates: [
                {
                  id: '1',
                  balance: 5000,
                  notes: 'Initial balance',
                  createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
                },
                {
                  id: '2',
                  balance: 5500,
                  notes: 'Salary deposit',
                  createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
                },
                {
                  id: '3',
                  balance: 5200,
                  notes: 'Bill payment',
                  createdAt: new Date().toISOString(),
                },
              ],
            },
            {
              id: '2',
              name: 'Money Market Fund',
              type: 'MONEY_MARKET',
              description: 'High interest MMF',
              colorCode: '#2196F3',
              isActive: true,
              createdAt: new Date().toISOString(),
              updates: [
                {
                  id: '4',
                  balance: 10000,
                  notes: 'Initial investment',
                  createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
                },
                {
                  id: '5',
                  balance: 10300,
                  notes: 'Interest earned',
                  createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
                },
                {
                  id: '6',
                  balance: 10600,
                  notes: 'Interest earned',
                  createdAt: new Date().toISOString(),
                },
              ],
            },
            {
              id: '3',
              name: 'Stock Portfolio',
              type: 'STOCKS',
              description: 'Tech stocks',
              colorCode: '#FF5722',
              isActive: true,
              createdAt: new Date().toISOString(),
              updates: [
                {
                  id: '7',
                  balance: 7500,
                  notes: 'Initial investment',
                  createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
                },
                {
                  id: '8',
                  balance: 8200,
                  notes: 'Market gain',
                  createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
                },
                {
                  id: '9',
                  balance: 7800,
                  notes: 'Market correction',
                  createdAt: new Date().toISOString(),
                },
              ],
            },
          ];
          
          // Store the dummy sources in localStorage
          localStorage.setItem('financialSources', JSON.stringify(dummySources));
          
          // Update the state
          setFinancialSources(dummySources);
        }
      } catch (error) {
        console.error('Error loading financial sources:', error);
        setError('Failed to load financial data');
      } finally {
        setLoading(false);
      }
    };

    loadFinancialSources();
  }, []);

  // Function to add a new financial source
  const addFinancialSource = (source) => {
    try {
      // Create a new source with an ID and timestamps
      const newSource = {
        ...source,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updates: [
          {
            id: Date.now().toString() + '-update',
            balance: source.initialBalance || 0,
            notes: 'Initial balance',
            createdAt: new Date().toISOString(),
          },
        ],
      };
      
      // Update the state
      const updatedSources = [...financialSources, newSource];
      setFinancialSources(updatedSources);
      
      // Update localStorage
      localStorage.setItem('financialSources', JSON.stringify(updatedSources));
      
      return newSource;
    } catch (error) {
      console.error('Error adding financial source:', error);
      setError('Failed to add financial source');
      throw error;
    }
  };

  // Function to update a financial source
  const updateFinancialSource = (id, updates) => {
    try {
      // Find the source to update
      const updatedSources = financialSources.map(source => {
        if (source.id === id) {
          return { ...source, ...updates };
        }
        return source;
      });
      
      // Update the state
      setFinancialSources(updatedSources);
      
      // Update localStorage
      localStorage.setItem('financialSources', JSON.stringify(updatedSources));
      
      return updatedSources.find(source => source.id === id);
    } catch (error) {
      console.error('Error updating financial source:', error);
      setError('Failed to update financial source');
      throw error;
    }
  };

  // Function to delete a financial source
  const deleteFinancialSource = (id) => {
    try {
      // Filter out the source to delete
      const updatedSources = financialSources.filter(source => source.id !== id);
      
      // Update the state
      setFinancialSources(updatedSources);
      
      // Update localStorage
      localStorage.setItem('financialSources', JSON.stringify(updatedSources));
      
      return true;
    } catch (error) {
      console.error('Error deleting financial source:', error);
      setError('Failed to delete financial source');
      throw error;
    }
  };

  // Function to add a balance update to a financial source
  const addBalanceUpdate = (sourceId, update) => {
    try {
      // Find the source to update
      const updatedSources = financialSources.map(source => {
        if (source.id === sourceId) {
          // Create a new update with an ID and timestamp
          const newUpdate = {
            ...update,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
          };
          
          // Add the update to the source's updates
          return {
            ...source,
            updates: [...(source.updates || []), newUpdate],
          };
        }
        return source;
      });
      
      // Update the state
      setFinancialSources(updatedSources);
      
      // Update localStorage
      localStorage.setItem('financialSources', JSON.stringify(updatedSources));
      
      return updatedSources.find(source => source.id === sourceId);
    } catch (error) {
      console.error('Error adding balance update:', error);
      setError('Failed to add balance update');
      throw error;
    }
  };

  // Function to get the current net worth
  const getNetWorth = () => {
    try {
      // Calculate the net worth based on the latest balance update for each source
      return financialSources.reduce((total, source) => {
        // Skip inactive sources
        if (!source.isActive) return total;
        
        // Get the latest balance update
        const updates = source.updates || [];
        const latestUpdate = updates.length > 0 
          ? updates.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0] 
          : null;
        
        // Add the latest balance to the total
        return total + (latestUpdate ? parseFloat(latestUpdate.balance) : 0);
      }, 0);
    } catch (error) {
      console.error('Error calculating net worth:', error);
      return 0;
    }
  };

  // Function to get historical net worth data
  const getHistoricalNetWorth = (period = 'month') => {
    try {
      // Determine the start date based on the period
      const now = new Date();
      let startDate;
      
      switch (period) {
        case 'week':
          startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
          break;
        case 'month':
          startDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
          break;
        case 'quarter':
          startDate = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
          break;
        case 'year':
          startDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
          break;
        default:
          startDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
      }
      
      // Get all updates from all active sources
      const allUpdates = financialSources
        .filter(source => source.isActive)
        .flatMap(source => (source.updates || []).map(update => ({
          ...update,
          sourceId: source.id,
          sourceName: source.name,
          sourceType: source.type,
          sourceColorCode: source.colorCode,
        })))
        .filter(update => new Date(update.createdAt) >= startDate)
        .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      
      // Group updates by date
      const dateMap = new Map();
      
      allUpdates.forEach(update => {
        const date = new Date(update.createdAt).toISOString().split('T')[0];
        
        if (!dateMap.has(date)) {
          dateMap.set(date, {
            date,
            sources: new Map(),
          });
        }
        
        const dateData = dateMap.get(date);
        dateData.sources.set(update.sourceId, {
          id: update.sourceId,
          name: update.sourceName,
          type: update.sourceType,
          colorCode: update.sourceColorCode,
          balance: parseFloat(update.balance),
        });
      });
      
      // Convert the map to an array and calculate the total for each date
      const historicalData = Array.from(dateMap.values()).map(dateData => {
        const total = Array.from(dateData.sources.values()).reduce(
          (sum, source) => sum + source.balance,
          0
        );
        
        return {
          date: dateData.date,
          total,
          sources: Array.from(dateData.sources.values()),
        };
      });
      
      return historicalData;
    } catch (error) {
      console.error('Error calculating historical net worth:', error);
      return [];
    }
  };

  // Create the context value
  const contextValue = {
    financialSources,
    loading,
    error,
    addFinancialSource,
    updateFinancialSource,
    deleteFinancialSource,
    addBalanceUpdate,
    getNetWorth,
    getHistoricalNetWorth,
  };

  // Return the provider
  return (
    <FinancialContext.Provider value={contextValue}>
      {children}
    </FinancialContext.Provider>
  );
};

export default FinancialProvider;
