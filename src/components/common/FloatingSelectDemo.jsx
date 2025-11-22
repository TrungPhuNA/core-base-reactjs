import { useState } from 'react'
import FloatingReactSelect from './FloatingReactSelect'

const FloatingSelectDemo = () => {
    const [formData, setFormData] = useState({
        country: '',
        cities: [],
        category: '',
        tags: [],
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    // Sample data
    const countryOptions = [
        { value: 'vn', label: '🇻🇳 Việt Nam' },
        { value: 'us', label: '🇺🇸 United States' },
        { value: 'jp', label: '🇯🇵 Japan' },
        { value: 'kr', label: '🇰🇷 South Korea' },
        { value: 'cn', label: '🇨🇳 China' },
        { value: 'th', label: '🇹🇭 Thailand' },
        { value: 'sg', label: '🇸🇬 Singapore' },
        { value: 'my', label: '🇲🇾 Malaysia' },
        { value: 'id', label: '🇮🇩 Indonesia' },
        { value: 'ph', label: '🇵🇭 Philippines' },
    ]

    const cityOptions = [
        { value: 'hanoi', label: 'Hà Nội' },
        { value: 'hcm', label: 'Hồ Chí Minh' },
        { value: 'danang', label: 'Đà Nẵng' },
        { value: 'haiphong', label: 'Hải Phòng' },
        { value: 'cantho', label: 'Cần Thơ' },
        { value: 'nhatrang', label: 'Nha Trang' },
        { value: 'dalat', label: 'Đà Lạt' },
        { value: 'vungtau', label: 'Vũng Tàu' },
        { value: 'hue', label: 'Huế' },
        { value: 'hoian', label: 'Hội An' },
    ]

    const categoryOptions = [
        { value: 'tech', label: '💻 Technology' },
        { value: 'business', label: '💼 Business' },
        { value: 'health', label: '🏥 Health' },
        { value: 'education', label: '📚 Education' },
        { value: 'entertainment', label: '🎬 Entertainment' },
        { value: 'sports', label: '⚽ Sports' },
        { value: 'food', label: '🍔 Food & Drink' },
        { value: 'travel', label: '✈️ Travel' },
    ]

    const tagOptions = [
        { value: 'react', label: 'React' },
        { value: 'vue', label: 'Vue.js' },
        { value: 'angular', label: 'Angular' },
        { value: 'nodejs', label: 'Node.js' },
        { value: 'python', label: 'Python' },
        { value: 'java', label: 'Java' },
        { value: 'php', label: 'PHP' },
        { value: 'ruby', label: 'Ruby' },
        { value: 'go', label: 'Go' },
        { value: 'rust', label: 'Rust' },
        { value: 'swift', label: 'Swift' },
        { value: 'kotlin', label: 'Kotlin' },
    ]

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
                Floating React Select Demo (Select2)
            </h2>
            <p className="text-gray-600 mb-6">
                Select với search, multi-select, và floating label giống Google
            </p>

            <div className="space-y-6">
                {/* Single Select with Search */}
                <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">
                        1. Single Select với Search
                    </h3>
                    <FloatingReactSelect
                        id="country"
                        name="country"
                        label="Chọn quốc gia"
                        value={formData.country}
                        onChange={handleChange}
                        options={countryOptions}
                        required
                        isSearchable={true}
                        isClearable={true}
                    />
                    <p className="text-xs text-gray-500 mt-2">
                        Selected: <strong>{formData.country || 'None'}</strong>
                    </p>
                </div>

                {/* Multi Select */}
                <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">
                        2. Multi Select (chọn nhiều)
                    </h3>
                    <FloatingReactSelect
                        id="cities"
                        name="cities"
                        label="Chọn thành phố"
                        value={formData.cities}
                        onChange={handleChange}
                        options={cityOptions}
                        isMulti={true}
                        isSearchable={true}
                        isClearable={true}
                    />
                    <p className="text-xs text-gray-500 mt-2">
                        Selected: <strong>{formData.cities.join(', ') || 'None'}</strong>
                    </p>
                </div>

                {/* Single Select with Icons */}
                <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">
                        3. Select với Icons
                    </h3>
                    <FloatingReactSelect
                        id="category"
                        name="category"
                        label="Chọn danh mục"
                        value={formData.category}
                        onChange={handleChange}
                        options={categoryOptions}
                        required
                        isSearchable={true}
                    />
                    <p className="text-xs text-gray-500 mt-2">
                        Selected: <strong>{formData.category || 'None'}</strong>
                    </p>
                </div>

                {/* Multi Select Tags */}
                <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">
                        4. Tags (Multi Select)
                    </h3>
                    <FloatingReactSelect
                        id="tags"
                        name="tags"
                        label="Chọn tags"
                        value={formData.tags}
                        onChange={handleChange}
                        options={tagOptions}
                        isMulti={true}
                        isSearchable={true}
                        isClearable={true}
                    />
                    <p className="text-xs text-gray-500 mt-2">
                        Selected: <strong>{formData.tags.join(', ') || 'None'}</strong>
                    </p>
                </div>
            </div>

            {/* Code Example */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Cách sử dụng:</h3>
                <pre className="text-sm text-gray-700 overflow-x-auto">
                    <code>{`import FloatingReactSelect from './FloatingReactSelect'

// Single Select
<FloatingReactSelect
    id="country"
    name="country"
    label="Chọn quốc gia"
    value={formData.country}
    onChange={handleChange}
    options={countryOptions}
    required
    isSearchable={true}
    isClearable={true}
/>

// Multi Select
<FloatingReactSelect
    id="cities"
    name="cities"
    label="Chọn thành phố"
    value={formData.cities}
    onChange={handleChange}
    options={cityOptions}
    isMulti={true}
    isSearchable={true}
/>`}</code>
                </pre>
            </div>
        </div>
    )
}

export default FloatingSelectDemo

