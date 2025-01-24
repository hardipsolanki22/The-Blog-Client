import React from 'react'
import Skeleton from 'react-loading-skeleton'

function RightSidebarUsersSkeleton({ cards }) {
    return Array(cards)
        .fill()
        .map((_, index) => (
            <div key={index}
                className='flex flex-col justify-center items-center w-full h-auto'>
                <div className='w-[90%] h-auto m-4 '>
                    <div className='flex flex-col justify-center gap-2 items-center '>
                        <div>
                            <Skeleton
                                height={40}
                                width={40}
                                circle />
                        </div>
                        <div className='w-[75%]'>
                            <Skeleton
                                className='h-6'
                            />
                        </div>
                    </div>
                </div>
            </div>
        ))
}

export default RightSidebarUsersSkeleton
