import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import { useMutation } from '@tanstack/react-query'

import Input from '../Atoms/Input'
import Button from '../Atoms/Button'
import { useToast } from '../../Helpers/toast'
import resetPassword from '../Api/AuthApi/resetPassword'
import { Oval } from 'react-loader-spinner'
import { parseErrorMesaage } from '../../Helpers/parseErrMsg'

function ResetPassword() {

  const navigate = useNavigate()
  const locaiton = useLocation()
  const queryParams = new URLSearchParams(locaiton.search)
  const token = queryParams.get("token")

  const { register, handleSubmit, formState: { errors } } = useForm()

  // reset password 
  const { mutateAsync, isPending } = useMutation({
    mutationFn: resetPassword,
    onSuccess: (response) => {
      useToast.successToast("😊 " + response.message)
      navigate("/login")
    },
    onError: (error) => {
      const message = error.response.data.message || "Something want to wrong"
      useToast.errorToast("😐 " + message)
    }
  })

  const resetPasswordHandler = async (data) => {
    const requestData = { token, data }
    await mutateAsync(requestData)
  }

  return (
    <div className='flex flex-col items-center justify-center 
            sm:col-span-11 md:col-span-6 h-screen sm:max-h-screen sm:overflow-y-auto gap-4
         border-y border-slate-600'>
      <div className='gap-4 flex flex-col justify-center items-center
        min-w-[60%] h-auto border border-violet-600 rounded-md p-10'>
        <p className='text-2xl'>Reset Password</p>
        <form onSubmit={handleSubmit(resetPasswordHandler)} className='w-full'>
          <Input
            type="password"
            label="New Password: "
            placeholder="Enter new password"
            className="border text-base w-full px-2 py-2 focus:outline-none
            transition duration-200 focus:border-gray-600 text-black"
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
            type="password"
            label="Conform Password: "
            placeholder="Enter same password"
            className="border text-base w-full px-2 py-2 focus:outline-none
              transition duration-200 text-black focus:border-gray-600"
            {...register("conformPassword", {
              required: true,
              validate: {
                matchPatern: (value) => /^(?=.{8,})/gm.test(value)
                  || "Password must be at least 8 characters long.",
              }
            })}
          />
          {errors.conformPassword && <p className='text-red-500'>{errors.conformPassword.message}</p>}
          <div className='flex m-2 justify-center items-center'>
            <Button
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
                : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword
