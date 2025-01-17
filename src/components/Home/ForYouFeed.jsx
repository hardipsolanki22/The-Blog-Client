
import React, { useEffect } from 'react'
import { Oval } from 'react-loader-spinner'
import { useInView } from "react-intersection-observer";

import PostCart from '../Post/PostCart'
import { useInfiniteQuery } from '@tanstack/react-query';
import fetchAllPosts from '../Api/PostApi/fetchAllPosts';
import PostSkeleton from '../Skeleton/PostSkeleton';
import ProfileSkeleton from '../Skeleton/ProfileSkeleton';
import TweetSkeleton from '../Skeleton/TweetSkeleton';
import LikeSkeleton from '../Skeleton/LikeSkeleton';
import CommentSkeleton from '../Skeleton/CommentSkeleton';
import FollowingFollowersSkeleton from '../Skeleton/FollowingFollowersSkeleton';
function ForYouFeed() {

  // Fetch All Posts (Infinite Scrolling)
  const MAX_PAGE_POST = 2
  const { data: posts, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["for-you-posts"],
      queryFn: fetchAllPosts,
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




  return !isLoading ? (<div className='h-auto sm:max-h-[91.7vh] sm:overflow-y-auto sm:no-scrollbar
    border-b  border-slate-600 bg-black text-white'>
    {posts?.pages.map((page) => (
      page.data?.map((post) => (<div key={post._id}
        className='flex flex-col justify-center border-b  border-slate-600 p-5 h-full '>
        <PostCart {...post} />
      </div>
      ))

    ))}
    <div ref={ref}
      className='flex justify-center items-center mb-16 mt-4 sm:my-4 '>
      {isFetchingNextPage ?
      <Oval
        height={'40'}
        width={'40'}
        color='black'
        secondaryColor='white'
      /> : "No more posts"

     } 
    </div>
  </div>) : (<div className='sm:max-h-[91.7vh] sm:no-scrollbar sm:overflow-y-auto bg-black text-white'>
    <PostSkeleton cards={3} />
  </div>)
}

export default ForYouFeed
