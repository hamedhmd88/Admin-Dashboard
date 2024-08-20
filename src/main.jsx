import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AppProvider from './contexts/app/AppProvider.jsx'

createRoot(document.getElementById('root')).render(

    <AppProvider>
        <App />
    </AppProvider>

)
