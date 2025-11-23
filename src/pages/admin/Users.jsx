import { useState, useMemo } from 'react'
import Card from '../../components/common/Card'
import Button from '../../components/common/Button'
import Modal from '../../components/common/Modal'
import FloatingInput from '../../components/common/FloatingInput'
import FloatingReactSelect from '../../components/common/FloatingReactSelect'
import ConfirmDialog from '../../components/common/ConfirmDialog'
import toast from '../../utils/toast'
import usePageTitle from '../../hooks/usePageTitle'

const AdminUsers = () => {
    usePageTitle('Quản lý Users')

    const [showModal, setShowModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [editingUser, setEditingUser] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [filterRole, setFilterRole] = useState('all')
    const [filterStatus, setFilterStatus] = useState('all')
    const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, userId: null, userName: '' })
    const [isDeleting, setIsDeleting] = useState(false)

    const [users, setUsers] = useState([
        {
            id: 1,
            name: 'Nguyễn Văn A',
            email: 'nguyenvana@email.com',
            role: 'user',
            status: 'active',
            createdAt: '2024-01-15',
        },
        {
            id: 2,
            name: 'Trần Thị B',
            email: 'tranthib@email.com',
            role: 'user',
            status: 'active',
            createdAt: '2024-01-14',
        },
        {
            id: 3,
            name: 'Lê Văn C',
            email: 'levanc@email.com',
            role: 'admin',
            status: 'active',
            createdAt: '2024-01-13',
        },
        {
            id: 4,
            name: 'Phạm Thị D',
            email: 'phamthid@email.com',
            role: 'user',
            status: 'inactive',
            createdAt: '2024-01-12',
        },
        {
            id: 5,
            name: 'Hoàng Văn E',
            email: 'hoangvane@email.com',
            role: 'user',
            status: 'active',
            createdAt: '2024-01-11',
        },
        {
            id: 6,
            name: 'Vũ Thị F',
            email: 'vuthif@email.com',
            role: 'admin',
            status: 'active',
            createdAt: '2024-01-10',
        },
    ])

    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        password: '',
        role: 'user',
        status: 'active',
    })

    const [errors, setErrors] = useState({})

    // Validation function
    const validateForm = (data, isEdit = false) => {
        const newErrors = {}

        if (!data.name || data.name.trim() === '') {
            newErrors.name = 'Vui lòng nhập tên'
        } else if (data.name.trim().length < 2) {
            newErrors.name = 'Tên phải có ít nhất 2 ký tự'
        }

        if (!data.email || data.email.trim() === '') {
            newErrors.email = 'Vui lòng nhập email'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            newErrors.email = 'Email không hợp lệ'
        }

        if (!isEdit) {
            if (!data.password || data.password.trim() === '') {
                newErrors.password = 'Vui lòng nhập mật khẩu'
            } else if (data.password.length < 6) {
                newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự'
            }
        }

        return newErrors
    }

    // Filter and search users
    const filteredUsers = useMemo(() => {
        return users.filter((user) => {
            const matchesSearch =
                user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase())
            const matchesRole = filterRole === 'all' || user.role === filterRole
            const matchesStatus = filterStatus === 'all' || user.status === filterStatus

            return matchesSearch && matchesRole && matchesStatus
        })
    }, [users, searchTerm, filterRole, filterStatus])

    const handleAddUser = (e) => {
        e.preventDefault()

        // Validate
        const validationErrors = validateForm(newUser, false)
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        const user = {
            id: users.length + 1,
            ...newUser,
            createdAt: new Date().toISOString().split('T')[0],
        }
        setUsers([...users, user])
        toast.success('Thêm user thành công!')
        setNewUser({ name: '', email: '', password: '', role: 'user', status: 'active' })
        setErrors({})
        setShowModal(false)
    }

    const handleEditUser = (user) => {
        setEditingUser({ ...user })
        setShowEditModal(true)
    }

    const handleUpdateUser = (e) => {
        e.preventDefault()

        // Validate
        const validationErrors = validateForm(editingUser, true)
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        setUsers(users.map((u) => (u.id === editingUser.id ? editingUser : u)))
        toast.success('Cập nhật user thành công!')
        setErrors({})
        setShowEditModal(false)
        setEditingUser(null)
    }

    const handleDeleteUser = (user) => {
        setDeleteConfirm({
            isOpen: true,
            userId: user.id,
            userName: user.name,
        })
    }

    const confirmDelete = () => {
        setIsDeleting(true)
        // Simulate async operation
        setTimeout(() => {
            setUsers(users.filter((u) => u.id !== deleteConfirm.userId))
            toast.success('Xóa user thành công!')
            setDeleteConfirm({ isOpen: false, userId: null, userName: '' })
            setIsDeleting(false)
        }, 500)
    }

    const handleToggleStatus = (user) => {
        const newStatus = user.status === 'active' ? 'inactive' : 'active'
        setUsers(
            users.map((u) =>
                u.id === user.id ? { ...u, status: newStatus } : u
            )
        )
        toast.success(`Đã ${newStatus === 'active' ? 'kích hoạt' : 'vô hiệu hóa'} user`)
    }

    return (
        <div>
            {/* Compact Filter Bar */}
            <div className="mb-6 flex flex-wrap items-center gap-3">
                {/* Search with Icon */}
                <div className="flex-1 min-w-[200px] relative">
                    <svg
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                    <input
                        type="text"
                        placeholder="Tìm kiếm..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
                    />
                </div>

                {/* Role Filter */}
                <select
                    value={filterRole}
                    onChange={(e) => setFilterRole(e.target.value)}
                    className="px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm cursor-pointer"
                >
                    <option value="all">Vai trò</option>
                    <option value="user">👤 User</option>
                    <option value="admin">👑 Admin</option>
                </select>

                {/* Status Filter */}
                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm cursor-pointer"
                >
                    <option value="all">Trạng thái</option>
                    <option value="active">✅ Hoạt động</option>
                    <option value="inactive">❌ Không hoạt động</option>
                </select>

                {/* Clear Filters */}
                {(searchTerm || filterRole !== 'all' || filterStatus !== 'all') && (
                    <button
                        onClick={() => {
                            setSearchTerm('')
                            setFilterRole('all')
                            setFilterStatus('all')
                        }}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Xóa bộ lọc"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}

                {/* Add User Button */}
                <Button onClick={() => setShowModal(true)} className="whitespace-nowrap">
                    <svg className="w-4 h-4 mr-1.5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Thêm User
                </Button>
            </div>

            <Card>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                                    ID
                                </th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                                    Tên
                                </th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                                    Email
                                </th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                                    Vai trò
                                </th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                                    Trạng thái
                                </th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                                    Ngày tạo
                                </th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                                    Hành động
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="py-8 text-center text-gray-500">
                                        Không tìm thấy user nào
                                    </td>
                                </tr>
                            ) : (
                                filteredUsers.map((user, index) => (
                                    <tr
                                        key={user.id}
                                        className={`border-b last:border-b-0 hover:bg-blue-50 transition-colors ${
                                            index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                                        }`}
                                    >
                                        <td className="py-3 px-4">{user.id}</td>
                                        <td className="py-3 px-4 font-medium">{user.name}</td>
                                        <td className="py-3 px-4 text-gray-600">{user.email}</td>
                                        <td className="py-3 px-4">
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs ${
                                                    user.role === 'admin'
                                                        ? 'bg-purple-100 text-purple-800'
                                                        : 'bg-blue-100 text-blue-800'
                                                }`}
                                            >
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4">
                                            <button
                                                onClick={() => handleToggleStatus(user)}
                                                className={`px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer hover:opacity-80 transition ${
                                                    user.status === 'active'
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-gray-100 text-gray-800'
                                                }`}
                                            >
                                                {user.status === 'active' ? '✅ Hoạt động' : '❌ Không hoạt động'}
                                            </button>
                                        </td>
                                        <td className="py-3 px-4 text-gray-600 text-sm">
                                            {new Date(user.createdAt).toLocaleDateString('vi-VN')}
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => handleEditUser(user)}
                                                    className="px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition"
                                                    title="Sửa user"
                                                >
                                                    <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                    Sửa
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteUser(user)}
                                                    className="px-3 py-1.5 text-sm font-medium text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition"
                                                    title="Xóa user"
                                                >
                                                    <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                    Xóa
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Add User Modal */}
            <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Thêm User mới">
                <form onSubmit={handleAddUser} className="space-y-5">
                    <div>
                        <FloatingInput
                            id="newUserName"
                            name="name"
                            type="text"
                            label="Họ và tên"
                            value={newUser.name}
                            onChange={(e) => {
                                setNewUser({ ...newUser, name: e.target.value })
                                if (errors.name) setErrors({ ...errors, name: '' })
                            }}
                            autoComplete="name"
                        />
                        {errors.name && (
                            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {errors.name}
                            </p>
                        )}
                    </div>

                    <div>
                        <FloatingInput
                            id="newUserEmail"
                            name="email"
                            type="email"
                            label="Email"
                            value={newUser.email}
                            onChange={(e) => {
                                setNewUser({ ...newUser, email: e.target.value })
                                if (errors.email) setErrors({ ...errors, email: '' })
                            }}
                            autoComplete="email"
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {errors.email}
                            </p>
                        )}
                    </div>

                    <div>
                        <FloatingInput
                            id="newUserPassword"
                            name="password"
                            type="password"
                            label="Mật khẩu"
                            value={newUser.password}
                            onChange={(e) => {
                                setNewUser({ ...newUser, password: e.target.value })
                                if (errors.password) setErrors({ ...errors, password: '' })
                            }}
                            autoComplete="new-password"
                        />
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {errors.password}
                            </p>
                        )}
                    </div>

                    <FloatingReactSelect
                        id="newUserRole"
                        name="role"
                        label="Vai trò"
                        value={newUser.role}
                        onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                        options={[
                            { value: 'user', label: '👤 User' },
                            { value: 'admin', label: '👑 Admin' },
                        ]}
                        isSearchable={false}
                        isClearable={false}
                    />

                    <FloatingReactSelect
                        id="newUserStatus"
                        name="status"
                        label="Trạng thái"
                        value={newUser.status}
                        onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
                        options={[
                            { value: 'active', label: '✅ Hoạt động' },
                            { value: 'inactive', label: '❌ Không hoạt động' },
                        ]}
                        isSearchable={false}
                        isClearable={false}
                    />

                    <div className="flex space-x-4 pt-4">
                        <Button type="submit">Thêm User</Button>
                        <Button type="button" variant="secondary" onClick={() => {
                            setShowModal(false)
                            setErrors({})
                        }}>
                            Hủy
                        </Button>
                    </div>
                </form>
            </Modal>

            {/* Edit User Modal */}
            <Modal
                isOpen={showEditModal}
                onClose={() => {
                    setShowEditModal(false)
                    setEditingUser(null)
                }}
                title="Chỉnh sửa User"
            >
                {editingUser && (
                    <form onSubmit={handleUpdateUser} className="space-y-5">
                        <div>
                            <FloatingInput
                                id="editUserName"
                                name="name"
                                type="text"
                                label="Họ và tên"
                                value={editingUser.name}
                                onChange={(e) => {
                                    setEditingUser({ ...editingUser, name: e.target.value })
                                    if (errors.name) setErrors({ ...errors, name: '' })
                                }}
                                autoComplete="name"
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        <div>
                            <FloatingInput
                                id="editUserEmail"
                                name="email"
                                type="email"
                                label="Email"
                                value={editingUser.email}
                                onChange={(e) => {
                                    setEditingUser({ ...editingUser, email: e.target.value })
                                    if (errors.email) setErrors({ ...errors, email: '' })
                                }}
                                autoComplete="email"
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        <FloatingReactSelect
                            id="editUserRole"
                            name="role"
                            label="Vai trò"
                            value={editingUser.role}
                            onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                            options={[
                                { value: 'user', label: '👤 User' },
                                { value: 'admin', label: '👑 Admin' },
                            ]}
                            isSearchable={false}
                            isClearable={false}
                        />

                        <FloatingReactSelect
                            id="editUserStatus"
                            name="status"
                            label="Trạng thái"
                            value={editingUser.status}
                            onChange={(e) => setEditingUser({ ...editingUser, status: e.target.value })}
                            options={[
                                { value: 'active', label: '✅ Hoạt động' },
                                { value: 'inactive', label: '❌ Không hoạt động' },
                            ]}
                            isSearchable={false}
                            isClearable={false}
                        />

                        <div className="flex space-x-4 pt-4">
                            <Button type="submit">Cập nhật</Button>
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={() => {
                                    setShowEditModal(false)
                                    setEditingUser(null)
                                    setErrors({})
                                }}
                            >
                                Hủy
                            </Button>
                        </div>
                    </form>
                )}
            </Modal>

            {/* Confirm Delete Dialog */}
            <ConfirmDialog
                isOpen={deleteConfirm.isOpen}
                onClose={() => setDeleteConfirm({ isOpen: false, userId: null, userName: '' })}
                onConfirm={confirmDelete}
                title="Xác nhận xóa user"
                message={`Bạn có chắc chắn muốn xóa user "${deleteConfirm.userName}"? Hành động này không thể hoàn tác.`}
                confirmText="Xóa"
                cancelText="Hủy"
                type="danger"
                isLoading={isDeleting}
            />
        </div>
    )
}

export default AdminUsers
