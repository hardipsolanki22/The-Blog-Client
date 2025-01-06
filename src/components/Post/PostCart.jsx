import React from 'react'

function PostCart({
    title, 
    content,
    owner,
    time,
    image,
}) {
  return (
      <div className='flex-col justify-center items-center'>
          <div className='flex items-center'>
            <div className=' mx-2 flex justify-center items-center'>
              <img src={owner.avatar}
                alt="hardip"
                className='rounded-full w-10 h-10'
              />
            </div>
            <p className='mr-2'>{owner.username}</p>
            <p className='text-gray-500 text-[13px]'>{time}</p>
          </div>
          <div className='flex flex-col justify-center items-center'>
            <div className='p-2 rounded-md'>
              <img 
              src={image}
               alt="post" />
            </div>
            <div className='flex flex-col w-full h-auto gap-4 mt-2 ml-4 overflow-hidden'>
              <p className='break-words'>{title}</p>
              <p className='break-words'>{content}</p>
            </div>
          </div>
        </div>

  )
}

export default PostCart
