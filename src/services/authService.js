import api from './api'

const authService = {
    // Login
    login: async (email, password) => {
        try {
            const response = await api.post('/auth/login', { email, password })
            return response
        } catch (error) {
            throw error
        }
    },

    // Register
    register: async (userData) => {
        try {
            const response = await api.post('/auth/register', userData)
            return response
        } catch (error) {
            throw error
        }
    },

    // Logout
    logout: async () => {
        try {
            const response = await api.post('/auth/logout')
            return response
        } catch (error) {
            throw error
        }
    },

    // Get current user
    getCurrentUser: async () => {
        try {
            const response = await api.get('/auth/me')
            return response
        } catch (error) {
            throw error
        }
    },

    // Refresh token
    refreshToken: async (refreshToken) => {
        try {
            const response = await api.post('/auth/refresh', { refreshToken })
            return response
        } catch (error) {
            throw error
        }
    },

    // Forgot password
    forgotPassword: async (email) => {
        try {
            const response = await api.post('/auth/forgot-password', { email })
            return response
        } catch (error) {
            throw error
        }
    },

    // Reset password
    resetPassword: async (token, password) => {
        try {
            const response = await api.post('/auth/reset-password', { token, password })
            return response
        } catch (error) {
            throw error
        }
    },
}

export default authService
