import React from 'react'



import Input from '../Atom/Input'
import { useForm } from 'react-hook-form'
import Button from '../Atom/Button'

function Search() {
  const { register, handleSubmit } = useForm()

  return (
    <div  className='flex justify-center
            sm:col-span-11 md:col-span-6 h-screen sm:max-h-screen sm:overflow-y-auto gap-4
         bg-black text-white border-y border-slate-600'>
      <form onSubmit={handleSubmit}>
        {/* TODO serach without clicking btn */}
        <Input
          type="search"
          className="border md:w-[40vw] w-[75vw] rounded-3xl text-base px-2 py-2 text-black focus:outline-none
           focus:border-gray-600"
          placeholder="xyz..."
          {...register("search", {
            required: true
          })}
        />
      </form>
    </div>
  )
}

export default Search
