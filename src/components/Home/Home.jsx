import React, { useState } from 'react'
import ForYouFeed from './ForYouFeed'
import FollowingFeed from './FollowingFeed'
import Button from '../Atoms/Button'

function Home() {

    const [feed, setFeed] = useState("ForYou")

    return (
        <div className='sm:col-span-11 md:col-span-6 h-16'>
            <div className='w-full flex justify-around items-center h-full border-b border-slate-600 '>
                <Button 
                className={`p-2 text-black bg-white focus:outline-none
                ${feed === 'ForYoua' && 'bg-sky-900 text-white'}`}
                onClick={() => setFeed("ForYou")}>
                    ForYou
                </Button>
                <Button 
                className="p-2 text-black bg-white focus:outline-none" 
                onClick={() => setFeed("Following")}>
                    Followig
                </Button>
            </div>
            {feed === "ForYou" ? (
                <ForYouFeed />
            ) : <FollowingFeed />
            }
        </div>
    )
}

export default Home
