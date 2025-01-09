import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-regular-svg-icons'
import { faRemove } from '@fortawesome/free-solid-svg-icons/faRemove';
import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import Button from '../Atom/Button';
import deleteComment from '../Api/Comment/deleteComment';
import {useToast} from '../../Helper/toast'
import { useQueryClient } from '@tanstack/react-query';
import likeDislikeComment from '../Api/LikeApi/likeDislikeComment';

function CommentCart({ 
    _id,
    content,
    owner,
    commentlikesCount,
    commentDislikesCount

 }) {
    console.log(`is: ${_id}`);
    
    const [isDotOpen, setIsDotOpen] = useState(false)
    const [isCommentLike, setIsCommentLike] = useState(null)
    const [isCommentDisLike, setIsCommentDisLike] = useState(null)
    const userData = useSelector(state => state.auth.userData)
    const queryClient = useQueryClient()

    const isAuth = userData && owner ? userData._id === owner._id : false

    // Like Comment
    const { mutateAsync} = useMutation({
        mutationFn: likeDislikeComment,
        onSuccess: (response) => {
            if (response.data.commentLike) {
                setIsCommentLike(response.data.commentLike)
                useToast.successToast("Like successfully")                
            }
            if (response.data.commentDisLike) {
                setIsCommentDisLike(response.data.commentDisLike)
                useToast.successToast("Dislike successfully")                
            }
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
                    className='w-12 h-12 rounded-full'
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
                    <button onClick={async() => await mutateAsync({commentId: _id, type: "LIKE"})} 
                    className="hover:text-blue-500 p-2">
                        <FontAwesomeIcon 
                        icon={faThumbsUp} 
                        className={`${isCommentLike && "bg-black"}`}
                        />
                    </button>
                    <span className='text-[13px]'>{commentlikesCount}</span>
                    <button onClick={async() => await mutateAsync({commentId: _id, type: "DISLIKE"})} 
                    className="hover:text-red-500 p-2">
                        <FontAwesomeIcon 
                        icon={faThumbsDown}
                        className={`${isCommentDisLike && "bg-black"}`}
                         />
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
                        className='border-none p-2'
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
