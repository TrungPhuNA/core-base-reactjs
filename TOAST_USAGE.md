# Toast Notifications Usage Guide

Hướng dẫn sử dụng Toast Notifications trong project.

## 📦 Library

Sử dụng **react-hot-toast** - một thư viện toast notification đẹp và dễ dùng.

## 🚀 Cách sử dụng

### 1. Import toast utility

```javascript
import toast from '../../utils/toast'
```

### 2. Các loại Toast

#### Success Toast ✅

```javascript
toast.success('Thao tác thành công!')
toast.success('Đăng nhập thành công! 🎉')
```

#### Error Toast ❌

```javascript
toast.error('Có lỗi xảy ra!')
toast.error('Đăng nhập thất bại. Vui lòng thử lại.')
```

#### Warning Toast ⚠️

```javascript
toast.warning('Cảnh báo!')
toast.warning('Vui lòng kiểm tra lại thông tin.')
```

#### Info Toast ℹ️

```javascript
toast.info('Thông tin quan trọng')
toast.info('Phiên đăng nhập sắp hết hạn.')
```

#### Loading Toast ⏳

```javascript
const loadingToast = toast.loading('Đang xử lý...')

// Sau khi hoàn thành
toast.dismiss(loadingToast)
toast.success('Hoàn thành!')
```

#### Promise Toast 🎲

```javascript
const myPromise = fetch('/api/data')

toast.promise(myPromise, {
    loading: 'Đang tải dữ liệu...',
    success: 'Tải dữ liệu thành công!',
    error: 'Tải dữ liệu thất bại!',
})
```

#### Custom Toast 🎨

```javascript
toast.custom('Toast tùy chỉnh!', '🚀', {
    style: {
        border: '2px solid #8b5cf6',
        background: '#f3e8ff',
    },
})
```

## 📝 Ví dụ thực tế

### Form Submit

```javascript
const handleSubmit = async (e) => {
    e.preventDefault()

    try {
        const loadingToast = toast.loading('Đang xử lý...')
        
        const response = await api.post('/auth/login', formData)
        
        toast.dismiss(loadingToast)
        toast.success('Đăng nhập thành công! 👋')
        
        navigate('/dashboard')
    } catch (error) {
        toast.error('Đăng nhập thất bại. Vui lòng thử lại.')
    }
}
```

### API Call với Promise

```javascript
const handleDelete = async (id) => {
    const deletePromise = api.delete(`/users/${id}`)

    toast.promise(deletePromise, {
        loading: 'Đang xóa...',
        success: 'Xóa thành công!',
        error: 'Xóa thất bại!',
    })
}
```

### Validation

```javascript
const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.email) {
        toast.warning('Vui lòng nhập email!')
        return
    }

    if (formData.password.length < 6) {
        toast.error('Mật khẩu phải có ít nhất 6 ký tự!')
        return
    }

    // Submit form...
}
```

## ⚙️ Configuration

Toast đã được cấu hình sẵn trong `src/App.jsx`:

```javascript
<Toaster
    position="top-right"
    reverseOrder={false}
    gutter={8}
    toastOptions={{
        duration: 4000,
        style: {
            borderRadius: '10px',
            background: '#fff',
            color: '#333',
            padding: '16px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        },
    }}
/>
```

### Thay đổi vị trí

Có thể thay đổi `position` thành:
- `top-left`
- `top-center`
- `top-right` (mặc định)
- `bottom-left`
- `bottom-center`
- `bottom-right`

### Thay đổi thời gian hiển thị

```javascript
toast.success('Message', { duration: 5000 }) // 5 giây
```

## 🎨 Custom Styling

### Inline Style

```javascript
toast.success('Success!', {
    style: {
        background: '#10b981',
        color: '#fff',
    },
})
```

### Custom Icon

```javascript
toast.success('Success!', {
    icon: '🎉',
})
```

## 📍 Đã tích hợp sẵn

Toast đã được tích hợp sẵn vào:

1. **API Service** (`src/services/api.js`)
   - Tự động hiển thị toast khi có lỗi API
   - 401: Phiên đăng nhập hết hạn
   - 403: Không có quyền truy cập
   - 404: Không tìm thấy
   - 500: Lỗi server

2. **Auth Context** (`src/context/AuthContext.jsx`)
   - Toast khi đăng xuất

3. **Auth Pages**
   - Login: Toast khi đăng nhập thành công
   - Register: Toast khi đăng ký thành công/thất bại
   - Validation errors

## 🎯 Best Practices

1. **Sử dụng đúng loại toast:**
   - Success: Thao tác thành công
   - Error: Lỗi, thất bại
   - Warning: Cảnh báo, cần chú ý
   - Info: Thông tin bổ sung

2. **Message rõ ràng:**
   - ✅ "Đăng nhập thành công!"
   - ❌ "OK"

3. **Thêm emoji để sinh động:**
   - "Đăng nhập thành công! 🎉"
   - "Có lỗi xảy ra! ❌"

4. **Không spam toast:**
   - Dismiss toast cũ trước khi hiển thị toast mới nếu cần

## 🔗 Demo

Xem demo tại: `/user/dashboard` - có component ToastDemo để test tất cả các loại toast.

## 📚 Documentation

Xem thêm tại: https://react-hot-toast.com/

