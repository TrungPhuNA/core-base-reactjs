import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import Card from '../../components/common/Card'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: 'user', // user or admin
    })
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // Mock login - In real app, call API here
        const userData = {
            id: 1,
            name: formData.role === 'admin' ? 'Admin User' : 'Normal User',
            email: formData.email,
            role: formData.role,
        }

        login(userData)

        // Redirect based on role
        if (formData.role === 'admin') {
            navigate('/admin/dashboard')
        } else {
            navigate('/user/dashboard')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
            <div className="max-w-md w-full">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Đăng nhập</h1>
                    <p className="text-gray-600 mt-2">Đăng nhập vào tài khoản của bạn</p>
                </div>

                <Card>
                    <form onSubmit={handleSubmit}>
                        <Input
                            label="Email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Nhập email"
                            required
                        />

                        <Input
                            label="Mật khẩu"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Nhập mật khẩu"
                            required
                        />

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Đăng nhập với vai trò
                            </label>
                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>

                        <Button type="submit" className="w-full">
                            Đăng nhập
                        </Button>
                    </form>

                    <div className="mt-4 text-center text-sm text-gray-600">
                        <p>Demo: Nhập bất kỳ email/password nào để đăng nhập</p>
                        <p className="mt-1">Chọn role để truy cập User hoặc Admin layout</p>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default Login
