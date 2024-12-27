import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider } from 'react-router-dom'


import App from './App.jsx'
import './index.css'
import Protected from './components/auth/AuthLayout.jsx'
import Home from './components/Home/Home.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: (
          <Protected authentication={true}>
            <Home/>
          </Protected>
        )
      },
      {
        path: "/login"
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
