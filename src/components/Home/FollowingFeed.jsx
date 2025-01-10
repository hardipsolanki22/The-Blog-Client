
import React, { useEffect } from 'react'
import { useInView } from "react-intersection-observer";

import PostCart from '../Post/PostCart'
import { useInfiniteQuery } from '@tanstack/react-query';
import fetchFollowingPost from '../Api/PostApi/fetchFollowingPosts';

function FollowingFeed() {
  
  // Fetch Following User Posts (Infinite Scrolling)
  const MAX_PAGE_POST = 2
  const { data: posts, hasNextPage, fetchNextPage, isFetchingNextPage , isLoading} =
    useInfiniteQuery({
      queryKey: ["following-posts"],
      queryFn: fetchFollowingPost,
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




  return !isLoading ? (<div className='sm:max-h-[91.7vh] z-0 sm:overflow-y-auto bg-black text-white'>
    {posts?.pages.map((page) => (
     page.data.length ? ( page.data?.map((post) => (
      <div key={post.title}
        className='flex flex-col justify-center border-y p-5 h-auto '>
        <PostCart {...post} />
      </div>
      ))) : (<div className='flex justify-center items-center'>
      <p className='text-2xl'> User Dose not following any user </p>
      </div>)
      
    ))}
    <div ref={ref} className='p-4 rounded-3xl bg-slate-700 m-4 '>
      {isFetchingNextPage ?
        "Loading More" :
        hasNextPage ?
          "Scroll down to load more" :
          ""
      }
    </div>
  </div>) : (<div className='sm:max-h-[91.7vh] z-0 sm:overflow-y-auto bg-black text-white'>
    <p className='text-2xl'>Loading</p>
  </div>)
}

export default FollowingFeed
