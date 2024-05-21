import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import routes from './router/Routes.jsx'
import Main from './Layout/Main.jsx'
import { HelmetProvider } from 'react-helmet-async'
import AuthProvider from './authProvider/AuthProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <HelmetProvider>
        <RouterProvider router={routes}>
          <Main />
        </RouterProvider>
      </HelmetProvider>
    </AuthProvider>
  </React.StrictMode>,
)
