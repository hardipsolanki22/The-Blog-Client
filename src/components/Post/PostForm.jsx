import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { Oval } from 'react-loader-spinner'

import Input from '../Atoms/Input'
import Button from '../Atoms/Button'
import Select from '../Atoms/Select'
import addPost from '../Api/PostApi/addPost'
import { useToast } from '../../Helpers/toast'
import updatePost from '../Api/PostApi/updatePost'
import TextArea from '../Atoms/TextArea'
import { useTheme } from '../Contexts/theme'
import { parseErrorMesaage } from '../../Helpers/parseErrMsg'

function PostForm({ post }) {

    const userData = useSelector(state => state.auth.userData)
    const queryClient = useQueryClient()

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            title: post ? post.title : "",
            content: post ? post.content : "",
            status: post ? post.status : ""
        }
    })
    const navigate = useNavigate()

    // if post is exist then update post otherwise create new post
    const { mutateAsync, isPending } = useMutation({
        mutationFn: post ? updatePost : addPost,
        onSuccess: (postData) => {
            postData && post ? (
                useToast.successToast("😊 Update post succefully"),
                navigate(`/${postData.data.owner.username}`)
            ) : (
                queryClient.invalidateQueries(["for-you-posts"]),
                queryClient.invalidateQueries(["following-posts"]),
                useToast.successToast("😎 Post create succefully"),
                navigate("/")
            )
        },
        onError: (error) => {
            useToast.errorToast(parseErrorMesaage(error.response.data))
        }
    })

    const postHandler = async (data) => {
        if (post) {
            const formData = {
                _id: post._id,
                data
            }
            await mutateAsync(formData)
        } else {
            const formData = new FormData()
            for (const key in data) {
                formData.append(key, data[key])
                if (key === "post") {
                    formData.append(key, data[key][0])
                }
            }
            await mutateAsync(formData)

        }
    }

    const { themeMode } = useTheme()

    return (
        <div className='flex flex-col items-center justify-center
            sm:col-span-11 md:col-span-6 h-auto sm:max-h-screen sm:no-scrollbar sm:overflow-y-auto gap-4
         my-4'>
            <div className={`flex flex-col justify-center items-center shadow-black shadow-lg
         h-auto w-auto sm:max-w-[75%] min-w-[70%] border border-violet-600 rounded-md p-6`}>
                <h1>Post</h1>

                <form onSubmit={handleSubmit(postHandler)} className='w-full h-auto'>
                    <Input
                        type="text"
                        label="Title: "
                        placeholder="Enter post title"
                        className="border text-base w-full px-2 py-2 focus:outline-none 
                        focus:border-gray-600 transition duration-200 text-black"
                        {...register("title", {
                            required: true
                        })}
                    />
                    <TextArea
                        type="text"
                        label="Content: "
                        placeholder="Enter post content"
                        className="border text-base w-full p-2 h-36 focus:outline-none
                         focus:border-gray-600 transition duration-200 text-black"
                        {...register("content", {
                            required: true,
                            validate: {
                                matchPatern: (value) => /^(?=.{25,})/gm.test(value)
                                    || "Content must be at least 25 characters long.",
                            }
                        })}
                    />
                    {errors.content && <p className='text-red-500'>{errors.content.message}</p>}
                    {post && <div className='flex justify-center items-start'>
                        <img
                            src={post.image}
                            alt="post"
                            className='rounded-md border border-slate-600 max-h-56 w-[80%] object-cover'
                        />
                    </div>
                    }
                    {!post && <Input
                        type="file"
                        label="Post: "
                        classNam=''
                        {...register("post", {
                            required: "Image is required."
                        })}
                    />
                    }
                    {errors.post && <p className='text-red-500'>{errors.post.message}</p>}
                    <Select
                        label={"Status: "}
                        options={["active", "inactive"]}
                        className='text-black focus:outline-none w-[90%]'
                        {...register("status", {
                            required: "Status is required"
                        })}
                    />
                    {errors.status && <p className='text-red-500'>{errors.status.message}</p>}
                    <div className='flex m-4 justify-end gap-2 items-center'>
                        {post &&
                            <Link to={`/${userData.username}`}
                                className={`bg-black text-white p-[9.7px] rounded-md
                                ${themeMode ? 'text-white bg-purple-600 hover:bg-purple-700'
                                        : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
                            >
                                Cancle
                            </Link>
                        }
                        <Button
                            className='focus:outline-none'
                            disabled={isPending}
                        >
                            {isPending ?
                                <Oval
                                    height={23}
                                    width={23}
                                    color='black'
                                    secondaryColor='white'
                                    strokeWidth={5}
                                    strokeWidthSecondary={5}
                                />
                                : post ?
                                    "Save" :
                                    "Submit"
                            }
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PostForm
