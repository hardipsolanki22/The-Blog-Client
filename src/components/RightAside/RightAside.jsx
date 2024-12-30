import React from 'react'
import { useForm } from 'react-hook-form'

import Users from './Users'
import Input from '../Atom/Input'

function RightAside() {

  const { register, handleSubmit } = useForm()
  return (
    <aside className='md:col-span-3 md:block hidden border'>
      <div className='flex flex-col gap-4 p-4'>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="xyz..."
            className="border rounded-2xl text-base w-full px-2 py-2 text-black focus:outline-none focus:border-gray-600"
            {...register("search", {
              required: true
            })}
          />
        </form>
        <Users />
      </div>
    </aside>
  )
}

export default RightAside
