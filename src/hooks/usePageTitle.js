import { useEffect } from 'react'

/**
 * Custom hook to set page title dynamically
 * @param {string} title - The page title
 * @param {string} suffix - Optional suffix (default: app name from env)
 */
const usePageTitle = (title, suffix = null) => {
    useEffect(() => {
        const appName = import.meta.env.VITE_APP_NAME || 'Kho Doan Base'
        const finalSuffix = suffix !== null ? suffix : ` - ${appName}`
        document.title = title + finalSuffix
        
        // Cleanup: reset to default title when component unmounts
        return () => {
            document.title = appName
        }
    }, [title, suffix])
}

export default usePageTitle

