import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faExchange, faUserPlus, faSignIn, faSignOut, faUser } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Button from '../Atom/Button'

function Header({ activeItem }) {
    const authStatus = useSelector((state) => state.auth.status)
    const userData = useSelector(state => state.auth.userData)
    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()

    const navItems = [
        {
            name: "Home",
            slug: "/",
            Icon: <FontAwesomeIcon icon={faHome} />,
            active: authStatus
        },
        {
            name: "Change Password",
            slug: "change-password",
            Icon: <FontAwesomeIcon icon={faExchange} />,
            active: authStatus
        },
        {
            name: "Logout",
            slug: "/logout",
            icon: <FontAwesomeIcon icon={faSignOut} />,
            active: authStatus
        },
        {
            name: "Profile",
            slug: `/profile/${userData?.usernane}`,
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
            name: "Signip",
            slug: "/signup",
            icon: <FontAwesomeIcon icon={faUserPlus} />,
            active: !authStatus
        },

    ]

    return (
        <div>
            <header >
                <div className='w-full h-14 sm:hidden text-white bg-black z-10 flex items-center justify-around'>
                    {/*TODO:: HANDLE ACTIVE ROUTE  */}
                    <div className='sm:hidden' onClick={() => setIsOpen((prevValue) => !prevValue)}>
                        <img src="" alt="UserAvatar" />
                    </div>
                    <div className='hidden sm:block'>
                        <img src="" alt="UserAvatar" />
                    </div>
                    <div>
                        <p>The Blog</p>
                    </div>
                </div>
            </header>
            {isOpen ? (
                <aside className='transition-all ease-linear delay-0 duration-500 backdrop-blur-md bg-opacity-50 
                fixed z-10 top-0 bottom-14 flex w-72 flex-col gap-6
                border p-4 bg-black text-white '>
                    <div className='flex items-center justify-center'>
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
                    <ul className='flex flex-col gap-8 h-auto'>
                        {
                            navItems.map((item) => (
                                item.active ? (
                                    <li>
                                        <Button onClick={() => navigate(item.slug)}
                                            className='border-none font-normal p-2 text-center'
                                            bgColor='bg-slate-200'
                                            textColor='text-black'
                                        >
                                            <span className='mr-2'>{item.Icon}</span>
                                            <span>{item.name}</span>
                                        </Button>
                                    </li>
                                ) : null
                            ))
                        }
                    </ul>
                </aside>) : null
            }
        </div>

    )
}

export default Header
