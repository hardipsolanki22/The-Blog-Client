import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import Input from '../Atoms/Input'
import Button from '../Atoms/Button'
import { useToast } from '../../Helpers/toast'
import { parseErrorMesaage } from '../../Helpers/parseErrMsg'
import registerUser from '../Api/AuthApi/signUp'
import { Oval } from 'react-loader-spinner'

function Signup() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const navigate = useNavigate()

    const queryClient = useQueryClient()

    // signup handler
    const { mutateAsync, isPending } = useMutation({
        mutationFn: registerUser,

        onSuccess: () => {
            useToast.successToast("😊 Signup successfully")
            // fetch all users
            queryClient.invalidateQueries(["users"])
            navigate("/login")
        },
        onError: (error) => {
            useToast.errorToast(parseErrorMesaage(error.response.data))
        }
    })

    const signup = async (data) => {
        const formData = new FormData()
        for (const key in data) {
            if (key === "name" || "username" || "email" || "password") {
                formData.append(key, data[key])
            }
        }

        formData.append("avatar", data.avatar[0])

        if (data.coverImage) {
            formData.append("coverImage", data.coverImage[0])
        }

        await mutateAsync(formData)

    }


    return (
        <div className='flex flex-col items-center justify-center 
            sm:col-span-11 md:col-span-6 h-auto sm:max-h-screen overflow-y-auto gap-4
       pt-2 sm:pt-0 border-t border-slate-600'>
            <div className={`gap-4 flex flex-col justify-center items-center shadow-black shadow-lg
         sm:min-w-[70%] h-auto border border-violet-600 rounded-md p-5 sm:m-4`}>
                <h1>Signup</h1>
                <div>
                    <p>Signup to create your account</p>
                    <p>
                        Do you have an account&#63;
                        <Link to={"/login"}
                            className='text-blue-500'
                        >
                            Login
                        </Link>
                    </p>
                </div>
                <form onSubmit={handleSubmit(signup)}>
                    <Input
                        type="text"
                        label="Name: "
                        placeholder="Enter your name"
                        className="border text-base w-full px-2 py-2 focus:outline-none
                        transition duration-200 focus:border-gray-600 text-black"
                        {...register("name", {
                            required: true
                        })}
                    />
                    <Input
                        type="text"
                        label="Username: "
                        placeholder="Enter your username"
                        className="border text-base w-full px-2 py-2 focus:outline-none
                        transition duration-200 focus:border-gray-600 text-black"
                        {...register("username", {
                            required: true
                        })}
                    />
                    <Input
                        type="email"
                        label="Email: "
                        placeholder="Enter your email"
                        className="border text-base w-full px-2 py-2 focus:outline-none
                        transition duration-200 focus:border-gray-600  text-black"
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)
                                    || "Email address must be a valid address.",
                            }
                        })}
                    />
                    {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                    <Input
                        type="text"
                        label="Password: "
                        placeholder="Enter your password"
                        className="border text-base w-full px-2 py-2 focus:outline-none
                        transition duration-200 focus:border-gray-600  text-black"
                        {...register("password", {
                            required: true,
                            validate: {
                                matchPatern: (value) => /^(?=.{8,})/gm.test(value)
                                    || "Password must be at least 8 characters long.",
                            }
                        })}
                    />
                    {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
                    <Input
                        type="file"
                        label="Avatar: "
                        {...register("avatar", {
                            required: "Avatar is required."
                        })}
                    />
                    {errors.avatar && <p className='text-red-500'>{errors.avatar.message}</p>}
                    <Input
                        type="file"
                        label="Cover Image: "
                        {...register("coverImage")}
                    />
                    <div className='flex m-2 justify-center items-center'>
                        <Button
                            type='submit'
                            disabled={isPending}
                            className='focus:outline-none'
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
                                : "Signup"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default Signup


