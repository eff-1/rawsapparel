/**
 * API Configuration Utility
 * Automatically uses the correct API URL based on environment
 */

// Get API base URL from environment variable
// Development: Uses proxy (/api)
// Production: Uses full Render URL (https://rawsbackend.onrender.com/api)
export const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

/**
 * Make API request with automatic URL handling
 * @param {string} endpoint - API endpoint (e.g., '/search/images')
 * @param {object} options - Fetch options
 * @returns {Promise} - Fetch response
 */
export async function apiRequest(endpoint, options = {}) {
  // Remove leading slash if present
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint
  
  const url = `${API_BASE_URL}/${cleanEndpoint}`
  
  console.log(`API Request: ${url}`)
  
  return fetch(url, options)
}

/**
 * Helper function to build query string
 * @param {object} params - Query parameters
 * @returns {string} - Query string
 */
export function buildQueryString(params) {
  return Object.keys(params)
    .filter(key => params[key] !== undefined && params[key] !== null)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&')
}

/**
 * API endpoints
 */
export const API_ENDPOINTS = {
  // Search
  searchImages: (query, page = 1, limit = 12) => 
    `/search/images?${buildQueryString({ query, page, limit })}`,
  
  preloadPages: (query, pages, limit = 12) => 
    `/search/preload?${buildQueryString({ query, pages: pages.join(','), limit })}`,
  
  searchPinterest: (query) => 
    `/search/pinterest?${buildQueryString({ query })}`,
  
  // Styles
  getStyles: () => '/styles',
  createStyle: () => '/styles',
  deleteStyle: (id) => `/styles/${id}`,
  
  // Upload
  uploadImage: () => '/upload/image',
  
  // Auth
  login: () => '/auth/login',
  
  // WhatsApp
  whatsappLink: () => '/whatsapp-link',
  
  // Google Test
  googleTestSetup: () => '/google-test/setup'
}

export default {
  API_BASE_URL,
  apiRequest,
  buildQueryString,
  API_ENDPOINTS
}
