# Floating React Select (Select2 for React)

Hướng dẫn sử dụng FloatingReactSelect - Select2 với floating label giống Google.

## 📦 Library

Sử dụng **react-select** - thư viện select dropdown mạnh mẽ nhất cho React.

## 🎨 Features

- ✅ **Floating Label**: Label nổi lên khi focus hoặc có giá trị (giống Google)
- ✅ **Search/Filter**: Tìm kiếm trong danh sách options
- ✅ **Multi Select**: Chọn nhiều giá trị cùng lúc
- ✅ **Clearable**: Nút xóa để clear selection
- ✅ **Custom Styling**: Style đẹp, match với FloatingInput
- ✅ **Icons Support**: Hỗ trợ emoji/icons trong options
- ✅ **Keyboard Navigation**: Di chuyển bằng phím mũi tên
- ✅ **Accessible**: ARIA labels và keyboard support
- ✅ **Vietnamese**: Messages bằng tiếng Việt

## 🚀 Cách sử dụng

### Basic Usage - Single Select

```jsx
import { useState } from 'react'
import FloatingReactSelect from '../../components/common/FloatingReactSelect'

const MyComponent = () => {
    const [formData, setFormData] = useState({
        country: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const countryOptions = [
        { value: 'vn', label: '🇻🇳 Việt Nam' },
        { value: 'us', label: '🇺🇸 United States' },
        { value: 'jp', label: '🇯🇵 Japan' },
    ]

    return (
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
    )
}
```

### Multi Select

```jsx
const [formData, setFormData] = useState({
    cities: [], // Array for multi-select
})

const cityOptions = [
    { value: 'hanoi', label: 'Hà Nội' },
    { value: 'hcm', label: 'Hồ Chí Minh' },
    { value: 'danang', label: 'Đà Nẵng' },
]

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
```

### With Icons/Emojis

```jsx
const categoryOptions = [
    { value: 'tech', label: '💻 Technology' },
    { value: 'business', label: '💼 Business' },
    { value: 'health', label: '🏥 Health' },
    { value: 'education', label: '📚 Education' },
]

<FloatingReactSelect
    id="category"
    name="category"
    label="Chọn danh mục"
    value={formData.category}
    onChange={handleChange}
    options={categoryOptions}
    isSearchable={true}
/>
```

## 📝 Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `id` | string | - | ✅ | ID của select |
| `name` | string | - | ✅ | Name attribute |
| `label` | string | - | ✅ | Label text (floating) |
| `value` | string/array | - | ✅ | Selected value(s) |
| `onChange` | function | - | ✅ | Change handler |
| `options` | array | `[]` | ✅ | Array of {value, label} |
| `required` | boolean | `false` | ❌ | Field bắt buộc |
| `isMulti` | boolean | `false` | ❌ | Multi-select mode |
| `isClearable` | boolean | `true` | ❌ | Show clear button |
| `isSearchable` | boolean | `true` | ❌ | Enable search |
| `isDisabled` | boolean | `false` | ❌ | Disable select |
| `placeholder` | string | `''` | ❌ | Placeholder text |
| `className` | string | `''` | ❌ | Additional classes |

## 🎯 Options Format

Options phải là array of objects với format:

```javascript
const options = [
    { value: 'unique_value', label: 'Display Text' },
    { value: 'vn', label: '🇻🇳 Việt Nam' },
    { value: 'tech', label: '💻 Technology' },
]
```

- `value`: Giá trị unique (string/number)
- `label`: Text hiển thị (có thể có emoji/icons)

## 💡 State Management

### Single Select

```javascript
const [formData, setFormData] = useState({
    country: '', // String value
})

// Value sẽ là: 'vn', 'us', 'jp', etc.
```

### Multi Select

```javascript
const [formData, setFormData] = useState({
    cities: [], // Array of values
})

// Value sẽ là: ['hanoi', 'hcm', 'danang']
```

## 🎨 Styling

Component đã được style sẵn để match với FloatingInput:

- **Border**: Gray → Blue khi focus
- **Ring**: Blue ring khi focus
- **Label**: Floating animation giống Google
- **Dropdown**: Rounded corners, shadow đẹp
- **Options**: Hover effect, selected state
- **Multi-value tags**: Blue background với border

### Custom Colors

Các màu chính:
- Primary: `#3b82f6` (Blue)
- Border: `#d1d5db` (Gray-300)
- Hover: `#9ca3af` (Gray-400)
- Selected: `#3b82f6` (Blue)
- Multi-tag: `#eff6ff` (Blue-50)

## 📋 Ví dụ thực tế

### Form với nhiều selects

```jsx
import { useState } from 'react'
import FloatingReactSelect from '../../components/common/FloatingReactSelect'

const UserForm = () => {
    const [formData, setFormData] = useState({
        country: '',
        cities: [],
        skills: [],
        role: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData)
        // {
        //   country: 'vn',
        //   cities: ['hanoi', 'hcm'],
        //   skills: ['react', 'nodejs'],
        //   role: 'developer'
        // }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <FloatingReactSelect
                id="country"
                name="country"
                label="Quốc gia"
                value={formData.country}
                onChange={handleChange}
                options={countryOptions}
                required
            />

            <FloatingReactSelect
                id="cities"
                name="cities"
                label="Thành phố"
                value={formData.cities}
                onChange={handleChange}
                options={cityOptions}
                isMulti={true}
            />

            <FloatingReactSelect
                id="skills"
                name="skills"
                label="Kỹ năng"
                value={formData.skills}
                onChange={handleChange}
                options={skillOptions}
                isMulti={true}
                required
            />

            <button type="submit">Submit</button>
        </form>
    )
}
```

## 🔍 Search/Filter

Search được enable mặc định (`isSearchable={true}`):

- Gõ để tìm kiếm trong options
- Case-insensitive search
- Highlight matching text
- Keyboard navigation (↑↓ arrows)

Để tắt search:
```jsx
<FloatingReactSelect
    isSearchable={false}
    // ... other props
/>
```

## 🎯 Best Practices

1. **Options format**: Luôn dùng `{value, label}` format
2. **State type**: Single = string, Multi = array
3. **Required field**: Thêm `required` prop để hiển thị dấu *
4. **Search**: Enable search cho list > 5 items
5. **Multi-select**: Dùng cho tags, categories, skills
6. **Icons**: Thêm emoji/icons vào label để đẹp hơn

## 📍 Đã sử dụng trong

- ✅ User Dashboard (`/user/dashboard`) - Demo component

## 🔗 Demo

Xem demo tại: `http://localhost:3456/user/dashboard`

## 📚 Documentation

React Select docs: https://react-select.com/

## 🆚 So sánh với FloatingSelect

| Feature | FloatingSelect | FloatingReactSelect |
|---------|---------------|---------------------|
| Search | ❌ | ✅ |
| Multi-select | ❌ | ✅ |
| Custom styling | Limited | Full control |
| Keyboard nav | Basic | Advanced |
| Performance | Fast | Good |
| Use case | Simple dropdown | Complex selection |

**Khi nào dùng FloatingSelect:**
- Dropdown đơn giản < 10 options
- Không cần search
- Single select only

**Khi nào dùng FloatingReactSelect:**
- Cần search/filter
- Multi-select
- Nhiều options (> 10)
- Cần custom styling
- Tags, categories, skills selection

