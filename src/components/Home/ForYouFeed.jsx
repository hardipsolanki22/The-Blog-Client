import React, { useState } from 'react'
import {faComment, faHeart} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import PostCart from '../Post/PostCart'
import Like from '../Like/Like'
import Comment from '../Comment/Comment'
import Button from '../Atom/Button'

function ForYouFeed() {

  const [isLikeOpen, setIsLikeOpen] = useState(false)
  const [isCommentOpen, setIsCommentOpen] = useState(false)

  const posts = [
    {
      title: "i am root",
      content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem, quibusdam!",
      image: "https://live.staticflickr.com/4021/4254050437_0d1baf4858_h.jpg",
      time: "2 mounth ago",
      totalComment: 10,
      totalLike: 98,
      owner: {
        avatar: "https://idolkart.com/cdn/shop/articles/Krishna_ke_Naam.jpg?v=1700290012&width=1500",
        username: "hardip22",
      }
    },
    {
      title: "hello developer",
      content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.Obcaecati neque molestias sunt corrupti? Hic voluptas illum corporis, unde beatae fuga.",
      image: "https://idolkart.com/cdn/shop/articles/Krishna_ke_Naam.jpg?v=1700290012&width=1500",
      time: "2 minut ago",
      totalComment: 3,
      totalLike: 34,
      owner: {
        avatar: "https://live.staticflickr.com/4021/4254050437_0d1baf4858_h.jpg",
        username: "renish01",
      }
    }
  ]
  return (
    <div className='sm:max-h-[90vh] z-0 sm:overflow-y-auto'>
      {posts?.map((post) => (
        <div key={post.title}
          className='flex flex-col justify-center border-y border-slate-600 p-5 text-white bg-black'>
          <PostCart {...post} />
          <div className='flex items-center gap-2 m-4'>
          <Button className='p-1 hover:text-red-500' onClick={() => setIsLikeOpen(!isLikeOpen)}>
            <FontAwesomeIcon icon={faHeart} />
          </Button>
            <span className='text-[13px] '>{post.totalLike}</span>
          <Button className='p-1' onClick={() => setIsCommentOpen(!isCommentOpen)}>
            <FontAwesomeIcon icon={faComment} />
          </Button>
          <span className='text-[13px]'>{post.totalComment}</span>
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
      ))

      }
    </div>

  )
}

export default ForYouFeed
