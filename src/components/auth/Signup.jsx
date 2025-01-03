import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import Input from '../Atom/Input'
import Button from '../Atom/Button'
import { axiosInstance } from '../../Helper/axiosService'
import { useToast } from '../../Helper/toast'
import { parseErrorMesaage } from '../../Helper/parseErrMsg'
import registerUser from '../Api/signup'

function Signup() {
    const { register, handleSubmit } = useForm()
    const navigate = useNavigate()

    const queryClient = useQueryClient()

    const { mutateAsync, isPending } = useMutation({

        mutationFn: registerUser,

        onSuccess: () => {  
            useToast.successToast("Signup successfully")
            queryClient.invalidateQueries(["users"])
            navigate("/login")
        },
        onError: (error) => {
            useToast.errorToast(error.message)
        }
    })

    const signup = async (data) => {
        const formData = new FormData()
        for (const key in data) {
            formData.append(key, data[key])
        }
        
        formData.append("avatar", data.avatar[0])

        if (data.coverImage) {
            formData.append("coverImage", data.coverImage[0])
        }

        console.log(`formData: ${JSON.stringify(formData)}`);
        
       await mutateAsync(formData)

    }


    return (
        <div className='flex flex-col items-center justify-center 
            sm:col-span-11 md:col-span-6 h-screen sm:max-h-screen sm:overflow-y-auto gap-4
        border-y'>
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
                <form onSubmit={handleSubmit(signup)}>
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
                        {...register("coverImage")}
                    />
                    <div className='flex m-2 justify-center items-center'>
                        <Button
                            className=''
                            bgColor='bg-black'
                            textColor='text-white'
                            type='submit'
                            disabled={isPending}
                        >
                            {isPending ? "Loading..." : "Signup"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}


// const Signup = () => {
//     const { register, handleSubmit } = useForm();
//     const navigate = useNavigate();
//     const queryClient = useQueryClient();

//     const registerUser = async (formData) => {
//         const response = await axiosInstance.post('/user/register', formData, {
//             headers: {
//                 'Content-Type': 'multipart/form-data',
//             },
//         });
//         return response.data;
//     };

//     const { mutateAsync, isLoading } = useMutation({
//         mutationFn: registerUser,
//         onSuccess: () => {
//             useToast.successToast("Signup successfully");
//             queryClient.invalidateQueries(["users"]);
//             navigate("/login");
//         },
//         onError: (error) => {
//             useToast.errorToast(error.message);
//         },
//     });

//     const onSubmit = async (data) => {
//         const formData = new FormData();
//         for (const key in data) {
//             if (key === "avatar" || key === "coverImage") {
//                 formData.append(key, data[key][0]);
//             }
//             formData.append(key, data[key]);
//         }
//         console.log(`formData: ${JSON.stringify(formData)}`);
        
//         await mutateAsync(formData);
//     };

//     return (
//         <div className='flex flex-col items-center justify-center sm:col-span-11 md:col-span-6 h-screen sm:max-h-screen sm:overflow-y-auto gap-4 border-y'>
//             <div className='gap-4 flex flex-col justify-center items-center w-auto h-auto bg-white text-black rounded-md p-5'>
//                 <h1>Signup</h1>
//                 <div>
//                     <p>Signup to create your account</p>
//                     <p>
//                         Do you have an account?
//                         <Link to={"/login"}>Login</Link>
//                     </p>
//                 </div>
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                     <Input
//                         type="text"
//                         label="Name: "
//                         placeholder="Enter your name"
//                         className="border text-base w-full px-2 py-2 focus:outline-none focus:border-gray-600"
//                         {...register("name", { required: true })}
//                     />
//                     <Input
//                         type="text"
//                         label="Username: "
//                         placeholder="Enter your username"
//                         className="border text-base w-full px-2 py-2 focus:outline-none focus:border-gray-600"
//                         {...register("username", { required: true })}
//                     />
//                     <Input
//                         type="email"
//                         label="Email: "
//                         placeholder="Enter your email"
//                         className="border text-base w-full px-2 py-2 focus:outline-none focus:border-gray-600"
//                         {...register("email", { required: true })}
//                     />
//                     <Input
//                         type="password"
//                         label="Password: "
//                         placeholder="Enter your password"
//                         className="border text-base w-full px-2 py-2 focus:outline-none focus:border-gray-600"
//                         {...register("password", { required: true })}
//                     />
//                     <Input
//                         type="file"
//                         label="Avatar: "
//                         {...register("avatar", { required: true })}
//                     />
//                     <Input
//                         type="file"
//                         label="Cover Image: "
//                         {...register("coverImage")}
//                     />
//                     <div className='flex m-2 justify-center items-center'>
//                         <Button
//                             className=''
//                             bgColor='bg-black'
//                             textColor='text-white'
//                             type='submit'
//                             disabled={isLoading}
//                         >
//                             {isLoading ? "Loading..." : "Signup"}
//                         </Button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

export default Signup


