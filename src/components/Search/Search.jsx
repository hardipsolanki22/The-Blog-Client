import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


import Input from '../Atoms/Input'
import searchUser from '../Api/UserApi/searchUser'
import UsersSkeleton from '../Skeleton/UsersSkeleton'
import { useTheme } from '../Contexts/theme'

function Search() {
  const [username, setUsername] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [users, setUsers] = useState([])


  const serachUserHandler = async () => {
    try {
      setIsLoading(true)
      const users = await searchUser(username)
      setUsers(users)

    } catch (error) {
      console.error(`error: `, error.message);

    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    serachUserHandler()
  }, [username])




  const { themeMode } = useTheme()

  return (
    <div className='sm:col-span-11 md:col-span-6 h-screen sm:max-h-screen 
      sm:no-scrollbar sm:overflow-y-auto gap-4 sm:border-y border-slate-600'>
      <div className='flex justify-center items-center'>
        <form>
          <Input
            type="text"
            className="border md:w-[40vw] w-[75vw] rounded-3xl text-base px-2 py-2
             text-black focus:outline-none transition-all duration-100 focus:border-gray-600"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </form>
      </div>
      {!isLoading ? (<div className='flex flex-col mt-20 '>
        {users?.data && users.data.map((user) => (
          <div key={user._id} className='flex flex-col '>
            <Link to={`/${user.username}`}
              className={`flex gap-4 m-4 ${themeMode ? 'text-white' : 'text-black'}`}>
              <div>
                <img src={user.avatar}
                  alt={user.username}
                  loading='lazy'
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
      </div>) : (<div className='flex flex-col justify-center items-center'>
        <UsersSkeleton cards={4} />
      </div>)
      }
    </div>
  )
}

export default Search
