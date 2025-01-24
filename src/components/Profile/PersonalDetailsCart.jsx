import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router-dom'
import { Oval } from 'react-loader-spinner'

import Button from '../Atoms/Button'
import Input from '../Atoms/Input'
import updateProfile from '../Api/UserApi/updateProfile'
import { useToast } from '../../Helpers/toast'
import { axiosInstance } from '../../Helpers/axiosService'
import { parseErrorMesaage } from '../../Helpers/parseErrMsg'
import { useTheme } from '../Contexts/theme'

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
    
    // update user details

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
            useToast.errorToast(parseErrorMesaage(error.response.data))
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
        useToast.successToast("😊 Profile update successfully")
        navigate(`/profile/${user.username}`)
    }


    const handleCoverImageClick = () => {
        coverFileRef.current.click();
    };

    const handleAvatarClick = () => {
        avatarFileRef.current.click();
    };

    const { themeMode } = useTheme()

    return (
        <div className='flex flex-col items-center justify-center border-t border-slate-600 
        h-screen  sm:h-[92vh]'>
            <div className='gap-4 flex flex-col justify-center items-center shadow-black shadow-lg
        min-w-[75%] h-auto border border-violet-600 rounded-md p-6 sm:p-4'>
                <p className='text-2xl'>Personal Details</p>
                <div className='w-full flex flex-col justify-center items-center h-auto'>
                    <div
                        className='w-full h-8'
                        onClick={handleCoverImageClick}>
                        <img
                            src={coverImage ? URL.createObjectURL(coverImage) : userData.coverImage}
                            alt={userData.username}
                            loading='lazy'
                            className={`border-2 border-violet-700 
                                ${!userData.coverImage && 'bg-slate-800'} rounded-md w-full h-36`}
                        />
                    </div>
                    <div
                        className='mt-4 flex flex-col  justify-center items-center'
                        onClick={handleAvatarClick}>
                        <div className='group'>
                            <img
                                src={avatar ? URL.createObjectURL(avatar) : userData.avatar}
                                alt={userData.username}
                                loading='lazy'
                                className='rounded-full w-32 h-32 border-2 border-violet-700 '
                            />
                        </div>
                        <p className='ml'>{userData.username}</p>
                    </div>
                </div>
                <form onSubmit={handleSubmit(updateProfileHandler)} className='w-full'>
                    <Input
                        type="text"
                        label="Name: "
                        placeholder="Enter your name"
                        className="border text-base w-full px-2 py-2 focus:outline-none
                        text-black focus:border-gray-600"
                        {...register("name")}
                    />
                    <Input
                        type="text"
                        label="Username: "
                        placeholder="Enter your username"
                        className="border text-base w-full px-2 py-2 focus:outline-none 
                        text-black focus:border-gray-600"
                        {...register("username")}
                    />
                    <Input
                        type="email"
                        label="Email: "
                        placeholder="Enter your email"
                        className="border text-base w-full px-2 py-2 focus:outline-none
                        text-black focus:border-gray-600"
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
                        <Link to={`/${userData.username}`}
                            className={`bg-black text-white p-[9.7px] rounded-md
                            ${themeMode ? 'text-white bg-purple-600 hover:bg-purple-700'
                                    : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
                        >
                            Cancle
                        </Link>
                        <Button
                            disabled={isPending || isLoading}
                        >
                            {isLoading || isPending ?
                                <Oval
                                    height={23}
                                    width={23}
                                    color='black'
                                    secondaryColor='white'
                                    strokeWidth={5}
                                    strokeWidthSecondary={5}
                                />
                                : 'Save'
                            }
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )

}

export default PersonalDetailsCart
