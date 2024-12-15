import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import AuthProvider from './context/authContext.tsx'
import QueryProvider from './lib/React-Query/QueryProvider.tsx'
ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
     <QueryProvider>
     <AuthProvider>
        <App/>
     </AuthProvider>
     </QueryProvider>
    </BrowserRouter>

)
