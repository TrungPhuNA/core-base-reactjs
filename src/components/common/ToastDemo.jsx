import toast from '../../utils/toast'

const ToastDemo = () => {
    const handleSuccess = () => {
        toast.success('Thao tác thành công! 🎉')
    }

    const handleError = () => {
        toast.error('Có lỗi xảy ra! Vui lòng thử lại.')
    }

    const handleWarning = () => {
        toast.warning('Cảnh báo! Hãy kiểm tra lại thông tin.')
    }

    const handleInfo = () => {
        toast.info('Thông tin: Đây là một thông báo quan trọng.')
    }

    const handleLoading = () => {
        const loadingToast = toast.loading('Đang xử lý...')
        setTimeout(() => {
            toast.dismiss(loadingToast)
            toast.success('Hoàn thành!')
        }, 2000)
    }

    const handlePromise = () => {
        const myPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                const success = Math.random() > 0.5
                if (success) {
                    resolve('Thành công!')
                } else {
                    reject('Thất bại!')
                }
            }, 2000)
        })

        toast.promise(myPromise, {
            loading: 'Đang tải dữ liệu...',
            success: 'Tải dữ liệu thành công!',
            error: 'Tải dữ liệu thất bại!',
        })
    }

    const handleCustom = () => {
        toast.custom('Toast tùy chỉnh với icon đặc biệt!', '🚀', {
            style: {
                border: '2px solid #8b5cf6',
                background: '#f3e8ff',
            },
        })
    }

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Toast Notifications Demo</h2>
            <p className="text-gray-600 mb-6">Click vào các nút để xem các loại thông báo khác nhau</p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <button
                    onClick={handleSuccess}
                    className="px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition font-medium"
                >
                    ✅ Success
                </button>

                <button
                    onClick={handleError}
                    className="px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-medium"
                >
                    ❌ Error
                </button>

                <button
                    onClick={handleWarning}
                    className="px-4 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition font-medium"
                >
                    ⚠️ Warning
                </button>

                <button
                    onClick={handleInfo}
                    className="px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-medium"
                >
                    ℹ️ Info
                </button>

                <button
                    onClick={handleLoading}
                    className="px-4 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition font-medium"
                >
                    ⏳ Loading
                </button>

                <button
                    onClick={handlePromise}
                    className="px-4 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition font-medium"
                >
                    🎲 Promise
                </button>

                <button
                    onClick={handleCustom}
                    className="px-4 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:from-pink-600 hover:to-purple-600 transition font-medium"
                >
                    🚀 Custom
                </button>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Cách sử dụng:</h3>
                <pre className="text-sm text-gray-700 overflow-x-auto">
                    <code>{`import toast from '../../utils/toast'

// Success
toast.success('Thành công!')

// Error
toast.error('Có lỗi!')

// Warning
toast.warning('Cảnh báo!')

// Info
toast.info('Thông tin!')

// Loading
const id = toast.loading('Đang xử lý...')
toast.dismiss(id)

// Promise
toast.promise(myPromise, {
  loading: 'Loading...',
  success: 'Success!',
  error: 'Error!'
})`}</code>
                </pre>
            </div>
        </div>
    )
}

export default ToastDemo

