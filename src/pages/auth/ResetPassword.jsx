import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import FloatingInput from '../../components/common/FloatingInput'

const ResetPassword = () => {
    const [searchParams] = useSearchParams()
    const token = searchParams.get('token')
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: '',
    })
    const [success, setSuccess] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (formData.password !== formData.confirmPassword) {
            alert('Mật khẩu không khớp!')
            return
        }

        // Mock reset password
        setSuccess(true)

        // Redirect to login after 2 seconds
        setTimeout(() => {
            navigate('/login')
        }, 2000)
    }

    if (success) {
        return (
            <div className="text-center">
                <div className="mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Đặt lại mật khẩu thành công!</h2>
                    <p className="text-gray-600 mt-2">
                        Mật khẩu của bạn đã được cập nhật thành công
                    </p>
                    <p className="text-sm text-gray-500 mt-4">
                        Đang chuyển hướng đến trang đăng nhập...
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Đặt lại mật khẩu</h2>
                <p className="text-gray-600 mt-1">Nhập mật khẩu mới của bạn</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* New Password */}
                <div>
                    <FloatingInput
                        id="password"
                        name="password"
                        type="password"
                        label="Mật khẩu mới"
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
                    label="Xác nhận mật khẩu mới"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    autoComplete="new-password"
                />

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition shadow-lg"
                >
                    Đặt lại mật khẩu
                </button>
            </form>

            {/* Back to Login */}
            <div className="mt-6 text-center">
                <Link
                    to="/login"
                    className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
                >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Quay lại đăng nhập
                </Link>
            </div>
        </div>
    )
}

export default ResetPassword

