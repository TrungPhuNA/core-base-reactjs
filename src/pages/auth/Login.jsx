import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import toast from '../../utils/toast'

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: 'user',
        remember: false,
    })
    const [showPassword, setShowPassword] = useState(false)
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // Mock login
        const userData = {
            id: 1,
            name: formData.role === 'admin' ? 'Admin User' : 'Normal User',
            email: formData.email,
            role: formData.role,
        }

        login(userData)
        toast.success(`Đăng nhập thành công! Chào mừng ${userData.name} 👋`)

        // Redirect based on role
        setTimeout(() => {
            if (formData.role === 'admin') {
                navigate('/admin/dashboard')
            } else {
                navigate('/user/dashboard')
            }
        }, 500)
    }

    return (
        <div>
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Đăng nhập</h2>
                <p className="text-gray-600 mt-1">Đăng nhập vào tài khoản của bạn</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="example@email.com"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        required
                    />
                </div>

                {/* Password */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mật khẩu</label>
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                            {showPassword ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Role Selection */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Vai trò</label>
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

                {/* Remember & Forgot Password */}
                <div className="flex items-center justify-between">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            name="remember"
                            checked={formData.remember}
                            onChange={handleChange}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Ghi nhớ đăng nhập</span>
                    </label>
                    <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                        Quên mật khẩu?
                    </Link>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition shadow-lg"
                >
                    Đăng nhập
                </button>
            </form>

            {/* Register Link */}
            <div className="mt-6 text-center text-sm text-gray-600">
                Chưa có tài khoản?{' '}
                <Link to="/register" className="text-blue-600 hover:text-blue-700 font-medium">
                    Đăng ký ngay
                </Link>
            </div>

            {/* Demo Info */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <p className="text-xs text-blue-800 text-center">
                    <strong>Demo:</strong> Nhập bất kỳ email/password nào để đăng nhập
                </p>
            </div>
        </div>
    )
}

export default Login

