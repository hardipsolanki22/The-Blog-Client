import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useMutation, useQueryClient } from '@tanstack/react-query'


import Button from '../Atom/Button'
import Input from '../Atom/Input'
import updateProfile from '../Api/UserApi/updateProfile'
import { useNavigate } from 'react-router-dom'
import { useToast } from '../../Helper/toast'
import { axiosInstance } from '../../Helper/axiosService'

function EditProfile() {

    const userData = useSelector(state => state.auth.userData)
    const [isLoading, setIsLoading] = useState(false)
    const [user, setUser] = useState({})
    const navigate = useNavigate()
    const queryClient = useQueryClient();

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

    const { mutateAsync, isPending, isSuccess} = useMutation({
        mutationFn: updateProfile,
        onSuccess: (response) => {
            queryClient.invalidateQueries(["currentUser"]) 
            queryClient.invalidateQueries(["users", {username: response.data.username}])           
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
        if (data?.coverImage && data.coverImage[0]) {
            const formData = new FormData()
            formData.append("coverImage", data.coverImage[0])
            updateCoverImage(formData)
        }


    }

     if (isSuccess && !isLoading) {
         useToast.successToast("Profile update successfully")
        navigate(`/profile/${user.username}`)
     }

    return (
        <div className='flex flex-col items-center justify-center 
            sm:col-span-11 md:col-span-6 h-screen sm:max-h-screen sm:overflow-y-auto gap-4
         border-y'>
            <div className='gap-4 flex flex-col justify-center items-center
        min-w-[70%]  h-auto bg-white text-black rounded-md p-10'>
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
                        {...register("avatar")}
                    />
                    <Input
                        type="file"
                        label="Cover Image: "
                        {...register("coverImage")}
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

export default EditProfile
