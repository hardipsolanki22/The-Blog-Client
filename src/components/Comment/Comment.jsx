import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons/faClose';
import { useForm } from 'react-hook-form'
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

import Button from '../Atom/Button';
import { useToast } from '../../Helper/toast';
import { axiosInstance } from '../../Helper/axiosService';
import getPostCommets from '../Api/Comment/getPostComments';
import CommentCart from './CommentCart';
import { useSelector } from 'react-redux';


function Comment({ commentState, postId }) {

  const userData = useSelector(state => state.auth.userData)
  const [isCommentLoading, setIsCommentLoading] = useState(false)
  const { register, handleSubmit } = useForm()
  const queryClient = useQueryClient()

  const MAX_PAGE_POST = 5
  const { data: comments, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["comments"],
      queryFn: ({ pageParam }) => getPostCommets({ pageParam }, postId),
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.data.length === MAX_PAGE_POST ? allPages.length + 1 : undefined;
      },
      staleTime: 0


    })

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage])


  const commentHandler = async (data) => {
    try {
      setIsCommentLoading(true)
      const response = await axiosInstance.post(`/comment/create-comment/${postId}`, data, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      if (response.data) {
        queryClient.invalidateQueries(["comments"])
        useToast.successToast("Comment successfully")
      }
    } catch (error) {
      useToast.errorToast(error.message)
    } finally {
      setIsCommentLoading(false)
    }
  }


  return <div className="absolute top-20 sm:sticky w-full h-[87vh] sm:h-[50vh] overflow-y-auto
    mt-4 rounded-md flex-col justify-center p-4 border-b bg-white text-black">
    <Button className='p-1 font-bold' onClick={() => commentState(false)}>
      <FontAwesomeIcon icon={faClose} />
    </Button>
    <div className='flex justify-center items-center mb-6'>
      <p className='text-3xl'>Comments</p>
    </div>
    <div className='flex gap-4'>
      <div className='w-12 h-12 '>
        <img src={userData.avatar}
          alt="logo"
          className='rounded-full'
        />
      </div>
      <form onSubmit={handleSubmit(commentHandler)}
        className='w-full border-b-[1.5px] border-slate-300'>
        <input
          type="text"
          placeholder='Add a comment...'
          className="border text-base w-full px-2 py-2 focus:outline-none focus:border-gray-600"
          {...register("content", {
            required: true
          })}
        />
        <div className='flex justify-center m-2'>
          <Button
            className=''
            bgColor='bg-black'
            textColor='text-white'
            type='submit'
            disabled={isCommentLoading}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
    {!isLoading ? (comments.pages?.map((page) => (
      page.data.length > 0 ? (page.data?.map((comment) => (
        <div className='flex items-centere mt-6 w-full'>
          <CommentCart {...comment} />
        </div>
      ))) : (
        <div className='absolute top-20 sm:sticky w-full h-[87vh] sm:h-[50vh] overflow-y-auto
        mt-4 rounded-md flex-col justify-center p-4 border-b bg-white text-black'>
          <p className='text-2xl'>No comments found</p>
        </div>)
    
    ))
      ) : (<div className='absolute top-20 sm:sticky w-full h-[87vh] sm:h-[50vh] overflow-y-auto
    mt-4 rounded-md flex-col justify-center p-4 border-b bg-white text-black'>
      <p className='text-2xl'>Loading</p>
    </div>
    )}
    <div ref={ref} className='rounded-3xl text-black flex flex-col'>
      {isFetchingNextPage ?
        "Loading More" :
        hasNextPage ?
          "Scroll down to load more" :
          "No more Comment"
      }
    </div>
  </div>
}

export default Comment
