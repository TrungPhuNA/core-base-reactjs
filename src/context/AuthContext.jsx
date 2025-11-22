import { createContext, useState, useEffect } from 'react'
import toast from '../utils/toast'

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Check if user is logged in from localStorage
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
        setLoading(false)
    }, [])

    const login = (userData) => {
        setUser(userData)
        localStorage.setItem('user', JSON.stringify(userData))
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('user')
        toast.success('Đăng xuất thành công! Hẹn gặp lại! 👋')
    }

    const value = {
        user,
        login,
        logout,
        loading,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        isUser: user?.role === 'user',
    }

    return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}
