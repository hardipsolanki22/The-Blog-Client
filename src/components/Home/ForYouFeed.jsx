
import React, { useEffect } from 'react'
import {Oval} from 'react-loader-spinner'
import { useInView } from "react-intersection-observer";

import PostCart from '../Post/PostCart'
import { useInfiniteQuery } from '@tanstack/react-query';
import fetchAllPosts from '../Api/PostApi/fetchAllPosts';
import PostSkeleton from '../Skeleton/PostSkeleton';

function ForYouFeed() {
  
  // Fetch All Posts (Infinite Scrolling)
  const MAX_PAGE_POST = 2
  const { data: posts, hasNextPage, fetchNextPage, isFetchingNextPage , isLoading} =
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




  return !isLoading ? (<div className='sm:max-h-[91.7vh] sm:overflow-y-auto bg-black text-white'>
    {posts?.pages.map((page) => (
      page.data?.map((post) => (<div key={post.title}
        className='flex flex-col justify-center border-y p-5 h-auto '>
        <PostCart {...post} />
      </div>
      ))
      
    ))}
    <div ref={ref} 
    className='flex justify-center items-center'>
      {isFetchingNextPage ?
        <Oval
        height={'40'}
        width={'40'}
        /> :
          "No more Posts"
      }
    </div>
  </div>) : (<div className='sm:max-h-[91.7vh] z-0 sm:overflow-y-auto bg-black text-white'>
      <PostSkeleton/>
  </div>)
}

export default ForYouFeed
