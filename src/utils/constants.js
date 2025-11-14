// API URLs
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

// User Roles
export const USER_ROLES = {
    ADMIN: 'admin',
    USER: 'user',
}

// User Status
export const USER_STATUS = {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    BANNED: 'banned',
}

// Pagination
export const PAGINATION = {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 10,
    MAX_LIMIT: 100,
}

// Local Storage Keys
export const STORAGE_KEYS = {
    USER: 'user',
    TOKEN: 'token',
    REFRESH_TOKEN: 'refreshToken',
    THEME: 'theme',
    LANGUAGE: 'language',
}

// Routes
export const ROUTES = {
    HOME: '/',
    ABOUT: '/about',
    CONTACT: '/contact',
    LOGIN: '/login',
    REGISTER: '/register',
    USER_DASHBOARD: '/user/dashboard',
    USER_PROFILE: '/user/profile',
    USER_SETTINGS: '/user/settings',
    ADMIN_DASHBOARD: '/admin/dashboard',
    ADMIN_USERS: '/admin/users',
    ADMIN_SETTINGS: '/admin/settings',
    ADMIN_REPORTS: '/admin/reports',
}

// Date Formats
export const DATE_FORMATS = {
    FULL: 'DD/MM/YYYY HH:mm:ss',
    DATE: 'DD/MM/YYYY',
    TIME: 'HH:mm:ss',
    DATETIME: 'DD/MM/YYYY HH:mm',
}

// Messages
export const MESSAGES = {
    SUCCESS: {
        LOGIN: 'Đăng nhập thành công!',
        LOGOUT: 'Đăng xuất thành công!',
        REGISTER: 'Đăng ký thành công!',
        UPDATE: 'Cập nhật thành công!',
        DELETE: 'Xóa thành công!',
        CREATE: 'Tạo mới thành công!',
    },
    ERROR: {
        LOGIN: 'Đăng nhập thất bại!',
        REGISTER: 'Đăng ký thất bại!',
        UPDATE: 'Cập nhật thất bại!',
        DELETE: 'Xóa thất bại!',
        CREATE: 'Tạo mới thất bại!',
        NETWORK: 'Lỗi kết nối mạng!',
        SERVER: 'Lỗi server!',
        UNAUTHORIZED: 'Bạn không có quyền truy cập!',
        NOT_FOUND: 'Không tìm thấy dữ liệu!',
    },
}

export default {
    API_URL,
    USER_ROLES,
    USER_STATUS,
    PAGINATION,
    STORAGE_KEYS,
    ROUTES,
    DATE_FORMATS,
    MESSAGES,
}
