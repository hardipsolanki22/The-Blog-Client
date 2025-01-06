import React, { useState, useEffect } from 'react'
import { faComment, faHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useInView } from "react-intersection-observer";

import PostCart from '../Post/PostCart'
import Like from '../Like/Like'
import Comment from '../Comment/Comment'
import Button from '../Atom/Button'
import { useInfiniteQuery } from '@tanstack/react-query';
import fetchAllPosts from '../Api/PostApi/fetchAllPosts';
import { useNavigate } from 'react-router-dom';

function ForYouFeed() {

  const [isLikeOpen, setIsLikeOpen] = useState(false)
  const [isCommentOpen, setIsCommentOpen] = useState(false)

  // Infinite Scrolling
  const MAX_PAGE_POST = 2
  const { data: posts, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["posts"],
      queryFn: fetchAllPosts,
      refetchOnWindowFocus: false,
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

  // Toggle Like
  const handleLikeState = (data) => {
    setIsLikeOpen(data)
  }

  // Toggle Comment
  const handleCommentSate = (data) => {
    setIsCommentOpen(data)
  }

  return (
    <div className='sm:max-h-[91.7vh] z-0 sm:overflow-y-auto bg-black text-white'>
      {posts?.pages.map((page) => (
        page.data?.map((post) => (<div key={post.title}
          className='flex flex-col justify-center border-y p-5 h-auto '>
          <PostCart {...post} />
          <div className='flex items-center gap-2 m-4'>
            <Button className='p-1 hover:text-red-500'>
              <FontAwesomeIcon icon={faHeart} />
            </Button>
            <span className='text-[13px] cursor-pointer' onClick={() => setIsLikeOpen(!isLikeOpen)}>
              {post.likesCount}
            </span>
            <Button className='p-1'>
              <FontAwesomeIcon icon={faComment} />
            </Button>
            <span className='text-[13px] cursor-pointer' onClick={() => setIsCommentOpen(!isCommentOpen)}>
              {post.commentsCount}
            </span>
          </div>
          {isLikeOpen &&
            <div className=''>
              <Like likeState={handleLikeState} />
            </div>
          }
          {isCommentOpen &&
            <div className='flex justify-center items-center'>
              <Comment commentState={handleCommentSate} />
            </div>
          }
        </div>))
      ))}
      <div ref={ref} className='p-4 rounded-3xl bg-slate-700 m-4 '>
        {isFetchingNextPage ?
          "Loading More" :
          hasNextPage ?
            "Scroll down to load more" :
            "No more Posts"
        }
      </div>

    </div>


  )
}

export default ForYouFeed
