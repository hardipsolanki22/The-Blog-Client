// import React, { useState } from 'react'
// import { faThumbsDown, faThumbsUp } from '@fortawesome/free-regular-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faClose } from '@fortawesome/free-solid-svg-icons/faClose';
// import { useForm } from 'react-hook-form'
// import { useInfiniteQuery } from '@tanstack/react-query';
// import { useInView } from 'react-intersection-observer';

// import Button from '../Atom/Button';
// import { useToast } from '../../Helper/toast';
// import { axiosInstance } from '../../Helper/axiosService';
// import getPostCommets from '../Api/Comment/getPostComments';


// function Comment({ commentState, postId }) {
//   const [isCommentLoading, setIsCommentLoading] = useState(false)
//   const { register, handleSubmit } = useForm()

//   const MAX_PAGE_POST = 5
//   const { data: comments, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } =
//     useInfiniteQuery({
//       queryKey: ["comment", { postId }],
//       queryFn: ({ pageParam }) => getPostCommets({ pageParam }, postId),
//       getNextPageParam: (lastPage, allPages) => {
//         return lastPage.data.length === MAX_PAGE_POST ? allPages.length + 1 : undefined;
//       },


//     })

//   const { ref, inView } = useInView({
//     threshold: 0,
//   });

//   useEffect(() => {
//     if (inView && hasNextPage) {
//       fetchNextPage()
//     }
//   }, [inView, hasNextPage, fetchNextPage])


//   const commentHandler = async (data) => {
//     try {
//       setIsCommentLoading(true)
//       const response = await axiosInstance.post(`/comment/create-comment/${postId}`, data, {
//         headers: {
//           "Content-Type": "application/json"
//         }
//       })
//       if (response.data) {
//         useToast.successToast("Comment successfully")
//       }
//     } catch (error) {
//       useToast.errorToast(error.message)
//     } finally {
//       setIsCommentLoading(false)
//     }
//   }

//   // const comments = [
//   //   {
//   //     name: 'User1',
//   //     avatar: 'https://idolkart.com/cdn/shop/articles/Krishna_ke_Naam.jpg?v=1700290012&width=1500',
//   //     content: "Lorem ipsum dolor sit amet consectetur adipisicing. "
//   //   },
//   //   {
//   //     name: 'User2',
//   //     avatar: 'https://idolkart.com/cdn/shop/articles/Krishna_ke_Naam.jpg?v=1700290012&width=1500',
//   //     content: "Lorem ipsum dolor sit amet consectetur adipisicing. "

//   //   },
//   //   {
//   //     name: 'User3',
//   //     avatar: 'https://idolkart.com/cdn/shop/articles/Krishna_ke_Naam.jpg?v=1700290012&width=1500',
//   //     content: "Lorem ipsum dolor sit amet consectetur adipisicing. "

//   //   },
//   // ]

//   return !isLoading ? ( <div className="absolute top-20 sm:sticky w-full h-[87vh] sm:h-[50vh] overflow-y-auto
//     mt-4 rounded-md flex-col justify-center p-4 border-b bg-white text-black">
//   <Button className='p-1 font-bold' onClick={() => commentState(false)}>
//     <FontAwesomeIcon icon={faClose} />
//   </Button>
//   <div className='flex justify-center items-center mb-6'>
//     <h1 className=''>Comments</h1>
//   </div>
//   <div className='flex gap-4'>
//     <div className='w-12 h-12 rounded-2xl'>
//       <img src={comments[0].avatar} alt="logo" />
//     </div>
//     <form onSubmit={handleSubmit(commentHandler)}
//       className='w-full border-b-[1.5px] border-slate-300'>
//       <input
//         type="text"
//         placeholder='Add a comment...'
//         className='border-none w-full'
//         {...register("comment", {
//           required: true
//         })}
//       />
//       <Button
//         type='submit'
//         disabled={isCommentLoading}
//       >
//         Submit
//       </Button>
//     </form>
//   </div>
//   {
//     comments.map((comment) => (
//       <div className='flex justify-center mt-6 m-4' key={comment.name}>
//         <div className="mr-4 w-12 h-12 rounded-2xl">
//           <img src={comment.avatar} alt="Avatar" />
//         </div>
//         <div className="flex-1">
//           <div className="flex items-center justify-between">
//             <div>
//               <span className="font-semibold">{comment.name}</span>
//               <span className="text-gray-500 text-[13px] ml-2">2 month ago</span>
//             </div>
//           </div>
//           <div className="">
//             <p>{comment.content}</p>
//           </div>
//           <div className="flex mt-[3px] items-center text-gray-500">
//             <button className="hover:text-blue-500 p-2">
//               <FontAwesomeIcon icon={faThumbsUp} />
//             </button>
//             <span className='text-[13px]'>3</span>
//             <button className="hover:text-red-500 p-2">
//               <FontAwesomeIcon icon={faThumbsDown} />
//             </button>
//             <span className='text-[13px]'>5</span>
//           </div>
//         </div>
//         <div ref={ref} className='p-4 rounded-3xl bg-slate-700'>
//           {isFetchingNextPage ?
//             "Loading More" :
//             hasNextPage ?
//               "Scroll down to load more" :
//               "No more Comment"
//           }
//         </div>
//       </div>
//       ))
//   }
// </div>) : (<div className='absolute top-20 sm:sticky w-full h-[87vh] sm:h-[50vh] overflow-y-auto
//     mt-4 rounded-md flex-col justify-center p-4 border-b bg-white text-black'> 
//   <p className='text-2xl'>Loading</p>
//     </div>);
// }

// export default Comment



import React, { useState } from 'react'
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons/faClose';
import { useForm } from 'react-hook-form'
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

import Button from '../Atom/Button';
import { useToast } from '../../Helper/toast';
import { axiosInstance } from '../../Helper/axiosService';
import getPostCommets from '../Api/Comment/getPostComments';
import CommentCart from './CommentCart';


function Comment({ commentState, postId }) {
  const [isCommentLoading, setIsCommentLoading] = useState(false)
  const { register, handleSubmit } = useForm()

  const MAX_PAGE_POST = 5
  const { data: comments, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["comment", { postId }],
      queryFn: ({ pageParam }) => getPostCommets({ pageParam }, postId),
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


  const commentHandler = async (data) => {
    try {
      setIsCommentLoading(true)
      const response = await axiosInstance.post(`/comment/create-comment/${postId}`, data, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      if (response.data) {
        useToast.successToast("Comment successfully")
      }
    } catch (error) {
      useToast.errorToast(error.message)
    } finally {
      setIsCommentLoading(false)
    }
  }

  // const comments = [
  //   {
  //     name: 'User1',
  //     avatar: 'https://idolkart.com/cdn/shop/articles/Krishna_ke_Naam.jpg?v=1700290012&width=1500',
  //     content: "Lorem ipsum dolor sit amet consectetur adipisicing. "
  //   },
  //   {
  //     name: 'User2',
  //     avatar: 'https://idolkart.com/cdn/shop/articles/Krishna_ke_Naam.jpg?v=1700290012&width=1500',
  //     content: "Lorem ipsum dolor sit amet consectetur adipisicing. "

  //   },
  //   {
  //     name: 'User3',
  //     avatar: 'https://idolkart.com/cdn/shop/articles/Krishna_ke_Naam.jpg?v=1700290012&width=1500',
  //     content: "Lorem ipsum dolor sit amet consectetur adipisicing. "

  //   },
  // ]

  return !isLoading ? (<div className="absolute top-20 sm:sticky w-full h-[87vh] sm:h-[50vh] overflow-y-auto
    mt-4 rounded-md flex-col justify-center p-4 border-b bg-white text-black">
    <Button className='p-1 font-bold' onClick={() => commentState(false)}>
      <FontAwesomeIcon icon={faClose} />
    </Button>
    <div className='flex justify-center items-center mb-6'>
      <h1 className=''>Comments</h1>
    </div>
    <div className='flex gap-4'>
      <div className='w-12 h-12 rounded-2xl'>
        <img src={comments[0].avatar} alt="logo" />
      </div>
      <form onSubmit={handleSubmit(commentHandler)}
        className='w-full border-b-[1.5px] border-slate-300'>
        <input
          type="text"
          placeholder='Add a comment...'
          className='border-none w-full'
          {...register("comment", {
            required: true
          })}
        />
        <Button
          type='submit'
          disabled={isCommentLoading}
        >
          Submit
        </Button>
      </form>
    </div>
    {comments.pages?.map((page) => (
      page.data?.map((comment) => (
        <div className='flex justify-center mt-6 m-4' key={comment.name}>
          <CommentCart {...comment} />
          <div ref={ref} className='p-4 rounded-3xl bg-slate-700'>
            {isFetchingNextPage ?
              "Loading More" :
              hasNextPage ?
                "Scroll down to load more" :
                "No more Comment"
            }
          </div>
        </div>
      ))
    ))

    }
  </div>) : (<div className='absolute top-20 sm:sticky w-full h-[87vh] sm:h-[50vh] overflow-y-auto
    mt-4 rounded-md flex-col justify-center p-4 border-b bg-white text-black'>
    <p className='text-2xl'>Loading</p>
  </div>);
}

export default Comment
