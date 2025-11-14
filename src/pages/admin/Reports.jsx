import Card from '../../components/common/Card'

const AdminReports = () => {
    const salesData = [
        { month: 'Tháng 1', revenue: '₫12.5M', orders: 145, growth: '+12%' },
        { month: 'Tháng 2', revenue: '₫15.2M', orders: 178, growth: '+21%' },
        { month: 'Tháng 3', revenue: '₫18.7M', orders: 203, growth: '+23%' },
        { month: 'Tháng 4', revenue: '₫16.3M', orders: 189, growth: '-13%' },
    ]

    const topProducts = [
        { name: 'Sản phẩm A', sold: 234, revenue: '₫5.6M' },
        { name: 'Sản phẩm B', sold: 189, revenue: '₫4.2M' },
        { name: 'Sản phẩm C', sold: 156, revenue: '₫3.8M' },
        { name: 'Sản phẩm D', sold: 142, revenue: '₫3.1M' },
    ]

    const userStats = [
        { label: 'Tổng users', value: '1,234', change: '+12%', color: 'text-blue-600' },
        { label: 'Users mới (tháng này)', value: '89', change: '+23%', color: 'text-green-600' },
        { label: 'Users hoạt động', value: '856', change: '+8%', color: 'text-purple-600' },
        { label: 'Tỷ lệ giữ chân', value: '78%', change: '+5%', color: 'text-orange-600' },
    ]

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Báo cáo & Thống kê</h1>
                <p className="text-gray-600 mt-2">Tổng quan về doanh thu và hoạt động</p>
            </div>

            {/* User Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {userStats.map((stat, index) => (
                    <Card key={index}>
                        <p className="text-gray-600 text-sm">{stat.label}</p>
                        <p className={`text-2xl font-bold mt-1 ${stat.color}`}>{stat.value}</p>
                        <p className="text-green-600 text-sm mt-1">{stat.change}</p>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Sales Report */}
                <Card title="Báo cáo doanh thu">
                    <div className="space-y-4">
                        {salesData.map((data, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between py-3 border-b last:border-b-0"
                            >
                                <div>
                                    <p className="font-medium text-gray-800">{data.month}</p>
                                    <p className="text-sm text-gray-600">{data.orders} đơn hàng</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-gray-800">{data.revenue}</p>
                                    <p
                                        className={`text-sm ${
                                            data.growth.startsWith('+')
                                                ? 'text-green-600'
                                                : 'text-red-600'
                                        }`}
                                    >
                                        {data.growth}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Top Products */}
                <Card title="Sản phẩm bán chạy">
                    <div className="space-y-4">
                        {topProducts.map((product, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between py-3 border-b last:border-b-0"
                            >
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold">
                                        {index + 1}
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-800">{product.name}</p>
                                        <p className="text-sm text-gray-600">
                                            {product.sold} đã bán
                                        </p>
                                    </div>
                                </div>
                                <p className="font-bold text-gray-800">{product.revenue}</p>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Chart Placeholder */}
            <Card title="Biểu đồ doanh thu">
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <p className="text-gray-500">
                        📊 Biểu đồ sẽ được hiển thị ở đây (có thể tích hợp Chart.js hoặc Recharts)
                    </p>
                </div>
            </Card>
        </div>
    )
}

export default AdminReports
