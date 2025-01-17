import React from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import Input from '../Atoms/Input'
import Button from '../Atoms/Button'
import changePassword from '../Api/AuthApi/changePassword'
import { useToast } from '../../Helpers/toast'
import { Oval } from 'react-loader-spinner'

function ChangePassword() {

    const { register, handleSubmit } = useForm()
    const navigate = useNavigate()

    const { mutateAsync, isPending } = useMutation({
        mutationFn: changePassword,
        onSuccess: () => {
            useToast.successToast("Update password successfully")
            navigate("/")
        },
        onError: (error) => {
            useToast.errorToast(error.message)
        }
    })

    const changePasswordHandler = async (data) => {
        await mutateAsync(data)
    }

    return (
        <div className='flex flex-col items-center justify-center 
            sm:col-span-11 md:col-span-6 h-screen sm:max-h-screen sm:overflow-y-auto gap-4
         border-y'>
            <div className='gap-4 flex flex-col justify-center items-center shadow-black shadow-lg
        min-w-[70%]  h-auto border border-violet-600 rounded-md p-10'>
                <p className='text-2xl'>Reset Password</p>
                <form onSubmit={handleSubmit(changePasswordHandler)} className='w-full'>
                    <Input
                        type="password"
                        label="Old Password: "
                        placeholder="Enter old password"
                        className="border text-base w-full px-2 py-2 focus:outline-none
                        transition duration-200 focus:border-gray-600 text-black"
                        {...register("oldPassword", {
                            required: true
                        })}
                    />
                    <Input
                        type="password"
                        label="New Password: "
                        placeholder="Enter new password"
                        className="border text-base w-full px-2 py-2 focus:outline-none
                        transition duration-200 focus:border-gray-600 text-black"
                        {...register("newPassword", {
                            required: true
                        })}
                    />
                    <div className='flex m-2 justify-center items-center'>
                        <Button
                            className=''
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
