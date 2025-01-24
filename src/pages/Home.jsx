import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import nonProfileImage from '../assets/blank-profile-picture-973460_1280.webp'
import Logo from '../assets/3D cinema style text TB with a blue background.png'
import ForYouFeed from '../components/Home/ForYouFeed'
import FollowingFeed from '../components/Home/FollowingFeed'
import { useTheme } from '../components/Contexts/theme'

function Home() {

    const userData = useSelector(state => state.auth.userData)
    const [feed, setFeed] = useState("ForYou")
    const { themeMode } = useTheme()

    return (
        <div className='sm:col-span-11 md:col-span-6 h-16'>
            <div className='w-full h-14 sm:flex items-center justify-around hidden '>
                <div>
                    <img
                        src={userData?.avatar ? userData?.avatar : nonProfileImage}
                        alt={userData?.username}
                        loading='lazy'
                        className='w-10 h-10 rounded-full'
                    />
                </div>
                <Link to={"/"}>
                    <img
                        src={Logo}
                        alt="our-logo"
                        className='w-10 h-10 rounded-full'
                    />
                </Link>
            </div>
            <div className='w-full flex justify-around items-center h-full border-b border-slate-600 '>
                <button
                    className={`focus:outline-none bg-inherit rounded-none 
                     ${feed === 'ForYou' && `${themeMode ?
                            'text-white border-b-4 hover:border-purple-500 border-purple-500'
                            : 'text-black border-b-4  hover:border-blue-500 border-blue-500'}`
                        }`}
                    onClick={() => setFeed("ForYou")}>
                    ForYou
                </button>
                <button
                    className={`focus:outline-none bg-inherit rounded-none 
                        ${feed === 'Following' && `${themeMode ?
                            'text-white border-b-4 hover:border-purple-500 border-purple-500'
                            : 'text-black border-b-4 hover:border-blue-500 border-blue-500'}`
                        }`}
                    onClick={() => setFeed("Following")}>
                    Followig
                </button>
            </div>
            {feed === "ForYou" ? (
                <ForYouFeed />
            ) : <FollowingFeed />
            }
        </div>
    )
}

export default Home
