import apiClient from './api.service';

/**
 * Financial service for handling financial data operations
 */

/**
 * Get all financial sources
 * @returns {Promise} - Promise with financial sources data
 */
export const getFinancialSources = async () => {
  try {
    const response = await apiClient.get(`/financial-sources`);
    
    if (response.data && response.data.data && response.data.data.financialSources) {
      // Transform backend data to match frontend format
      const sources = response.data.data.financialSources.map(source => ({
        id: source.id,
        name: source.name,
        type: source.type,
        description: source.description,
        colorCode: source.color_code,
        isActive: source.is_active,
        createdAt: source.created_at,
        updatedAt: source.updated_at,
        updates: source.updates ? source.updates.map(update => ({
          id: update.id,
          balance: parseFloat(update.balance),
          notes: update.notes,
          date: update.date,
          createdAt: update.created_at
        })) : []
      }));
      
      return sources;
    }
    
    return [];
  } catch (error) {
    console.error('Error getting financial sources:', error.response?.data?.message || error.message);
    return [];
  }
};

/**
 * Get a financial source by ID
 * @param {string} id - Financial source ID
 * @returns {Promise} - Promise with financial source data
 */
export const getFinancialSourceById = async (id) => {
  try {
    const response = await apiClient.get(`/financial-sources/${id}`);
    
    if (response.data && response.data.data && response.data.data.financialSource) {
      // Transform backend data to match frontend format
      const source = response.data.data.financialSource;
      return {
        id: source.id,
        name: source.name,
        type: source.type,
        description: source.description,
        colorCode: source.color_code,
        isActive: source.is_active,
        createdAt: source.created_at,
        updatedAt: source.updated_at,
        updates: source.updates ? source.updates.map(update => ({
          id: update.id,
          balance: parseFloat(update.balance),
          notes: update.notes,
          date: update.date,
          createdAt: update.created_at
        })) : []
      };
    }
    
    throw new Error(`Financial source with ID ${id} not found`);
  } catch (error) {
    console.error(`Error getting financial source with ID ${id}:`, error.response?.data?.message || error.message);
    throw error;
  }
};

/**
 * Create a new financial source
 * @param {Object} sourceData - Financial source data
 * @returns {Promise} - Promise with created financial source
 */
export const createFinancialSource = async (sourceData) => {
  try {
    // Transform frontend data to match backend format
    const backendSourceData = {
      name: sourceData.name,
      type: sourceData.type,
      description: sourceData.description,
      color_code: sourceData.colorCode || '#3B82F6', // Default to blue if not set
      is_active: sourceData.isActive !== undefined ? sourceData.isActive : true
    };
    
    // Log the data being sent to the backend
    console.log('Creating financial source with data:', backendSourceData);
    
    const response = await apiClient.post(`/financial-sources`, backendSourceData);
    
    if (response.data && response.data.data && response.data.data.financialSource) {
      // Transform backend response to match frontend format
      const source = response.data.data.financialSource;
      return {
        id: source.id,
        name: source.name,
        type: source.type,
        description: source.description,
        colorCode: source.color_code,
        isActive: source.is_active,
        createdAt: source.created_at,
        updatedAt: source.updated_at,
        updates: []
      };
    }
    
    throw new Error('Failed to create financial source');
  } catch (error) {
    console.error('Error creating financial source:', error.response?.data?.message || error.message);
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
    // Transform frontend data to match backend format
    const backendSourceData = {};
    
    if (updates.name) backendSourceData.name = updates.name;
    if (updates.type) backendSourceData.type = updates.type;
    if (updates.description) backendSourceData.description = updates.description;
    if (updates.colorCode) backendSourceData.color_code = updates.colorCode;
    if (updates.isActive !== undefined) backendSourceData.is_active = updates.isActive;
    
    const response = await apiClient.patch(`/financial-sources/${id}`, backendSourceData);
    
    if (response.data && response.data.data && response.data.data.financialSource) {
      // Transform backend response to match frontend format
      const source = response.data.data.financialSource;
      return {
        id: source.id,
        name: source.name,
        type: source.type,
        description: source.description,
        colorCode: source.color_code,
        isActive: source.is_active,
        createdAt: source.created_at,
        updatedAt: source.updated_at,
        updates: source.updates ? source.updates.map(update => ({
          id: update.id,
          balance: parseFloat(update.balance),
          notes: update.notes,
          date: update.date,
          createdAt: update.created_at
        })) : []
      };
    }
    
    throw new Error(`Failed to update financial source with ID ${id}`);
  } catch (error) {
    console.error(`Error updating financial source with ID ${id}:`, error.response?.data?.message || error.message);
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
    await apiClient.delete(`/financial-sources/${id}`);
    return { success: true };
  } catch (error) {
    console.error(`Error deleting financial source with ID ${id}:`, error.response?.data?.message || error.message);
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
    // Transform frontend data to match backend format
    // Format date as YYYY-MM-DD as required by the backend
    const formatDateToYYYYMMDD = (date) => {
      const d = new Date(date);
      return d.getFullYear() + '-' + 
             String(d.getMonth() + 1).padStart(2, '0') + '-' + 
             String(d.getDate()).padStart(2, '0');
    };
    
    // Ensure balance is a number (not a string) as required by the backend
    // and date is in the correct YYYY-MM-DD format
    const backendUpdateData = {
      balance: Number(update.balance), // Convert to number explicitly
      notes: update.notes || '',
      date: update.date ? formatDateToYYYYMMDD(update.date) : formatDateToYYYYMMDD(new Date())
    };
    
    // Log the data being sent to the backend
    console.log('Adding balance update with data:', backendUpdateData);
    
    try {
      const response = await apiClient.post(
        `/financial-sources/${sourceId}/updates`, 
        backendUpdateData
      );
      
      // Check if we have a valid response with the update data
      if (response.data && response.data.data && response.data.data.update) {
        // Get the updated financial source
        const updatedSource = await apiClient.get(`/financial-sources/${sourceId}`);
        
        if (updatedSource.data && updatedSource.data.data && updatedSource.data.data.financialSource) {
          // Transform backend response to match frontend format
          const source = updatedSource.data.data.financialSource;
          return {
            id: source.id,
            name: source.name,
            type: source.type,
            description: source.description,
            colorCode: source.color_code,
            isActive: source.is_active,
            createdAt: source.created_at,
            updatedAt: source.updated_at,
            updates: source.updates ? source.updates.map(update => ({
              id: update.id,
              balance: parseFloat(update.balance),
              notes: update.notes,
              date: update.date,
              createdAt: update.created_at
            })) : []
          };
        }
      }
      
      // If we got here, the update was created but we couldn't get the updated source
      console.log('Balance update created successfully, but could not retrieve updated source');
      return true;
    } catch (apiError) {
      console.error(`API error adding balance update to source with ID ${sourceId}:`, 
                   apiError.response?.data?.message || apiError.message);
      throw new Error(apiError.response?.data?.message || `Failed to add balance update to source with ID ${sourceId}`);
    }
  } catch (error) {
    console.error(`Error adding balance update to source with ID ${sourceId}:`, error.message);
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
    const response = await apiClient.get(`/financial-sources/${sourceId}/updates`);
    
    if (response.data && response.data.data && response.data.data.updates) {
      // Transform backend data to match frontend format
      return response.data.data.updates.map(update => ({
        id: update.id,
        balance: parseFloat(update.balance),
        notes: update.notes,
        date: update.date,
        createdAt: update.created_at
      }));
    }
    
    return [];
  } catch (error) {
    console.error(`Error getting balance updates for source with ID ${sourceId}:`, error.response?.data?.message || error.message);
    throw error;
  }
};

/**
 * Calculate the current net worth
 * @returns {Promise} - Promise with net worth data
 */
export const getNetWorth = async () => {
  try {
    // Try to get net worth from backend API
    try {
      const response = await apiClient.get(`/financial-sources/net-worth`);
      if (response.data && response.data.data && response.data.data.netWorth !== undefined) {
        return parseFloat(response.data.data.netWorth);
      }
    } catch (apiError) {
      console.warn('Could not get net worth from API, calculating locally:', apiError.message);
    }
    
    // Fallback to local calculation if API fails
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
    console.error('Error calculating net worth:', error.response?.data?.message || error.message);
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
    // Try to get historical net worth from backend API
    let useLocalCalculation = false;
    let apiData = [];
    
    try {
      const response = await apiClient.get(`/financial-sources/historical-net-worth?period=${period}`);
      if (response.data && response.data.data && response.data.data.historicalData) {
        // Ensure we're returning an array of properly formatted items
        const historicalData = response.data.data.historicalData;
        
        // Check if historicalData is an array
        if (Array.isArray(historicalData) && historicalData.length > 0) {
          apiData = historicalData.map(item => ({
            date: item.date,
            netWorth: parseFloat(item.netWorth || 0),
            total: parseFloat(item.netWorth || 0), // Add total property for backward compatibility
            sources: item.sources ? Object.fromEntries(
              Object.entries(item.sources).map(([id, source]) => [
                id,
                {
                  id: source.id,
                  name: source.name,
                  type: source.type,
                  colorCode: source.color_code,
                  balance: parseFloat(source.balance || 0)
                }
              ])
            ) : {}
          }));
          
          // If we got valid data from the API, return it
          if (apiData.length > 0) {
            return apiData;
          }
        }
      }
      
      // If we get here, the API response didn't have valid data
      useLocalCalculation = true;
    } catch (apiError) {
      console.warn('Could not get historical net worth from API, calculating locally:', apiError.message);
      useLocalCalculation = true;
    }
    
    // If API call failed or returned invalid data, use local calculation
    if (useLocalCalculation) {
      // Fallback to local calculation if API fails
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
            netWorth: 0,
            sources: {},
          });
        }
        
        const dateData = dateMap.get(date);
        
        // Update the source balance for this date
        dateData.sources[update.sourceId] = {
          id: update.sourceId,
          name: update.sourceName,
          type: update.sourceType,
          colorCode: update.sourceColorCode,
          balance: update.balance
        };
      });
      
      // Calculate net worth for each date based on the latest balance for each source
      const historicalData = Array.from(dateMap.values()).map(dateData => {
        // Calculate net worth for this date
        dateData.netWorth = Object.values(dateData.sources).reduce(
          (total, source) => total + source.balance,
          0
        );
        
        return dateData;
      });
      
      return historicalData;
    } // Close the if(useLocalCalculation) block
    
    // If we got here without returning, return an empty array as fallback
    return [];
  } catch (error) {
    console.error(`Error getting historical net worth data for period ${period}:`, error.response?.data?.message || error.message);
    throw error;
  }
};
