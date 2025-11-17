import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

// Layouts
import WebLayout from '../layouts/WebLayout'
import UserLayout from '../layouts/UserLayout'
import AdminLayout from '../layouts/AdminLayout'
import AuthLayout from '../layouts/AuthLayout'

// Web Pages
import Home from '../pages/web/Home'
import About from '../pages/web/About'
import Contact from '../pages/web/Contact'

// Auth Pages
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import ForgotPassword from '../pages/auth/ForgotPassword'
import ResetPassword from '../pages/auth/ResetPassword'

// User Pages
import UserDashboard from '../pages/user/Dashboard'
import UserProfile from '../pages/user/Profile'
import UserSettings from '../pages/user/Settings'

// Admin Pages
import AdminDashboard from '../pages/admin/Dashboard'
import AdminUsers from '../pages/admin/Users'
import AdminSettings from '../pages/admin/Settings'
import AdminReports from '../pages/admin/Reports'
import AdminProfile from '../pages/admin/Profile'

// Protected Route Component
import ProtectedRoute from './ProtectedRoute'

const AppRoutes = () => {
    const { isAuthenticated } = useAuth()

    return (
        <Routes>
            {/* Auth Routes (Public) */}
            <Route element={<AuthLayout />}>
                <Route
                    path="/login"
                    element={isAuthenticated ? <Navigate to="/user/dashboard" replace /> : <Login />}
                />
                <Route
                    path="/register"
                    element={isAuthenticated ? <Navigate to="/user/dashboard" replace /> : <Register />}
                />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
            </Route>

            {/* Web Routes (Public) */}
            <Route element={<WebLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
            </Route>

            {/* User Routes (Protected) */}
            <Route
                path="/user"
                element={
                    <ProtectedRoute>
                        <UserLayout />
                    </ProtectedRoute>
                }
            >
                <Route path="dashboard" element={<UserDashboard />} />
                <Route path="profile" element={<UserProfile />} />
                <Route path="settings" element={<UserSettings />} />
                <Route index element={<Navigate to="/user/dashboard" replace />} />
            </Route>

            {/* Admin Routes (Protected - Admin Only) */}
            <Route
                path="/admin"
                element={
                    <ProtectedRoute requireAdmin>
                        <AdminLayout />
                    </ProtectedRoute>
                }
            >
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="profile" element={<AdminProfile />} />
                <Route path="settings" element={<AdminSettings />} />
                <Route path="reports" element={<AdminReports />} />
                <Route index element={<Navigate to="/admin/dashboard" replace />} />
            </Route>

            {/* 404 - Not Found */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    )
}

export default AppRoutes
