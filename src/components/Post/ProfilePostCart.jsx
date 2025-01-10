import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { faComment, faEdit, faHeart } from '@fortawesome/free-regular-svg-icons';
import { faRemove } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { axiosInstance } from '../../Helper/axiosService'
import { useToast } from '../../Helper/toast'
import Button from '../Atom/Button'
import Like from '../Like/Like';
import Comment from '../Comment/Comment';
import deletePost from '../Api/PostApi/deletePost';
import { useQueryClient } from '@tanstack/react-query';

function ProfilePostCart({
    _id,
    owner,
    title,
    content,
    image,
    likesCount,
    commentsCount,
    isLiked
}) {

    const [isPostLike, setIsPostLike] = useState(isLiked)
    const [totalLike, setTotalLike] = useState(likesCount)
    const [isLoading, setIsLoading] = useState(false)
    const [isLikeOpen, setIsLikeOpen] = useState(false)
    const [isCommentOpen, setIsCommentOpen] = useState(false)
    const [isDotOpen, setIsDotOpen] = useState(false)
    const queryClient = useQueryClient()

    const userData = useSelector(state => state.auth.userData)
    const isAuth = userData && owner ? owner === userData._id : false

    useEffect(() => {
        setIsPostLike(isLiked)
        setTotalLike(likesCount)
    }, [isLiked])

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

    // Post Delete Handler
    const handlePostDelete = async (postId) => {
        try {
            const respose = await deletePost(postId)
            if (respose) {
                queryClient.invalidateQueries(["posts", { owner }]);
                setIsDotOpen(false)
                useToast.successToast("Post delete successfully")
            }
        } catch (error) {
            useToast.errorToast(error.message)
        }
    }

    // Toggle Like 
    const handleLikeState = (data) => {
        setIsLikeOpen(data)
    }

    // Toggale Comment
    const handleCommentSate = (data) => {
        setIsCommentOpen(data)
    }

    return (
        <div className=' h-auto flex-col justify-center items-center p-8 border-y border-slate-600 '>
            {isAuth && <div className='flex justify-end items-end mr-4'>
                <p className={`text-[2rem] text-slate-300 block cursor-pointer
                                       ${isDotOpen && "hidden"}`}
                    onClick={() => setIsDotOpen(true)}>
                    ...
                </p>
                {isDotOpen  &&
                    <div className='flex flex-col justify-center items-center gap-5
                                 top-3 border relative rounded-lg border-slate-600 p-5 mb-2'>
                        <Link
                            to={`/edit-posts/${_id}`}
                            className='p-2 text-white no-underline'
                        >
                            <FontAwesomeIcon icon={faEdit} />
                            <span className='ml-2'>Edit</span>
                        </Link>
                        <Button
                            onClick={() => handlePostDelete(_id)}
                            className='p-2'
                            bgColor='bg-black'
                            textColor='text-white'>
                            <FontAwesomeIcon icon={faRemove} />
                            <span className='ml-2'>Delete</span>
                        </Button>
                    </div>
                }
            </div>}
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
                <div className='flex justify-center items-center transition duration-700'>
                    <Like likeState={handleLikeState} postId={_id} />
                </div>
            }
            {isCommentOpen &&
                <div className='flex justify-center items-center transition ease-in delay-75 duration-500'>
                    <Comment commentState={handleCommentSate} postId={_id} />
                </div>
            }
        </div>

    )
}

export default ProfilePostCart
