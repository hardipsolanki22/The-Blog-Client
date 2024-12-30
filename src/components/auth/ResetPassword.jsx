import React from 'react'
import { useLocation } from 'react-router-dom'

import Input from '../Atom/Input'
import { useForm } from 'react-hook-form'
import Button from '../Atom/Button'

function ResetPassword() {

  const locaiton = useLocation()
  const queryParams = new URLSearchParams(locaiton.search)
  const token = queryParams.get("token")

  const { register, handleSubmit } = useForm()

  console.log(`location: ${JSON.stringify(locaiton)}`);
  console.log(`queryParams: ${JSON.stringify(queryParams)}`);
  console.log(`register: ${JSON.stringify({ ...register })}`);

  return (
    <div className='flex flex-col items-center justify-center 
            sm:col-span-11 md:col-span-6 h-screen sm:max-h-screen sm:overflow-y-auto gap-4
         border-y'>
      <div className='gap-4 flex flex-col justify-center items-center
        min-w-[60%] h-auto bg-white text-black rounded-md p-10'>
        <h1>Reset Password</h1>
        <form onSubmit={handleSubmit} className='w-full'>
          <Input
            type="password"
            label="New Password: "
            placeholder="Enter new password"
            className="border text-base w-full px-2 py-2 focus:outline-none focus:border-gray-600"
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
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword
