import React, { useState } from 'react'
import ForYouFeed from './ForYouFeed'
import FollowingFeed from './FollowingFeed'

function Home() {

    const [feed, setFeed] = useState("ForYou")

    return (
        <div className='sm:col-span-9 '>
            <div className=' w-full flex justify-around items-center'>
                <button className="p-0 " onClick={() => setFeed("ForYou")}>
                    ForYou
                </button>
                <button className="p-0 " onClick={() => setFeed("Following")}>
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
