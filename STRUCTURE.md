# Cấu trúc Project ReactJS + TailwindCSS

## Tổng quan
Project ReactJS với TailwindCSS, hỗ trợ 3 layouts:
- **Web Layout**: Dành cho trang public (landing page, giới thiệu, ...)
- **User Layout**: Dành cho người dùng đã đăng nhập
- **Admin Layout**: Dành cho quản trị viên

## Tech Stack
- **React 18** với Vite
- **React Router v6** cho routing
- **TailwindCSS** cho styling
- **TypeScript** (optional, có thể dùng JavaScript)

## Cấu trúc thư mục

```
fe-base/
├── public/                      # Static files
│   ├── favicon.ico
│   └── images/
├── src/
│   ├── assets/                  # Images, fonts, icons
│   │   ├── images/
│   │   ├── icons/
│   │   └── fonts/
│   ├── components/              # Shared components
│   │   ├── common/              # Common components (Button, Input, Card, ...)
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Card.jsx
│   │   │   └── Modal.jsx
│   │   ├── web/                 # Web-specific components
│   │   ├── user/                # User-specific components
│   │   └── admin/               # Admin-specific components
│   ├── layouts/                 # Layout components
│   │   ├── WebLayout.jsx        # Layout cho trang public
│   │   │   ├── Header
│   │   │   ├── Footer
│   │   │   └── Content
│   │   ├── UserLayout.jsx       # Layout cho user
│   │   │   ├── Header
│   │   │   ├── Sidebar (optional)
│   │   │   └── Content
│   │   └── AdminLayout.jsx      # Layout cho admin
│   │       ├── Header
│   │       ├── Sidebar
│   │       └── Content
│   ├── pages/                   # Page components
│   │   ├── web/                 # Public pages
│   │   │   ├── Home.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Contact.jsx
│   │   │   └── Login.jsx
│   │   ├── user/                # User pages
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Profile.jsx
│   │   │   └── Settings.jsx
│   │   └── admin/               # Admin pages
│   │       ├── Dashboard.jsx
│   │       ├── Users.jsx
│   │       ├── Settings.jsx
│   │       └── Reports.jsx
│   ├── routes/                  # Route configuration
│   │   ├── index.jsx            # Main routes
│   │   ├── webRoutes.jsx        # Web routes
│   │   ├── userRoutes.jsx       # User routes
│   │   └── adminRoutes.jsx      # Admin routes
│   ├── services/                # API services
│   │   ├── api.js               # Axios instance
│   │   ├── authService.js
│   │   └── userService.js
│   ├── hooks/                   # Custom hooks
│   │   ├── useAuth.js
│   │   └── useLocalStorage.js
│   ├── context/                 # React Context
│   │   └── AuthContext.jsx
│   ├── utils/                   # Utility functions
│   │   ├── helpers.js
│   │   └── constants.js
│   ├── styles/                  # Global styles
│   │   └── index.css            # TailwindCSS imports
│   ├── App.jsx                  # Main App component
│   └── main.jsx                 # Entry point
├── .gitignore
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## Routing Structure

### Web Routes (Public)
- `/` - Home page
- `/about` - About page
- `/contact` - Contact page
- `/login` - Login page

### User Routes (Protected)
- `/user/dashboard` - User dashboard
- `/user/profile` - User profile
- `/user/settings` - User settings

### Admin Routes (Protected)
- `/admin/dashboard` - Admin dashboard
- `/admin/users` - User management
- `/admin/settings` - Admin settings
- `/admin/reports` - Reports

## Features sẽ implement

### 1. Layouts
- [x] WebLayout: Header + Footer + Content
- [x] UserLayout: Header + Sidebar (optional) + Content
- [x] AdminLayout: Header + Sidebar + Content

### 2. Routing
- [x] React Router v6
- [x] Protected routes (authentication check)
- [x] Layout-based routing

### 3. Authentication
- [x] Login/Logout
- [x] Auth Context
- [x] Protected routes

### 4. Styling
- [x] TailwindCSS setup
- [x] Responsive design
- [x] Dark mode support (optional)

## Ghi chú
- Sử dụng Vite để build nhanh hơn
- TailwindCSS cho styling linh hoạt
- React Router v6 cho routing hiện đại
- Context API cho state management đơn giản

