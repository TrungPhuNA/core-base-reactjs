import api from './api'

const userService = {
    // Get all users (admin only)
    getAllUsers: async (params = {}) => {
        try {
            const response = await api.get('/users', { params })
            return response
        } catch (error) {
            throw error
        }
    },

    // Get user by ID
    getUserById: async (id) => {
        try {
            const response = await api.get(`/users/${id}`)
            return response
        } catch (error) {
            throw error
        }
    },

    // Update user
    updateUser: async (id, userData) => {
        try {
            const response = await api.put(`/users/${id}`, userData)
            return response
        } catch (error) {
            throw error
        }
    },

    // Delete user
    deleteUser: async (id) => {
        try {
            const response = await api.delete(`/users/${id}`)
            return response
        } catch (error) {
            throw error
        }
    },

    // Update profile
    updateProfile: async (userData) => {
        try {
            const response = await api.put('/users/profile', userData)
            return response
        } catch (error) {
            throw error
        }
    },

    // Change password
    changePassword: async (currentPassword, newPassword) => {
        try {
            const response = await api.post('/users/change-password', {
                currentPassword,
                newPassword,
            })
            return response
        } catch (error) {
            throw error
        }
    },

    // Upload avatar
    uploadAvatar: async (file) => {
        try {
            const formData = new FormData()
            formData.append('avatar', file)
            const response = await api.post('/users/avatar', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            return response
        } catch (error) {
            throw error
        }
    },
}

export default userService
