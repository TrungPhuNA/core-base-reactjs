import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useLayout } from '../hooks/useLayout'
import { useState } from 'react'

const UserLayout = () => {
    const { user, logout } = useAuth()
    const { layoutMode, toggleLayoutMode, isSidebarMode } = useLayout()
    const navigate = useNavigate()
    const location = useLocation()
    const [showUserMenu, setShowUserMenu] = useState(false)

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    const menuItems = [
        { path: '/user/dashboard', label: 'Dashboard', icon: '📊' },
        { path: '/user/profile', label: 'Hồ sơ', icon: '👤' },
        { path: '/user/settings', label: 'Cài đặt', icon: '⚙️' },
    ]

    const isActive = (path) => location.pathname === path

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <nav className="container mx-auto px-4 py-4">
                    <div className="flex justify-between items-center">
                        <Link to="/user/dashboard" className="text-2xl font-bold text-primary-600">
                            FE Base
                        </Link>

                        {/* Top Menu Mode */}
                        {!isSidebarMode && (
                            <div className="hidden md:flex space-x-8">
                                {menuItems.map((item) => (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className={`transition-colors ${
                                            isActive(item.path)
                                                ? 'text-primary-600 font-semibold'
                                                : 'text-gray-700 hover:text-primary-600'
                                        }`}
                                    >
                                        <span className="mr-1">{item.icon}</span>
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        )}

                        <div className="flex items-center space-x-4">
                            {/* Layout Toggle Button */}
                            <button
                                onClick={toggleLayoutMode}
                                className="p-2 text-gray-600 hover:text-primary-600 hover:bg-gray-100 rounded-lg transition-colors"
                                title={
                                    isSidebarMode ? 'Chuyển sang Top Menu' : 'Chuyển sang Sidebar'
                                }
                            >
                                {isSidebarMode ? '☰' : '⊟'}
                            </button>

                            {/* User Menu */}
                            <div className="relative">
                                <button
                                    onClick={() => setShowUserMenu(!showUserMenu)}
                                    className="flex items-center space-x-2 text-gray-700 hover:text-primary-600"
                                >
                                    <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white">
                                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                                    </div>
                                    <span>{user?.name || 'User'}</span>
                                </button>

                                {showUserMenu && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10">
                                        <Link
                                            to="/user/profile"
                                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                            onClick={() => setShowUserMenu(false)}
                                        >
                                            Hồ sơ
                                        </Link>
                                        <Link
                                            to="/user/settings"
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
                </nav>
            </header>

            <div className="flex">
                {/* Sidebar Mode */}
                {isSidebarMode && (
                    <aside className="w-64 bg-white shadow-sm min-h-[calc(100vh-73px)]">
                        <nav className="p-4">
                            <ul className="space-y-2">
                                {menuItems.map((item) => (
                                    <li key={item.path}>
                                        <Link
                                            to={item.path}
                                            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                                                isActive(item.path)
                                                    ? 'bg-primary-600 text-white'
                                                    : 'text-gray-700 hover:bg-gray-100'
                                            }`}
                                        >
                                            <span className="text-xl">{item.icon}</span>
                                            <span>{item.label}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </aside>
                )}

                {/* Main Content */}
                <main className={`flex-1 ${isSidebarMode ? 'p-8' : 'container mx-auto px-4 py-8'}`}>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default UserLayout
