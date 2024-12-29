import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider } from 'react-router-dom'


import App from './App.jsx'
import './index.css'
import Home from './components/Home/Home.jsx'
import Protected from './components/Auth/AuthLayout.jsx'
import Search from './components/Search/Search.jsx'
import Profile from './components/Profile/Profile.jsx'
import Signup from './components/Auth/Signup.jsx'
import Login from './components/Auth/Login.jsx'
import ForgetPassword from './components/Auth/ForegtPassword.jsx'
import ResetPassword from './components/Auth/ResetPassword.jsx'
import PostForm from './components/Post/PostForm.jsx'
import EditProfile from './components/Profile/EditProfile.jsx'
import ChangePassword from './components/Auth/ChangePassword.jsx'


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
        path: "/signup",
        element: (
          <Protected authentication>
            <Signup/>
          </Protected>
        )
      },
      {
        path: "/login",
        element: (
          <Protected authentication>
            <Login/>
          </Protected>
        )
      },
      {
        path: "/forget-password",
        element: (
          <Protected authentication>
            <ForgetPassword/>
          </Protected>
        )
      },
      {
        path: "/reset-password",
        element: (
          <Protected authentication>
            <ResetPassword/>
          </Protected>
        )
      },
      {
        path: "/change-password",
        element: (
          <Protected authentication>
            <ChangePassword/>
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
      },
      {
        path: "/edit-profile",
        element: (
          <Protected authentication>
            <EditProfile/>
          </Protected>
        )
      },
      {
        path: "/add-post",
        element: (
          <Protected authentication>
            <PostForm/>
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
