import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faPlus, faSearch, faRetweet } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Button from '../../Atoms/Button'



function MobileNavbar() {
    const authStatus = useSelector((state) => state.auth.status)
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
            name: "Tweets",
            slug: "/tweets",
            icon: <FontAwesomeIcon icon={faRetweet} />,
            active: authStatus
        },

    ]

    return (
        <nav className='borde w-full fixed bottom-0 sm:hidden bg-black text-white h-14'>
            <ul className='flex justify-around mx-4 items-center h-full'>
                {navItems.map((item) => (
                    item.active ? (
                        <li key={item.slug}>
                            <button onClick={() => navigate(item.slug)}
                                className='p-2 focus:outline-none bg-black text-white'
                            >
                                {item.icon}
                            </button>
                        </li>
                    ) : null
                ))

                }
            </ul>
        </nav>
    )
}

export default MobileNavbar
