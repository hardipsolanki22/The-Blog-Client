import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router-dom'


import Button from '../Atom/Button'
import { useToast } from '../../Helper/toast'
import getAllUsers from '../Api/UserApi/getAllUsers'

function Users() {

    const { data: users, isError } = useQuery({
        queryKey: ["users"],
        queryFn: getAllUsers,
        staleTime: 3000,
    })

    if (isError) {
        useToast.errorToast(isError.message)
        
    }

    return (
        <div className='text-white p-3 duration-300 rounded-md border'>
            <h2 className='text-2xl'>You might like</h2>
            {
                users?.data?.map((user) => (
                    <div className='flex justify-around items-center my-4 ' key={user._id}>
                        <Link to={`/profile/${user.username}`} className='text-white'>
                            <div className='flex flex-col items-center justify-center '>
                                <div className='w-9 '>
                                    <img src={user.avatar}
                                        alt="avatar"
                                        className='rounded-full'
                                    />
                                </div>
                                <p className=''>{user.name}</p>
                            </div>
                        </Link>
                        <Button
                            className='p-2 rounded-full'>
                            Follow
                        </Button>
                    </div>
                ))
            }
        </div>
    )
}

export default Users