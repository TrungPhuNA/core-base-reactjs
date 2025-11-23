import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import FloatingInput from '../../components/common/FloatingInput'
import usePageTitle from '../../hooks/usePageTitle'
import toast from '../../utils/toast'

const ResetPassword = () => {
    usePageTitle('Đặt lại mật khẩu')
    const [searchParams] = useSearchParams()
    const token = searchParams.get('token')
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: '',
    })
    const [errors, setErrors] = useState({})
    const [success, setSuccess] = useState(false)
    const navigate = useNavigate()

    const validateForm = () => {
        const newErrors = {}

        if (!formData.password || formData.password.trim() === '') {
            newErrors.password = 'Vui lòng nhập mật khẩu mới'
        } else if (formData.password.length < 6) {
            newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự'
        }

        if (!formData.confirmPassword || formData.confirmPassword.trim() === '') {
            newErrors.confirmPassword = 'Vui lòng xác nhận mật khẩu'
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Mật khẩu không khớp'
        }

        return newErrors
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
        // Clear error when user types
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' })
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

        // Mock reset password
        toast.success('Đặt lại mật khẩu thành công!')
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
                        label="Xác nhận mật khẩu mới"
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

