
import React, { useEffect } from 'react'
import { useInView } from "react-intersection-observer";

import PostCart from '../Post/PostCart'
import { useInfiniteQuery } from '@tanstack/react-query';
import fetchFollowingPost from '../Api/PostApi/fetchFollowingPosts';
import { Oval } from 'react-loader-spinner';
import PostSkeleton from '../Skeleton/PostSkeleton';
import { useTheme } from '../Contexts/theme';

function FollowingFeed() {

  // Fetch Following User Posts (Infinite Scrolling)
  const MAX_PAGE_POST = 2
  const { data: posts, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } =
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

    const {themeMode} = useTheme()
  


  return !isLoading ? (<div className={`h-auto sm:max-h-[91.7vh] sm:overflow-y-auto sm:no-scrollbar
   border-b border-slate-600 ${themeMode ? 'dark' : 'light'}`}>
    {posts?.pages.map((page) => (
      page.data.length ? (page.data?.map((post) => (
        <div key={post.title}
          className='flex flex-col justify-center border-b  border-slate-600 p-5 h-auto '>
          <PostCart {...post} />
        </div>
      ))) : (<div className='flex justify-center items-center'>
        {/* <p className='text-2xl'> User Dose not following any user </p> */}
      </div>)

    ))}
    <div ref={ref}
      className='flex justify-center items-center mb-16 mt-4 sm:my-4'>
      {isFetchingNextPage ?
        <Oval
          height={'40'}
          width={'40'}
          color='black'
          secondaryColor='white'
        /> :
        "No more posts"
      }
    </div>
  </div>) : (<div className={`sm:max-h-[91.7vh] sm:no-scrollbar sm:overflow-y-auto
    ${themeMode ? 'dark' : 'light'}`}>
    <PostSkeleton cards={3} />
  </div>)
}

export default FollowingFeed
