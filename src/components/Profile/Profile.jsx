import React, { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { faComment, faHeart, faEdit, } from '@fortawesome/free-regular-svg-icons';
import { faRemove } from '@fortawesome/free-solid-svg-icons/faRemove';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { useQuery, useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer'

import Button from '../Atom/Button'
import Like from '../Like/Like';
import Comment from '../Comment/Comment';
import { useToast } from '../../Helper/toast';
import fetchUserProfile from '../Api/UserApi/fetchProfile'
import deletePost from '../Api/PostApi/deletePost';
import fetchUserPosts from '../Api/PostApi/fetchUserPosts';
import { axiosInstance } from '../../Helper/axiosService';

function Profile() {

    const navigate = useNavigate()
    const { username } = useParams()

    const [isCommentOpen, setIsCommentOpen] = useState(false)
    const [isLikeOpen, setIsLikeOpen] = useState(false)
    const [isDotOpen, setIsDotOpen] = useState(false)
    const [isFollowed, setIsFollowed] = useState(null)
    const [isFollowedLoading, setIsFollowedLoading] = useState(false)
    const queryClient = useQueryClient()

    const userData = useSelector(state => state.auth.userData)

    // Fetch User Profile
    const { data: user, isLoading, isError } = useQuery({
        queryFn: () => fetchUserProfile(username),
        queryKey: ["users", { username }],
    })
   
    const isAuth = user && userData ? user?.data._id === userData._id : false

    useEffect(() => {
        if (user) {
            setIsFollowed(user?.data.isFollowed);
        }
    }, [user]);
    const userId = user?.data._id

    // Infinite Scrolling
    const MAX_PAGE_POST = 2
    const { data: posts, hasNextPage, fetchNextPage, isFetchingNextPage } =
        useInfiniteQuery({
            queryKey: ["posts", { username: user?.data.username }],
            queryFn: ({ pageParam }) => fetchUserPosts({ pageParam }, userId),
            refetchOnWindowFocus: false,
            enabled: !!user,
            staleTime: 3000,
            getNextPageParam: (lastPage, allPages) => {
                return lastPage.data.length === MAX_PAGE_POST ? allPages.length + 1 : undefined;
            },


        })

    const { ref, inView } = useInView({
        threshold: 0,
    });

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage()
        }
    }, [inView, hasNextPage, fetchNextPage])

    // FollowUnfollow Handler
    const handleFollowUnfollow = async (userId) => {
        try {
            setIsFollowedLoading(true)
            const response = await axiosInstance.post(`/subcriptions/${userId}/following`)        
            console.log(`response: ${JSON.stringify(response)}`);
            if (response) {
                setIsFollowed(response.data.data.following)
                
            }
        } catch (error) {
            throw console.error(error.message)
        } finally {
            setIsFollowedLoading(false)
        }
    }

    // Post Delete Handler
    const handlePostDelete = async (postId) => {
        try {
            const respose = await deletePost(postId)
            if (respose) {
                useToast.successToast("Post delete successfully")
                navigate(`/profile/${username}`)
                queryClient.invalidateQueries(["posts", { username }]);
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

    if (isError) {
        useToast.errorToast(isError)
    }



    return (
        !isLoading ? (<div className='sm:col-span-11 md:col-span-6 max-h-screen sm:overflow-y-auto gap-4
            border-y '>
            <div className='flex gap-4 ml-4 mt-4 mb-1'>
                <Link to={"/"}
                    className='text-white'>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </Link>
                <div>
                    <p className='text-white text-2xl'>@{user.data.name}</p>
                    <p className='text-slate-400'>{user.data.username}</p>
                </div>
            </div>
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
                    <Button className='' 
                    onClick={() => handleFollowUnfollow(userId)}
                    disabled={isFollowedLoading}
                    >
                       {isFollowed ? "Unfollow" : "Follow"}
                    </Button>
                </div>)}
            <div className='p-4'>
                <h1 className='text-xl font-bold'>@{user.data.name}</h1>
                <p className='text-gray-400'>{user.data.username}</p>
            </div>
            <div className='flex p-4 border-b gap-4 border-slate-600'>
                <Link to={`/${user.data.username}/${user.data._id}/followers`}
                    className='text-center'>
                    <p className='font-bold cursor-pointer'>{user.data.followersCount}</p>
                    <p className='text-gray-400'>Followers</p>
                </Link>
                <Link to={`/${user.data.username}/${user.data._id}/following`}
                    className='text-center'>
                    <p className='font-bold cursor-pointer'>{user.data.followingsCount}</p>
                    <p className='text-gray-400'>Following</p>
                </Link>
            </div>
            <div>
                <div className='flex justify-center items-center m-4'>
                    <Button>
                        Posts
                    </Button>
                </div>
            </div>
            {posts?.pages.map((page) => (
                page.data?.map((post) => (
                    <div className='flex justify-center items-center border-y border-slate-600'>
                        <div className='flex-col justify-center items-center p-8 text-white bg-black'>
                            {isAuth && <div className='flex justify-end items-end mr-4'>
                                <p className={`text-[2rem] text-slate-300 block cursor-pointer
                                 ${isDotOpen === post._id && "hidden"}`}
                                    onClick={() => setIsDotOpen(post._id)}>
                                    ...
                                </p>
                                {isDotOpen == post._id &&
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
                            </div>}
                            <div className='flex flex-col overflow-hidden'>
                                <div className='m-2 flex flex-col justify-center items-center'>
                                    <div className='p-2 rounded-md'>
                                        <img src={post.image}
                                            alt="post"
                                        />
                                    </div>
                                    <div className='w-full pl-2 flex flex-col justify-cente gap-4 m-2 overflow-x-hidden'>
                                        <p className='break-words'>{post.title}</p>
                                        <p className='break-words'>{post.content}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='flex items-center ml-4'>
                                <Button className='p-1 hover:text-red-500'>
                                    <FontAwesomeIcon icon={faHeart} />
                                </Button>
                                <span className='text-[13px] mr-2 cursor-pointer'
                                    onClick={() => setIsLikeOpen(!isLikeOpen)}>
                                    {post.likesCount}
                                </span>
                                <Button className='p-1'>
                                    <FontAwesomeIcon icon={faComment} />
                                </Button>
                                <span className='text-[13px] cursor-pointer'
                                    onClick={() => setIsCommentOpen(!isCommentOpen)}>
                                    {post.commentsCount}
                                </span>
                            </div>
                            {isLikeOpen &&
                                <div className='w-full h-full flex justify-center items-center'>
                                    <Like likeState={handleLikeState} />
                                </div>
                            }
                            {isCommentOpen &&
                                <div className='w-full flex justify-center items-center'>
                                    <Comment commentState={handleCommentSate} />
                                </div>
                            }
                        </div>
                    </div>
                ))
            ))}
            <div ref={ref} className='p-4 rounded-3xl bg-slate-700'>
                {isFetchingNextPage ?
                    "Loading More" :
                    hasNextPage ?
                        "Scroll down to load more" :
                        "No more Posts"
                }
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
