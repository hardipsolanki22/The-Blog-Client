import React, { useState } from 'react'
import {faComment, faHeart} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import Comment from '../Comment/Comment'
import Like from '../Like/Like'


function ForYouFeed() {

  const [isCommentOpen, setIsCommentOpen] = useState(false)
  const [isLikeOpen, setIsLikeOpen] = useState(false)

  return (
   <div className='sm:max-h-screen sm:overflow-y-auto'>
    <div className='m-4 flex justify-center items-center'>
      <div className='flex-col justify-center items-center p-8  text-black bg-slate-200'>
        <div className='flex flex-col'>
          <div className='flex items-center'>
            <div className='w-14 h-4'>
              <img src='https://idolkart.com/cdn/shop/articles/Krishna_ke_Naam.jpg?v=1700290012&width=1500'
                alt="hardip"
                className='rounded-2xl'
              />
            </div>
            <p className='mr-2'>Krishna</p>
            <p className='text-gray-500 text-[13px]'>2 minitu ago</p>
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
        </div>
        <div className='flex items-center'>
          <button className='p-1 hover:text-red-500' onClick={() => setIsLikeOpen(!isLikeOpen)}>
            <FontAwesomeIcon icon={faHeart} />
          </button>
            <span className='text-[13px] mr-2'>10</span>
          <button className='p-1' onClick={() => setIsCommentOpen(!isCommentOpen)}>
            <FontAwesomeIcon icon={faComment} />
          </button>
          <span className='text-[13px]'>10</span>
        </div>
        {isLikeOpen && 
          <div>
            <Like/>
          </div>
        }
        {isCommentOpen && 
          <div>
            <Comment/>
          </div>
        }
      </div>
    </div>

    {/* // SecondPost */}
    <div className='flex justify-center items-center'>
      <div className='flex-col justify-center items-center p-8  text-black bg-slate-200'>
        <div className='flex flex-col'>
          <div className='flex items-center'>
            <div className='w-14 h-4'>
              <img src='https://idolkart.com/cdn/shop/articles/Krishna_ke_Naam.jpg?v=1700290012&width=1500'
                alt="hardip"
                className='rounded-2xl'
              />
            </div>
            <p className='mr-2'>Krishna</p>
            <p className='text-gray-500 text-[13px]'>2 minitu ago</p>
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
        </div>
        <div className='flex items-center'>
          <button className='p-1 hover:text-red-500' onClick={() => setIsLikeOpen(!isLikeOpen)}>
            <FontAwesomeIcon icon={faHeart} />
          </button>
            <span className='text-[13px] mr-2'>10</span>
          <button className='p-1' onClick={() => setIsCommentOpen(!isCommentOpen)}>
            <FontAwesomeIcon icon={faComment} />
          </button>
          <span className='text-[13px]'>10</span>
        </div>
        {isLikeOpen && <Like/>}
        {isCommentOpen && <Comment/>}
      </div>
    </div>
   </div>
    
  )
}

export default ForYouFeed
