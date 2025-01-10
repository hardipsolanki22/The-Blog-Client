import React, { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer'

import Button from '../Atom/Button'
import { useToast } from '../../Helper/toast';
import fetchUserProfile from '../Api/UserApi/fetchProfile'
import fetchUserPosts from '../Api/PostApi/fetchUserPosts';
import { axiosInstance } from '../../Helper/axiosService';
import ProfilePostCart from '../Post/ProfilePostCart';

function Profile() {

    const navigate = useNavigate()
    const { username } = useParams()

    const [isFollowed, setIsFollowed] = useState(null)
    const [isFollowedLoading, setIsFollowedLoading] = useState(false)

    const userData = useSelector(state => state.auth.userData)

    // Fetch User Profile
    const { data: user, isLoading} = useQuery({
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
            queryKey: ["posts", { username: user?.data._id }],
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
            setIsFollowed(response.data.data.following)
            if (response.data.data.following) {
                useToast.successToast("Follow successfully")
            } else {
                useToast.successToast("Unfollow successfully")
            }
        } catch (error) {
            throw console.error(error.message)
        } finally {
            setIsFollowedLoading(false)
        }
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
                  <div className='bg-black text-white h-auto'  key={post._id}>
                      <ProfilePostCart {...post}/>
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
