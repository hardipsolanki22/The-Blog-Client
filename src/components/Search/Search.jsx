import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'


import Input from '../Atoms/Input'
import searchUser from '../Api/UserApi/searchUser'

function Search() {
  const [username, setUsername] = useState(null)


  const { data: users, isLoading, isError } = useQuery({
    queryKey: ["search-user", { username }],
    queryFn: () => searchUser(username)
  })

  if (isError) {
    console.log(`error on serach`, isError);

  }

  return (
    <div className=' sm:col-span-11 md:col-span-6 h-screen sm:max-h-screen 
    sm:overflow-y-auto gap-4 bg-black text-white border-y'>
      <div className='flex justify-center items-center'>
        <form>
          <Input
            type={"text"}
            className="border md:w-[40vw] w-[75vw] rounded-3xl text-base px-2 py-2
             text-black focus:outline-none transition-all duration-100 focus:border-gray-600"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </form>
      </div>
      {!isLoading ? (<div className='flex flex-col mt-20 '>
        {users?.data  && users.data.map((user) => (
          <div key={user._id} className='flex flex-col '>
            <Link  to={`/profile/${user.username}`}
            className='flex gap-4 m-4 text-white'>
              <div>
                <img src={user.avatar}
                  alt={user.username}
                  className='w-12 h-12 rounded-full'
                />
              </div>
              <div>
                <p className='text-xl'>{user.name}</p>
                <p>{user.username}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>) : (<div className='flex justify-center items-center'>
        <p className='text-2xl'>Loading...</p>
      </div>)
      }
    </div>
  )
}

export default Search
