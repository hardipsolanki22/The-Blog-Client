import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faPlus, faSearch, faExchange, faUser, faUserPlus, faSignIn, faSignOut} from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

import Button from '../../Atom/Button'

function DesktopNavbar() {
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
            active: true
        },
        {
            name: "Search",
            slug: "/search-user",
            icon: <FontAwesomeIcon icon={faSearch} />,
            active: true
        },
        {
            name: "Profile",
            slug: "/profile",
            icon: <FontAwesomeIcon icon={faUser}/>,
            active: true
        },
        {
            name: "Change Password",
            slug: "change-password",
            icon: <FontAwesomeIcon icon={faExchange} />,
            active: true
        },
        {
            name: "Logout",
            slug: "/logout",
            icon: <FontAwesomeIcon icon={faSignOut} />,
            active: true
        },
        {
            name: "Login",
            slug: "/login",
            icon: <FontAwesomeIcon icon={faSignIn} />,
            active: true
        },
        {
            name: "Signip",
            slug: "/signup",
            icon: <FontAwesomeIcon icon={faUserPlus} />,
            active: true
        },
    ]

    return (
        <>
            <aside className='md:col-span-3 hidden md:block min-h-screen border
             border-slate-600 bg-black text-white '>
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
            <aside className='sm:col-span-1 hidden sm:block md:hidden min-h-screen border border-slate-600 bg-black text-white '>
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
