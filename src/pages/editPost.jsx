import React from 'react'
import { useParams } from 'react-router-dom'

import PostForm from '../components/Post/PostForm'
import getPost from '../components/Api/PostApi/getPost'

function EditPost() {
    
    const {postId} = useParams()

    const {data: post, isLoading} = useQuery({
        queryFn: () => getPost(postId),
        refetchOnWindowFocus: false
      })

  return (
    <PostForm post={post} />
  )
}

export default EditPost
