/**
 * Base API service for making HTTP requests
 * Currently using localStorage for persistence until backend is implemented
 */

// Base URL for API requests (will be used when backend is implemented)
const API_URL = 'http://localhost:5000/api';

/**
 * Make a GET request
 * @param {string} endpoint - API endpoint
 * @returns {Promise} - Promise with response data
 */
export const get = async (endpoint) => {
  try {
    // For now, simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Get data from localStorage based on endpoint
    const key = getLocalStorageKey(endpoint);
    const data = localStorage.getItem(key);
    
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error(`GET request failed for ${endpoint}:`, error);
    throw error;
  }
};

/**
 * Make a POST request
 * @param {string} endpoint - API endpoint
 * @param {object} data - Request data
 * @returns {Promise} - Promise with response data
 */
export const post = async (endpoint, data) => {
  try {
    // For now, simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Store data in localStorage based on endpoint
    const key = getLocalStorageKey(endpoint);
    
    // For collection endpoints, append to existing data
    if (isCollectionEndpoint(endpoint)) {
      const existingData = localStorage.getItem(key);
      const collection = existingData ? JSON.parse(existingData) : [];
      
      // Add ID and timestamps
      const newItem = {
        ...data,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      
      // Add to collection
      collection.push(newItem);
      
      // Save to localStorage
      localStorage.setItem(key, JSON.stringify(collection));
      
      return newItem;
    } else {
      // For singleton endpoints, just save the data
      localStorage.setItem(key, JSON.stringify(data));
      return data;
    }
  } catch (error) {
    console.error(`POST request failed for ${endpoint}:`, error);
    throw error;
  }
};

/**
 * Make a PUT request
 * @param {string} endpoint - API endpoint
 * @param {object} data - Request data
 * @returns {Promise} - Promise with response data
 */
export const put = async (endpoint, data) => {
  try {
    // For now, simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Update data in localStorage based on endpoint
    const key = getLocalStorageKey(endpoint);
    
    // For collection endpoints with ID, update the specific item
    if (isCollectionEndpoint(endpoint) && endpoint.includes('/')) {
      const collectionKey = getLocalStorageKey(endpoint.split('/')[0]);
      const existingData = localStorage.getItem(collectionKey);
      
      if (existingData) {
        const collection = JSON.parse(existingData);
        const id = endpoint.split('/').pop();
        
        // Find and update the item
        const updatedCollection = collection.map(item => {
          if (item.id === id) {
            return {
              ...item,
              ...data,
              updatedAt: new Date().toISOString(),
            };
          }
          return item;
        });
        
        // Save to localStorage
        localStorage.setItem(collectionKey, JSON.stringify(updatedCollection));
        
        // Return the updated item
        return updatedCollection.find(item => item.id === id);
      }
      
      throw new Error(`Item with ID ${endpoint.split('/').pop()} not found`);
    } else {
      // For singleton endpoints, just update the data
      localStorage.setItem(key, JSON.stringify({
        ...data,
        updatedAt: new Date().toISOString(),
      }));
      
      return data;
    }
  } catch (error) {
    console.error(`PUT request failed for ${endpoint}:`, error);
    throw error;
  }
};

/**
 * Make a DELETE request
 * @param {string} endpoint - API endpoint
 * @returns {Promise} - Promise with success status
 */
export const del = async (endpoint) => {
  try {
    // For now, simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Delete data from localStorage based on endpoint
    if (isCollectionEndpoint(endpoint) && endpoint.includes('/')) {
      const collectionKey = getLocalStorageKey(endpoint.split('/')[0]);
      const existingData = localStorage.getItem(collectionKey);
      
      if (existingData) {
        const collection = JSON.parse(existingData);
        const id = endpoint.split('/').pop();
        
        // Filter out the item to delete
        const updatedCollection = collection.filter(item => item.id !== id);
        
        // Save to localStorage
        localStorage.setItem(collectionKey, JSON.stringify(updatedCollection));
        
        return { success: true };
      }
      
      throw new Error(`Item with ID ${endpoint.split('/').pop()} not found`);
    } else {
      // For singleton endpoints, remove the item
      const key = getLocalStorageKey(endpoint);
      localStorage.removeItem(key);
      
      return { success: true };
    }
  } catch (error) {
    console.error(`DELETE request failed for ${endpoint}:`, error);
    throw error;
  }
};

/**
 * Helper function to get localStorage key from endpoint
 * @param {string} endpoint - API endpoint
 * @returns {string} - localStorage key
 */
const getLocalStorageKey = (endpoint) => {
  // Remove leading slash if present
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint;
  
  // For endpoints with ID, use the collection name
  if (cleanEndpoint.includes('/')) {
    return cleanEndpoint.split('/')[0];
  }
  
  return cleanEndpoint;
};

/**
 * Helper function to check if an endpoint is for a collection
 * @param {string} endpoint - API endpoint
 * @returns {boolean} - Whether the endpoint is for a collection
 */
const isCollectionEndpoint = (endpoint) => {
  const collectionsMap = {
    'financial-sources': true,
    'financial-source-updates': true,
    'users': true,
  };
  
  // Remove leading slash if present
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint;
  
  // For endpoints with ID, check the collection name
  if (cleanEndpoint.includes('/')) {
    return collectionsMap[cleanEndpoint.split('/')[0]] || false;
  }
  
  return collectionsMap[cleanEndpoint] || false;
};
