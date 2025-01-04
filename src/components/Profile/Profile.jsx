import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { faComment, faHeart, faEdit, } from '@fortawesome/free-regular-svg-icons';
import { faRemove } from '@fortawesome/free-solid-svg-icons/faRemove';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';

import Button from '../Atom/Button'
import Like from '../Like/Like';
import Comment from '../Comment/Comment';
import { axiosInstance } from '../../Helper/axiosService';
import { useToast } from '../../Helper/toast';
import fetchUserProfile from '../Api/UserApi/fetchProfile'

function Profile() {

    const navigate = useNavigate()
    const { username } = useParams()

    const [isCommentOpen, setIsCommentOpen] = useState(false)
    const [isLikeOpen, setIsLikeOpen] = useState(false)
    const [isDotOpen, setIsDotOpen] = useState(false)

    const userData = useSelector(state => state.auth.userData)

    const { data: user, isLoading, isError } = useQuery({
        queryFn: () => fetchUserProfile(username),
        queryKey: ["users", { username }]
    })

    const isAuth = user && userData ? user.data._id === userData._id : false


    const handleLikeState = (data) => {
        setIsLikeOpen(data)
    }
    const handleCommentSate = (data) => {
        setIsCommentOpen(data)
    }

    if (isError) {
        useToast.errorToast(isError)
    }



    return (
        !isLoading ? (<div className='sm:col-span-11 md:col-span-6 max-h-screen sm:overflow-y-auto gap-4
            border-y '>
            <div className='relative'>
                <img
                    src={user.data.coverImage}
                    alt="coverImage"
                    className='w-full sm:h-48 h-40 object-cover bg-slate-700'
                />
                <img
                    src={user.data.avatar}
                    alt="avatar"
                    className='sm:w-36 sm:h-36 h-28 w-28 rounded-full absolute left-8 bottom-0 transform translate-y-1/2 border-4 border-black'
                />
            </div>
            {isAuth ? (<div className='flex justify-end p-4'>
                <Button className='' onClick={() => navigate("/edit-profile")}>
                    Edit
                </Button> </div>) : (<div className='flex justify-end p-4'>
                    <Button className='' onClick={() => navigate("/edit-profile")}>
                        Follow
                    </Button>
                </div>)}
            <div className='p-4'>
                <h1 className='text-xl font-bold'>{user.data.name}</h1>
                <p className='text-gray-400'>{user.data.username}</p>
            </div>
            <div className='flex p-4 border-b gap-4 border-slate-600'>
                <div className='text-center'>
                    <p className='font-bold cursor-pointer'>{user.data.followersCount}</p>
                    <p className='text-gray-400'>Followers</p>
                </div>
                <div className='text-center'>
                    <p className='font-bold cursor-pointer'>{user.data.followingsCount}</p>
                    <p className='text-gray-400'>Following</p>
                </div>
            </div>
            <div>
                <div className='flex justify-center items-center m-4'>
                    <Button>
                        Posts
                    </Button>
                </div>
            </div>
            <div className='flex justify-center items-center border-y border-slate-600'>
                <div className='flex-col justify-center items-center p-8 text-white bg-black'>
                    <div className='flex justify-end items-end mr-4'>
                        <p className={`text-[2rem] text-slate-300 ${isDotOpen && "hidden"} cursor-pointer`}
                            onClick={() => setIsDotOpen((prevValue) => !prevValue)}>
                            ...
                        </p>
                        {isDotOpen &&
                            <div className='flex flex-col justify-center items-center gap-5
                           top-3 border relative rounded-lg border-slate-600 p-5 mb-2'>
                                <Button
                                    className='p-2'
                                    bgColor='bg-black'
                                    textColor='text-white'
                                >
                                    <FontAwesomeIcon icon={faEdit} />
                                    <span className='ml-2'>Edit</span>
                                </Button>
                                <Button
                                    className='p-2'
                                    bgColor='bg-black'
                                    textColor='text-white'>
                                    <FontAwesomeIcon icon={faRemove} />
                                    <span className='ml-2'>Delete</span>
                                </Button>
                            </div>
                        }
                    </div>
                    <div className='flex flex-col'>
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
                    <div className='flex items-center ml-4'>
                        <Button className='p-1 hover:text-red-500'>
                            <FontAwesomeIcon icon={faHeart} />
                        </Button>
                        <span className='text-[13px] mr-2 cursor-pointer'
                            onClick={() => setIsLikeOpen(!isLikeOpen)}>
                            10
                        </span>
                        <Button className='p-1'>
                            <FontAwesomeIcon icon={faComment} />
                        </Button>
                        <span className='text-[13px] cursor-pointer'
                            onClick={() => setIsCommentOpen(!isCommentOpen)}>
                            10
                        </span>
                    </div>
                    {isLikeOpen &&
                        <div>
                            <Like likeState={handleLikeState} />
                        </div>
                    }
                    {isCommentOpen &&
                        <div>
                            <Comment commentState={handleCommentSate} />
                        </div>
                    }
                </div>
            </div>

            {/* <div className='flex justify-center items-center w-full p-6'>
                   <p>No Posts</p>
               </div> */}
        </div>) : (<div className='sm:col-span-11 md:col-span-6 max-h-screen'>
            <h1>Loading... </h1>
        </div>)
    )
}

export default Profile
