import { useState } from 'react'
import {Outlet} from 'react-router-dom'



import Header from './components/Header/Header'
import DesktopNavbar from './components/Navbar/DesktopNavbar/DesktopNavbar'
import MobileNavbar from './components/Navbar/MobileNavbar/MobileNavbar'
import RightAside from './components/RightAside/RightAside'
import { ToastContainer } from 'react-toastify'


function App() {
  const [count, setCount] = useState(0)

  return (
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
  )
}

export default App
