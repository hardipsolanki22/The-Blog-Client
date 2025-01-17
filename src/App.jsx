import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'
import { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css';


import Header from './components/Header/Header'
import DesktopNavbar from './components/Navbar/DesktopNavbar/DesktopNavbar'
import MobileNavbar from './components/Navbar/MobileNavbar/MobileNavbar'
import RightAside from './components/RightAside/RightAside'
import getCurrentUser from './components/Api/UserApi/getCurrentUser'
import { useDispatch } from 'react-redux'
import { login, logout } from './featured/authSlice'
import { ThemeProvider } from './components/Contexts/theme'


function App() {
  const navigate = useNavigate()
  const [themeMode , setThemeMode] = useState(true)
  const dispatch = useDispatch()

  const { data: user, isLoading } = useQuery({
    queryKey: ["current-user"],
    queryFn: getCurrentUser,
    refetchOnWindowFocus: false
  })

  if (user) {
    dispatch(login({ userData: user.data }))
  } else {
    dispatch(logout())
  }

  // toggle dark mode and light mode 
  const toggleMode = () => {
    setThemeMode(!themeMode)
  }

  useEffect(() => {
    document.querySelector('html')
                        .classList.remove("light", "dark")
    document.querySelector('html')
                        .classList.add(themeMode ? "dark" : "light")

   console.log(`html: `, document.querySelector('html'));
   

  }, [themeMode])


  return (
    <ThemeProvider value={{themeMode, toggleMode}}>
      {!isLoading ? (
        <>
          <Header />
          <main className='grid sm:grid-cols-12 w-full'>
            <SkeletonTheme baseColor='#313131' highlightColor='#525252'>
              <DesktopNavbar />
              <Outlet />
              <RightAside />
              <MobileNavbar />
              <ToastContainer />
            </SkeletonTheme>
          </main>
        </>
      ) : (<div>
        <h1>Loding...</h1>
      </div>)

      }
    </ThemeProvider>
  )
}

export default App
