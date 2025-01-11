import React, { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'


import Button from '../Atoms/Button'
import { useToast } from '../../Helpers/toast'
import { axiosInstance } from '../../Helpers/axiosService'
import getAllUsers from '../Api/UserApi/getAllUsers'

function Users() {

    const [isFollowedLoading, setIsFollowedLoading] = useState(false)
    const queryClient = useQueryClient()

    const { data: users, isError } = useQuery({
        queryKey: ["users"],
        queryFn: getAllUsers,
        refetchOnWindowFocus: false,
    })

    // FollowUnfollow Handler
    const handleFollowUnfollow = async (userId) => {
        try {
            setIsFollowedLoading(true)
            const response = await axiosInstance.post(`/subcriptions/${userId}/following`)
            if (response.data.data.following) {
                queryClient.invalidateQueries(["users"])
                useToast.successToast("Follow successfully")
            }
        } catch (error) {
            throw console.error(error.message)
        } finally {
            setIsFollowedLoading(false)
        }
    }

    if (isError) {
        useToast.errorToast(isError.message)
    }

    return (
        <div className='text-white p-3 duration-300 rounded-md border'>
            <h2 className='text-2xl'>Who to follow</h2>
            { users?.data && users?.data?.map((user) => (
                    <div className='flex justify-around items-center my-4 ' key={user._id}>
                        <Link to={`/profile/${user.username}`} className='text-white'>
                            <div className='flex flex-col items-center justify-center '>
                                <div className=''>
                                    <img src={user.avatar}
                                        alt="avatar"
                                        className='w-9 h-9 rounded-full'
                                    />
                                </div>
                                <p className=''>{user.name}</p>
                            </div>
                        </Link>
                        <Button
                            onClick={() => handleFollowUnfollow(user._id)}
                            className='p-2 rounded-full'
                            disabled={isFollowedLoading}
                        >
                            Follow
                        </Button>
                    </div>
                ))
            }
        </div>
    )
}

export default Users