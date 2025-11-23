import { useState } from 'react'
import Card from '../../components/common/Card'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'
import usePageTitle from '../../hooks/usePageTitle'

const UserSettings = () => {
    usePageTitle('Cài đặt')
    const [notifications, setNotifications] = useState({
        email: true,
        push: false,
        sms: false,
    })

    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    })

    const handleNotificationChange = (key) => {
        setNotifications({
            ...notifications,
            [key]: !notifications[key],
        })
    }

    const handlePasswordChange = (e) => {
        setPasswordData({
            ...passwordData,
            [e.target.name]: e.target.value,
        })
    }

    const handlePasswordSubmit = (e) => {
        e.preventDefault()
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert('Mật khẩu mới không khớp!')
            return
        }
        alert('Đổi mật khẩu thành công!')
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Cài đặt</h1>

            <div className="space-y-6">
                {/* Notification Settings */}
                <Card title="Cài đặt thông báo">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-gray-800">Email thông báo</p>
                                <p className="text-sm text-gray-600">Nhận thông báo qua email</p>
                            </div>
                            <button
                                onClick={() => handleNotificationChange('email')}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                    notifications.email ? 'bg-primary-600' : 'bg-gray-300'
                                }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                        notifications.email ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                                />
                            </button>
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-gray-800">Push notification</p>
                                <p className="text-sm text-gray-600">Nhận thông báo đẩy</p>
                            </div>
                            <button
                                onClick={() => handleNotificationChange('push')}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                    notifications.push ? 'bg-primary-600' : 'bg-gray-300'
                                }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                        notifications.push ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                                />
                            </button>
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-gray-800">SMS thông báo</p>
                                <p className="text-sm text-gray-600">Nhận thông báo qua SMS</p>
                            </div>
                            <button
                                onClick={() => handleNotificationChange('sms')}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                    notifications.sms ? 'bg-primary-600' : 'bg-gray-300'
                                }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                        notifications.sms ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                                />
                            </button>
                        </div>
                    </div>
                </Card>

                {/* Change Password */}
                <Card title="Đổi mật khẩu">
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

                        <Button type="submit">Đổi mật khẩu</Button>
                    </form>
                </Card>

                {/* Danger Zone */}
                <Card title="Vùng nguy hiểm">
                    <div className="space-y-4">
                        <div>
                            <p className="text-gray-600 mb-4">
                                Xóa tài khoản sẽ xóa vĩnh viễn tất cả dữ liệu của bạn. Hành động này
                                không thể hoàn tác.
                            </p>
                            <Button variant="danger">Xóa tài khoản</Button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default UserSettings
