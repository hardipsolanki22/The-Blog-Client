import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'


import './index.css'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import AuthLayout from './components/Auth/AuthLayout.jsx'
import Search from './components/Search/Search.jsx'
import Profile from './components/Profile/Profile.jsx'
import Signup from './components/Auth/Signup.jsx'
import Login from './components/Auth/Login.jsx'
import ForgetPassword from './components/Auth/ForegtPassword.jsx'
import ResetPassword from './components/Auth/ResetPassword.jsx'
import PostForm from './components/Post/PostForm.jsx'
import EditProfile from './pages/EditProfile.jsx'
import ChangePassword from './components/Auth/ChangePassword.jsx'
import EditPost from './pages/EditPost.jsx'
import Followers from './components/Follows/Followers.jsx'
import Following from './components/Follows/Following.jsx'
import { store } from './store/store.js'
import AllTweets from './components/Tweet/AllTweets.jsx'
import Page404 from './components/Atoms/page404.jsx'


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
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        )
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        )
      },
      {
        path: "/forget-password",
        element: (
          <AuthLayout authentication={false}>
            <ForgetPassword />
          </AuthLayout>
        )
      },
      {
        path: "/reset-password",
        element: (
          <AuthLayout authentication={false}>
            <ResetPassword />
          </AuthLayout>
        )
      },
      {
        path: "/change-password",
        element: (
          <AuthLayout authentication>
            <ChangePassword />
          </AuthLayout>
        )
      },
      {
        path: "/search-user",
        element: (
          <AuthLayout authentication>
            <Search />
          </AuthLayout>
        )
      },
      {
        path: "/:username",
        element: (
          <AuthLayout authentication>
            <Profile />
          </AuthLayout>
        )
      },
      {
        path: "/edit-profile",
        element: (
          <AuthLayout authentication>
            <EditProfile />
          </AuthLayout>
        )
      },
      {
        path: "/:username/:userId/followers",
        element: (
          <AuthLayout authentication>
            <Followers />
          </AuthLayout>
        )
      },
      {
        path: "/:username/:userId/following",
        element: (
          <AuthLayout authentication>
            <Following />
          </AuthLayout>
        )
      },
      {
        path: "/add-post",
        element: (
          <AuthLayout authentication>
            <PostForm />
          </AuthLayout>
        )
      },
      {
        path: "/edit-posts/:postId",
        element: (
          <AuthLayout authentication>
            <EditPost />
          </AuthLayout>
        )
      },
      {
        path: "/tweets",
        element: (
          <AuthLayout authentication>
            <AllTweets />
          </AuthLayout>
        )
      },
      {
        path: "*",
        element: <Page404 />
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


