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
        const user = {
            id: users.length + 1,
            ...newUser,
            createdAt: new Date().toISOString().split('T')[0],
        }
        setUsers([...users, user])
        toast.success('Thêm user thành công!')
        setNewUser({ name: '', email: '', password: '', role: 'user', status: 'active' })
        setShowModal(false)
    }

    const handleEditUser = (user) => {
        setEditingUser({ ...user })
        setShowEditModal(true)
    }

    const handleUpdateUser = (e) => {
        e.preventDefault()
        setUsers(users.map((u) => (u.id === editingUser.id ? editingUser : u)))
        toast.success('Cập nhật user thành công!')
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
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Quản lý Users</h1>
                    <p className="text-gray-600 mt-2">Tổng: {filteredUsers.length} users</p>
                </div>
                <Button onClick={() => setShowModal(true)}>
                    <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Thêm User
                </Button>
            </div>

            {/* Filters */}
            <Card className="mb-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                    <div className="md:col-span-2">
                        <FloatingInput
                            id="search"
                            name="search"
                            type="text"
                            label="Tìm kiếm theo tên hoặc email"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <FloatingReactSelect
                        id="filterRole"
                        name="filterRole"
                        label="Vai trò"
                        value={filterRole}
                        onChange={(e) => setFilterRole(e.target.value)}
                        options={[
                            { value: 'all', label: 'Tất cả' },
                            { value: 'user', label: '👤 User' },
                            { value: 'admin', label: '👑 Admin' },
                        ]}
                        isSearchable={false}
                        isClearable={false}
                    />

                    <FloatingReactSelect
                        id="filterStatus"
                        name="filterStatus"
                        label="Trạng thái"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        options={[
                            { value: 'all', label: 'Tất cả' },
                            { value: 'active', label: '✅ Hoạt động' },
                            { value: 'inactive', label: '❌ Không hoạt động' },
                        ]}
                        isSearchable={false}
                        isClearable={false}
                    />
                </div>
            </Card>

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
                                filteredUsers.map((user) => (
                                    <tr
                                        key={user.id}
                                        className="border-b last:border-b-0 hover:bg-gray-50"
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
                    <FloatingInput
                        id="newUserName"
                        name="name"
                        type="text"
                        label="Họ và tên"
                        value={newUser.name}
                        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                        required
                        autoComplete="name"
                    />

                    <FloatingInput
                        id="newUserEmail"
                        name="email"
                        type="email"
                        label="Email"
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        required
                        autoComplete="email"
                    />

                    <FloatingInput
                        id="newUserPassword"
                        name="password"
                        type="password"
                        label="Mật khẩu"
                        value={newUser.password}
                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                        required
                        autoComplete="new-password"
                    />

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
                        required
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
                        required
                        isSearchable={false}
                        isClearable={false}
                    />

                    <div className="flex space-x-4 pt-4">
                        <Button type="submit">Thêm User</Button>
                        <Button type="button" variant="secondary" onClick={() => setShowModal(false)}>
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
                        <FloatingInput
                            id="editUserName"
                            name="name"
                            type="text"
                            label="Họ và tên"
                            value={editingUser.name}
                            onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                            required
                            autoComplete="name"
                        />

                        <FloatingInput
                            id="editUserEmail"
                            name="email"
                            type="email"
                            label="Email"
                            value={editingUser.email}
                            onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                            required
                            autoComplete="email"
                        />

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
                            required
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
                            required
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
