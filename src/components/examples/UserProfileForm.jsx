import { useState } from 'react'
import FloatingInput from '../common/FloatingInput'
import FloatingReactSelect from '../common/FloatingReactSelect'
import toast from '../../utils/toast'

const UserProfileForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        country: '',
        cities: [],
        skills: [],
        role: '',
        bio: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Form Data:', formData)
        toast.success('Cập nhật profile thành công! 🎉')
    }

    // Options data
    const countryOptions = [
        { value: 'vn', label: '🇻🇳 Việt Nam' },
        { value: 'us', label: '🇺🇸 United States' },
        { value: 'jp', label: '🇯🇵 Japan' },
        { value: 'kr', label: '🇰🇷 South Korea' },
        { value: 'cn', label: '🇨🇳 China' },
        { value: 'th', label: '🇹🇭 Thailand' },
        { value: 'sg', label: '🇸🇬 Singapore' },
    ]

    const cityOptions = [
        { value: 'hanoi', label: 'Hà Nội' },
        { value: 'hcm', label: 'Hồ Chí Minh' },
        { value: 'danang', label: 'Đà Nẵng' },
        { value: 'haiphong', label: 'Hải Phòng' },
        { value: 'cantho', label: 'Cần Thơ' },
        { value: 'nhatrang', label: 'Nha Trang' },
        { value: 'dalat', label: 'Đà Lạt' },
        { value: 'hue', label: 'Huế' },
    ]

    const skillOptions = [
        { value: 'react', label: '⚛️ React' },
        { value: 'vue', label: '💚 Vue.js' },
        { value: 'angular', label: '🅰️ Angular' },
        { value: 'nodejs', label: '🟢 Node.js' },
        { value: 'python', label: '🐍 Python' },
        { value: 'java', label: '☕ Java' },
        { value: 'php', label: '🐘 PHP' },
        { value: 'ruby', label: '💎 Ruby' },
        { value: 'go', label: '🔵 Go' },
        { value: 'rust', label: '🦀 Rust' },
    ]

    const roleOptions = [
        { value: 'developer', label: '👨‍💻 Developer' },
        { value: 'designer', label: '🎨 Designer' },
        { value: 'manager', label: '👔 Manager' },
        { value: 'tester', label: '🧪 Tester' },
        { value: 'devops', label: '⚙️ DevOps' },
    ]

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
                User Profile Form Example
            </h2>
            <p className="text-gray-600 mb-6">
                Ví dụ form thực tế kết hợp FloatingInput và FloatingReactSelect
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FloatingInput
                        id="name"
                        name="name"
                        type="text"
                        label="Họ và tên"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        autoComplete="name"
                    />

                    <FloatingInput
                        id="email"
                        name="email"
                        type="email"
                        label="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        autoComplete="email"
                    />
                </div>

                <FloatingInput
                    id="phone"
                    name="phone"
                    type="tel"
                    label="Số điện thoại"
                    value={formData.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                />

                {/* Location */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FloatingReactSelect
                        id="country"
                        name="country"
                        label="Quốc gia"
                        value={formData.country}
                        onChange={handleChange}
                        options={countryOptions}
                        required
                        isSearchable={true}
                        isClearable={true}
                    />

                    <FloatingReactSelect
                        id="cities"
                        name="cities"
                        label="Thành phố đã sống"
                        value={formData.cities}
                        onChange={handleChange}
                        options={cityOptions}
                        isMulti={true}
                        isSearchable={true}
                    />
                </div>

                {/* Professional Info */}
                <FloatingReactSelect
                    id="role"
                    name="role"
                    label="Vai trò"
                    value={formData.role}
                    onChange={handleChange}
                    options={roleOptions}
                    required
                    isSearchable={true}
                />

                <FloatingReactSelect
                    id="skills"
                    name="skills"
                    label="Kỹ năng"
                    value={formData.skills}
                    onChange={handleChange}
                    options={skillOptions}
                    isMulti={true}
                    isSearchable={true}
                    isClearable={true}
                />

                {/* Bio */}
                <div className="relative">
                    <textarea
                        id="bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        rows={4}
                        className="peer w-full px-4 pt-5 pb-1.5 text-base border rounded-lg bg-white transition-all duration-200 outline-none resize-none border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    />
                    <label
                        htmlFor="bio"
                        className={`absolute left-4 transition-all duration-200 pointer-events-none bg-white px-1 ${
                            formData.bio
                                ? 'top-0 -translate-y-1/2 text-xs font-medium text-blue-600'
                                : 'top-3.5 text-base text-gray-500'
                        }`}
                    >
                        Giới thiệu bản thân
                    </label>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition shadow-lg"
                >
                    Cập nhật Profile
                </button>
            </form>

            {/* Display Form Data */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Form Data:</h3>
                <pre className="text-xs text-gray-700 overflow-x-auto">
                    {JSON.stringify(formData, null, 2)}
                </pre>
            </div>
        </div>
    )
}

export default UserProfileForm

