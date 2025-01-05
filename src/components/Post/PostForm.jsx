import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'

import Input from '../Atom/Input'
import Button from '../Atom/Button'
import Select from '../Atom/Select'
import addPost from '../Api/PostApi/addPost'
import { useToast } from '../../Helper/toast'
import updatePost from '../Api/PostApi/updatePost'

function PostForm({ post }) {

    const { register, handleSubmit } = useForm({
        defaultValues: {
            title: post ? post.title : "",
            content: post ? post.content : "",
            status: post ? post.status : "active"
        }
    })
    const navigate = useNavigate()

    const { mutateAsync, isPending } = useMutation({
        mutationFn: post ? updatePost : addPost,
        onSuccess: (postData) => {
            post ? (
                useToast.successToast("Update post succefully"),
                navigate(`/profile/${post.data.owner.username}`)
            ) : (
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
            await mutateAsync(post._id, data)
        }


        const formData = new FormData()
        for (const key in data) {
            formData.append(key, data[key])
        }

        formData.append("post", data.post[0])

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
                        className="border text-base w-full px-2 py-2 focus:outline-none focus:border-gray-600"
                        {...register("title", {
                            required: true
                        })}
                    />
                    <Input
                        type="text"
                        label="Content: "
                        placeholder="Enter post content"
                        className="border text-base w-full px-2 py-2 focus:outline-none focus:border-gray-600"
                        {...register("content", {
                            required: true
                        })}
                    />
                    {post && <div className='flex justify-center items-start'>
                        <img
                            src="https://live.staticflickr.com/4021/4254050437_0d1baf4858_h.jpg"
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
                            {isPending ? "Loading..." : "Submit"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PostForm
