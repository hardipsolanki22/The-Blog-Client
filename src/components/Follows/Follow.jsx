import React, { useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'

function Follow() {

    const { username } = useParams()

    return (
        <div className='sm:col-span-11 md:col-span-6 '>
            <div className='w-full flex justify-around items-center h-full border'>
                <NavLink to={`/${username}/followers`}
                    className={'p-4 text-black bg-white'}
                >
                    Followers
                </NavLink>
                <NavLink to={`/${username}/following`}
                    className="p-4 text-black bg-white" >
                    Following
                </NavLink>
            </div>
        </div>
    )
}

export default Follow
