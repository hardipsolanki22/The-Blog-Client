import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams, Link } from 'react-router-dom';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { useSelector } from 'react-redux';

import fetchFollowers from "../Api/Follows/getFollowers.js";
import Button from '../Atoms/Button.jsx';
import { axiosInstance } from '../../Helpers/axiosService.js';
import { useToast } from '../../Helpers/toast.js';
import FollowingFollowersSkeleton from '../Skeleton/FollowingFollowersSkeleton.jsx';
import { Oval } from 'react-loader-spinner';

function Followers() {
  const { username, userId } = useParams()
  const [isFollowedLoading, setIsFollowedLoading] = useState(false)

  const userData = useSelector((state) => state.auth.userData)
  const queryClient = useQueryClient()

  //  Fetch User Followers (Infinite Scrolling)
  const MAX_PAGE_POST = 2
  const { data: followers, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["followers"],
      queryFn: ({ pageParam }) => fetchFollowers({ pageParam }, userId),
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
        queryClient.invalidateQueries(["followers"])
        useToast.successToast("Follow Successfully")
      } else {
        useToast.successToast("Unfollow Successfully")
      }
    } catch (error) {
      throw console.error(error.message)
    } finally {
      setIsFollowedLoading(false)
    }
  }

  return !isLoading ?
    (<div className='sm:col-span-11 md:col-span-6 sm:max-h-screen sm:overflow-y-auto border-y'>
      <div className='flex gap-4 ml-4 mt-4 mb-3 items-center'>
        <Link to={`/profile/${username}`}
          className='text-white'>
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
        <p className='text-white text-2xl'>@{username}</p>
      </div>
      <div className='flex justify-center items-center'>
        <p className='text-2xl'>Followers</p>
      </div>
      {followers.pages?.map((page) => (
        page.data?.map((user) => (
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
      ))
      }
      <div ref={ref}
        className='flex justify-center items-center'>
        {isFetchingNextPage ?
          <Oval
            height={'40'}
            width={'40'}
          /> : "No more followers"
        }
      </div>
    </div>) : (<div className='sm:col-span-11 md:col-span-6 sm:max-h-screen sm:overflow-y-auto'>
      <FollowingFollowersSkeleton cards={6} />
    </div>)
}

export default Followers
