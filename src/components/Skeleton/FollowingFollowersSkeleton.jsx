import React from 'react'
import Skeleton from 'react-loading-skeleton'

function FollowingFollowersSkeleton({ cards }) {
    return Array(cards)
        .fill()
        .map((_, index) => (
            <div key={index}
                className='flex flex-col items-center w-full h-auto'>
                <div className='w-[90%] h-auto m-4 '>
                    <div className='flex justify-center gap-2 items-center '>
                        <div>
                            <Skeleton circle className='w-12 h-12' />
                        </div>
                        <div className='w-full'>
                            <Skeleton className=' w-[60%]' />
                        </div>
                    </div>
                </div>
            </div>
        ))
}
export default FollowingFollowersSkeleton