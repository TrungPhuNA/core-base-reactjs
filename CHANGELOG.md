# Changelog

## [1.1.0] - 2024-01-15

### ✨ Tính năng mới

#### 1. Profile Management (Quản lý hồ sơ)
- **User Profile** (`/user/profile`)
  - Tab "Thông tin cá nhân": Cập nhật tên, email, số điện thoại, ngày sinh, giới tính, địa chỉ, giới thiệu
  - Tab "Đổi mật khẩu": Thay đổi mật khẩu với validation
  - Tab "Cài đặt": Cấu hình thông báo, ngôn ngữ, quyền riêng tư
  - Upload avatar với preview
  - Edit mode với nút Chỉnh sửa/Lưu/Hủy

- **Admin Profile** (`/admin/profile`)
  - Tương tự User Profile
  - Thêm thông tin: Phòng ban, Chức vụ
  - Tab "Quyền hạn": Hiển thị các quyền admin

#### 2. User Management (Quản lý Users)
- **Trang Admin Users** (`/admin/users`)
  - **CRUD Operations**:
    - ✅ Create: Thêm user mới với modal
    - ✅ Read: Hiển thị danh sách users trong table
    - ✅ Update: Sửa user với modal
    - ✅ Delete: Xóa user với confirmation
  - **Filter & Search**:
    - 🔍 Tìm kiếm theo tên hoặc email
    - 🎯 Filter theo vai trò (All/User/Admin)
    - 🎯 Filter theo trạng thái (All/Active/Inactive)
  - **Features**:
    - Toggle trạng thái user (Active/Inactive)
    - Hiển thị ngày tạo
    - Empty state khi không có kết quả
    - Responsive table

#### 3. Flexible Layout Mode (Chuyển đổi Layout)
- **Layout Context** (`src/context/LayoutContext.jsx`)
  - Quản lý layout mode: `sidebar` hoặc `top`
  - Lưu vào localStorage để persist
  - Hook `useLayout()` để sử dụng

- **User Layout** (`src/layouts/UserLayout.jsx`)
  - **Sidebar Mode**: Menu nằm bên trái với icon và label
  - **Top Menu Mode**: Menu nằm trên header
  - Nút toggle layout ở header (☰ / ⊟)
  - Active state cho menu items
  - Responsive design

- **Admin Layout** (`src/layouts/AdminLayout.jsx`)
  - **Sidebar Mode**: 
    - Sidebar có thể thu gọn/mở rộng
    - Background màu đen (gray-800)
    - Active state với màu primary
  - **Top Menu Mode**: 
    - Menu nằm trên header
    - Màu purple cho admin
  - Nút toggle layout ở header

### 🔧 Cải tiến

- Thêm `LayoutProvider` vào `App.jsx`
- Cập nhật routes để include `/admin/profile`
- Cải thiện UI/UX với active states
- Thêm icons cho menu items
- Responsive design cho tất cả trang mới

### 📁 Files mới

```
fe-base/src/
├── context/
│   └── LayoutContext.jsx          # Layout mode context
├── hooks/
│   └── useLayout.js               # Layout hook
├── pages/
│   ├── admin/
│   │   └── Profile.jsx            # Admin profile page
│   └── user/
│       └── Profile.jsx            # User profile page (updated)
└── CHANGELOG.md                   # This file
```

### 🎯 Hướng dẫn sử dụng

#### Chuyển đổi Layout
```jsx
import { useLayout } from '../hooks/useLayout'

const MyComponent = () => {
  const { layoutMode, toggleLayoutMode, isSidebarMode, isTopMode } = useLayout()
  
  return (
    <button onClick={toggleLayoutMode}>
      {isSidebarMode ? 'Chuyển sang Top Menu' : 'Chuyển sang Sidebar'}
    </button>
  )
}
```

#### Quản lý Users
1. Vào `/admin/users`
2. Sử dụng search box để tìm kiếm
3. Sử dụng dropdown để filter
4. Click "+ Thêm User" để thêm mới
5. Click "Sửa" để chỉnh sửa
6. Click "Xóa" để xóa user

#### Cập nhật Profile
1. Vào `/user/profile` hoặc `/admin/profile`
2. Click "Chỉnh sửa" để bật edit mode
3. Thay đổi thông tin
4. Click "Lưu thay đổi" hoặc "Hủy"

---

## [1.0.0] - 2024-01-14

### 🎉 Initial Release

- React 18 + Vite setup
- TailwindCSS configuration
- 3 Layouts: Web, User, Admin
- Authentication with Context API
- Protected routes
- Basic components: Button, Input, Card, Modal
- Basic pages for all layouts

