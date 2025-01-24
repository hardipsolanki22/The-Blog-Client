import React, { useEffect } from 'react'
import { Oval } from 'react-loader-spinner'
import { useInView } from "react-intersection-observer";

import PostCart from '../Post/PostCart'
import { useInfiniteQuery } from '@tanstack/react-query';
import fetchAllPosts from '../Api/PostApi/fetchAllPosts';
import PostSkeleton from '../Skeleton/PostSkeleton';
import { useTheme } from '../Contexts/theme';

function ForYouFeed() {

  // Fetch All Posts 
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


  const { themeMode } = useTheme()


  return !isLoading ? (
    <div className={`h-auto sm:max-h-[83.7vh] lg:[86.7vh] xl:max-h-[83.7vh]  
     sm:overflow-y-auto sm:no-scrollbar ${themeMode ? 'dark' : 'light'}`}>
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
            color={`${themeMode ? 'black' : 'white'}`}
            secondaryColor={`${themeMode ? 'white' : 'black'}`}
          /> : "No more posts"

        }
      </div>

    </div>) : (<div className={`h-auto sm:max-h-[83.7vh] lg:[86.7vh] xl:max-h-[83.7vh]  
    sm:no-scrollbar sm:overflow-y-auto ${themeMode ? 'dark' : 'light'}`}>
      <PostSkeleton cards={3} />
    </div>)
}

export default ForYouFeed

