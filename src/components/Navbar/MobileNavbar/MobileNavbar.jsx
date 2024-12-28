import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faUserPlus, faSignInAlt, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import Button from '../../Atom/Button'



function MobileNavbar() {

    const navigate = useNavigate()

    const navItems = [
        {
            name: "Home",
            slug: "/",
            Icon: <FontAwesomeIcon icon={faHome} />,
            active: true
        },
        {
            name: "Signup",
            slug: "/signup",
            Icon: <FontAwesomeIcon icon={faUserPlus} />,
            active: false
        },
        {
            name: "Login",
            slug: "/login",
            Icon: <FontAwesomeIcon icon={faSignInAlt} />,
            active: false
        },
        {
            name: "AddPost",
            slug: "/add-post",
            Icon: <FontAwesomeIcon icon={faPlus} />,
            active: true
        },
        {
            name: "Search",
            slug: "/search-user",
            Icon: <FontAwesomeIcon icon={faSearch} />,
            active: true
        }
    ]

    return (
        <nav className=' w-full fixed bottom-0 sm:hidden bg-black text-white h-14'>
                <ul className='flex justify-between mx-4 items-center h-full'>
                    {navItems.map((item) => (
                        item.active ? (
                            <li key={item.name}>
                                <Button onClick={() => navigate(item.slug)}
                                    className='p-2 border-none'
                                    bgColor='bg-black'
                                    textColor='text-white'
                                >
                                    {item.Icon}
                                </Button>
                            </li>
                        ) : null
                    ))

                    }
                </ul>
        </nav>
    )
}

export default MobileNavbar
