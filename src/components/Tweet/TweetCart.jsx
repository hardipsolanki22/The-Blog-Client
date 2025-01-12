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

function TweetCart({
    _id,
    content,
    owner,
    isTweetLike,
    isTweetDisLike,
    tweetLikeCount,
    tweetDisLikeCount,
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
                useToast.successToast("Delete tweet successfully")
            }
        } catch (error) {
            useToast.errorToast(error.message)
        }
    }

    return (
        <div className='flex flex-col'>
            <Link to={`/profile/${owner.username}`}
                className='flex items-center text-white '>
                <div className=' mx-2 flex justify-center items-center'>
                    <img src={owner.avatar}
                        alt="hardip"
                        className='rounded-full w-10 h-10'
                    />
                </div>
                <p className='mr-2'>
                    {owner.username}
                </p>
                <p className='text-gray-500 text-[13px]'>
                    Just now
                </p>
            </Link>
            <div className='ml-4 mt-4 flex overflow-hidden w-full'>
                <p className='break-words'>
                    {content}
                </p>
            </div>
            <div className="ml-4 flex items-center text-gray-500">
                <button onClick={async () => await mutateAsync({ tweetId: _id, type: "LIKE" })}
                    className={`hover:text-blue-500 p-2 ${isTweetLike ? 'text-blue-500' : ''}
                        bg-black border-none focus:outline-none`}>
                    <FontAwesomeIcon icon={faThumbsUp} />
                </button>

                <span className='text-[13px]'>{tweetLikeCount}</span>
                <button onClick={async () => await mutateAsync({ tweetId: _id, type: "DISLIKE" })}
                    className={`hover:text-red-500 p-2 ${isTweetDisLike ? 'text-red-500' : ''}
                        bg-black border-none focus:outline-none`}>
                    <FontAwesomeIcon icon={faThumbsDown} />
                </button>
                <span className='text-[13px]'>{tweetDisLikeCount}</span>
            </div>
            {isAuth && <div className='w-full flex text-white justify-end mr-4'>
                <p className={`text-[2rem] block cursor-pointer
                      ${isDotOpen && "hidden"}`}
                    onClick={() => setIsDotOpen(true)}>
                    ...
                </p>
            </div>
            }
            {isDotOpen &&
                <div ref={containerRef}
                    className='flex justify-center items-center
                                border rounded-lg border-slate-600 p-2 mb-1'>
                    <Button
                        onClick={() => handleTweetDelete(_id)}
                        className='p-2'
                        bgColor='bg-black'
                        textColor='text-white'>
                        <FontAwesomeIcon icon={faRemove} />
                        <span className='ml-2'>Delete</span>
                    </Button>
                </div>
            }
        </div>
    )
}

export default TweetCart
