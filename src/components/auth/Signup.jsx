import React from 'react'
import Input from '../Atom/Input'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Button from '../Atom/Button'

function Signup() {

    const { register, handleSubmit } = useForm()

    return (
        <div className='flex flex-col items-center justify-center 
            sm:col-span-11 md:col-span-6 h-screen sm:max-h-screen sm:overflow-y-auto gap-4
         bg-black text-white border-y border-slate-600'>
            <div className='gap-4 flex flex-col justify-center items-center
        w-auto h-auto bg-white text-black rounded-md p-5'>
                <h1>Signup</h1>
                <div>
                    <p>Signup to create your account</p>
                    <p>
                        Do you have an account ?
                        <Link to={"/login"}>
                            Login
                        </Link>
                    </p>
                </div>
                <form onSubmit={handleSubmit}>
                    <Input
                        type="text"
                        label="Name: "
                        placeholder="Enter your name"
                        className="border text-base w-full px-2 py-2 focus:outline-none focus:border-gray-600"
                        {...register("name", {
                            required: true
                        })}
                    />
                    <Input
                        type="text"
                        label="Username: "
                        placeholder="Enter your username"
                        className="border text-base w-full px-2 py-2 focus:outline-none focus:border-gray-600"
                        {...register("username", {
                            required: true
                        })}
                    />
                    <Input
                        type="email"
                        label="Email: "
                        placeholder="Enter your email"
                        className="border text-base w-full px-2 py-2 focus:outline-none focus:border-gray-600"
                        {...register("email", {
                            required: true
                        })}
                    />
                    <Input
                        type="password"
                        label="Password: "
                        placeholder="Enter your password"
                        className="border text-base w-full px-2 py-2 focus:outline-none focus:border-gray-600"
                        {...register("password", {
                            required: true
                        })}
                    />
                    <Input
                        type="file"
                        label="Avatar: "
                        {...register("avatar", {
                            required: true
                        })}
                    />
                    <Input
                        type="file"
                        label="Cover Image: "
                        {...register("coverImage", {
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

export default Signup
