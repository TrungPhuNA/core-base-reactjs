import axios from 'axios'

// Create axios instance
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
})

// Request interceptor
api.interceptors.request.use(
    (config) => {
        // Get token from localStorage
        const user = localStorage.getItem('user')
        if (user) {
            const userData = JSON.parse(user)
            const token = userData.token
            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// Response interceptor
api.interceptors.response.use(
    (response) => {
        return response.data
    },
    (error) => {
        if (error.response) {
            // Handle specific error codes
            switch (error.response.status) {
                case 401:
                    // Unauthorized - redirect to login
                    localStorage.removeItem('user')
                    window.location.href = '/login'
                    break
                case 403:
                    // Forbidden
                    console.error('Access forbidden')
                    break
                case 404:
                    // Not found
                    console.error('Resource not found')
                    break
                case 500:
                    // Server error
                    console.error('Server error')
                    break
                default:
                    console.error('An error occurred')
            }
        }
        return Promise.reject(error)
    }
)

export default api
