import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams, Link } from 'react-router-dom';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { Oval } from 'react-loader-spinner';

import Button from '../Atoms/Button.jsx';
import fetchFollowing from '../Api/Follows/getFollowing.js';
import { useToast } from '../../Helpers/toast.js';
import { axiosInstance } from '../../Helpers/axiosService.js';
import { useSelector } from 'react-redux';
import FollowingFollowersSkeleton from '../Skeleton/FollowingFollowersSkeleton.jsx';
import { useTheme } from '../Contexts/theme.js';

function following() {

  const { username, userId } = useParams()
  const [isFollowedLoading, setIsFollowedLoading] = useState(false)
  const queryClient = useQueryClient()

  const userData = useSelector((state) => state.auth.userData)

  // Fetch User Following
  const MAX_PAGE_FOLLOWING = 4
  const { data: following, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["following"],
      queryFn: ({ pageParam }) => fetchFollowing({ pageParam }, userId),
      refetchOnWindowFocus: false,
      // staleTime: 3000,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.data.length === MAX_PAGE_FOLLOWING ? allPages.length + 1 : undefined;
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
      const response = await axiosInstance.post(`/follows/${userId}/following`)
      if (response.data.data.following) {
        useToast.successToast("😍 Follow Successfully")
      } else {
        useToast.successToast("😒 Unfollow Successfully")
      }
      queryClient.invalidateQueries(["following"])
    } catch (error) {
      throw console.error(error.message)
    } finally {
      setIsFollowedLoading(false)
    }
  }

  const { themeMode } = useTheme()

  return !isLoading ? (<div className='sm:col-span-11 md:col-span-6 max-h-screen 
    sm:no-scrollbar sm:overflow-y-auto'>
    <div className='flex gap-4 ml-4 mt-4 mb-3 items-center'>
      <Link to={`/${username}`}
        className={`${themeMode ? 'text-white' : 'text-black'}`}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </Link>
      <p className='text-2xl'>@{username}</p>
    </div>
    <div className='flex justify-center items-center'>
      <p className='text-2xl'>Following</p>
    </div>
    {following.pages?.map((page) => (
      page.data?.map((user) => (
        <div className='my-6 flex justify-around items-center' key={user.followDetails._id}>
          <div className={`${userData._id === user.followDetails._id && 'mr-14'} flex justify-center items-center gap-3`}>
            <Link to={`/${user.followDetails.username}`}
              className='text-white flex justify-center items-center'>
              <div>
                <img src={user.followDetails.avatar}
                  alt="avatar"
                  loading='lazy'
                  className='w-14 h-12 rounded-full'
                />
              </div>
            </Link>
            <p>{user.followDetails.username}</p>
          </div>
          <div className='flex justify-center items-center'>
            {userData._id !== user.followDetails._id &&
              <Button onClick={() => handleFollowUnfollow(user.followDetails._id)}
                className='px-4 py-2 rounded-full focus:outline-none'
                disabled={isFollowedLoading}
              >
                {user.followDetails.isFollowed ? "Unfollow" : "Follow"}
              </Button>
            }
          </div>
        </div>
      ))
    ))}
    <div ref={ref}
      className='flex justify-center items-center'>
      {isFetchingNextPage &&
        <Oval
          height={'40'}
          width={'40'}
          color={`${themeMode ? 'black' : 'white'}`}
          secondaryColor={`${themeMode ? 'white' : 'black'}`}
        />
      }
    </div>
  </div>) : (<div className='sm:col-span-11 md:col-span-6 max-h-screen
     sm:overflow-y-auto sm:no-scrollbar'>
    <FollowingFollowersSkeleton cards={6} />
  </div>)
}

export default following
