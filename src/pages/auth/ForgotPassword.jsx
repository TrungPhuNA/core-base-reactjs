import { useState } from 'react'
import { Link } from 'react-router-dom'
import FloatingInput from '../../components/common/FloatingInput'

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        // Mock send reset email
        setSubmitted(true)
    }

    if (submitted) {
        return (
            <div className="text-center">
                <div className="mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Kiểm tra email của bạn</h2>
                    <p className="text-gray-600 mt-2">
                        Chúng tôi đã gửi link đặt lại mật khẩu đến
                    </p>
                    <p className="text-blue-600 font-medium mt-1">{email}</p>
                </div>

                <div className="space-y-4">
                    <p className="text-sm text-gray-600">
                        Không nhận được email?{' '}
                        <button
                            onClick={() => setSubmitted(false)}
                            className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                            Gửi lại
                        </button>
                    </p>

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

    return (
        <div>
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Quên mật khẩu?</h2>
                <p className="text-gray-600 mt-1">
                    Nhập email của bạn và chúng tôi sẽ gửi link đặt lại mật khẩu
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email */}
                <FloatingInput
                    id="email"
                    name="email"
                    type="email"
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                />

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition shadow-lg"
                >
                    Gửi link đặt lại mật khẩu
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

export default ForgotPassword

