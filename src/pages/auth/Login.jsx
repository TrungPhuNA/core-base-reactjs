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
    const [errors, setErrors] = useState({})
    const { login } = useAuth()
    const navigate = useNavigate()

    const validateForm = () => {
        const newErrors = {}

        if (!formData.email || formData.email.trim() === '') {
            newErrors.email = 'Vui lòng nhập email'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Email không hợp lệ'
        }

        if (!formData.password || formData.password.trim() === '') {
            newErrors.password = 'Vui lòng nhập mật khẩu'
        } else if (formData.password.length < 6) {
            newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự'
        }

        return newErrors
    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        })
        // Clear error when user types
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // Validate
        const validationErrors = validateForm()
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

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
                <div>
                    <FloatingInput
                        id="email"
                        name="email"
                        type="email"
                        label="Email"
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="email"
                    />
                    {errors.email && (
                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {errors.email}
                        </p>
                    )}
                </div>

                {/* Password */}
                <div>
                    <FloatingInput
                        id="password"
                        name="password"
                        type="password"
                        label="Mật khẩu"
                        value={formData.password}
                        onChange={handleChange}
                        autoComplete="current-password"
                    />
                    {errors.password && (
                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {errors.password}
                        </p>
                    )}
                </div>

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

