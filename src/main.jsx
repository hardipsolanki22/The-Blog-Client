import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'


import './index.css'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Protected from './components/Auth/AuthLayout.jsx'
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
        path: "/:username",
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
        path: "/:username/:userId/followers",
        element: (
          <Protected authentication>
            <Followers />
          </Protected>
        )
      },
      {
        path: "/:username/:userId/following",
        element: (
          <Protected authentication>
            <Following />
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
            <EditPost />
          </Protected>
        )
      },
      {
        path: "/tweets",
        element: (
          <Protected authentication>
            <AllTweets />
          </Protected>
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


