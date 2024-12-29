import React from 'react'

function PostCart({
    title, 
    content,
    owner,
    time,
    image,
    totalLike,
    totalComment
}) {
  return (
      <div className='flex-col justify-center items-center'>
          <div className='flex items-center'>
            <div className='w-14 h-4 mx-2 flex justify-center items-center'>
              <img src={owner.avatar}
                alt="hardip"
                className='rounded-full'
              />
            </div>
            <p className='mr-2'>{owner.username}</p>
            <p className='text-gray-500 text-[13px]'>{time}</p>
          </div>
          <div className='flex flex-col justify-center items-center'>
            <div className='p-2 rounded-md'>
              <img src="https://live.staticflickr.com/4021/4254050437_0d1baf4858_h.jpg" alt="post" />
            </div>
            <div className='flex flex-col w-full gap-4 mt-2 ml-4'>
              <p>{title}</p>
              <p>{content}</p>
            </div>
          </div>
        </div>

  )
}

export default PostCart
