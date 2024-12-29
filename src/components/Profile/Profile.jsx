import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { faComment, faHeart, faEdit, } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import Button from '../Atom/Button'
import Like from '../Like/Like';
import Comment from '../Comment/Comment';
import { faRemove } from '@fortawesome/free-solid-svg-icons/faRemove';

function Profile() {

    const navigate = useNavigate()

    const [isCommentOpen, setIsCommentOpen] = useState(false)
    const [isLikeOpen, setIsLikeOpen] = useState(false)
    const [isDotOpen, setIsDotOpen] = useState(false)


    return (
        <div className='sm:col-span-11 md:col-span-6 max-h-screen sm:overflow-y-auto gap-4
         bg-black text-white border-y border-slate-600'>
            <div className='relative'>
                <img
                    src="https://live.staticflickr.com/4021/4254050437_0d1baf4858_h.jpg"
                    alt="coverImage"
                    className='w-full sm:h-48 h-40 object-cover bg-slate-700'
                />
                <img
                    src="https://idolkart.com/cdn/shop/articles/Krishna_ke_Naam.jpg?v=1700290012&width=1500"
                    alt="avatar"
                    className='sm:w-36 sm:h-36 h-28 w-28 rounded-full absolute left-8 bottom-0 transform translate-y-1/2 border-4 border-black'
                />
            </div>
            <div className='flex justify-end p-4'>
                <Button className='' onClick={() =>navigate("/edit-profile") }>
                    Edit
                </Button>
            </div>
            <div className='p-4'>
                <h1 className='text-xl font-bold'>Hardip Solanki</h1>
                <p className='text-gray-400'>@devhardip22</p>
            </div>
            <div className='flex p-4 border-b gap-4 border-slate-600'>
                <div className='text-center'>
                    <p className='font-bold'>100</p>
                    <p className='text-gray-400'>Followers</p>
                </div>
                <div className='text-center'>
                    <p className='font-bold'>200</p>
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
                            <FontAwesomeIcon icon={faEdit}/>
                            <span className='ml-2'>Edit</span>
                        </Button>
                        <Button  
                        className='p-2'
                        bgColor='bg-black'
                        textColor='text-white'>
                            <FontAwesomeIcon icon={faRemove}/>
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
                        <Button className='p-1 hover:text-red-500' onClick={() => setIsLikeOpen(!isLikeOpen)}>
                            <FontAwesomeIcon icon={faHeart} />
                        </Button>
                        <span className='text-[13px] mr-2'>10</span>
                        <Button className='p-1' onClick={() => setIsCommentOpen(!isCommentOpen)}>
                            <FontAwesomeIcon icon={faComment} />
                        </Button>
                        <span className='text-[13px]'>10</span>
                    </div>
                    {isLikeOpen &&
                        <div>
                            <Like />
                        </div>
                    }
                    {isCommentOpen &&
                        <div>
                            <Comment />
                        </div>
                    }
                </div>
            </div>

            {/* <div className='flex justify-center items-center w-full p-6'>
                <p>No Posts</p>
            </div> */}
        </div>
    )
}

export default Profile
