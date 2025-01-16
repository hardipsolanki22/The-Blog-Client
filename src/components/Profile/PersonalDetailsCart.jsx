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
    const [avatar, setAvatar] = useState(null)
    const coverFileRef = useRef(null)
    const avatarFileRef = useRef(null)

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
            setUser(response.data)
        },
        onError: (error) => {
            useToast.errorToast(error.message)
        }
    })


    const updateProfileHandler = async (data) => {
        await mutateAsync(data)
        if (avatar) {
            updateAvatar({ avatar: avatar })
        }
        if (coverImage) {
            updateCoverImage({ coverImage: coverImage })
        }
    }

    if (isSuccess && !isLoading) {
        queryClient.invalidateQueries(["current-user"])
        useToast.successToast("Profile update successfully")
        navigate(`/profile/${user.username}`)
    }


    const handleCoverImageClick = () => {
        coverFileRef.current.click();
    };

    const handleAvatarClick = () => {
        avatarFileRef.current.click();
    };

    return (
        <div className='flex flex-col items-center justify-center border-y h-screen'>
            <div className='gap-4 flex flex-col justify-center items-center
        min-w-[75%] h-auto bg-white text-black rounded-md p-4'>
                <p className='text-2xl'>Personal Details</p>
                <div className='w-full flex flex-col justify-center items-center'>
                    <div
                        className='w-full h-8'
                        onClick={handleCoverImageClick}>
                        <img
                            src={coverImage ? URL.createObjectURL(coverImage) : userData.coverImage}
                            alt={userData.username}
                            className={`${!userData.coverImage && 'bg-slate-800'} rounded-md w-full h-36`}
                        />
                    </div>
                    <div 
                    className='mt-4 relative '
                    onClick={handleAvatarClick}>
                    <img
                            src={avatar ? URL.createObjectURL(avatar) : userData.avatar}
                            alt={userData.username}
                            className='rounded-full w-32 h-32'
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
                    <input
                        type="file"
                        name='avatar'
                        ref={avatarFileRef}
                        className='hidden'
                        onChange={(e) => setAvatar(e.target.files[0])}
                    />
                    <input
                        type="file"
                        name='coverImage'
                        ref={coverFileRef}
                        className='hidden'
                        onChange={(e) => setCoverImage(e.target.files[0])}
                    />
                    <div className='flex m-2 gap-2 justify-end items-center'>
                    <Button
                            className=''
                            bgColor='bg-black'
                            textColor='text-white'
                            onClick={() => navigate(`/profile/${userData.username}`)}
                        >
                            Cancle
                        </Button>
                        <Button
                            className=''
                            bgColor='bg-black'
                            textColor='text-white'
                            disabled={isPending || isLoading}
                        >
                            {isLoading || isPending ? 'Loading' : 'Save'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )

}

export default PersonalDetailsCart
