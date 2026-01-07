import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5003/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('authToken')
      window.location.href = '/admin'
    }
    return Promise.reject(error)
  }
)

// API methods
export const searchStyles = (query) => {
  return api.get(`/search?query=${encodeURIComponent(query)}`)
}

export const getStyles = () => {
  return api.get('/styles')
}

export const createStyle = (styleData) => {
  return api.post('/styles', styleData)
}

export const updateStyle = (id, updateData) => {
  return api.put(`/styles/${id}`, updateData)
}

export const deleteStyle = (id) => {
  return api.delete(`/styles/${id}`)
}

export const generateWhatsAppLink = (data) => {
  return api.post('/whatsapp-link', data)
}

export default api