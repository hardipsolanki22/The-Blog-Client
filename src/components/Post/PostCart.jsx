import React, { useEffect, useState } from 'react'
import { faComment, faHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import { Link } from 'react-router-dom'
import Button from '../Atoms/Button'
import Comment from '../Comment/Comment'
import Like from '../Like/Like'
import { useToast } from '../../Helpers/toast';
import { axiosInstance } from '../../Helpers/axiosService';
import { formateRelative } from '../../Helpers/formatRelative';

function PostCart({
  _id,
  title,
  content,
  owner,
  time,
  image,
  likesCount,
  commentsCount,
  isLike,
  createdAt
}) {

  const [isPostLike, setIsPostLike] = useState(isLike)
  const [totalLike, setTotalLike] = useState(likesCount)
  const [isLoading, setIsLoading] = useState(false)
  const [isLikeOpen, setIsLikeOpen] = useState(false)
  const [isCommentOpen, setIsCommentOpen] = useState(false)

  useEffect(() => {
    setIsPostLike(isLike)
    setTotalLike(likesCount)
  }, [isLike])

  // PostLikeHandler
  const hanldePostLike = async (postId) => {
    try {
      setIsLoading(true)
      const response = await axiosInstance.post(`/like/create-like/${postId}`)
      setIsPostLike(response.data.data.like)
      if (response.data.data.like) {
        setTotalLike((prevLike) => prevLike + 1)
        useToast.successToast("Liked Successfully")
      } else {
        setTotalLike((prevLike) => prevLike - 1)
        useToast.successToast("Unliked Successfully")
      }
    } catch (error) {
      useToast.errorToast(error.message)

    } finally {
      setIsLoading(false)
    }
  }


  // Toggle Like
  const handleLikeState = (data) => {
    setIsLikeOpen(data)
  }

  // Toggle Comment
  const handleCommentSate = (data) => {
    setIsCommentOpen(data)
  }

  return (
    <div className='flex-col justify-center items-center'>
      <div className='flex items-center text-white '>
        <Link  to={`/profile/${owner.username}`}
        className=' mx-2 flex justify-center items-center'>
          <img src={owner.avatar}
            alt="hardip"
            className='rounded-full w-10 h-10'
          />
        </Link>
        <p className='mr-2'>{owner.username}</p>
        <p className='text-gray-500 text-[13px]'>{formateRelative(createdAt)}</p>
      </div>
      <div className='flex flex-col justify-center items-center'>
        <div className='p-2'>
          <img
            src={image}
            className='rounded-md'
            alt="post" />
        </div>
        <div className='flex flex-col w-full h-auto gap-4 mt-2 ml-4 overflow-hidden'>
          <p className='break-words'>{title}</p>
          <p className='break-words'>{content}</p>
        </div>
      </div>
      <div className='flex items-center gap-2 mt-3 ml-2'>
        <Button onClick={() => hanldePostLike(_id)}
          className={` ${isPostLike ? "bg-red-500 text-white" : "bg-white text-black"}
            border-none p-1 rounded-full focus:outline-none`}
          bgColor=""
          textColor=''
          disabled={isLoading}
        >
          <FontAwesomeIcon
            icon={faHeart}
            className={`text-lg hover:text-red-500 transition-all duration-200 `}
          />
        </Button>

        <span onClick={() => setIsLikeOpen(!isLikeOpen)}
          className='text-[13px] cursor-pointer'
        >
          {totalLike}
        </span>
        <Button onClick={() => setIsCommentOpen(!isCommentOpen)}
          className='p-1 border-none'>
          <FontAwesomeIcon icon={faComment} />
        </Button>
        <span className='text-[13px]' >
          {commentsCount}
        </span>
      </div>
      {isLikeOpen &&
        <div className='fixed sm:sticky top-0 left-0 right-0 bottom-0 flex justify-center
       items-center bg-black bg-opacity-75 z-10 '>
          <Like likeState={handleLikeState} postId={_id} />
        </div>
      }
      {isCommentOpen &&
        <div className='fixed sm:sticky top-0 left-0 right-0 bottom-0 flex justify-center
       items-center bg-black bg-opacity-75 z-10 '>
          <Comment commentState={handleCommentSate} postId={_id} />
        </div>
      }
    </div>

  )
}

export default PostCart

