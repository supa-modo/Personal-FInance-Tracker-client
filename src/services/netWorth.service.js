import apiClient from './api.service';

/**
 * Net Worth service for handling net worth data operations
 */

/**
 * Get all net worth events
 * @param {string} period - Time period ('week', 'month', 'quarter', 'year', 'all')
 * @param {number} limit - Maximum number of events to return
 * @returns {Promise} - Promise with net worth events data
 */
export const getNetWorthEvents = async (period = 'all', limit = 100) => {
  try {
    const response = await apiClient.get(`/net-worth-events?period=${period}&limit=${limit}`);
    return response.data.data.netWorthEvents;
  } catch (error) {
    console.error('Error fetching net worth events:', error.response?.data?.message || error.message);
    throw error;
  }
};

/**
 * Get the latest net worth
 * @returns {Promise} - Promise with latest net worth data
 */
export const getLatestNetWorth = async () => {
  try {
    const response = await apiClient.get('/net-worth-events/latest');
    return response.data.data.netWorth;
  } catch (error) {
    console.error('Error fetching latest net worth:', error.response?.data?.message || error.message);
    throw error;
  }
};

/**
 * Create a manual net worth event
 * @param {number} netWorth - Net worth value
 * @param {Date} eventDate - Event date
 * @returns {Promise} - Promise with created net worth event
 */
export const createNetWorthEvent = async (netWorth, eventDate = new Date()) => {
  try {
    const response = await apiClient.post('/net-worth-events', {
      eventType: 'MANUAL',
      eventDate
    });
    return response.data.data.netWorthEvent;
  } catch (error) {
    console.error('Error creating net worth event:', error.response?.data?.message || error.message);
    throw error;
  }
};

/**
 * Format net worth events for chart display
 * @param {Array} events - Net worth events
 * @returns {Array} - Formatted data for charts
 */
export const formatNetWorthEventsForChart = (events) => {
  if (!events || !Array.isArray(events) || events.length === 0) {
    return [];
  }

  // Sort events by date (oldest to newest)
  const sortedEvents = [...events].sort((a, b) => new Date(a.event_date) - new Date(b.event_date));

  // Format for chart display
  return sortedEvents.map(event => ({
    date: event.event_date,
    total: parseFloat(event.net_worth),
    netWorth: parseFloat(event.net_worth),
    eventType: event.event_type
  }));
};
