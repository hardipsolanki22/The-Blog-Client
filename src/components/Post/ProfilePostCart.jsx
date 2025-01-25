import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { faComment, faEdit, faHeart } from '@fortawesome/free-regular-svg-icons';
import { faRemove } from '@fortawesome/free-solid-svg-icons';
import { useQueryClient } from '@tanstack/react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef } from 'react';
import { Oval } from 'react-loader-spinner';

import { axiosInstance } from '../../Helpers/axiosService'
import { useToast } from '../../Helpers/toast'
import Button from '../Atoms/Button'
import Like from '../Like/Like';
import Comment from '../Comment/Comment';
import deletePost from '../Api/PostApi/deletePost';
import { useTheme } from '../Contexts/theme';

function ProfilePostCart({
    _id,
    owner,
    title,
    content,
    image,
    likesCount,
    commentsCount,
    isLiked,
}) {

    const [isPostLikeLoading, setIsPostLikeLoading] = useState(false)
    const [isPostDeleteLoading, setIsPostDeleteLoading] = useState(false)
    const [isLikeOpen, setIsLikeOpen] = useState(false)
    const [isCommentOpen, setIsCommentOpen] = useState(false)
    const [isDotOpen, setIsDotOpen] = useState(false)
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const containerRef = useRef(null)

    const userData = useSelector(state => state.auth.userData)
    const isAuth = userData && owner ? owner === userData._id : false

    const handleClickOutSide = () => {
        if (containerRef.current && !containerRef.current.contains(event.target)) {
            setIsDotOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutSide)
        return () => {
            document.removeEventListener("mousedown", handleClickOutSide)
        }
    }, [])

    // Post Like Handler
    const hanldePostLike = async (postId) => {
        try {
            setIsPostLikeLoading(true)
            const response = await axiosInstance.post(`/like/create-like/${postId}`)
            queryClient.invalidateQueries(["posts", { owner }])
            if (response.data.data.like) {
                useToast.successToast("😘 Liked Successfully")
            } else {
                useToast.successToast("😒 Unliked Successfully")
            }
        } catch (error) {
            console.error(error.message);


        } finally {
            setIsPostLikeLoading(false)
        }
    }

    // Post Delete Handler
    const handlePostDelete = async (postId) => {
        try {
            setIsPostDeleteLoading(true)
            const respose = await deletePost(postId)
            if (respose) {
                queryClient.invalidateQueries(["posts", { owner }]);
                setIsDotOpen(false)
                useToast.successToast("😒 Post delete successfully")
            }
        } catch (error) {
            console.error(error.message);
        } finally {
            setIsPostDeleteLoading(false)
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

    const { themeMode } = useTheme()

    return (
        <div className='h-auto flex-col justify-center items-center p-8 mb-4 border-t border-slate-600 '>
            {isAuth && <div className='flex justify-end items-center mr-4'>
                <p className={`text-[2rem] ${themeMode ? 'text-white' : 'text-slate-800'} block cursor-pointer
                                       ${isDotOpen && "hidden"}`}
                    onClick={() => setIsDotOpen(true)}>
                    &hellip;
                </p>
                {isDotOpen &&
                    <div ref={containerRef}
                        className={`flex flex-col justify-center items-center gap-5 ${themeMode ? 'dark' : 'light'}
                                top-3 border relative rounded-lg border-violet-600 p-5 mb-2`}
                    >
                        <Button
                            onClick={() => navigate(`/edit-posts/${_id}`)}
                            className='p-2 focus:outline-none'
                        >
                            <FontAwesomeIcon icon={faEdit} />
                            <span className='ml-2'>Edit</span>
                        </Button>
                        <Button
                            onClick={() => handlePostDelete(_id)}
                            className='p-2 focus:outline-none'
                            disabled={isPostDeleteLoading}
                        >
                            {!isPostDeleteLoading &&
                                <FontAwesomeIcon icon={faRemove}
                                    className='mr-2'
                                />}
                            {
                                isPostDeleteLoading ?
                                    <Oval
                                        height={23}
                                        width={23}
                                        color='black'
                                        secondaryColor='white'
                                        strokeWidth={5}
                                        strokeWidthSecondary={5}
                                    />

                                    :
                                    "Delete"
                            }
                        </Button>
                    </div>
                }
            </div>}
            <div className='flex flex-col justify-center items-center'>
                <div className='p-2'>
                    <img
                        src={image}
                        className='rounded-md'
                        loading='lazy'
                        alt="post" />
                </div>
                <div className='flex flex-col w-full h-auto gap-4 mt-2 ml-4 overflow-hidden'>
                    <p className='break-words'>{title}</p>
                    <p className='break-words'>{content}</p>
                </div>
            </div>
            <div className='flex items-center gap-2 mt-3 mb-4 ml-2'>
                <button
                    onClick={() => hanldePostLike(_id)}
                    className={`${isLiked && 'text-pink-600'} transition-all duration-200
                 hover:text-pink-600 border-none p-1 rounded-full focus:outline-none
                 bg-inherit`}
                    disabled={isPostLikeLoading}
                >
                    <FontAwesomeIcon
                        icon={faHeart}
                    />
                </button>

                <span onClick={() => setIsLikeOpen(!isLikeOpen)}
                    className={`text-[13px] cursor-pointer ${isLiked && 'text-pink-600'} `}
                >
                    {likesCount}
                </span>
                <button onClick={() => setIsCommentOpen(!isCommentOpen)}
                    className='p-1 bg-inherit focus:outline-none'>
                    <FontAwesomeIcon icon={faComment} />
                </button>
                <span className='text-[13px]' >
                    {commentsCount}
                </span>
            </div>
            {isLikeOpen &&
                <div className='fixed sm:static top-0 left-0 right-0 bottom-0 flex justify-center
       items-center bg-black bg-opacity-75 sm:bg-opacity-0 z-10 '>
                    <Like likeState={handleLikeState} postId={_id} />
                </div>
            }
            {isCommentOpen &&
                <div className='fixed sm:static top-0 left-0 right-0 bottom-0 flex justify-center
       items-center bg-black bg-opacity-75 sm:bg-opacity-0 z-10 '>
                    <Comment commentState={handleCommentSate} postId={_id} />
                </div>
            }
        </div>

    )
}

export default ProfilePostCart
