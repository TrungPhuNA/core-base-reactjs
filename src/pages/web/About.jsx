import Card from '../../components/common/Card'
import usePageTitle from '../../hooks/usePageTitle'

const About = () => {
    usePageTitle('Giới thiệu')
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-8">Giới thiệu về FE Base</h1>

                <Card className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Về dự án</h2>
                    <p className="text-gray-600 mb-4">
                        FE Base là một base project được xây dựng với React và TailwindCSS, cung cấp
                        cấu trúc hoàn chỉnh cho các dự án web với 3 layouts khác nhau.
                    </p>
                    <p className="text-gray-600">
                        Dự án được thiết kế để dễ dàng mở rộng và tùy chỉnh theo nhu cầu cụ thể của
                        từng dự án.
                    </p>
                </Card>

                <Card className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Tech Stack</h2>
                    <ul className="space-y-2 text-gray-600">
                        <li>✅ React 18 - Thư viện UI hiện đại</li>
                        <li>✅ Vite - Build tool nhanh chóng</li>
                        <li>✅ TailwindCSS - Utility-first CSS framework</li>
                        <li>✅ React Router v6 - Routing solution</li>
                        <li>✅ Context API - State management</li>
                    </ul>
                </Card>

                <Card>
                    <h2 className="text-2xl font-semibold mb-4">Tính năng</h2>
                    <ul className="space-y-2 text-gray-600">
                        <li>🎨 3 layouts: Web (Public), User, Admin</li>
                        <li>🔐 Authentication system</li>
                        <li>🛡️ Protected routes</li>
                        <li>📱 Responsive design</li>
                        <li>🎯 Reusable components</li>
                        <li>⚡ Fast development with Vite</li>
                    </ul>
                </Card>
            </div>
        </div>
    )
}

export default About
