import { useState } from 'react'
import {Outlet} from 'react-router-dom'



import Header from './components/Header/Header'
import DesktopNavbar from './components/Navbar/DesktopNavbar/DesktopNavbar'
import MobileNavbar from './components/Navbar/MobileNavbar/MobileNavbar'
import RightAside from './components/RightAside/RightAside'
import { ToastContainer } from 'react-toastify'
import { useQuery } from '@tanstack/react-query'
import getCurrentUser from './components/Api/UserApi/getCurrentUser'
import { useDispatch } from 'react-redux'
import { login, logout } from './featured/authSlice'


function App() {
  const dispatch = useDispatch()

  const {data: user, isLoading} = useQuery({
    queryFn: getCurrentUser,
    refetchOnWindowFocus: false
  })

  if (user) {
    dispatch(login({userData: user.data}))
  } else {
    dispatch(logout())
  }

  return (
    !isLoading ? (
      <div className=''>
      <Header/>
      <main className='grid sm:grid-cols-12 bg-black text-white'>
          <DesktopNavbar/>
          <Outlet/>
          <RightAside/>
          <MobileNavbar/>
          <ToastContainer />
      </main>
    </div>
    ) : (<div>
      <h1>Loding...</h1>
    </div>)
  )
}

export default App
