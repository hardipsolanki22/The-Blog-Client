import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faPlus, faSearch, faUser, faUserPlus, faSignIn, faRetweet, faMoon } from '@fortawesome/free-solid-svg-icons'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Button from '../../Atoms/Button'
import LogoutBtn from '../../auth/LogoutBtn'
import { axiosInstance } from '../../../Helpers/axiosService'
import ThemeBtn from '../../Atoms/ThemeBtn'
import { useTheme } from '../../Contexts/theme'

function DesktopNavbar() {
    const [user, setUser] = useState({})
    const authStatus = useSelector((state) => state.auth.status)
    const userData = useSelector(state => state.auth.userData)
    const navigate = useNavigate()

    // useEffect(() => {
    //     (async () => {
    //         try {
    //             const response = await axiosInstance.get(`/user/profile/${userData.username}`, {
    //                 headers: {
    //                     "Content-Type": "application/json"
    //                 }
    //             })
    //             setUser(response.data.data)
    //         } catch (error) {
    //             console.error(error.message);

    //         }
    //     })()
    // }, [])

    const navItems = [
        {
            name: "Home",
            slug: "/",
            icon: <FontAwesomeIcon icon={faHome} />,
            active: true
        },
        {
            name: "AddPost",
            slug: "/add-post",
            icon: <FontAwesomeIcon icon={faPlus} />,
            active: authStatus
        },
        {
            name: "Search",
            slug: "/search-user",
            icon: <FontAwesomeIcon icon={faSearch} />,
            active: authStatus
        },
        {
            name: "Profile",
            slug: `/profile/${userData?.username}`,
            icon: <FontAwesomeIcon icon={faUser} />,
            active: authStatus
        },
        {
            name: "Tweets",
            slug: "/tweets",
            icon: <FontAwesomeIcon icon={faRetweet} />,
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

    const { themeMode } = useTheme()

    return (
        <>
            <aside className='md:col-span-3 hidden md:block min-h-screen border border-slate-600'>
                {/* {authStatus &&
                    <div className='flex items-center justify-center my-6'>
                        <div className='flex flex-col items-center'>
                            <div>
                                <img src={userData?.avatar}
                                    alt="Profile"
                                    className='w-24 h-24 rounded-full'
                                />
                            </div>
                            <div className='flex justify-between items-center gap-4'>
                                <p>Followers: {user?.followingsCount}</p>
                                <p>Followings: {user?.followersCount}</p>
                            </div>
                        </div>
                    </div>
                } */}
                <nav>
                    <ul className='gap-10 flex flex-col items-center justify-center mt-6 '>
                        {navItems.map((item) => (
                            item.active ? (
                                <li key={item.name}>
                                    <NavLink to={item.slug}
                                        onClick={() => navigate(item.slug)}
                                        className={({ isActive }) => ` gap-4
                                        px-4 py-2 rounded-lg text-xl font-semibold
                                        transition duration-150 border
                                        ${themeMode ? ' hover:bg-purple-500 text-white hover:text-white border-slate-400'
                                            : '   hover:bg-blue-500 hover:text-white text-black border-slate-600'}
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
                            <li key="logout">
                                <LogoutBtn />
                            </li>
                        )}
                        <ThemeBtn />
                    </ul>
                </nav>
            </aside>
            <aside className='sm:col-span-1 hidden sm:block md:hidden min-h-screen border border-slate-600'>
                <nav className=''>
                    <ul className='gap-9 flex flex-col items-center justify-center my-4'>
                        {navItems.map((item) => (
                            item.active ? (
                                <li key={item.name}>
                                    <NavLink to={item.slug}
                                        className={({ isActive }) => `px-2 py-1 rounded-lg font-semibold
                                         transition duration-150 focus:outline-none text-center border
                                        ${themeMode ? 'text-white hover:bg-purple-500 border-slate-40 hover:text-white'
                                        : ' text-black hover:bg-blue-500 border-slate-500 hover:text-white'}
                                        ${isActive && themeMode && "bg-purple-500"}
                                        ${isActive && !themeMode && "bg-blue-500"}`}
                                    >
                                        {item.icon}
                                    </NavLink>
                                </li>
                            ) : null
                        ))}
                        {authStatus && (
                            <li key="logout">
                                <LogoutBtn />
                            </li>
                        )}
                    </ul>
                </nav>
            </aside>
        </>

    )
}

export default DesktopNavbar
