import { useState, useMemo } from 'react'
import Card from '../../components/common/Card'
import Button from '../../components/common/Button'
import Modal from '../../components/common/Modal'
import Input from '../../components/common/Input'

const AdminUsers = () => {
    const [showModal, setShowModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [editingUser, setEditingUser] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [filterRole, setFilterRole] = useState('all')
    const [filterStatus, setFilterStatus] = useState('all')

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
        setNewUser({ name: '', email: '', role: 'user', status: 'active' })
        setShowModal(false)
    }

    const handleEditUser = (user) => {
        setEditingUser(user)
        setShowEditModal(true)
    }

    const handleUpdateUser = (e) => {
        e.preventDefault()
        setUsers(users.map((u) => (u.id === editingUser.id ? editingUser : u)))
        setShowEditModal(false)
        setEditingUser(null)
    }

    const handleDeleteUser = (id) => {
        if (confirm('Bạn có chắc muốn xóa user này?')) {
            setUsers(users.filter((u) => u.id !== id))
        }
    }

    const handleToggleStatus = (id) => {
        setUsers(
            users.map((u) =>
                u.id === id ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } : u
            )
        )
    }

    return (
        <div>
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Quản lý Users</h1>
                    <p className="text-gray-600 mt-2">Tổng: {filteredUsers.length} users</p>
                </div>
                <Button onClick={() => setShowModal(true)}>+ Thêm User</Button>
            </div>

            {/* Filters */}
            <Card className="mb-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-2">
                        <Input
                            label="Tìm kiếm"
                            placeholder="Tìm theo tên hoặc email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Vai trò
                        </label>
                        <select
                            value={filterRole}
                            onChange={(e) => setFilterRole(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                            <option value="all">Tất cả</option>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Trạng thái
                        </label>
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                            <option value="all">Tất cả</option>
                            <option value="active">Hoạt động</option>
                            <option value="inactive">Không hoạt động</option>
                        </select>
                    </div>
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
                                                onClick={() => handleToggleStatus(user.id)}
                                                className={`px-2 py-1 rounded-full text-xs cursor-pointer hover:opacity-80 ${
                                                    user.status === 'active'
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-gray-100 text-gray-800'
                                                }`}
                                            >
                                                {user.status === 'active'
                                                    ? 'Hoạt động'
                                                    : 'Không hoạt động'}
                                            </button>
                                        </td>
                                        <td className="py-3 px-4 text-gray-600 text-sm">
                                            {user.createdAt}
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => handleEditUser(user)}
                                                    className="text-blue-600 hover:text-blue-800"
                                                >
                                                    Sửa
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteUser(user.id)}
                                                    className="text-red-600 hover:text-red-800"
                                                >
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
                <form onSubmit={handleAddUser}>
                    <Input
                        label="Tên"
                        name="name"
                        value={newUser.name}
                        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                        required
                    />
                    <Input
                        label="Email"
                        type="email"
                        name="email"
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        required
                    />
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Vai trò
                        </label>
                        <select
                            value={newUser.role}
                            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Trạng thái
                        </label>
                        <select
                            value={newUser.status}
                            onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                            <option value="active">Hoạt động</option>
                            <option value="inactive">Không hoạt động</option>
                        </select>
                    </div>
                    <div className="flex space-x-4">
                        <Button type="submit">Thêm</Button>
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => setShowModal(false)}
                        >
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
                    <form onSubmit={handleUpdateUser}>
                        <Input
                            label="Tên"
                            name="name"
                            value={editingUser.name}
                            onChange={(e) =>
                                setEditingUser({ ...editingUser, name: e.target.value })
                            }
                            required
                        />
                        <Input
                            label="Email"
                            type="email"
                            name="email"
                            value={editingUser.email}
                            onChange={(e) =>
                                setEditingUser({ ...editingUser, email: e.target.value })
                            }
                            required
                        />
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Vai trò
                            </label>
                            <select
                                value={editingUser.role}
                                onChange={(e) =>
                                    setEditingUser({ ...editingUser, role: e.target.value })
                                }
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Trạng thái
                            </label>
                            <select
                                value={editingUser.status}
                                onChange={(e) =>
                                    setEditingUser({ ...editingUser, status: e.target.value })
                                }
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            >
                                <option value="active">Hoạt động</option>
                                <option value="inactive">Không hoạt động</option>
                            </select>
                        </div>
                        <div className="flex space-x-4">
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
        </div>
    )
}

export default AdminUsers
