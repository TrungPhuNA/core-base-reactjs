import { createContext, useContext, useState, useEffect } from 'react'

const LayoutContext = createContext()

export const useLayout = () => {
    const context = useContext(LayoutContext)
    if (!context) {
        throw new Error('useLayout must be used within LayoutProvider')
    }
    return context
}

export const LayoutProvider = ({ children }) => {
    // Load from localStorage or default to 'sidebar'
    const [layoutMode, setLayoutMode] = useState(() => {
        const saved = localStorage.getItem('layoutMode')
        return saved || 'sidebar' // 'sidebar' or 'top'
    })

    // Save to localStorage when changed
    useEffect(() => {
        localStorage.setItem('layoutMode', layoutMode)
    }, [layoutMode])

    const toggleLayoutMode = () => {
        setLayoutMode((prev) => (prev === 'sidebar' ? 'top' : 'sidebar'))
    }

    const value = {
        layoutMode,
        setLayoutMode,
        toggleLayoutMode,
        isSidebarMode: layoutMode === 'sidebar',
        isTopMode: layoutMode === 'top',
    }

    return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
}
