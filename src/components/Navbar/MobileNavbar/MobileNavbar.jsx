import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faUserPlus, faSignInAlt, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons'



function MobileNavbar() {

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
        <nav className=' w-full fixed bottom-0 sm:hidden bg-slate-950 h-14'>
                <ul className='flex justify-between mx-4 items-center h-full'>
                    {navItems.map((item) => (
                        item.active ? (
                            <li key={item.name}>
                                <button onClick={() => navigate(item.slug)}
                                    className='p-2 border-none bg-slate-950 text-slate-300 '
                                >
                                    {item.Icon}
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
