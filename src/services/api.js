import axios from 'axios'
import toast from '../utils/toast'

// Create axios instance
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8888/api',
    timeout: import.meta.env.VITE_API_TIMEOUT || 30000,
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
                    toast.error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!')
                    localStorage.removeItem('user')
                    setTimeout(() => {
                        window.location.href = '/login'
                    }, 1000)
                    break
                case 403:
                    // Forbidden
                    toast.error('Bạn không có quyền truy cập!')
                    break
                case 404:
                    // Not found
                    toast.error('Không tìm thấy tài nguyên!')
                    break
                case 500:
                    // Server error
                    toast.error('Lỗi server! Vui lòng thử lại sau.')
                    break
                case 422:
                    // Validation error
                    const message = error.response.data?.message || 'Dữ liệu không hợp lệ!'
                    toast.error(message)
                    break
                default:
                    const errorMsg = error.response.data?.message || 'Có lỗi xảy ra!'
                    toast.error(errorMsg)
            }
        } else if (error.request) {
            // Network error
            toast.error('Không thể kết nối đến server!')
        } else {
            // Other errors
            toast.error('Có lỗi xảy ra!')
        }
        return Promise.reject(error)
    }
)

export default api
