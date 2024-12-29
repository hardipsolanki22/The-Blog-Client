import React from 'react'
import { useForm } from 'react-hook-form'

import Input from '../Atom/Input'
import Button from '../Atom/Button'

function ChangePassword() {

    const { register, handleSubmit } = useForm()
    return (
        <div className='flex flex-col items-center justify-center 
            sm:col-span-11 md:col-span-6 h-screen sm:max-h-screen sm:overflow-y-auto gap-4
         bg-black text-white border-y border-slate-600'>
            <div className='gap-4 flex flex-col justify-center items-center
        min-w-[70%]  h-auto bg-white text-black rounded-md p-10'>
                <h1>Reset Password</h1>
                <form onSubmit={handleSubmit} className='w-full'>
                    <Input
                        type="password"
                        label="Old Password: "
                        placeholder="Enter old password"
                        className="border text-base w-full px-2 py-2 focus:outline-none focus:border-gray-600"
                        {...register("oldPassword", {
                            required: true
                        })}
                    />
                    <Input
                        type="password"
                        label="New Password: "
                        placeholder="Enter new password"
                        className="border text-base w-full px-2 py-2 focus:outline-none focus:border-gray-600"
                        {...register("newPassword", {
                            required: true
                        })}
                    />
                    <div className='flex m-2 justify-center items-center'>
                        <Button
                            className=''
                            bgColor='bg-black'
                            textColor='text-white'
                        >
                            Submit
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ChangePassword
