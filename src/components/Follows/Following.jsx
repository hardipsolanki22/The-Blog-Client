import React from 'react'
import Button from '../Atom/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons/faClose';

import Follow from './follow';
import { useNavigate, useParams } from 'react-router-dom';



function Following() {
  const navigate = useNavigate()
  const {username} = useParams()

    
  const users = [
    { name: 'User1', avatar: 'https://idolkart.com/cdn/shop/articles/Krishna_ke_Naam.jpg?v=1700290012&width=1500' },
    { name: 'User2', avatar: 'https://idolkart.com/cdn/shop/articles/Krishna_ke_Naam.jpg?v=1700290012&width=1500' },
    { name: 'User3', avatar: 'https://idolkart.com/cdn/shop/articles/Krishna_ke_Naam.jpg?v=1700290012&width=1500' },
    { name: 'User1', avatar: 'https://idolkart.com/cdn/shop/articles/Krishna_ke_Naam.jpg?v=1700290012&width=1500' },
    { name: 'User2', avatar: 'https://idolkart.com/cdn/shop/articles/Krishna_ke_Naam.jpg?v=1700290012&width=1500' },
    { name: 'User3', avatar: 'https://idolkart.com/cdn/shop/articles/Krishna_ke_Naam.jpg?v=1700290012&width=1500' },
    { name: 'User1', avatar: 'https://idolkart.com/cdn/shop/articles/Krishna_ke_Naam.jpg?v=1700290012&width=1500' },
    { name: 'User2', avatar: 'https://idolkart.com/cdn/shop/articles/Krishna_ke_Naam.jpg?v=1700290012&width=1500' },
    { name: 'User3', avatar: 'https://idolkart.com/cdn/shop/articles/Krishna_ke_Naam.jpg?v=1700290012&width=1500' },
    { name: 'User1', avatar: 'https://idolkart.com/cdn/shop/articles/Krishna_ke_Naam.jpg?v=1700290012&width=1500' },
    { name: 'User2', avatar: 'https://idolkart.com/cdn/shop/articles/Krishna_ke_Naam.jpg?v=1700290012&width=1500' },
    { name: 'User3', avatar: 'https://idolkart.com/cdn/shop/articles/Krishna_ke_Naam.jpg?v=1700290012&width=1500' },
    // Add more users as needed
  ]

  return (
    <div className='sm:col-span-11 md:col-span-6 max-h-screen sm:overflow-y-auto border-y'>
        <Button className=' mt-2 ml-4 p-1 font-bold' onClick={() => navigate(`/profile/${username}`)}>
          <FontAwesomeIcon icon={faClose} />
        </Button>
        <div className='flex justify-center items-center'>
          <h1 className=''>Followings</h1>
        </div>
      {
        users.map((user) => (
          <div className='my-6 flex justify-around items-center' key={user.name}>
            <div className='flex justify-center items-center'>
              <div className='mr-2'>
                <img src={user.avatar}
                  alt="avatar"
                  className='w-14 h-12 rounded-full'
                />
              </div>
              <p>{user.name}</p>
            </div>
           <div className='flex justify-center items-center'>
           <button className='bg-sky-700 text-white px-4 py-2 rounded-full'>
              Follow
            </button>
           </div>
          </div>
        ))
      }
    </div>
  )
}

export default Following
