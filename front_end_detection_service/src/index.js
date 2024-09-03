import React from 'react'
import ReactDOM from 'react-dom/client'
import './App.css'
import router from './router';
import { ContextProvider } from './contexts/ContextProvider.jsx';
import { RouterProvider } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextProvider>
        
    <RouterProvider router={router}/>
    </ContextProvider>

      </React.StrictMode>,
)
