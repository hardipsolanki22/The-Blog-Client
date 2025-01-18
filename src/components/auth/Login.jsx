import React, { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEye, faEyeLowVision} from '@fortawesome/free-solid-svg-icons'

import { useToast } from '../../Helpers/toast'
import Input from '../Atoms/Input'
import Button from '../Atoms/Button'
import { login } from '../../featured/authSlice'
import signInUser from '../Api/AuthApi/signIn'
import getCurrentUser from '../Api/UserApi/getCurrentUser'
import { Oval } from 'react-loader-spinner'
import { parseErrorMesaage } from '../../Helpers/parseErrMsg'

function Login() {

    const [isEyeOpen, setIsEyeOpen] = useState(false)
    const { register, handleSubmit } = useForm()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { mutateAsync, isPending } = useMutation({
        mutationFn: signInUser,

        onSuccess: async () => {
            const currentUser = await getCurrentUser()
            dispatch(login({ userData: currentUser.data }))
            useToast.successToast("Login successfully")
            navigate(`/profile/${currentUser.data.username}`)
        },

        onError: (error) => {
            console.log(`errrp`, JSON.stringify(error));
            
            useToast.errorToast(parseErrorMesaage(error.response.data))

        }
    })

    const signin = async (data) => {
        await mutateAsync(data)
    }

    const handleHideShowPassword = () => {
        setIsEyeOpen(!isEyeOpen)
    }

    return (
        <div className='flex flex-col items-center justify-center 
            sm:col-span-11 md:col-span-6 h-screen sm:max-h-screen sm:overflow-y-auto gap-4
         border-y'>
            <div className={`gap-4 flex flex-col justify-center items-center shadow-black shadow-lg
               min-w-[70%]  h-auto border border-violet-600
                rounded-md p-10`}>
                <h1>Login</h1>
                <div>
                    <p>Login your account</p>
                    <p>
                        Do you have no account ?
                        <Link to={"/signup"}>
                            Signup
                        </Link>
                    </p>
                </div>
                <form onSubmit={handleSubmit(signin)} className='w-full relative'>
                    <Input
                        type="email"
                        label="Email: "
                        placeholder="Enter your email"
                        className="border text-base w-full px-2 py-2 focus:outline-none
                        transition duration-200 focus:border-gray-600 text-black"
                        {...register("email", {
                            required: true
                        })}
                    />
                    <Input
                        type={isEyeOpen ? "text" : "password"}
                        label="Password: "
                        placeholder="Enter your password"
                        className="border text-base w-full px-2 py-2 focus:outline-none
                        transition duration-200 focus:border-gray-600 text-black"
                        {...register("password", {
                            required: true
                        })}
                    />
                    <span onClick={handleHideShowPassword}
                        className={`absolute right-6 top-[7.9rem] z-10 text-black text-lg
                        ${!isEyeOpen ? 'block' : 'hidden'} cursor-pointer`}
                    >
                        <FontAwesomeIcon icon={faEyeLowVision} />
                    </span>
                    <span onClick={handleHideShowPassword}
                        className={`absolute right-[1.7rem] top-[7.9rem] z-10 text-black text-lg
                            ${isEyeOpen ? 'block' : 'hidden'} cursor-pointer`}
                    >
                        <FontAwesomeIcon icon={faEye} />
                    </span>
                    <div>
                        <Link to={"/forget-password"}
                            className='text-black text-sm underline'
                        >
                            Forget Password
                        </Link>
                    </div>
                    <div className='flex m-2 justify-center items-center'>
                        <Button
                            className=''
                            bgColor='bg-black'
                            textColor='text-white'
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
                                : "Submit"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
