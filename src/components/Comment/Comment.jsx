import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons/faClose';
import { useForm } from 'react-hook-form'
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { useSelector } from 'react-redux';
import { Oval } from 'react-loader-spinner';

import Button from '../Atoms/Button';
import { useToast } from '../../Helpers/toast';
import { axiosInstance } from '../../Helpers/axiosService';
import getPostCommets from '../Api/Comment/getPostComments';
import CommentCart from './CommentCart';
import CommentSkeleton from '../Skeleton/CommentSkeleton';
import { useTheme } from '../Contexts/theme';


function Comment({ commentState, postId }) {

  const userData = useSelector(state => state.auth.userData)
  const [isCommentLoading, setIsCommentLoading] = useState(false)
  const { register, handleSubmit, reset} = useForm()
  const queryClient = useQueryClient()

  // fetch comment 
  const MAX_PAGE_COMMENTS = 5
  const { data: comments, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["comments"],
      queryFn: ({ pageParam }) => getPostCommets({ pageParam }, postId),
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.data.length === MAX_PAGE_COMMENTS ? allPages.length + 1 : undefined;
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

// create comment handler
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
      console.error(error.message);

    } finally {
      setIsCommentLoading(false)
    }
    reset()
  }

  const { themeMode } = useTheme()

  return <div className={`sm:sticky w-full h-[87vh] sm:h-[50vh] overflow-y-auto
     ${themeMode ? "bg-black text-white" : "bg-slate-200 text-black"}
      sm:border sm:border-violet-500 sm:bg-inherit  border-slate-400 
    sm:no-scrollbar mt-4 rounded-md flex-col justify-center p-4 border-x`}>
    <Button className='p-1 font-bold focus:outline-none'
     onClick={() => commentState(false)}>
      <FontAwesomeIcon icon={faClose} />
    </Button>
    <div className='flex justify-center items-center mb-6'>
      <p className='text-3xl'>Comments</p>
    </div>
    <div className='flex gap-4'>.

      <div className=''>
        <img src={userData.avatar}
          alt="logo"
          className=' w-12 h-12 rounded-full'
        />
      </div>
      <form onSubmit={handleSubmit(commentHandler)}
        className='w-full border-b-2 border-slate-300 pb-2'>
        <input
          type="text"
          placeholder='Add a comment...'
          className="border rounded-lg text-base w-full px-3 py-2 focus:outline-none
           focus:border-gray-600 transition duration-200 text-black"
          {...register("content", {
            required: "true"
          })}
        />
        <div className='flex justify-end mt-2'>
          <Button
            className='px-4 py-2 rounded-lg focus:outline-none'
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
        <div key={comment._id}
          className='flex items-centere mt-6 w-full'>
          <CommentCart {...comment} />
        </div>
      ))) : (
        <div className=' sm:sticky w-full h-[87vh] sm:h-[50vh] overflow-y-auto
          sm:no-scrollbar mt-4 rounded-md flex-col justify-center items-center p-4'>
          <p className='text-2xl text-center'>No comments found</p>
        </div>)

    ))
    ) : (
      <>
        <CommentSkeleton cards={5} />
      </>
    )}
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
  </div>
}

export default Comment
