import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { DNA } from 'react-loader-spinner'

import PostForm from '../components/Post/PostForm'
import getPost from '../components/Api/PostApi/getPost'

function EditPost() {

  const { postId } = useParams()

  const { data: post, isLoading, isError } = useQuery({
    queryFn: () => getPost(postId),
    queryKey: ["posts", { postId }],
    refetchOnWindowFocus: false,
  })

  if (isError) {
    console.log(`Error: ${isError}`);

  }
  return !isLoading ? (
    <PostForm post={post.data} />
  ) : (<div className='sm:col-span-11 md:col-span-6 h-screen w-full flex flex-col justify-center items-center'>
    <DNA />
    <p className='text-2xl font-semibold text-white'>The Blog is waiting</p>
  </div>)
}

export default EditPost

