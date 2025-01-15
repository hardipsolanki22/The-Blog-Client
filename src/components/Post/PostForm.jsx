import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import Input from '../Atoms/Input'
import Button from '../Atoms/Button'
import Select from '../Atoms/Select'
import addPost from '../Api/PostApi/addPost'
import { useToast } from '../../Helpers/toast'
import updatePost from '../Api/PostApi/updatePost'
import TextArea from '../Atoms/TextArea'

function PostForm({ post }) {    
    
    const queryClient = useQueryClient()
    const { register, handleSubmit } = useForm({
        defaultValues: {
            title: post ? post.title : "",
            content: post ? post.content : "",
            status: post ? post.status : ""
        }
    })
    const navigate = useNavigate()

    const { mutateAsync, isPending } = useMutation({
        mutationFn: post ? updatePost : addPost,
        onSuccess: (postData) => {
            post ? (
                useToast.successToast("Update post succefully"),
                navigate(`/profile/${postData.data.owner.username}`)
            ) : (
                queryClient.invalidateQueries(["for-you-posts"]),
                queryClient.invalidateQueries(["following-posts"]),
                useToast.successToast("Post add succefully"),
                navigate("/")
            )
        },
        onError: (error) => {
            useToast.errorToast(error.message)
        }
    })

    const postHandler = async (data) => {        
        if (post) {
            const formData = {
                _id: post._id,
                data
            }
            await mutateAsync(formData)
        }
        const formData = new FormData()
        for (const key in data) {
            formData.append(key, data[key])
        }
        await mutateAsync(formData)

    }

    return (
        <div className='flex flex-col items-center justify-center 
            sm:col-span-11 md:col-span-6 h-screen sm:max-h-screen sm:overflow-y-auto gap-4
        border-y '>
            <div className='flex flex-col justify-center items-center
         h-auto w-auto  sm:max-w-[75%]  min-w-[70%]  bg-white text-black rounded-md p-5'>
                <h1>Post</h1>

                <form onSubmit={handleSubmit(postHandler)} className='w-full'>
                    <Input
                        type="text"
                        label="Title: "
                        placeholder="Enter post title"
                        className="border text-base w-full px-2 py-2 focus:outline-none 
                        focus:border-gray-600 transition duration-200"
                        {...register("title", {
                            required: true
                        })}
                    />
                    <TextArea
                        type="text"
                        label="Content: "
                        placeholder="Enter post content"
                        className="border text-base w-full p-2 h-48 focus:outline-none
                         focus:border-gray-600 transition duration-200"
                        {...register("content", {
                            required: true
                        })}
                    />
                    {post && <div className='flex justify-center items-start'>
                        <img
                            src={post.image}
                            alt="post"
                            className='rounded-md border border-slate-600'
                        />
                    </div>

                    }
                    {!post && <Input
                        type="file"
                        label="Post: "
                        {...register("post", {
                            required: true
                        })}
                    />

                    }
                    <Select
                        label={"Status: "}
                        options={["active", "inactive"]}
                        {...register("status")}
                    />
                    <div className='flex m-2 justify-center items-center'>
                        <Button
                            className=''
                            bgColor='bg-black'
                            textColor='text-white'
                            disabled={isPending}
                        >
                            {isPending ? <img src=""
                             alt="loader" 
                            />
                            : "Submit"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PostForm
