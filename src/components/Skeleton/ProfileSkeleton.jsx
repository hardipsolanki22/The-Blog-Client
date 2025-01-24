import React from 'react'
import Skeleton from 'react-loading-skeleton'

import PostSkeleton from './PostSkeleton'

function ProfileSkeleton({ cards }) {
    return (
        <div className='flex flex-col justify-center items-center w-full h-auto'>
            <div className='w-[90%] m-4 h-auto'>
                <div className='w-full flex flex-col justify-center'>
                    <div className='w-[35%]'>
                        <Skeleton />
                    </div>
                    <div className='relative'>
                        <Skeleton
                            className='h-40'
                        />
                        <div className='sm:w-36 sm:h-36 h-28 w-28 absolute left-8 top-7 sm:top-0
                    transform translate-y-1/2'>
                            <Skeleton
                                className=' sm:h-36 h-28'
                                circle
                            />
                        </div>
                    </div>
                    <div className='mt-12 sm:mt-16'>
                        <div className='w-[25%]'>
                            <Skeleton
                                className='h-6'
                            />
                        </div>
                        <div className='w-[25%]'>
                            <Skeleton className='h-6'
                            />
                        </div>
                        <div className='w-[35%]'>
                            <Skeleton
                            />
                        </div>
                    </div>
                    <div className='flex gap-2 mt-2'>
                        <Skeleton
                            width={70}
                        />
                        <Skeleton
                            width={70}
                        />
                    </div>
                    <div>
                        {Array(cards)
                            .fill()
                            .map((_, index) => (
                                <div key={index}
                                    className='mt-1 flex flex-col justify-center gap-2 items-center'>
                                    <div className='w-full h-full'>
                                        <Skeleton className='w-full h-72' />
                                    </div>
                                    <div className='w-full'>
                                        <Skeleton
                                            className='h-7'
                                        />
                                        <Skeleton
                                            className='h-16' />
                                    </div>
                                </div>
                            ))

                        }
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ProfileSkeleton
