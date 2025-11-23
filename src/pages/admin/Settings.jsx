import { useState } from 'react'
import Card from '../../components/common/Card'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'
import usePageTitle from '../../hooks/usePageTitle'

const AdminSettings = () => {
    usePageTitle('Cấu hình')
    const [settings, setSettings] = useState({
        siteName: 'FE Base',
        siteDescription: 'React + TailwindCSS Base Project',
        contactEmail: 'contact@febase.com',
        contactPhone: '+84 123 456 789',
        maintenanceMode: false,
        allowRegistration: true,
        requireEmailVerification: true,
    })

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setSettings({
            ...settings,
            [name]: type === 'checkbox' ? checked : value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        alert('Cài đặt đã được lưu!')
        console.log('Settings:', settings)
    }

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Cài đặt hệ thống</h1>
                <p className="text-gray-600 mt-2">Quản lý cài đặt chung của hệ thống</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* General Settings */}
                <Card title="Cài đặt chung">
                    <Input
                        label="Tên website"
                        name="siteName"
                        value={settings.siteName}
                        onChange={handleChange}
                        required
                    />

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Mô tả website
                        </label>
                        <textarea
                            name="siteDescription"
                            value={settings.siteDescription}
                            onChange={handleChange}
                            rows="3"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                    </div>

                    <Input
                        label="Email liên hệ"
                        type="email"
                        name="contactEmail"
                        value={settings.contactEmail}
                        onChange={handleChange}
                        required
                    />

                    <Input
                        label="Số điện thoại"
                        name="contactPhone"
                        value={settings.contactPhone}
                        onChange={handleChange}
                    />
                </Card>

                {/* System Settings */}
                <Card title="Cài đặt hệ thống">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-gray-800">Chế độ bảo trì</p>
                                <p className="text-sm text-gray-600">
                                    Tạm thời tắt website để bảo trì
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() =>
                                    setSettings({
                                        ...settings,
                                        maintenanceMode: !settings.maintenanceMode,
                                    })
                                }
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                    settings.maintenanceMode ? 'bg-primary-600' : 'bg-gray-300'
                                }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                        settings.maintenanceMode ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                                />
                            </button>
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-gray-800">Cho phép đăng ký</p>
                                <p className="text-sm text-gray-600">
                                    Cho phép người dùng mới đăng ký tài khoản
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() =>
                                    setSettings({
                                        ...settings,
                                        allowRegistration: !settings.allowRegistration,
                                    })
                                }
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                    settings.allowRegistration ? 'bg-primary-600' : 'bg-gray-300'
                                }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                        settings.allowRegistration
                                            ? 'translate-x-6'
                                            : 'translate-x-1'
                                    }`}
                                />
                            </button>
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-gray-800">Xác thực email</p>
                                <p className="text-sm text-gray-600">
                                    Yêu cầu xác thực email khi đăng ký
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() =>
                                    setSettings({
                                        ...settings,
                                        requireEmailVerification:
                                            !settings.requireEmailVerification,
                                    })
                                }
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                    settings.requireEmailVerification
                                        ? 'bg-primary-600'
                                        : 'bg-gray-300'
                                }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                        settings.requireEmailVerification
                                            ? 'translate-x-6'
                                            : 'translate-x-1'
                                    }`}
                                />
                            </button>
                        </div>
                    </div>
                </Card>

                <div className="flex justify-end">
                    <Button type="submit">Lưu cài đặt</Button>
                </div>
            </form>
        </div>
    )
}

export default AdminSettings
