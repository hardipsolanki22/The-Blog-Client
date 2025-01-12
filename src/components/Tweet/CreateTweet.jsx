import React from 'react'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

import { useToast } from '../../Helpers/toast'


function CreateTweet() {

  const { register, handleSubmit } = useForm()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createTweet,
    onSuccess: () => {
      useToast.successToast("Tweet create successfully")
    },
    onError: (error) => {
      useToast.errorToast(error.message)
    }
  })

  const createTweet = async (data) => {
    await mutateAsync(data)
  }
  return (
    <div className='flex flex-col items-center justify-center bg-white text-black
    sm:col-span-11 md:col-span-6 h-screen sm:max-h-screen sm:overflow-y-auto gap-4
    border-y'>
      <div className='gap-4 flex flex-col justify-center items-center
        min-w-[70%] h-auto rounded-md p-10'>
           <p className='text-2xl'>Tweet</p>
        <form onSubmit={handleSubmit(createTweet())} className='w-full'>
          <Input
            type="text"
            label="Content: "
            placeholder="Your thouts..."
            className="border text-base w-full px-2 py-2 focus:outline-none
            transition duration-200 focus:border-gray-600"
            {...register("content", {
              required: true
            })}
          />
          <div className='flex m-1 justify-center items-center'>
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

export default CreateTweet
