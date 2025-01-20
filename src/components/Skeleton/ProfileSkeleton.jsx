import React from 'react'
import Skeleton from 'react-loading-skeleton'

function ProfileSkeleton({cards}) {
    return (
        <div className='flex flex-col justify-center items-center w-full h-auto'>
            <div className='w-[90%] m-4 h-auto'>
                <div>
                    <Skeleton className='w-[50%]' />
                </div>
                <div className='relative'>
                    <Skeleton className='w-[100%] h-40 sm:h-48' />
                    <Skeleton className='sm:w-36 sm:h-36 h-28 w-28 rounded-full absolute 
                    left-8 bottom-0 transform translate-y-1/2 border-2 border-black'/>
                </div>
                <div className='mt-14 sm:mt-[4.5rem] gap-2'>
                    <Skeleton count={3} className='w-[20%]' />
                </div>
                <div className='mt-4 gap-2'>
                    <Skeleton count={2} className='w-[20%]' />
                </div>
               { Array(cards)
                .fill()
                .map((_, index) => (
                    <div key={index} 
                    className='mt-2 flex flex-col justify-center gap-2 items-center h-auto'>
                    <div className='w-full h-full'>
                        <Skeleton className='w-full h-72' />
                    </div>
                    <div className='w-full'>
                        <Skeleton />
                        <Skeleton className='h-16' />
                    </div>
                </div>
                ))

               }
            </div>
        </div>
    )
}

export default ProfileSkeleton
