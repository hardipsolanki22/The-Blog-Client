import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import PostForm from '../components/Post/PostForm'
import getPost from '../components/Api/PostApi/getPost'

function EditPost() {

  const { postId } = useParams()

  const { data: post, isLoading , isError} = useQuery({
    queryFn: () => getPost(postId),
    queryKey: ["posts", { postId }],
    refetchOnWindowFocus: false,
  })

  if (isError) {
    console.log(`Error: ${isError}`);
    
  }
  return !isLoading ? (
    <PostForm post={post.data} />
  ) : (<div className='flex flex-col items-center justify-center 
            sm:col-span-11 md:col-span-6 h-screen sm:max-h-screen sm:overflow-y-auto gap-4
        border-y'>
    <h1>Loading</h1>
  </div>)
}

export default EditPost
