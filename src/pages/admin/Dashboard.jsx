import Card from '../../components/common/Card'

const AdminDashboard = () => {
    const stats = [
        { label: 'Tổng Users', value: '1,234', icon: '👥', color: 'bg-blue-500', change: '+12%' },
        { label: 'Doanh thu', value: '₫45.2M', icon: '💰', color: 'bg-green-500', change: '+8%' },
        { label: 'Đơn hàng', value: '856', icon: '📦', color: 'bg-purple-500', change: '+23%' },
        { label: 'Sản phẩm', value: '342', icon: '🛍️', color: 'bg-orange-500', change: '+5%' },
    ]

    const recentUsers = [
        {
            id: 1,
            name: 'Nguyễn Văn A',
            email: 'nguyenvana@email.com',
            status: 'active',
            date: '2024-01-15',
        },
        {
            id: 2,
            name: 'Trần Thị B',
            email: 'tranthib@email.com',
            status: 'active',
            date: '2024-01-14',
        },
        {
            id: 3,
            name: 'Lê Văn C',
            email: 'levanc@email.com',
            status: 'inactive',
            date: '2024-01-13',
        },
        {
            id: 4,
            name: 'Phạm Thị D',
            email: 'phamthid@email.com',
            status: 'active',
            date: '2024-01-12',
        },
    ]

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
                <p className="text-gray-600 mt-2">Tổng quan hệ thống</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <Card key={index}>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm">{stat.label}</p>
                                <p className="text-2xl font-bold text-gray-800 mt-1">
                                    {stat.value}
                                </p>
                                <p className="text-green-600 text-sm mt-1">{stat.change}</p>
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

            {/* Recent Users */}
            <Card title="Users mới nhất">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                                    Tên
                                </th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                                    Email
                                </th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                                    Trạng thái
                                </th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                                    Ngày tạo
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentUsers.map((user) => (
                                <tr
                                    key={user.id}
                                    className="border-b last:border-b-0 hover:bg-gray-50"
                                >
                                    <td className="py-3 px-4">{user.name}</td>
                                    <td className="py-3 px-4 text-gray-600">{user.email}</td>
                                    <td className="py-3 px-4">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs ${
                                                user.status === 'active'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-gray-100 text-gray-800'
                                            }`}
                                        >
                                            {user.status === 'active'
                                                ? 'Hoạt động'
                                                : 'Không hoạt động'}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-gray-600">{user.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    )
}

export default AdminDashboard
