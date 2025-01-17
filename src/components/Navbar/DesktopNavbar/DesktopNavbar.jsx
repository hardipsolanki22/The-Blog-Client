import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faPlus, faSearch, faUser, faUserPlus, faSignIn, faRetweet, faMoon } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Button from '../../Atoms/Button'
import LogoutBtn from '../../auth/LogoutBtn'
import { axiosInstance } from '../../../Helpers/axiosService'
import ThemeBtn from '../../Atoms/ThemeBtn'

function DesktopNavbar() {
    const [user, setUser] = useState({})
    const authStatus = useSelector((state) => state.auth.status)
    const userData = useSelector(state => state.auth.userData)
    const navigate = useNavigate()

    useEffect(() => {
        (async () => {
            try {
                const response = await axiosInstance.get(`/user/profile/${userData.username}`, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                setUser(response.data.data)
            } catch (error) {
                console.error(error.message);

            }
        })()
    }, [])

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

    return (
        <>
            <aside className='md:col-span-3 hidden md:block min-h-screen border  border-slate-600'>
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
                    <ul className='gap-6 flex flex-col items-center justify-center my-4'>
                        {navItems.map((item) => (
                            item.active ? (
                                <li key={item.name}>
                                    <Button onClick={() => navigate(item.slug)}
                                        className='px-4 py-2 rounded-lg text-xl font-semibold
                                        hover:bg-white hover:text-black transition duration-500 
                                        focus:outline-none'
                                        bgColor='bg-black' textColor='text-white'>
                                        <span className='mr-2'>{item.icon}</span>
                                        <span>{item.name}</span>
                                    </Button>
                                </li>
                            ) : null
                        ))}
                        {authStatus && (
                            <li key="logout">
                                <LogoutBtn />
                            </li>
                        )}
                        <ThemeBtn/>
                    </ul>
                </nav>
            </aside>
            <aside className='sm:col-span-1 hidden sm:block md:hidden min-h-screen border'>
                <nav className=''>
                    <ul className='gap-9 flex flex-col items-center justify-center my-4'>
                        {navItems.map((item) => (
                            item.active ? (
                                <li key={item.name}
                                    className='transition duration-500'>
                                    <Button onClick={() => navigate(item.slug)}
                                        className='px-2 py-1 rounded-lg
                                   hover:bg-white hover:text-black transition duration-500 focus:outline-none'
                                        bgColor='bg-black'
                                        textColor='text-white'
                                    >
                                        <span className='mr-2'>{item.icon}</span>
                                    </Button>
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
