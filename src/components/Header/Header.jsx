import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faExchange, faUserPlus, faSignIn, faSignOut } from '@fortawesome/free-solid-svg-icons'
import Button from '../Atom/Button'
import { useNavigate } from 'react-router-dom'


function Header({ activeItem }) {

    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()

    const navItems = [
        {
            name: "Home",
            slug: "/",
            Icon: <FontAwesomeIcon icon={faHome} />,
            active: true
        },
        {
            name: "Change Password",
            slug: "change-password",
            Icon: <FontAwesomeIcon icon={faExchange} />,
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
                <aside className='backdrop-blur-md bg-opacity-50 duration-300 fixed z-10 top-0 bottom-14 flex w-72 flex-col gap-4
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
                    <ul className='flex flex-col gap-4 h-auto'>
                        {
                            navItems.map((item) => (
                                item.active ? (
                                    <li>
                                        <Button onClick={() => navigate(item.slug)}
                                            className='border-none font-normal p-2 text-center'
                                            bgColor='bg-black'
                                            textColor='text-white'
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
