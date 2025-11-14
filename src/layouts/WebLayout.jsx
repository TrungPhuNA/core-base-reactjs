import { Link, Outlet } from 'react-router-dom'

const WebLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <nav className="container mx-auto px-4 py-4">
                    <div className="flex justify-between items-center">
                        <Link to="/" className="text-2xl font-bold text-primary-600">
                            FE Base
                        </Link>

                        <div className="hidden md:flex space-x-8">
                            <Link
                                to="/"
                                className="text-gray-700 hover:text-primary-600 transition-colors"
                            >
                                Trang chủ
                            </Link>
                            <Link
                                to="/about"
                                className="text-gray-700 hover:text-primary-600 transition-colors"
                            >
                                Giới thiệu
                            </Link>
                            <Link
                                to="/contact"
                                className="text-gray-700 hover:text-primary-600 transition-colors"
                            >
                                Liên hệ
                            </Link>
                        </div>

                        <div className="flex space-x-4">
                            <Link
                                to="/login"
                                className="px-4 py-2 text-primary-600 hover:text-primary-700 transition-colors"
                            >
                                Đăng nhập
                            </Link>
                            <Link
                                to="/login"
                                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                            >
                                Đăng ký
                            </Link>
                        </div>
                    </div>
                </nav>
            </header>

            {/* Main Content */}
            <main className="flex-grow">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white">
                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="text-xl font-bold mb-4">FE Base</h3>
                            <p className="text-gray-400">React + TailwindCSS Base Project</p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Liên kết</h4>
                            <ul className="space-y-2">
                                <li>
                                    <Link
                                        to="/"
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
                                        Trang chủ
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/about"
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
                                        Giới thiệu
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/contact"
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
                                        Liên hệ
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Liên hệ</h4>
                            <p className="text-gray-400">Email: contact@febase.com</p>
                            <p className="text-gray-400">Phone: +84 123 456 789</p>
                        </div>
                    </div>
                    <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                        <p>&copy; 2024 FE Base. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default WebLayout
