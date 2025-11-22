import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import { LayoutProvider } from './context/LayoutContext'
import AppRoutes from './routes'

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <LayoutProvider>
                    <AppRoutes />
                    <Toaster
                        position="top-right"
                        reverseOrder={false}
                        gutter={8}
                        toastOptions={{
                            duration: 4000,
                            style: {
                                borderRadius: '10px',
                                background: '#fff',
                                color: '#333',
                                padding: '16px',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                                maxWidth: '500px',
                            },
                            success: {
                                duration: 3000,
                                iconTheme: {
                                    primary: '#10b981',
                                    secondary: '#fff',
                                },
                            },
                            error: {
                                duration: 4000,
                                iconTheme: {
                                    primary: '#ef4444',
                                    secondary: '#fff',
                                },
                            },
                        }}
                    />
                </LayoutProvider>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App
