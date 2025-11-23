# Dynamic Page Titles

## 📋 Tổng quan

Hệ thống dynamic page titles cho phép mỗi page có title riêng hiển thị trên browser tab.

## 🎯 Hook: `usePageTitle`

### Location
```
fe-base/src/hooks/usePageTitle.js
```

### Cách sử dụng

```jsx
import usePageTitle from '../../hooks/usePageTitle'

const MyPage = () => {
    usePageTitle('Tên trang')
    
    return (
        <div>...</div>
    )
}
```

### Parameters

- **title** (string, required): Tiêu đề của trang
- **suffix** (string, optional): Hậu tố thêm vào title
  - Default: ` - ${VITE_APP_NAME}` (từ .env)
  - Truyền `''` để không có suffix
  - Truyền custom string để dùng suffix riêng

### Ví dụ

```jsx
// Title: "Đăng nhập - Kho Doan Base"
usePageTitle('Đăng nhập')

// Title: "Quản lý Users - Admin Panel"
usePageTitle('Quản lý Users', ' - Admin Panel')

// Title: "Trang chủ" (không có suffix)
usePageTitle('Trang chủ', '')
```

## 📄 Danh sách Pages đã áp dụng

### Auth Pages
- `/login` → "Đăng nhập - Kho Doan Base"
- `/register` → "Đăng ký tài khoản - Kho Doan Base"
- `/forgot-password` → "Quên mật khẩu - Kho Doan Base"
- `/reset-password` → "Đặt lại mật khẩu - Kho Doan Base"

### User Pages
- `/user/dashboard` → "Bảng điều khiển - Kho Doan Base"
- `/user/profile` → "Hồ sơ cá nhân - Kho Doan Base"
- `/user/settings` → "Cài đặt - Kho Doan Base"

### Admin Pages
- `/admin/dashboard` → "Bảng điều khiển Admin - Kho Doan Base"
- `/admin/users` → "Quản lý Users - Kho Doan Base"
- `/admin/reports` → "Báo cáo - Kho Doan Base"
- `/admin/profile` → "Hồ sơ Admin - Kho Doan Base"
- `/admin/settings` → "Cấu hình - Kho Doan Base"

### Web Pages
- `/` → "Trang chủ - Kho Doan Base"
- `/about` → "Giới thiệu - Kho Doan Base"
- `/contact` → "Liên hệ - Kho Doan Base"

## 🔧 Cấu hình

### Thay đổi App Name

Sửa file `.env`:

```env
VITE_APP_NAME=Tên App Của Bạn
```

Tất cả page titles sẽ tự động cập nhật suffix.

## ✨ Features

1. **Auto cleanup**: Title tự động reset về default khi component unmount
2. **Dynamic suffix**: Suffix lấy từ env variable, dễ dàng thay đổi
3. **Flexible**: Có thể custom suffix cho từng page
4. **SEO friendly**: Mỗi page có title riêng, tốt cho SEO
5. **User experience**: User dễ dàng nhận biết đang ở trang nào khi có nhiều tabs

## 🚀 Thêm vào Page mới

Khi tạo page mới, chỉ cần:

1. Import hook:
```jsx
import usePageTitle from '../../hooks/usePageTitle'
```

2. Gọi hook trong component:
```jsx
const MyNewPage = () => {
    usePageTitle('Tên Page Mới')
    
    return (
        <div>...</div>
    )
}
```

Done! ✅

## 📝 Best Practices

1. **Đặt title ngắn gọn, rõ ràng**: "Quản lý Users" thay vì "Trang quản lý danh sách users"
2. **Gọi hook ở đầu component**: Ngay sau khai báo component
3. **Dùng tiếng Việt có dấu**: Để nhất quán với UI
4. **Không cần thêm app name**: Hook tự động thêm suffix
5. **Title phải mô tả đúng nội dung page**: Giúp user và SEO

## 🎨 Example Component

```jsx
import { useState } from 'react'
import usePageTitle from '../../hooks/usePageTitle'
import Card from '../../components/common/Card'

const ProductList = () => {
    // Set page title ngay đầu
    usePageTitle('Danh sách sản phẩm')
    
    const [products, setProducts] = useState([])
    
    return (
        <div>
            <h1>Danh sách sản phẩm</h1>
            {/* ... */}
        </div>
    )
}

export default ProductList
```

---

**Lưu ý**: Hook này chỉ thay đổi `document.title`, không ảnh hưởng đến meta tags khác. Nếu cần SEO nâng cao, hãy sử dụng thêm `react-helmet` hoặc `react-helmet-async`.

