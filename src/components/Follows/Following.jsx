import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams, Link } from 'react-router-dom';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

import Button from '../Atoms/Button.jsx';
import fetchFollowing from '../Api/Follows/getFollowing.js';
import { useToast } from '../../Helpers/toast.js';
import { axiosInstance } from '../../Helpers/axiosService.js';
import { useSelector } from 'react-redux';

function following() {

  const { username, userId } = useParams()
  const [isFollowedLoading, setIsFollowedLoading] = useState(false)
  const queryClient = useQueryClient()

  const userData = useSelector((state) => state.auth.userData)  

  // Fetch User Following (Infinite Scrolling)
  const MAX_PAGE_POST = 2
  const { data: following, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["following"],
      queryFn: ({ pageParam }) => fetchFollowing({ pageParam }, userId),
      refetchOnWindowFocus: false,
      // staleTime: 3000,
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
      if (response.data.data.following) {
        useToast.successToast("Follow Successfully")
      } else {
        useToast.successToast("Unfollow Successfully")
      }
      queryClient.invalidateQueries(["following"])
    } catch (error) {
      throw console.error(error.message)
    } finally {
      setIsFollowedLoading(false)
    }
  }

  return !isLoading ? (<div className='sm:col-span-11 md:col-span-6 max-h-screen sm:overflow-y-auto border-y'>
    <div className='flex gap-4 ml-4 mt-4 mb-3 items-center'>
      <Link to={`/profile/${username}`}
        className='text-white'>
        <FontAwesomeIcon icon={faArrowLeft} />
      </Link>
      <p className='text-white text-2xl'>@{username}</p>
    </div>
    <div className='flex justify-center items-center'>
      <p className='text-2xl'>Following</p>
    </div>
    {following.pages?.map((page) => (
      page.data?.map((user) => (
        console.log(`uer: ${JSON.stringify(user)}`),

        <div className='my-6 flex justify-around items-center' key={user.followDetails._id}>
          <Link to={`/profile/${user.followDetails.username}`}
            className='text-white flex justify-center items-center'>
            <div className='mr-2'>
              <img src={user.followDetails.avatar}
                alt="avatar"
                className='w-14 h-12 rounded-full'
              />
            </div>
            <p>{user.followDetails.username}</p>
          </Link>
          <div className='flex justify-center items-center'>
            {userData._id !== user.followDetails._id &&
              <Button onClick={() => handleFollowUnfollow(user.followDetails._id)}
                bgColor='bg-sky-700'
                textColor='text-white'
                className='px-4 py-2 rounded-full'
                disabled={isFollowedLoading}
              >
                {user.followDetails.isFollowed ? "Unfollow" : "Follow"}
              </Button>
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
          "No more following"
      }
    </div>
  </div>) : (<div className='sm:col-span-11 md:col-span-6 max-h-screen'>
    <p className='text-2xl text-white'>
      Loading
    </p>
  </div>)
}

export default following
