import React from 'react'
import Button from '../Atom/Button'

function Users() {

    const users = [
        { name: 'User1', avatar: 'https://idolkart.com/cdn/shop/articles/Krishna_ke_Naam.jpg?v=1700290012&width=1500' },
        { name: 'User2', avatar: 'https://idolkart.com/cdn/shop/articles/Krishna_ke_Naam.jpg?v=1700290012&width=1500' },
        { name: 'User3', avatar: 'https://idolkart.com/cdn/shop/articles/Krishna_ke_Naam.jpg?v=1700290012&width=1500' },
        // Add more users as needed
    ]

    return (
        <div className='text-white p-3 duration-300 rounded-md border'>
            <h2 className='text-2xl'>You might like</h2>
            {
                users.map((user) => (
                    <div className='flex justify-around items-center my-4 ' key={user.name}>
                        <div className='flex flex-col items-center justify-center '>
                            <div className='w-9 rounded-2xl'>
                                <img src={user.avatar}
                                    alt="avatar"
                                />
                            </div>
                            <p className=''>{user.name}</p>
                        </div>
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
Users