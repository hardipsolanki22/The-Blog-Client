import React from 'react'

function Like() {

  const users = [
    { name: 'User1', avatar: 'https://idolkart.com/cdn/shop/articles/Krishna_ke_Naam.jpg?v=1700290012&width=1500' },
    { name: 'User2', avatar: 'https://idolkart.com/cdn/shop/articles/Krishna_ke_Naam.jpg?v=1700290012&width=1500' },
    { name: 'User3', avatar: 'https://idolkart.com/cdn/shop/articles/Krishna_ke_Naam.jpg?v=1700290012&width=1500' },
    // Add more users as needed
  ]
  return (
    <div className='border-slate-400 bg-white text-black mt-4 p-6 duration-300'>
      {
        users.map((user) => (
          <div className='flex justify-around items-center my-4 ' key={user.name}>
        <div className='flex '>
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


