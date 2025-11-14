import { useAuth } from '../../hooks/useAuth'
import Card from '../../components/common/Card'

const UserDashboard = () => {
    const { user } = useAuth()

    const stats = [
        { label: 'Tổng đơn hàng', value: '24', icon: '📦', color: 'bg-blue-500' },
        { label: 'Đang xử lý', value: '5', icon: '⏳', color: 'bg-yellow-500' },
        { label: 'Hoàn thành', value: '19', icon: '✅', color: 'bg-green-500' },
        { label: 'Điểm tích lũy', value: '1,250', icon: '⭐', color: 'bg-purple-500' },
    ]

    const recentActivities = [
        { id: 1, action: 'Đặt hàng mới', time: '2 giờ trước', status: 'success' },
        { id: 2, action: 'Cập nhật hồ sơ', time: '1 ngày trước', status: 'info' },
        { id: 3, action: 'Thanh toán đơn hàng #1234', time: '2 ngày trước', status: 'success' },
        { id: 4, action: 'Đánh giá sản phẩm', time: '3 ngày trước', status: 'info' },
    ]

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Xin chào, {user?.name}! 👋</h1>
                <p className="text-gray-600 mt-2">Đây là trang dashboard của bạn</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <Card key={index}>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm">{stat.label}</p>
                                <p className="text-2xl font-bold text-gray-800 mt-1">
                                    {stat.value}
                                </p>
                            </div>
                            <div
                                className={`${stat.color} w-12 h-12 rounded-full flex items-center justify-center text-2xl`}
                            >
                                {stat.icon}
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <Card title="Hoạt động gần đây">
                <div className="space-y-4">
                    {recentActivities.map((activity) => (
                        <div
                            key={activity.id}
                            className="flex items-center justify-between py-3 border-b last:border-b-0"
                        >
                            <div className="flex items-center space-x-3">
                                <div
                                    className={`w-2 h-2 rounded-full ${
                                        activity.status === 'success'
                                            ? 'bg-green-500'
                                            : 'bg-blue-500'
                                    }`}
                                ></div>
                                <div>
                                    <p className="text-gray-800 font-medium">{activity.action}</p>
                                    <p className="text-gray-500 text-sm">{activity.time}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    )
}

export default UserDashboard
