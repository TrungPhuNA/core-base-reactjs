# FE Base - React + TailwindCSS

Base project React với TailwindCSS, hỗ trợ 3 layouts: Web (Public), User, và Admin.

## 🚀 Tech Stack

- **React 18** - Thư viện UI
- **Vite** - Build tool nhanh chóng
- **TailwindCSS** - Utility-first CSS framework
- **React Router v6** - Routing
- **Axios** - HTTP client
- **Context API** - State management

## 📁 Cấu trúc Project

```
fe-base/
├── public/                 # Static files
├── src/
│   ├── assets/            # Images, fonts, icons
│   ├── components/        # Reusable components
│   │   └── common/        # Common components (Button, Input, Card, Modal)
│   ├── context/           # React Context (AuthContext)
│   ├── hooks/             # Custom hooks (useAuth, useLocalStorage)
│   ├── layouts/           # Layout components
│   │   ├── WebLayout.jsx      # Public layout
│   │   ├── UserLayout.jsx     # User layout
│   │   └── AdminLayout.jsx    # Admin layout
│   ├── pages/             # Page components
│   │   ├── web/           # Public pages
│   │   ├── user/          # User pages
│   │   └── admin/         # Admin pages
│   ├── routes/            # Route configuration
│   ├── services/          # API services
│   ├── utils/             # Utility functions
│   ├── styles/            # Global styles
│   ├── App.jsx            # Main App component
│   └── main.jsx           # Entry point
├── .gitignore
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🎯 Features

### ✨ Tính năng chính

- 🔐 **Authentication**: Đăng nhập với role-based access (User/Admin)
- 🎛️ **Flexible Layout**: Chuyển đổi giữa Top Menu và Sidebar (lưu vào localStorage)
- 👤 **Profile Management**: Cập nhật thông tin cá nhân, avatar, đổi mật khẩu
- 👥 **User Management**: CRUD operations với filter và search
- 📱 **Responsive Design**: Tương thích mọi thiết bị
- 🎨 **TailwindCSS**: Styling hiện đại và dễ customize

### 3 Layouts

1. **Web Layout** (Public)
   - Header với navigation
   - Footer
   - Dành cho trang public (Home, About, Contact, Login)

2. **User Layout** (Protected)
   - Header với user menu
   - Sidebar (optional)
   - Dành cho user đã đăng nhập

3. **Admin Layout** (Protected - Admin Only)
   - Header
   - Sidebar với menu
   - Dành cho admin

### Authentication
- Login/Logout
- Protected routes
- Role-based access (User/Admin)
- Auth Context với localStorage

### Components
- Button (multiple variants)
- Input (với validation)
- Card
- Modal
- Và nhiều hơn nữa...

## 🛠️ Installation

### 1. Clone hoặc copy project

```bash
cd fe-base
```

### 2. Install dependencies

```bash
npm install
```

### 3. Tạo file .env (optional)

```bash
cp .env.example .env
```

Chỉnh sửa file `.env` nếu cần:
```
VITE_API_URL=http://localhost:8000/api
```

### 4. Run development server

```bash
npm run dev
```

Project sẽ chạy tại: `http://localhost:3000`

## 🎮 Sử dụng

### Đăng nhập

1. Truy cập `/login`
2. Nhập email và password bất kỳ
3. Chọn role: **User** hoặc **Admin**
4. Sẽ redirect đến dashboard tương ứng

### Chuyển đổi Layout Mode

- Click vào icon **☰** (Top Menu) hoặc **⊟** (Sidebar) ở header
- Layout mode sẽ được lưu vào localStorage
- **Sidebar Mode**: Menu nằm bên trái
- **Top Menu Mode**: Menu nằm trên header

### Quản lý Users (Admin)

1. Vào `/admin/users`
2. **Tìm kiếm**: Nhập tên hoặc email
3. **Filter**: Lọc theo vai trò và trạng thái
4. **Thêm user**: Click nút "+ Thêm User"
5. **Sửa user**: Click "Sửa" trên từng user
6. **Xóa user**: Click "Xóa" trên từng user
7. **Toggle trạng thái**: Click vào badge trạng thái

### Cập nhật Profile

1. Vào `/user/profile` hoặc `/admin/profile`
2. **Tab Thông tin cá nhân**: Cập nhật thông tin, upload avatar
3. **Tab Đổi mật khẩu**: Thay đổi mật khẩu
4. **Tab Cài đặt/Quyền hạn**: Cấu hình tài khoản

## 📝 Scripts

```bash
npm run dev      # Chạy development server
npm run build    # Build cho production
npm run preview  # Preview production build
npm run lint     # Chạy ESLint
```

## 🔐 Authentication Demo

Project có sẵn authentication demo:

1. Truy cập `/login`
2. Nhập bất kỳ email/password nào
3. Chọn role: **User** hoặc **Admin**
4. Đăng nhập sẽ redirect đến dashboard tương ứng

**User Dashboard**: `/user/dashboard`  
**Admin Dashboard**: `/admin/dashboard`

## 🎨 Customization

### Thay đổi màu sắc

Chỉnh sửa file `tailwind.config.js`:

```js
theme: {
  extend: {
    colors: {
      primary: {
        // Thay đổi màu primary ở đây
      },
    },
  },
}
```

### Thêm pages mới

1. Tạo component trong `src/pages/[layout]/`
2. Import và thêm route trong `src/routes/index.jsx`

### Thêm components mới

Tạo component trong `src/components/common/` hoặc `src/components/[layout]/`

## 📚 Routing

### Web Routes (Public)
- `/` - Home
- `/about` - About
- `/contact` - Contact
- `/login` - Login

### User Routes (Protected)
- `/user/dashboard` - Dashboard
- `/user/profile` - Profile
- `/user/settings` - Settings

### Admin Routes (Protected - Admin Only)
- `/admin/dashboard` - Dashboard
- `/admin/users` - User Management
- `/admin/settings` - Settings
- `/admin/reports` - Reports

## 🔧 API Integration

Project đã setup sẵn Axios với interceptors trong `src/services/api.js`.

Để sử dụng:

```js
import authService from './services/authService'
import userService from './services/userService'

// Login
const response = await authService.login(email, password)

// Get users
const users = await userService.getAllUsers()
```

## 📦 Build cho Production

```bash
npm run build
```

Files build sẽ được tạo trong folder `dist/`

## 🤝 Contributing

Mọi đóng góp đều được chào đón!

## 📄 License

MIT License

