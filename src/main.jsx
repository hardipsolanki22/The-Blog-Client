import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider, useSelector } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'


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
import { store } from './store/store.js'
import EditPost from './pages/editPost.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/signup",
        element: (
          <Protected authentication={false}>
            <Signup />
          </Protected>
        )
      },
      {
        path: "/login",
        element: (
          <Protected authentication={false}>
            <Login />
          </Protected>
        )
      },
      {
        path: "/forget-password",
        element: (
          <Protected authentication={false}>
            <ForgetPassword />
          </Protected>
        )
      },
      {
        path: "/reset-password",
        element: (
          <Protected authentication={false}>
            <ResetPassword />
          </Protected>
        )
      },
      {
        path: "/change-password",
        element: (
          <Protected authentication>
            <ChangePassword />
          </Protected>
        )
      },
      {
        path: "/search-user",
        element: (
          <Protected authentication>
            <Search />
          </Protected>
        )
      },
      {
        path: "/profile/:username",
        element: (
          <Protected authentication>
            <Profile />
          </Protected>
        )
      },
      {
        path: "/edit-profile",
        element: (
          <Protected authentication>
            <EditProfile />
          </Protected>
        )
      },
      {
        path: "/add-post",
        element: (
          <Protected authentication>
            <PostForm />
          </Protected>
        )
      },
      {
        path: "/edit-posts/:postId",
        element: (
          <Protected authentication>
            <EditPost/>
          </Protected>
        )
      }
    ]
  }
])

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </QueryClientProvider>
  </StrictMode>,
)


