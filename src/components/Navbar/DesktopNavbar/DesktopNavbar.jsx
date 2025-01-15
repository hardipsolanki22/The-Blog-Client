import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faPlus, faSearch, faUser, faUserPlus, faSignIn, faRetweet } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Button from '../../Atoms/Button'
import LogoutBtn from '../../auth/LogoutBtn'

function DesktopNavbar() {
    const authStatus = useSelector((state) => state.auth.status)
    const userData = useSelector(state => state.auth.userData)
    const navigate = useNavigate()

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
            <aside className='md:col-span-3 hidden md:block min-h-screen border'>
                <div className='flex items-center justify-center my-6'>
                    <div className='flex flex-col items-center'>
                        <div>
                            <img src="" alt="Profile" />
                        </div>
                        <div className='flex justify-between items-center'>
                            <p>Followers</p>
                            <p>Followings</p>
                        </div>
                    </div>
                </div>
                <nav>
                    <ul className='gap-6 flex flex-col items-center justify-center my-4'>
                        {navItems.map((item) => (
                            item.active ? (
                                <li key={item.name}>
                                    <Button onClick={() => navigate(item.slug)}
                                        className='px-4 py-2 rounded-lg
                                        hover:bg-white hover:text-black transition duration-500 focus:outline-none'
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
                    </ul>
                </nav>
            </aside>
            <aside className='sm:col-span-1 hidden sm:block md:hidden min-h-screen border'>
                <nav className=''>
                    <ul className='gap-9 flex flex-col items-center justify-center my-4'>
                        {navItems.map((item) => (
                            item.active ? (
                                <li className='transition duration-500'>
                                    <Button onClick={() => navigate(item.slug)}
                                        className='px-4 py-2 rounded-lg
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
