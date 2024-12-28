import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider } from 'react-router-dom'


import App from './App.jsx'
import './index.css'
import Protected from './components/auth/AuthLayout.jsx'
import Home from './components/Home/Home.jsx'
import Search from './components/RightAside/Search.jsx'
import Profile from './components/Profile/Profile.jsx'
const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: (
          <Protected authentication>
            <Home/>
          </Protected>
        )
      },
      {
        path: "/search-user",
        element: (
          <Protected authentication>
            <Search/>
          </Protected>
        )
      },
      {
        path: "/profile",
        element: (
          <Protected authentication>
            <Profile/>
          </Protected>
        )
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
