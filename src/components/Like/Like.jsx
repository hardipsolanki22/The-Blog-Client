import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Oval } from 'react-loader-spinner'

import Button from '../Atoms/Button'
import getPostLikes from '../Api/LikeApi/getPostLiked'
import { axiosInstance } from '../../Helpers/axiosService'
import { useToast } from '../../Helpers/toast'
import LikeSkeleton from '../Skeleton/LikeSkeleton'
import { useTheme } from '../Contexts/theme'


function Like({ likeState, postId }) {

  const [isFollowedLoading, setIsFollowedLoading] = useState(false)
  const userData = useSelector((state) => state.auth.userData)

  const queryClient = useQueryClient()

  // Fetch User Who Like Posts 
  const MAX_PAGE_POST = 5
  const { data: likes, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["like", { postId }],
      queryFn: ({ pageParam }) => getPostLikes({ pageParam }, postId),
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
        useToast.successToast("😍 Follow Successfully")
      } else {
        useToast.successToast("😒 Unfollow Successfully")
      }
      queryClient.invalidateQueries(["users"])
      queryClient.invalidateQueries(["like", { postId }])
    } catch (error) {
      throw console.error(error.message)
    } finally {
      setIsFollowedLoading(false)
    }
  }

  const { themeMode } = useTheme()


  return !isLoading ? (
    <div className={`sm:static w-full h-[87vh] sm:h-[50vh]
      sm:bg-inherit sm:border sm:border-violet-500 ${themeMode
        ? "bg-black text-white" : "bg-slate-200 text-black"}
      sm:no-scrollbar overflow-y-auto rounded-md border-x border-slate-400 sm:mt-4 p-2 duration-300`}>
      <Button className='p-1 font-bold' onClick={() => likeState(false)}>
        <FontAwesomeIcon icon={faClose} />
      </Button>
      <div className='flex justify-center items-center'>
        <h1 className=''>Likes</h1>
      </div>
      {likes.pages?.map((page) => (
        page.data?.map((like) => (
          <div className='my-6 flex justify-around items-center' key={like.likedBy._id}>
            <div className={`flex justify-center items-center 
             ${userData._id === like.likedBy._id && 'mr-[5rem]'} mr-2`}>
              <Link to={`/${like.likedBy.username}`}
                className='mr-2'>
                <img src={like.likedBy.avatar}
                  alt="avatar"
                  loading='lazy'
                  className='w-14 h-12 rounded-full'
                />
              </Link>
              <p>{like.likedBy.username}</p>
            </div>
            <div className='flex justify-center items-center'>
              {userData._id !== like.likedBy._id &&
                <Button onClick={() => handleFollowUnfollow(like.likedBy._id)}
                  bgColor='bg-sky-700'
                  textColor='text-white'
                  className='px-4 py-2 rounded-full'
                  disabled={isFollowedLoading}
                >
                  {
                    like.likedBy.isFollowed ? "Unfollow" : "Follow"
                  }
                </Button>

              }
            </div>
          </div>
        ))
      ))

      }
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
    </div>) : (<div className={`sm:static w-full h-[87vh] sm:h-[50vh] overflow-y-auto rounded-md
    ${themeMode ? "bg-black text-white" : "bg-slate-200 text-black"}
     sm:bg-inherit sm:border sm:border-violet-500
      sm:no-scrollbar border-x border-slate-400 sm:mt-4 p-2 duration-300`}>
      <LikeSkeleton cards={6} />
    </div>)

}

export default Like


