import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faSearch, faExchange } from '@fortawesome/free-solid-svg-icons'


function Header({ activeItem }) {

    const [isOpen, setIsOpen] = useState(false)

    const navItems = [
        {
            name: "Home",
            slug: "/",
            Icon: <FontAwesomeIcon icon={faHome} />,
            active: true
        },
        {
            name: "Search",
            slug: "/search-user",
            Icon: <FontAwesomeIcon icon={faSearch} />,
            active: true
        },
        {
            name: "Change Password",
            slug: "change-password",
            Icon: <FontAwesomeIcon icon={faExchange} />,
            active: true
        }
    ]

    return (
        <div>
            <header >
                <div className='w-full h-14 bg-gray-500 text-black  flex items-center justify-around'>
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
                <aside className='duration-300  absolute flex h-screen w-50 flex-col  gap-4 p-4 bg-slate-900'>
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
                <ul>
                    {
                        navItems.map((item) => (
                            item.active ? (
                                <li>
                                    <button className='border-none font-normal
                          bg-slate-900 text-gray-300 p-2 text-center'>
                                        <span className='mr-2'>{item.Icon}</span>
                                        <span>{item.name}</span>
                                    </button>
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
