import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import toast from '../../utils/toast'
import FloatingInput from '../../components/common/FloatingInput'
import usePageTitle from '../../hooks/usePageTitle'

const Register = () => {
    usePageTitle('Đăng ký tài khoản')
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        agree: false,
    })
    const [errors, setErrors] = useState({})
    const { login } = useAuth()
    const navigate = useNavigate()

    const validateForm = () => {
        const newErrors = {}

        if (!formData.name || formData.name.trim() === '') {
            newErrors.name = 'Vui lòng nhập họ và tên'
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'Họ và tên phải có ít nhất 2 ký tự'
        }

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

        if (!formData.confirmPassword || formData.confirmPassword.trim() === '') {
            newErrors.confirmPassword = 'Vui lòng xác nhận mật khẩu'
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Mật khẩu không khớp'
        }

        if (!formData.agree) {
            newErrors.agree = 'Vui lòng đồng ý với điều khoản sử dụng'
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

        // Mock register - auto login after register
        const userData = {
            id: Date.now(),
            name: formData.name,
            email: formData.email,
            role: 'user',
        }

        login(userData)
        toast.success(`Chào mừng ${formData.name}! Đăng ký thành công! 🎉`)
        navigate('/user/dashboard')
    }

    return (
        <div>
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Đăng ký</h2>
                <p className="text-gray-600 mt-1">Tạo tài khoản mới của bạn</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                    <FloatingInput
                        id="name"
                        name="name"
                        type="text"
                        label="Họ và tên"
                        value={formData.name}
                        onChange={handleChange}
                        autoComplete="name"
                    />
                    {errors.name && (
                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {errors.name}
                        </p>
                    )}
                </div>

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
                        autoComplete="new-password"
                    />
                    {errors.password ? (
                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {errors.password}
                        </p>
                    ) : (
                        <p className="text-xs text-gray-500 mt-1.5 ml-1">Tối thiểu 6 ký tự</p>
                    )}
                </div>

                {/* Confirm Password */}
                <div>
                    <FloatingInput
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        label="Xác nhận mật khẩu"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        autoComplete="new-password"
                    />
                    {errors.confirmPassword && (
                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {errors.confirmPassword}
                        </p>
                    )}
                </div>

                {/* Terms Agreement */}
                <div>
                    <label className="flex items-start">
                        <input
                            type="checkbox"
                            name="agree"
                            checked={formData.agree}
                            onChange={handleChange}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                            Tôi đồng ý với{' '}
                            <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                                Điều khoản sử dụng
                            </a>{' '}
                            và{' '}
                            <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                                Chính sách bảo mật
                            </a>
                        </span>
                    </label>
                    {errors.agree && (
                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {errors.agree}
                        </p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition shadow-lg"
                >
                    Đăng ký
                </button>
            </form>

            {/* Login Link */}
            <div className="mt-6 text-center text-sm text-gray-600">
                Đã có tài khoản?{' '}
                <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                    Đăng nhập ngay
                </Link>
            </div>
        </div>
    )
}

export default Register

