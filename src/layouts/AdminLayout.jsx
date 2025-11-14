import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useLayout } from '../hooks/useLayout'
import { useState } from 'react'

const AdminLayout = () => {
    const { user, logout } = useAuth()
    const { layoutMode, toggleLayoutMode, isSidebarMode } = useLayout()
    const navigate = useNavigate()
    const location = useLocation()
    const [showUserMenu, setShowUserMenu] = useState(false)
    const [sidebarOpen, setSidebarOpen] = useState(true)

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    const menuItems = [
        { path: '/admin/dashboard', icon: '📊', label: 'Dashboard' },
        { path: '/admin/users', icon: '👥', label: 'Quản lý Users' },
        { path: '/admin/profile', icon: '👤', label: 'Hồ sơ' },
        { path: '/admin/settings', icon: '⚙️', label: 'Cài đặt' },
        { path: '/admin/reports', icon: '📈', label: 'Báo cáo' },
    ]

    const isActive = (path) => location.pathname === path

    // Sidebar Mode Layout
    if (isSidebarMode) {
        return (
            <div className="min-h-screen bg-gray-50 flex">
                {/* Sidebar */}
                <aside
                    className={`bg-gray-800 text-white transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'}`}
                >
                    <div className="p-4">
                        <div className="flex items-center justify-between mb-8">
                            {sidebarOpen && <h2 className="text-xl font-bold">Admin Panel</h2>}
                            <button
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="text-white hover:text-gray-300"
                            >
                                {sidebarOpen ? '◀' : '▶'}
                            </button>
                        </div>

                        <nav className="space-y-2">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                                        isActive(item.path) ? 'bg-primary-600' : 'hover:bg-gray-700'
                                    }`}
                                >
                                    <span className="text-xl">{item.icon}</span>
                                    {sidebarOpen && <span>{item.label}</span>}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </aside>

                {/* Main Content */}
                <div className="flex-1 flex flex-col">
                    {/* Header */}
                    <header className="bg-white shadow-sm">
                        <div className="px-6 py-4 flex justify-between items-center">
                            <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>

                            <div className="flex items-center space-x-4">
                                {/* Layout Toggle */}
                                <button
                                    onClick={toggleLayoutMode}
                                    className="p-2 text-gray-600 hover:text-primary-600 hover:bg-gray-100 rounded-lg transition-colors"
                                    title="Chuyển sang Top Menu"
                                >
                                    ⊟
                                </button>

                                {/* User Menu */}
                                <div className="relative">
                                    <button
                                        onClick={() => setShowUserMenu(!showUserMenu)}
                                        className="flex items-center space-x-2 text-gray-700 hover:text-primary-600"
                                    >
                                        <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white">
                                            {user?.name?.charAt(0).toUpperCase() || 'A'}
                                        </div>
                                        <span>{user?.name || 'Admin'}</span>
                                    </button>

                                    {showUserMenu && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10">
                                            <Link
                                                to="/admin/profile"
                                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                                onClick={() => setShowUserMenu(false)}
                                            >
                                                Hồ sơ
                                            </Link>
                                            <Link
                                                to="/admin/settings"
                                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                                onClick={() => setShowUserMenu(false)}
                                            >
                                                Cài đặt
                                            </Link>
                                            <hr className="my-2" />
                                            <button
                                                onClick={handleLogout}
                                                className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                                            >
                                                Đăng xuất
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Page Content */}
                    <main className="flex-1 p-6">
                        <Outlet />
                    </main>
                </div>
            </div>
        )
    }

    // Top Menu Mode Layout
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header with Top Menu */}
            <header className="bg-white shadow-sm">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex justify-between items-center">
                        <Link to="/admin/dashboard" className="text-2xl font-bold text-purple-600">
                            Admin Panel
                        </Link>

                        {/* Top Navigation */}
                        <nav className="hidden md:flex space-x-6">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`flex items-center space-x-2 transition-colors ${
                                        isActive(item.path)
                                            ? 'text-purple-600 font-semibold'
                                            : 'text-gray-700 hover:text-purple-600'
                                    }`}
                                >
                                    <span>{item.icon}</span>
                                    <span>{item.label}</span>
                                </Link>
                            ))}
                        </nav>

                        <div className="flex items-center space-x-4">
                            {/* Layout Toggle */}
                            <button
                                onClick={toggleLayoutMode}
                                className="p-2 text-gray-600 hover:text-primary-600 hover:bg-gray-100 rounded-lg transition-colors"
                                title="Chuyển sang Sidebar"
                            >
                                ☰
                            </button>

                            {/* User Menu */}
                            <div className="relative">
                                <button
                                    onClick={() => setShowUserMenu(!showUserMenu)}
                                    className="flex items-center space-x-2 text-gray-700 hover:text-purple-600"
                                >
                                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white">
                                        {user?.name?.charAt(0).toUpperCase() || 'A'}
                                    </div>
                                    <span>{user?.name || 'Admin'}</span>
                                </button>

                                {showUserMenu && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10">
                                        <Link
                                            to="/admin/profile"
                                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                            onClick={() => setShowUserMenu(false)}
                                        >
                                            Hồ sơ
                                        </Link>
                                        <Link
                                            to="/admin/settings"
                                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                            onClick={() => setShowUserMenu(false)}
                                        >
                                            Cài đặt
                                        </Link>
                                        <hr className="my-2" />
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                                        >
                                            Đăng xuất
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Page Content */}
            <main className="container mx-auto px-4 py-8">
                <Outlet />
            </main>
        </div>
    )
}

export default AdminLayout
