import toast from 'react-hot-toast'

// Custom toast configurations
const toastConfig = {
    duration: 4000,
    position: 'top-right',
    style: {
        borderRadius: '10px',
        background: '#fff',
        color: '#333',
        padding: '16px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    },
}

// Success toast
export const showSuccess = (message) => {
    toast.success(message, {
        ...toastConfig,
        icon: '✅',
        style: {
            ...toastConfig.style,
            border: '1px solid #10b981',
        },
    })
}

// Error toast
export const showError = (message) => {
    toast.error(message, {
        ...toastConfig,
        icon: '❌',
        style: {
            ...toastConfig.style,
            border: '1px solid #ef4444',
        },
    })
}

// Warning toast
export const showWarning = (message) => {
    toast(message, {
        ...toastConfig,
        icon: '⚠️',
        style: {
            ...toastConfig.style,
            border: '1px solid #f59e0b',
        },
    })
}

// Info toast
export const showInfo = (message) => {
    toast(message, {
        ...toastConfig,
        icon: 'ℹ️',
        style: {
            ...toastConfig.style,
            border: '1px solid #3b82f6',
        },
    })
}

// Loading toast
export const showLoading = (message) => {
    return toast.loading(message, {
        ...toastConfig,
    })
}

// Dismiss toast
export const dismissToast = (toastId) => {
    toast.dismiss(toastId)
}

// Promise toast (for async operations)
export const showPromise = (promise, messages) => {
    return toast.promise(
        promise,
        {
            loading: messages.loading || 'Đang xử lý...',
            success: messages.success || 'Thành công!',
            error: messages.error || 'Có lỗi xảy ra!',
        },
        toastConfig
    )
}

// Custom toast with custom icon
export const showCustom = (message, icon, options = {}) => {
    toast(message, {
        ...toastConfig,
        icon,
        ...options,
    })
}

export default {
    success: showSuccess,
    error: showError,
    warning: showWarning,
    info: showInfo,
    loading: showLoading,
    dismiss: dismissToast,
    promise: showPromise,
    custom: showCustom,
}

