import React from 'react'
import Skeleton from 'react-loading-skeleton'

function TweetSkeleton({ cards }) {
    return Array(cards)
        .fill()
        .map((_, index) => (
            <div key={index}
                className='flex flex-col justify-center items-center w-full h-full'>
                <div className='w-[90%] h-auto '>
                    <div className='flex justify-center gap-2 items-center '>
                        <div>
                            <Skeleton circle className='w-12 h-12' />
                        </div>
                        <div className='w-full'>
                            <Skeleton className=' w-[60%]' />
                        </div>
                    </div>
                    <div className='mt-2 flex flex-col justify-center gap-2 items-center'>
                        <div className='w-full'>
                            <Skeleton className='h-16' />
                        </div>
                    </div>
                </div>

            </div>
        ))

}

export default TweetSkeleton
