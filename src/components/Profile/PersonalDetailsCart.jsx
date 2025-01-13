import React, { useDebugValue, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useMutation, useQueryClient } from '@tanstack/react-query'


import Button from '../Atoms/Button'
import Input from '../Atoms/Input'
import updateProfile from '../Api/UserApi/updateProfile'
import { useNavigate } from 'react-router-dom'
import { useToast } from '../../Helpers/toast'
import { axiosInstance } from '../../Helpers/axiosService'
function PersonalDetailsCart() {

    const userData = useSelector(state => state.auth.userData)
    const [isLoading, setIsLoading] = useState(false)
    const [user, setUser] = useState({})
    const navigate = useNavigate()
    const queryClient = useQueryClient();
    const [coverImage, setCoverImage] = useState(null)
    const fileRef = useRef(null)

    const { register, handleSubmit } = useForm({
        defaultValues: {
            name: userData.name,
            username: userData.username,
            email: userData.email
        }
    })

    const updateAvatar = async (data) => {
        try {
            setIsLoading(true)
            const response = await axiosInstance.patch('/user/update-avatar', data, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
        } catch (error) {
            useToast.errorToast(error.message)
        } finally {
            setIsLoading(false)
        }

    }

    const updateCoverImage = async (data) => {
        try {
            setIsLoading(true)
            const response = await axiosInstance.patch('/user/update-cover-image', data, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
        } catch (error) {
            useToast.errorToast(error.message)
        } finally {
            setIsLoading(false)
        }

    }

    const { mutateAsync, isPending, isSuccess } = useMutation({
        mutationFn: updateProfile,
        onSuccess: (response) => {
            queryClient.invalidateQueries(["currentUser"])
            queryClient.invalidateQueries(["users", { username: response.data.username }])
            setUser(response.data)

        },
        onError: (error) => {
            useToast.errorToast(error.message)
        }
    })


    const updateProfileHandler = async (data) => {
        const formData = new FormData()
        for (const key in data) {
            if (key === "name" || key === "username" || key === "email") {
                formData.append(key, data[key])
            }
        }
        await mutateAsync(formData)

        if (data.avatar && data.avatar[0]) {
            const formData = new FormData()
            formData.append("avatar", data.avatar[0])
            updateAvatar(formData)
        }
       if (coverImage) {
        updateCoverImage({coverImage: coverImage})
       }


    }

    if (isSuccess && !isLoading) {
        useToast.successToast("Profile update successfully")
        navigate(`/profile/${user.username}`)
    }

    console.log(`coverImage: `, JSON.stringify(coverImage));
    

    const handleCoverImageClick = () => {
        fileRef.current.click();
    };

    return (
        <div className='flex flex-col items-center justify-center border-y h-screen'>
            <div className='gap-4 flex flex-col justify-center items-center
        min-w-[75%] h-auto bg-white text-black rounded-md p-4'>
                <p className='text-2xl'>Personal Details</p>
                <div className='w-full flex flex-col justify-center items-center'>
                    <div
                        className='w-full h-8'
                        onClick={handleCoverImageClick}
                    >
                            <img
                                src={coverImage ? URL.createObjectURL(coverImage) : userData.coverImage}
                                alt={userData.username}
                                className={`${!userData.coverImage && 'bg-slate-800'} w-full h-36`}
                            />
                    </div>
                    <div className='mt-4'>
                        <img src={userData.avatar}
                            alt={userData.username}
                            className='w-36 h-36 rounded-full'
                        />
                    </div>
                </div>
                <form onSubmit={handleSubmit(updateProfileHandler)}>
                    <Input
                        type="text"
                        label="Name: "
                        placeholder="Enter your name"
                        className="border text-base w-full px-2 py-2 focus:outline-none focus:border-gray-600"
                        {...register("name")}
                    />
                    <Input
                        type="text"
                        label="Username: "
                        placeholder="Enter your username"
                        className="border text-base w-full px-2 py-2 focus:outline-none focus:border-gray-600"
                        {...register("username")}
                    />
                    <Input
                        type="email"
                        label="Email: "
                        placeholder="Enter your email"
                        className="border text-base w-full px-2 py-2 focus:outline-none focus:border-gray-600"
                        {...register("email")}
                    />
                    <Input
                        type="file"
                        label="Avatar: "
                        // ref={fileRef}
                        {...register("avatar")}
                    />
                    {/* <Input
                        type="file"
                        className='hidden'
                        label="Cover Image: "
                        ref={fileRef}
                        {...register("coverImage")}
                    /> */}
                    <input
                        type="file"
                        name='coverImage'
                        ref={fileRef}
                        className='hidden'
                        onChange={(e) => setCoverImage(e.target.files[0]) }
                    />
                    <div className='flex m-2 justify-center items-center'>
                        <Button
                            className=''
                            bgColor='bg-black'
                            textColor='text-white'
                            disabled={isPending || isLoading}
                        >
                            {isLoading || isPending ? 'Loading' : 'Submit'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )

}

export default PersonalDetailsCart
