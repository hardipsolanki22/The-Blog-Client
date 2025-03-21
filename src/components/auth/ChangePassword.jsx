import React from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import Input from '../Atoms/Input'
import Button from '../Atoms/Button'
import changePassword from '../Api/AuthApi/changePassword'
import { useToast } from '../../Helpers/toast'
import { Oval } from 'react-loader-spinner'
import { parseErrorMesaage } from '../../Helpers/parseErrMsg'

function ChangePassword() {

    const { register, handleSubmit, formState: { errors } } = useForm()
    const navigate = useNavigate()

    // chnage password 
    const { mutateAsync, isPending } = useMutation({
        mutationFn: changePassword,
        onSuccess: (response) => {
            useToast.successToast("😊 " + response.message)
            navigate("/")
        },
        onError: (error) => {
            const message = error.response.data.message || "Something want to wrong"
            useToast.errorToast("😐 " + message)
        }
    })

    const changePasswordHandler = async (data) => {
        await mutateAsync(data)
    }

    return (
        <div className='flex flex-col items-center justify-center 
            sm:col-span-11 md:col-span-6 h-screen sm:h-[92vh] sm:overflow-y-auto gap-4
         border-t border-slate-600'>
            <div className='gap-4 flex flex-col justify-center items-center
        min-w-[70%]  h-auto border border-violet-600 rounded-md p-10'>
                <p className='text-2xl'>Reset Password</p>
                <form onSubmit={handleSubmit(changePasswordHandler)} className='w-full'>
                    <Input
                        type="text"
                        label="Old Password: "
                        placeholder="Enter old password"
                        className="border text-base w-full px-2 py-2 focus:outline-none
                        transition duration-200 focus:border-gray-600 text-black"
                        {...register("oldPassword", {
                            required: true,
                            validate: {
                                matchPatern: (value) => /^(?=.{8,})/gm.test(value)
                                    || "Password must be at least 8 characters long.",
                            }
                        })}
                    />
                    {errors.oldPassword && <p className='text-red-500'>{errors.oldPassword.message}</p>}

                    <Input
                        type="text"
                        label="New Password: "
                        placeholder="Enter new password"
                        className="border text-base w-full px-2 py-2 focus:outline-none
                        transition duration-200 focus:border-gray-600 text-black"
                        {...register("newPassword", {
                            required: true,
                            validate: {
                                matchPatern: (value) => /^(?=.{8,})/gm.test(value)
                                    || "Password must be at least 8 characters long.",
                            }
                        })}
                    />
                    {errors.newPassword && <p className='text-red-500'>{errors.newPassword.message}</p>}
                    <div className='flex m-2 justify-center items-center'>
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
                                : "Submit"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ChangePassword
