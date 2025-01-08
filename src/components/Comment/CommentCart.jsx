import React, { useState } from 'react'
import { useSelector } from 'react-redux'

function CommentCart({
    _id,
    avatar,
    username,
    content,
    commentLikesCount,
    commentDisLikesCount

}) {
    const [isDotOpen, setIsDotOpen] = useState(false)
    const userData = useSelector(state => state.auth.userData)

    const isAuth = userData && _id ? userData._id === _id : false


    return (
        <div className='flex items-start justify-around'>
            <div className="mr-4 w-12 h-12 rounded-2xl">
                <img src={avatar} alt="Avatar" />
            </div>
            <div className="flex-1">
                <div className="flex items-center justify-between">
                    <div>
                        <span className="font-semibold">{username}</span>
                        <span className="text-gray-500 text-[13px] ml-2">2 month ago</span>
                    </div>
                </div>
                <div className="">
                    <p>{content}</p>
                </div>
                <div className="flex mt-[3px] items-center text-gray-500">
                    <button className="hover:text-blue-500 p-2">
                        <FontAwesomeIcon icon={faThumbsUp} />
                    </button>
                    <span className='text-[13px]'>{commentLikesCount}</span>
                    <button className="hover:text-red-500 p-2">
                        <FontAwesomeIcon icon={faThumbsDown} />
                    </button>
                    <span className='text-[13px]'>{commentDisLikesCount}</span>
                </div>
            </div>
            {isAuth && <div className='flex justify-end items-end mr-4'>
                <p className={`text-[2rem] text-slate-300 block cursor-pointer
                                 ${isDotOpen && "hidden"}`}
                    onClick={() => setIsDotOpen(true)}>
                    ...
                </p>
            </div>
            }
            {isDotOpen &&
                <div className='flex flex-col justify-center items-center gap-5
                           top-3 border relative rounded-lg border-slate-600 p-5 mb-2'>
                    <Link
                        to={`/edit-posts/${post._id}`}
                        className='p-2 text-white no-underline'
                    >
                        <FontAwesomeIcon icon={faEdit} />
                        <span className='ml-2'>Edit</span>
                    </Link>
                    <Button
                        onClick={() => handlePostDelete(post._id)}
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

export default CommentCart
