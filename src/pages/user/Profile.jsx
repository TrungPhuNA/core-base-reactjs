import { useState, useRef } from 'react'
import { useAuth } from '../../hooks/useAuth'
import Card from '../../components/common/Card'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'

const UserProfile = () => {
    const { user, login } = useAuth()
    const [activeTab, setActiveTab] = useState('profile')
    const [isEditing, setIsEditing] = useState(false)
    const [avatar, setAvatar] = useState(null)
    const [avatarPreview, setAvatarPreview] = useState(null)
    const fileInputRef = useRef(null)

    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: '+84 123 456 789',
        address: 'Hà Nội, Việt Nam',
        bio: 'Người dùng FE Base',
        dateOfBirth: '1990-01-01',
        gender: 'male',
    })

    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handlePasswordChange = (e) => {
        setPasswordData({
            ...passwordData,
            [e.target.name]: e.target.value,
        })
    }

    const handleAvatarChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setAvatar(file)
            const reader = new FileReader()
            reader.onloadend = () => {
                setAvatarPreview(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        login({
            ...user,
            name: formData.name,
            email: formData.email,
        })
        setIsEditing(false)
        alert('Cập nhật hồ sơ thành công!')
    }

    const handlePasswordSubmit = (e) => {
        e.preventDefault()
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert('Mật khẩu mới không khớp!')
            return
        }
        if (passwordData.newPassword.length < 6) {
            alert('Mật khẩu phải có ít nhất 6 ký tự!')
            return
        }
        alert('Đổi mật khẩu thành công!')
        setPasswordData({
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        })
    }

    const tabs = [
        { id: 'profile', label: 'Thông tin cá nhân', icon: '👤' },
        { id: 'password', label: 'Đổi mật khẩu', icon: '🔒' },
        { id: 'settings', label: 'Cài đặt', icon: '⚙️' },
    ]

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Hồ sơ của tôi</h1>

            {/* Tabs */}
            <div className="mb-6 border-b border-gray-200">
                <div className="flex space-x-8">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`pb-4 px-2 font-medium transition-colors ${
                                activeTab === tab.id
                                    ? 'border-b-2 border-primary-600 text-primary-600'
                                    : 'text-gray-600 hover:text-gray-800'
                            }`}
                        >
                            <span className="mr-2">{tab.icon}</span>
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Profile Tab */}
            {activeTab === 'profile' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Avatar Card */}
                    <Card>
                        <div className="text-center">
                            <div className="relative inline-block">
                                {avatarPreview ? (
                                    <img
                                        src={avatarPreview}
                                        alt="Avatar"
                                        className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                                    />
                                ) : (
                                    <div className="w-24 h-24 bg-primary-600 rounded-full flex items-center justify-center text-white text-4xl mx-auto mb-4">
                                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                                    </div>
                                )}
                                {isEditing && (
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="absolute bottom-4 right-0 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
                                    >
                                        📷
                                    </button>
                                )}
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleAvatarChange}
                                    className="hidden"
                                />
                            </div>
                            <h2 className="text-xl font-bold text-gray-800">{user?.name}</h2>
                            <p className="text-gray-600">{user?.email}</p>
                            <div className="mt-4">
                                <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                                    {user?.role === 'admin' ? 'Admin Account' : 'User Account'}
                                </span>
                            </div>
                        </div>
                    </Card>

                    {/* Profile Form */}
                    <Card className="lg:col-span-2" title="Thông tin cá nhân">
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    label="Họ và tên"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    required
                                />

                                <Input
                                    label="Email"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    required
                                />

                                <Input
                                    label="Số điện thoại"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />

                                <Input
                                    label="Ngày sinh"
                                    type="date"
                                    name="dateOfBirth"
                                    value={formData.dateOfBirth}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Giới tính
                                </label>
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100"
                                >
                                    <option value="male">Nam</option>
                                    <option value="female">Nữ</option>
                                    <option value="other">Khác</option>
                                </select>
                            </div>

                            <Input
                                label="Địa chỉ"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                disabled={!isEditing}
                            />

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Giới thiệu
                                </label>
                                <textarea
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    rows="3"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100"
                                />
                            </div>

                            <div className="flex space-x-4">
                                {!isEditing ? (
                                    <Button type="button" onClick={() => setIsEditing(true)}>
                                        Chỉnh sửa
                                    </Button>
                                ) : (
                                    <>
                                        <Button type="submit">Lưu thay đổi</Button>
                                        <Button
                                            type="button"
                                            variant="secondary"
                                            onClick={() => {
                                                setIsEditing(false)
                                                setAvatarPreview(null)
                                            }}
                                        >
                                            Hủy
                                        </Button>
                                    </>
                                )}
                            </div>
                        </form>
                    </Card>
                </div>
            )}

            {/* Password Tab */}
            {activeTab === 'password' && (
                <Card title="Đổi mật khẩu" className="max-w-2xl">
                    <form onSubmit={handlePasswordSubmit}>
                        <Input
                            label="Mật khẩu hiện tại"
                            type="password"
                            name="currentPassword"
                            value={passwordData.currentPassword}
                            onChange={handlePasswordChange}
                            required
                        />

                        <Input
                            label="Mật khẩu mới"
                            type="password"
                            name="newPassword"
                            value={passwordData.newPassword}
                            onChange={handlePasswordChange}
                            required
                        />

                        <Input
                            label="Xác nhận mật khẩu mới"
                            type="password"
                            name="confirmPassword"
                            value={passwordData.confirmPassword}
                            onChange={handlePasswordChange}
                            required
                        />

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                            <p className="text-sm text-blue-800 font-medium mb-2">
                                Yêu cầu mật khẩu:
                            </p>
                            <ul className="text-sm text-blue-700 space-y-1">
                                <li>• Ít nhất 6 ký tự</li>
                                <li>• Nên bao gồm chữ hoa, chữ thường và số</li>
                                <li>• Không sử dụng mật khẩu dễ đoán</li>
                            </ul>
                        </div>

                        <Button type="submit">Đổi mật khẩu</Button>
                    </form>
                </Card>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
                <Card title="Cài đặt tài khoản" className="max-w-2xl">
                    <div className="space-y-6">
                        <div className="flex items-center justify-between py-4 border-b">
                            <div>
                                <p className="font-medium text-gray-800">Thông báo email</p>
                                <p className="text-sm text-gray-600">Nhận thông báo qua email</p>
                            </div>
                            <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary-600">
                                <span className="inline-block h-4 w-4 transform translate-x-6 rounded-full bg-white transition-transform" />
                            </button>
                        </div>

                        <div className="flex items-center justify-between py-4 border-b">
                            <div>
                                <p className="font-medium text-gray-800">Thông báo push</p>
                                <p className="text-sm text-gray-600">
                                    Nhận thông báo trên trình duyệt
                                </p>
                            </div>
                            <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300">
                                <span className="inline-block h-4 w-4 transform translate-x-1 rounded-full bg-white transition-transform" />
                            </button>
                        </div>

                        <div className="flex items-center justify-between py-4 border-b">
                            <div>
                                <p className="font-medium text-gray-800">
                                    Hiển thị profile công khai
                                </p>
                                <p className="text-sm text-gray-600">
                                    Cho phép người khác xem profile của bạn
                                </p>
                            </div>
                            <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary-600">
                                <span className="inline-block h-4 w-4 transform translate-x-6 rounded-full bg-white transition-transform" />
                            </button>
                        </div>

                        <div className="pt-4">
                            <h3 className="font-medium text-gray-800 mb-4">Ngôn ngữ</h3>
                            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                                <option value="vi">Tiếng Việt</option>
                                <option value="en">English</option>
                            </select>
                        </div>

                        <div className="pt-4 border-t">
                            <Button variant="danger">Xóa tài khoản</Button>
                        </div>
                    </div>
                </Card>
            )}
        </div>
    )
}

export default UserProfile
