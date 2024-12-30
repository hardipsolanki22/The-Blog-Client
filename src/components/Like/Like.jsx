
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightArrowLeft, faClose } from '@fortawesome/free-solid-svg-icons'
import Button from '../Atom/Button'



function Like({ likeState }) {

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
    <div className='absolute top-20 sm:sticky w-full h-[87vh] sm:h-[50vh] overflow-y-auto rounded-md
    border-x border-slate-400 bg-white text-black sm:mt-4 p-2 duration-300'>
        <Button className='p-1 font-bold' onClick={() => likeState(false)}>
          <FontAwesomeIcon icon={faClose} />
        </Button>
        <div className='flex justify-center items-center'>
          <h1 className=''>Likes</h1>
        </div>
      {
        users.map((user) => (
          <div className='my-6 flex justify-around items-center' key={user.name}>
            <div className='flex'>
              <div className='w-12 h-12 rounded-2xl'>
                <img src={user.avatar}
                  alt="avatar"
                />
              </div>
              <p>{user.name}</p>
            </div>
            <button className='bg-sky-700 text-white px-4 py-2 rounded-full'>
              Follow
            </button>
          </div>
        ))
      }
    </div>
  )
}

export default Like


