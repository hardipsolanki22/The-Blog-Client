import React from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'

import Button from '../Atoms/Button'
import Input from '../Atoms/Input'
import { useToast } from '../../Helpers/toast'
import forgetPassword from '../Api/AuthApi/forgetPassword'
import { Oval } from 'react-loader-spinner'

function ForgetPassword() {

  const { register, handleSubmit } = useForm()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: forgetPassword,
    onSuccess: () => {
      useToast.successToast("Email send successfully")
    },
    onError: (error) => {
      useToast.errorToast(error.message)
    }
  })

  const sendEmailHandler = async (data) => {
    await mutateAsync(data)
  }

  return (
    <div className='flex flex-col items-center justify-center 
            sm:col-span-11 md:col-span-6 h-screen sm:max-h-screen sm:overflow-y-auto gap-4
         border-y'>
      <div className='gap-4 flex flex-col justify-center items-center
        min-w-[70%] h-auto bg-white text-black rounded-md p-10'>
        <form onSubmit={handleSubmit(sendEmailHandler)} className='w-full'>
          <Input
            type="email"
            label="Email: "
            placeholder="Enter your email"
            className="border text-base w-full px-2 py-2 focus:outline-none
            transition duration-200 focus:border-gray-600"
            {...register("email", {
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

export default ForgetPassword
