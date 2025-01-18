import React, { useState } from 'react'
import ForYouFeed from './ForYouFeed'
import FollowingFeed from './FollowingFeed'
import Button from '../Atoms/Button'
import { useTheme } from '../Contexts/theme'

function Home() {

    const [feed, setFeed] = useState("ForYou")
    const { themeMode } = useTheme()

    return (
        <div className='sm:col-span-11 md:col-span-6 h-16'>
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
