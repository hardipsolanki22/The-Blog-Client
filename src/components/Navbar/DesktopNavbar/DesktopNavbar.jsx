import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faUserPlus, faSignInAlt, faPlus, faSearch,faExchange } from '@fortawesome/free-solid-svg-icons'

function DesktopNavbar() {

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
            active: true
        },
        {
            name: "Login",
            slug: "/login",
            Icon: <FontAwesomeIcon icon={faSignInAlt} />,
            active: true
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
        },
        {
            name: "Change Password",
            slug: "change-password",
            Icon: <FontAwesomeIcon icon={faExchange}/>,
            active: true
          }
    ]

    return (
        <>
            <aside className='sm:col-span-3 hidden sm:block h-screen bg-slate-900 '>
                <nav>
                    <ul className='gap-6 flex flex-col items-center align-middle justify-center my-4'>
                        {navItems.map((item) => (
                            item.active ? (
                                <li key={item.name}>
                                    <button onClick={() => navigate(item.slug)} 
                                    className='border-none font-normal
                          bg-slate-900 text-gray-300 hover:bg-slate-600 p-2 rounded-md active:border-none
                           hover:w-30 text-center'>
                                        <span className='mr-2'>{item.Icon}</span>
                                        <span>{item.name}</span>
                                    </button>
                                </li>
                            ) : null
                        ))

                        }
                    </ul>
                </nav>
            </aside>
        </>

    )
}

export default DesktopNavbar
