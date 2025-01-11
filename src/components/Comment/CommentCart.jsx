import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-regular-svg-icons'
import { faRemove } from '@fortawesome/free-solid-svg-icons/faRemove';
import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import Button from '../Atoms/Button';
import deleteComment from '../Api/Comment/deleteComment';
import { useToast } from '../../Helpers/toast'
import { useQueryClient } from '@tanstack/react-query';
import likeDislikeComment from '../Api/LikeApi/likeDislikeComment';

function CommentCart({
    _id,
    content,
    owner,
    commentlikesCount,
    commentDislikesCount,
    isCommentLike,
    isCommentDisLike

}) {

    const [isDotOpen, setIsDotOpen] = useState(false)
    const userData = useSelector(state => state.auth.userData)
    const queryClient = useQueryClient()

    const isAuth = userData && owner ? userData._id === owner._id : false

    // Like-Dislike Comment
    const { mutateAsync } = useMutation({
        mutationFn: likeDislikeComment,
        onSuccess: (response) => {
            queryClient.invalidateQueries(["comments"])
        },
        onError: (error) => {
            useToast.errorToast(error.message)
        }
    })

    // Delete Comment
    const handleCommentDelete = async (commentId) => {
        const response = await deleteComment(commentId)
        if (response) {
            setIsDotOpen(false)
            queryClient.invalidateQueries(["comments"])
            useToast.successToast("Delete comment successfully")
        }
    }



    return (
        <div className='flex justify-around w-full'>
            <Link to={`/profile/${owner.username}`}
                className=" mt-1 mr-4  no-underline">
                <img src={owner.avatar}
                    alt="Avatar"
                    className='w-10 h-10 rounded-full'
                />
            </Link>
            <div className="flex-1">
                <div className="flex items-center justify-between">
                    <div>
                        <span className="font-semibold">{owner.username}</span>
                        <span className="text-gray-500 text-[13px] ml-2">2 month ago</span>
                    </div>
                </div>
                <div className="">
                    <p>{content}</p>
                </div>
                <div className="flex mt-[3px] items-center text-gray-500">
                    <button onClick={async () => await mutateAsync({ commentId: _id, type: "LIKE" })}
                        className={`hover:text-blue-500 p-2 ${isCommentLike ? 'text-black' : ''} border-none focus:outline-none`}>
                        <FontAwesomeIcon icon={faThumbsUp} />
                    </button>

                    <span className='text-[13px]'>{commentlikesCount}</span>
                    <button onClick={async () => await mutateAsync({ commentId: _id, type: "DISLIKE" })}
                        className={`hover:text-red-500 p-2 ${isCommentDisLike ? 'text-black' : ''} border-none focus:outline-none`}>
                        <FontAwesomeIcon icon={faThumbsDown} />
                    </button>
                    <span className='text-[13px]'>{commentDislikesCount}</span>
                </div>
            </div>
            {isAuth &&
                <div className='mr-3 '>
                    <p className={`text-[2rem] text-black block cursor-pointer
                                 ${isDotOpen && "hidden"}`}
                        onClick={() => setIsDotOpen(true)}>
                        ...
                    </p>
                </div>
            }
            {isDotOpen &&
                <div className='duration-500 flex flex-col justify-center items-center gap-5
                           top-3 border relative rounded-lg mb-2'>
                    <Button
                        onClick={() => handleCommentDelete(_id)}
                        className=' p-3 border-none'
                        bgColor=' bg-slate-300'
                        textColor='text-black'>
                        <FontAwesomeIcon icon={faRemove} />
                        <span className='ml-2'>Delete</span>
                    </Button>
                </div>
            }
        </div>
    )
}

export default CommentCart
