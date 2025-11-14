import { useState } from 'react'
import Card from '../../components/common/Card'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Form submitted:', formData)
        alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất.')
        setFormData({ name: '', email: '', subject: '', message: '' })
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-8">Liên hệ với chúng tôi</h1>

                <Card>
                    <form onSubmit={handleSubmit}>
                        <Input
                            label="Họ và tên"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Nhập họ và tên"
                            required
                        />

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
                            label="Tiêu đề"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="Nhập tiêu đề"
                            required
                        />

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Nội dung <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Nhập nội dung"
                                required
                                rows="5"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                        </div>

                        <Button type="submit" className="w-full">
                            Gửi tin nhắn
                        </Button>
                    </form>
                </Card>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card title="📧 Email">
                        <p className="text-gray-600">contact@febase.com</p>
                    </Card>
                    <Card title="📱 Điện thoại">
                        <p className="text-gray-600">+84 123 456 789</p>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Contact
