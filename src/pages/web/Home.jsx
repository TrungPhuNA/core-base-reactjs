import { Link } from 'react-router-dom'
import Button from '../../components/common/Button'
import Card from '../../components/common/Card'

const Home = () => {
    return (
        <div>
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl font-bold mb-6">Chào mừng đến với FE Base</h1>
                    <p className="text-xl mb-8 text-primary-100">
                        React + TailwindCSS Base Project với 3 layouts: Web, User, Admin
                    </p>
                    <div className="flex justify-center space-x-4">
                        <Link to="/login">
                            <Button variant="secondary">Bắt đầu ngay</Button>
                        </Link>
                        <Link to="/about">
                            <Button
                                variant="outline"
                                className="border-white text-white hover:bg-white hover:text-primary-600"
                            >
                                Tìm hiểu thêm
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Tính năng nổi bật</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Card title="🎨 Modern UI">
                            <p className="text-gray-600">
                                Giao diện hiện đại với TailwindCSS, responsive trên mọi thiết bị
                            </p>
                        </Card>
                        <Card title="⚡ Fast Performance">
                            <p className="text-gray-600">
                                Sử dụng Vite để build nhanh chóng và hiệu quả
                            </p>
                        </Card>
                        <Card title="🔐 Authentication">
                            <p className="text-gray-600">
                                Hệ thống xác thực với protected routes cho User và Admin
                            </p>
                        </Card>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-6">Sẵn sàng bắt đầu?</h2>
                    <p className="text-xl text-gray-600 mb-8">
                        Đăng nhập ngay để trải nghiệm đầy đủ tính năng
                    </p>
                    <Link to="/login">
                        <Button>Đăng nhập ngay</Button>
                    </Link>
                </div>
            </section>
        </div>
    )
}

export default Home
