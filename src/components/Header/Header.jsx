import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faExchange, faUserPlus, faSignIn, faSignOut, faUser, faRetweet, faPlus } from '@fortawesome/free-solid-svg-icons'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useRef } from 'react'

import LogoutBtn from '../auth/LogoutBtn'
import { useTheme } from '../Contexts/theme'
import nonProfileImage from '../../assets/userDeafultAavtar.png'
import Logo from '../../assets/Logo.png'
import ThemeBtn from '../Atoms/ThemeBtn'

function Header() {
    const authStatus = useSelector((state) => state.auth.status)
    const userData = useSelector(state => state.auth.userData)
    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()
    const sidebarRef = useRef(null)


    const navItems = [
        {
            name: "Home",
            slug: "/",
            icon: <FontAwesomeIcon icon={faHome} />,
            active: true
        },
        {
            name: "Profile",
            slug: `/${userData?.username}`,
            icon: <FontAwesomeIcon icon={faUser} />,
            active: authStatus
        },
        {
            name: "Login",
            slug: "/login",
            icon: <FontAwesomeIcon icon={faSignIn} />,
            active: !authStatus
        },
        {
            name: "Signup",
            slug: "/signup",
            icon: <FontAwesomeIcon icon={faUserPlus} />,
            active: !authStatus
        },
    ]
    
    const handleClickOutSide = () => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
            setIsOpen(false)
        }
    }

    // close aside menu free useEffect
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutSide)
        return () => {
            document.removeEventListener("mousedown", handleClickOutSide)
        }

    }, [])

    const { themeMode } = useTheme()

    return (
        <div className={`sm:border-none ${themeMode ? 'dark' : 'light'}`}>
            <header>
                <div className='w-full h-14 sm:hidden 
                flex items-center justify-around'>
                    <div className='sm:hidden' onClick={() => setIsOpen((isOpen) => !isOpen)}>
                        <img
                            src={userData?.avatar ? userData?.avatar : nonProfileImage}
                            alt={userData?.username}
                            className='w-10 h-10 rounded-full'
                        />
                    </div>
                    <Link to={"/"}>
                        <img
                            src={Logo}
                            alt="our-logo"
                            className='w-10 h-10 rounded-full'
                        />
                    </Link>
                </div>
            </header>
            {isOpen ? (
                <aside ref={sidebarRef} className={` border fixed z-10 top-0 ${authStatus ? 'bottom-14' : 'bottom-0'} 
                    flex w-72 flex-col gap-6 ${themeMode ? 'dark border-slate-400'
                        : 'light border-slate-600'} p-4`} id='aside' >
                    {authStatus &&
                        <div className='flex items-center justify-center'>
                            <div className='flex flex-col items-center'>
                                <div>
                                    <img src={userData?.avatar}
                                        className='w-20 h-20 rounded-full'
                                        loading='lazy'
                                        alt="Profile" />
                                </div>
                                <div className='flex justify-between items-center'>
                                    <p className='font-semibold'>{userData?.username}</p>
                                </div>
                            </div>
                        </div>
                    }
                    <ul className='flex flex-col gap-8 h-auto'>
                        {
                            navItems.map((item) => (
                                item.active ? (
                                    <li key={item.name}>
                                        <NavLink to={item.slug}
                                            onClick={() => navigate(item.slug)}
                                            className={({ isActive }) => `  
                                            border rounded-lg focus:outline-none font-semibold p-2 text-center
                                            ${themeMode ? 'hover:bg-purple-500 text-white hover:text-white border-slate-400'
                                                    : 'hover:bg-blue-500 hover:text-white text-black border-slate-600'}
                                            ${isActive && themeMode && "text-white bg-purple-500 "}
                                            ${isActive && !themeMode && " text-white bg-blue-500"}`}
                                        >
                                            <span className='mr-2'>{item.icon}</span>
                                            <span>{item.name}</span>
                                        </NavLink>
                                    </li>
                                ) : null
                            ))}
                        {authStatus && (
                            <li key='logout'>
                                <LogoutBtn />
                            </li>
                        )}
                        <li key='mode'>
                            <ThemeBtn />
                        </li>
                    </ul>
                </aside>) : null
            }
        </div>

    )
}

export default Header

