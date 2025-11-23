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

        if (formData.password !== formData.confirmPassword) {
            toast.error('Mật khẩu không khớp!')
            return
        }

        if (!formData.agree) {
            toast.warning('Vui lòng đồng ý với điều khoản sử dụng!')
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
                <FloatingInput
                    id="name"
                    name="name"
                    type="text"
                    label="Họ và tên"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    autoComplete="name"
                />

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
                <div>
                    <FloatingInput
                        id="password"
                        name="password"
                        type="password"
                        label="Mật khẩu"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        autoComplete="new-password"
                    />
                    <p className="text-xs text-gray-500 mt-1.5 ml-1">Tối thiểu 6 ký tự</p>
                </div>

                {/* Confirm Password */}
                <FloatingInput
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    label="Xác nhận mật khẩu"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    autoComplete="new-password"
                />

                {/* Terms Agreement */}
                <div>
                    <label className="flex items-start">
                        <input
                            type="checkbox"
                            name="agree"
                            checked={formData.agree}
                            onChange={handleChange}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
                            required
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

