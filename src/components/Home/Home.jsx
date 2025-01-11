import React, { useState } from 'react'
import ForYouFeed from './ForYouFeed'
import FollowingFeed from './FollowingFeed'
import Button from '../Atoms/Button'

function Home() {

    const [feed, setFeed] = useState("ForYou")

    return (
        <div className='sm:col-span-11 md:col-span-6 sm:sticky z-0 top-0 relative  h-16'>
            <div className='w-full flex justify-around items-center h-full border'>
                <Button 
                className={`p-2 text-black bg-white ${feed === 'following' && 'bg-sky-900 text-white'}`}
                onClick={() => setFeed("ForYou")}>
                    ForYou
                </Button>
                <Button 
                className="p-2 text-black bg-white" 
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
