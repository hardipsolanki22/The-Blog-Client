import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import { useMutation } from '@tanstack/react-query'

import Input from '../Atoms/Input'
import Button from '../Atoms/Button'
import { useToast } from '../../Helpers/toast'
import resetPassword from '../Api/AuthApi/resetPassword'

function ResetPassword() {

  const navigate = useNavigate()
  const locaiton = useLocation()
  const queryParams = new URLSearchParams(locaiton.search)
  const token = queryParams.get("token")

  console.log(`location: ${JSON.stringify(locaiton)}`);
  console.log(`queryParams: ${JSON.stringify(queryParams)}`);


  const { register, handleSubmit } = useForm()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
        useToast.successToast("Password reset successfully")
        navigate("/login")
    },
    onError: (error) => {
        useToast.errorToast(error.message)
    }
})

  const resetPasswordHandler = async (data) => {
    const requestData = {token, data}
    await mutateAsync(requestData)
  }

  return (
    <div className='flex flex-col items-center justify-center 
            sm:col-span-11 md:col-span-6 h-screen sm:max-h-screen sm:overflow-y-auto gap-4
         border-y'>
      <div className='gap-4 flex flex-col justify-center items-center
        min-w-[60%] h-auto bg-white text-black rounded-md p-10'>
      <p className='text-2xl'>Reset Password</p>
        <form onSubmit={handleSubmit(resetPasswordHandler)} className='w-full'>
          <Input
            type="password"
            label="New Password: "
            placeholder="Enter new password"
            className="border text-base w-full px-2 py-2 focus:outline-none
            transition duration-200 focus:border-gray-600"
            {...register("password", {
              required: true
            })}
          />
          <Input
            type="password"
            label="Conform Password: "
            placeholder="Enter same password"
            className="border text-base w-full px-2 py-2 focus:outline-none focus:border-gray-600"
            {...register("conformPassword", {
              required: true
            })}
          />
          <div className='flex m-2 justify-center items-center'>
            <Button
              className=''
              bgColor='bg-black'
              textColor='text-white'
              disabled={isPending}
            >
               {isPending ? "Loading" : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword
