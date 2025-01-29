import React, { useState, useEffect, useRef } from 'react'
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'


import likeDislikeTweet from '../Api/LikeApi/likeDislikeTweet'
import deleteTweet from '../Api/Tweet/deleteTweet'
import { useToast } from '../../Helpers/toast'
import Button from '../Atoms/Button'
import { faRemove } from '@fortawesome/free-solid-svg-icons'
import { formateRelative } from '../../Helpers/formatRelative'

function TweetCart({
    _id,
    content,
    owner,
    isTweetLike,
    isTweetDisLike,
    tweetLikeCount,
    tweetDisLikeCount,
    createdAt
}) {

    const userData = useSelector((state) => state.auth.userData)
    const [isDotOpen, setIsDotOpen] = useState(false)
    const queryClient = useQueryClient()
    const containerRef = useRef(null)

    const isAuth = userData && owner ? owner._id === userData._id : false

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

    // Like-Dislike Tweet
    const { mutateAsync } = useMutation({
        mutationFn: likeDislikeTweet,
        onSuccess: () => {
            queryClient.invalidateQueries(["tweets"])
        },
        onError: (error) => {
            useToast.errorToast(error.message)
        }
    })

    // Delete Tweet
    const handleTweetDelete = async (tweetId) => {
        try {
            const response = await deleteTweet(tweetId)
            if (response) {
                setIsDotOpen(false)
                queryClient.invalidateQueries(["tweets"])
                useToast.successToast("😒 " + response.message)
            }
        } catch (error) {
            useToast.errorToast(error.message)
        }
    }

    return (
        <div className='flex flex-col relative p-9 h-auto '>
            <div
                className='flex items-center'>
                <Link to={`/${owner.username}`}
                    className=' mx-2 flex justify-center items-center'>
                    <img src={owner.avatar}
                        alt="hardip"
                        loading='lazy'
                        className='rounded-full w-10 h-10'
                    />
                </Link>
                <p className='mr-2'>
                    {owner.username}
                </p>
                <p className='text-gray-500 text-[13px]'>
                    {formateRelative(createdAt)}
                </p>
            </div>
            <div className='ml-4 mt-4 flex overflow-hidden w-full'>
                <p className='break-words'>
                    {content}
                </p>
            </div>
            <div className="ml-4 flex items-center text-gray-500">
                <button onClick={async () => await mutateAsync({ tweetId: _id, type: "LIKE" })}
                    className={`hover:text-blue-500 p-2 
                    bg-inherit focus:outline-none`}>
                    <FontAwesomeIcon icon={faThumbsUp} 
                    color={`${isTweetLike && 'blue'}`} />
                </button>

                <span className='text-[13px]'>{tweetLikeCount}</span>
                <button onClick={async () => await mutateAsync({ tweetId: _id, type: "DISLIKE" })}
                    className={`hover:text-red-500 p-2 
                       bg-inherit border-none focus:outline-none`}>
                    <FontAwesomeIcon icon={faThumbsDown}
                     className={`${isTweetDisLike && 'text-red-500'}`}
                     />
                </button>
                <span className='text-[13px]'>{tweetDisLikeCount}</span>
            </div>
            {isAuth && <div className='w-full flex justify-end mr-4'>
                <p className={`text-[2rem] block cursor-pointer
                      ${isDotOpen && "hidden"}`}
                    onClick={() => setIsDotOpen(true)}>
                    &hellip;
                </p>
            </div>
            }
            {isDotOpen &&
                <div ref={containerRef}
                    className='absolute right-0 bottom-0 sm:bottom-auto p-2 sm:right-1
                    sm:top-0 rounded-lg'>
                    <Button onClick={() => handleTweetDelete(_id)}
                        className='focus:outline-none'
                    >
                        <FontAwesomeIcon icon={faRemove} />
                        <span className='ml-2'>Delete</span>
                    </Button>
                </div>
            }
        </div>
    )
}

export default TweetCart
