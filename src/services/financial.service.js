import { get, post, put, del } from './api';

/**
 * Financial service for handling financial data operations
 */

/**
 * Get all financial sources
 * @returns {Promise} - Promise with financial sources data
 */
export const getFinancialSources = async () => {
  try {
    // Check if there are financial sources in localStorage
    const storedSources = localStorage.getItem('financialSources');
    
    if (storedSources) {
      // Parse the stored sources
      return JSON.parse(storedSources);
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
      
      return dummySources;
    }
  } catch (error) {
    console.error('Error getting financial sources:', error);
    throw error;
  }
};

/**
 * Get a financial source by ID
 * @param {string} id - Financial source ID
 * @returns {Promise} - Promise with financial source data
 */
export const getFinancialSourceById = async (id) => {
  try {
    const sources = await getFinancialSources();
    const source = sources.find(source => source.id === id);
    
    if (!source) {
      throw new Error(`Financial source with ID ${id} not found`);
    }
    
    return source;
  } catch (error) {
    console.error(`Error getting financial source with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Create a new financial source
 * @param {object} source - Financial source data
 * @returns {Promise} - Promise with created financial source data
 */
export const createFinancialSource = async (source) => {
  try {
    // Get existing sources
    const sources = await getFinancialSources();
    
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
    
    // Add to sources
    sources.push(newSource);
    
    // Update localStorage
    localStorage.setItem('financialSources', JSON.stringify(sources));
    
    return newSource;
  } catch (error) {
    console.error('Error creating financial source:', error);
    throw error;
  }
};

/**
 * Update a financial source
 * @param {string} id - Financial source ID
 * @param {object} updates - Financial source updates
 * @returns {Promise} - Promise with updated financial source data
 */
export const updateFinancialSource = async (id, updates) => {
  try {
    // Get existing sources
    const sources = await getFinancialSources();
    
    // Find the source to update
    const sourceIndex = sources.findIndex(source => source.id === id);
    
    if (sourceIndex === -1) {
      throw new Error(`Financial source with ID ${id} not found`);
    }
    
    // Update the source
    sources[sourceIndex] = {
      ...sources[sourceIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    
    // Update localStorage
    localStorage.setItem('financialSources', JSON.stringify(sources));
    
    return sources[sourceIndex];
  } catch (error) {
    console.error(`Error updating financial source with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Delete a financial source
 * @param {string} id - Financial source ID
 * @returns {Promise} - Promise with success status
 */
export const deleteFinancialSource = async (id) => {
  try {
    // Get existing sources
    const sources = await getFinancialSources();
    
    // Filter out the source to delete
    const updatedSources = sources.filter(source => source.id !== id);
    
    // Update localStorage
    localStorage.setItem('financialSources', JSON.stringify(updatedSources));
    
    return { success: true };
  } catch (error) {
    console.error(`Error deleting financial source with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Add a balance update to a financial source
 * @param {string} sourceId - Financial source ID
 * @param {object} update - Balance update data
 * @returns {Promise} - Promise with updated financial source data
 */
export const addBalanceUpdate = async (sourceId, update) => {
  try {
    // Get existing sources
    const sources = await getFinancialSources();
    
    // Find the source to update
    const sourceIndex = sources.findIndex(source => source.id === sourceId);
    
    if (sourceIndex === -1) {
      throw new Error(`Financial source with ID ${sourceId} not found`);
    }
    
    // Create a new update with an ID and timestamp
    const newUpdate = {
      ...update,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    
    // Add the update to the source's updates
    sources[sourceIndex].updates = [
      ...(sources[sourceIndex].updates || []),
      newUpdate,
    ];
    
    // Update localStorage
    localStorage.setItem('financialSources', JSON.stringify(sources));
    
    return sources[sourceIndex];
  } catch (error) {
    console.error(`Error adding balance update to source with ID ${sourceId}:`, error);
    throw error;
  }
};

/**
 * Get all balance updates for a financial source
 * @param {string} sourceId - Financial source ID
 * @returns {Promise} - Promise with balance updates data
 */
export const getBalanceUpdates = async (sourceId) => {
  try {
    const source = await getFinancialSourceById(sourceId);
    return source.updates || [];
  } catch (error) {
    console.error(`Error getting balance updates for source with ID ${sourceId}:`, error);
    throw error;
  }
};

/**
 * Calculate the current net worth
 * @returns {Promise} - Promise with net worth data
 */
export const getNetWorth = async () => {
  try {
    const sources = await getFinancialSources();
    
    // Calculate the net worth based on the latest balance update for each source
    const netWorth = sources.reduce((total, source) => {
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
    
    return netWorth;
  } catch (error) {
    console.error('Error calculating net worth:', error);
    throw error;
  }
};

/**
 * Get historical net worth data
 * @param {string} period - Time period ('week', 'month', 'quarter', 'year')
 * @returns {Promise} - Promise with historical net worth data
 */
export const getHistoricalNetWorth = async (period = 'month') => {
  try {
    const sources = await getFinancialSources();
    
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
    const allUpdates = sources
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
    throw error;
  }
};
