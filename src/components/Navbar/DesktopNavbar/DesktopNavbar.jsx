import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faPlus, faSearch, faExchange, faUser, faUserPlus, faSignIn, faSignOut } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Button from '../../Atom/Button'

function DesktopNavbar() {
    const authStatus = useSelector((state) => state.auth.status)
    const userData = useSelector(state => state.auth.userData)
    const navigate = useNavigate()

    const navItems = [
        {
            name: "Home",
            slug: "/",
            icon: <FontAwesomeIcon icon={faHome} />,
            active: authStatus
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
            slug:  `/profile/${userData?.usernane}`,
            icon: <FontAwesomeIcon icon={faUser} />,
            active: authStatus
        },
        {
            name: "Change Password",
            slug: "change-password",
            icon: <FontAwesomeIcon icon={faExchange} />,
            active: authStatus
        },
        {
            name: "Logout",
            slug: "/logout",
            icon: <FontAwesomeIcon icon={faSignOut} />,
            active: authStatus
        },
        {
            name: "Login",
            slug: "/login",
            icon: <FontAwesomeIcon icon={faSignIn} />,
            active: !authStatus
        },
        {
            name: "Signip",
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
                                        className='border-none font-normal
                                        hover:bg-slate-400
                                        p-2 rounded-md active:border-none
                                        hover:w-30 text-center' bgColor='bg-black' textColor='text-white'>
                                        <span className='mr-2'>{item.icon}</span>
                                        <span>{item.name}</span>
                                    </Button>
                                </li>
                            ) : null
                        ))

                        }
                    </ul>
                </nav>
            </aside>
            <aside className='sm:col-span-1 hidden sm:block md:hidden min-h-screen border'>
                <nav className=''>
                    <ul className='gap-9 flex flex-col items-center justify-center my-4'>
                        {navItems.map((item) => (
                            item.active ? (
                                <li>
                                    <Button onClick={() => navigate(item.slug)}
                                        className='border-none font-normal
                                        hover:bg-slate-600 p-2 rounded-md active:border-none
                                        hover:w-30 text-center' bgColor='bg-black' textColor='text-white'>
                                        <span className='mr-2'>{item.icon}</span>
                                    </Button>
                                </li>
                            ) : null
                        ))}
                    </ul>
                </nav>
            </aside>
        </>

    )
}

export default DesktopNavbar
