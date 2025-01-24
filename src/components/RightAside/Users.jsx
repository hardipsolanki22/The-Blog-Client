import React, { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'


import Button from '../Atoms/Button'
import { useToast } from '../../Helpers/toast'
import { axiosInstance } from '../../Helpers/axiosService'
import getAllUsers from '../Api/UserApi/getAllUsers'
import RightSidebarUsersSkeleton from '../Skeleton/RightSidebarUsersSkeleton'
import { useTheme } from '../Contexts/theme'

function Users() {

    const [isFollowedLoading, setIsFollowedLoading] = useState(false)
    const queryClient = useQueryClient()

    const { data: users, isError, isLoading } = useQuery({
        queryKey: ["users"],
        queryFn: getAllUsers,
        refetchOnWindowFocus: false,
    })

    // FollowUnfollow Handler
    const handleFollowUnfollow = async (userId) => {
        try {
            setIsFollowedLoading(true)
            const response = await axiosInstance.post(`/follows/${userId}/following`)
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
        console.error(isError);
        
    }

    const {themeMode} = useTheme()

    return ! isLoading ? (  <div className='p-3 duration-300 rounded-md border border-slate-600'>
        <h2 className='text-2xl text-center'>Who to follow</h2>
        { users?.data && users?.data?.map((user) => (
                <div className='flex justify-around items-center my-4 ' key={user._id}>
                    <Link to={`/${user.username}`}
                     className={`${themeMode ? 'text-white' : 'text-black'}`}
                    >
                        <div className='flex flex-col items-center justify-center '>
                            <div className=''>
                                <img src={user.avatar}
                                    alt="avatar"
                                    loading='lazy'
                                    className='w-9 h-9 rounded-full'
                                />
                            </div>
                            <p>{user.name}</p>
                        </div>
                    </Link>
                    <Button
                        onClick={() => handleFollowUnfollow(user._id)}
                        className='p-2 rounded-full focus:outline-none'
                        disabled={isFollowedLoading}
                    >
                        Follow
                    </Button>
                </div>
            ))
        }
    </div>) : (<div>
        <RightSidebarUsersSkeleton cards={3} />
    </div>)
}

export default Users