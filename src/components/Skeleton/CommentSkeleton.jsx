import React from 'react'
import Skeleton from 'react-loading-skeleton'

function CommentSkeleton({ cards }) {
    return Array(cards)
        .fill()
        .map((_, index) => (
            <div key={index}
                className='flex flex-col justify-center items-center w-full h-auto'>
                <div className='w-[90%] h-auto m-4'>
                    <div className='flex gap-2 items-center'>
                        <div>
                            <Skeleton
                                height={40}
                                width={40}
                                circle />
                        </div>
                        <div className='w-[45%]'>
                            <Skeleton
                                className='h-6'
                            />
                        </div>
                    </div>
                        <div className='w-full mt-1'>
                            <Skeleton className='h-16' />
                        </div>
                </div>
            </div>
        ))
}

export default CommentSkeleton
