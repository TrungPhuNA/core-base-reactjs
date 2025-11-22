# Floating Label Input Components

Hướng dẫn sử dụng Floating Label Input components - giống Google Material Design.

## 📦 Components

### 1. FloatingInput
Input field với floating label (label nổi lên khi focus hoặc có giá trị).

### 2. FloatingSelect
Select dropdown với floating label.

## 🎨 Features

- ✅ **Floating Label**: Label tự động nổi lên khi focus hoặc có giá trị
- ✅ **Google-style Design**: Thiết kế giống Google Material Design
- ✅ **Show/Hide Password**: Tự động có nút show/hide cho type="password"
- ✅ **Focus Ring**: Ring màu xanh khi focus (giống Google)
- ✅ **Smooth Animation**: Transition mượt mà
- ✅ **Required Indicator**: Dấu * đỏ cho field bắt buộc
- ✅ **Auto Complete**: Hỗ trợ autocomplete attribute

## 🚀 Cách sử dụng

### FloatingInput

```jsx
import FloatingInput from '../../components/common/FloatingInput'

// Basic usage
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

// Password input (tự động có show/hide button)
<FloatingInput
    id="password"
    name="password"
    type="password"
    label="Mật khẩu"
    value={formData.password}
    onChange={handleChange}
    required
    autoComplete="current-password"
/>

// Text input
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
```

### FloatingSelect

```jsx
import FloatingSelect from '../../components/common/FloatingSelect'

<FloatingSelect
    id="role"
    name="role"
    label="Vai trò"
    value={formData.role}
    onChange={handleChange}
    options={[
        { value: 'user', label: 'User' },
        { value: 'admin', label: 'Admin' },
    ]}
    required
/>
```

## 📝 Props

### FloatingInput Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `id` | string | - | ✅ | ID của input |
| `name` | string | - | ✅ | Name attribute |
| `type` | string | `'text'` | ❌ | Input type (text, email, password, etc.) |
| `label` | string | - | ✅ | Label text |
| `value` | string | - | ✅ | Input value |
| `onChange` | function | - | ✅ | Change handler |
| `required` | boolean | `false` | ❌ | Field bắt buộc |
| `autoComplete` | string | - | ❌ | Autocomplete attribute |
| `className` | string | `''` | ❌ | Additional CSS classes |

### FloatingSelect Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `id` | string | - | ✅ | ID của select |
| `name` | string | - | ✅ | Name attribute |
| `label` | string | - | ✅ | Label text |
| `value` | string | - | ✅ | Selected value |
| `onChange` | function | - | ✅ | Change handler |
| `options` | array | `[]` | ✅ | Array of {value, label} objects |
| `required` | boolean | `false` | ❌ | Field bắt buộc |
| `className` | string | `''` | ❌ | Additional CSS classes |

## 🎯 Ví dụ thực tế

### Login Form

```jsx
import { useState } from 'react'
import FloatingInput from '../../components/common/FloatingInput'
import FloatingSelect from '../../components/common/FloatingSelect'

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: 'user',
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
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

            <FloatingInput
                id="password"
                name="password"
                type="password"
                label="Mật khẩu"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="current-password"
            />

            <FloatingSelect
                id="role"
                name="role"
                label="Vai trò"
                value={formData.role}
                onChange={handleChange}
                options={[
                    { value: 'user', label: 'User' },
                    { value: 'admin', label: 'Admin' },
                ]}
                required
            />

            <button type="submit">Đăng nhập</button>
        </form>
    )
}
```

## 🎨 Styling

### Colors

- **Border (default)**: `border-gray-300`
- **Border (hover)**: `border-gray-400`
- **Border (focus)**: `border-blue-500`
- **Ring (focus)**: `ring-blue-100`
- **Label (default)**: `text-gray-500`
- **Label (floating)**: `text-blue-600`
- **Required indicator**: `text-red-500`

### Customization

Bạn có thể thêm custom classes qua prop `className`:

```jsx
<FloatingInput
    // ... other props
    className="mb-4"
/>
```

## 📍 Đã sử dụng trong

- ✅ Login page (`/login`)
- ✅ Register page (`/register`)
- ✅ Forgot Password page (`/forgot-password`)
- ✅ Reset Password page (`/reset-password`)

## 🔗 Demo

Xem demo tại: `http://localhost:3456/login`

## 💡 Tips

1. **Spacing**: Sử dụng `space-y-5` cho form để có khoảng cách đẹp giữa các inputs
2. **AutoComplete**: Luôn thêm `autoComplete` attribute để browser có thể gợi ý
3. **Required**: Sử dụng `required` prop để hiển thị dấu * đỏ
4. **Password**: Type "password" tự động có nút show/hide, không cần code thêm

## 🎯 Best Practices

1. **Luôn có label**: Mọi input đều phải có label rõ ràng
2. **ID unique**: Mỗi input phải có ID unique
3. **Name attribute**: Luôn có name để form submit đúng
4. **AutoComplete**: Thêm autocomplete để UX tốt hơn
5. **Required indicator**: Dùng required prop thay vì thêm * vào label text

