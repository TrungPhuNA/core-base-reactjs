import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import toast from '../../utils/toast'
import FloatingInput from '../../components/common/FloatingInput'
import FloatingReactSelect from '../../components/common/FloatingReactSelect'
import usePageTitle from '../../hooks/usePageTitle'

const Login = () => {
    usePageTitle('Đăng nhập')
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: 'user',
        remember: false,
    })
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

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email */}
                <FloatingInput
                    id="email"
                    name="email"
                    type="email"
                    label="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                />

                {/* Password */}
                <FloatingInput
                    id="password"
                    name="password"
                    type="password"
                    label="Mật khẩu"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    autoComplete="current-password"
                />

                {/* Role Selection */}
                <FloatingReactSelect
                    id="role"
                    name="role"
                    label="Vai trò"
                    value={formData.role}
                    onChange={handleChange}
                    options={[
                        { value: 'user', label: '👤 User' },
                        { value: 'admin', label: '👑 Admin' },
                    ]}
                    required
                    isSearchable={false}
                    isClearable={false}
                />

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

