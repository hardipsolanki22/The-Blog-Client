import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { } from '@fortawesome/free-solid-svg-icons'
import { faComment, faHeart } from '@fortawesome/free-regular-svg-icons'

function ForYouFeed() {
  return (
    <div className='m-4'>
      <div className='flex justify-center items-center'>
        <div className=' bg-slate-200 p-8 flex flex-col  text-black'>
          <div className='flex'>
            <div className='w-14 h-4'>
              <img src='https://idolkart.com/cdn/shop/articles/Krishna_ke_Naam.jpg?v=1700290012&width=1500'
                alt="hardip"
                className='rounded-2xl'
              />
            </div>
            <p className='mr-4'>Krishna</p>
            <p>2 minitu ago</p>
          </div>
          <div className='m-2 flex flex-col justify-center items-center'>
            <div className='p-2 rounded-md'>
              <img src="https://live.staticflickr.com/4021/4254050437_0d1baf4858_h.jpg" alt="post" />
            </div>
            <div className='flex flex-col justify-cente gap-4 m-2'>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque, dolor!</p>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Iusto doloremque ab perferendis quos tempore sint similique, aliquam illum voluptatem ut!
              </p>
            </div>
          </div>
          <div className='flex items-center gap-4 mx-4'>
            <div className='flex mx-2'>
              <FontAwesomeIcon icon={faHeart} />
              <p>10</p>
            </div>
            <div className='flex mx-2'>
              <FontAwesomeIcon icon={faComment} />
              <p>4</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ForYouFeed
