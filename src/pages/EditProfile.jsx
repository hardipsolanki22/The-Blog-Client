import React, { useState } from 'react'

import PersonalDetailsCart from '../components/Profile/PersonalDetailsCart'
import ChangePassword from '../components/auth/ChangePassword'
import Button from '../components/Atoms/Button'
import { useTheme } from '../components/Contexts/theme'

function EditProfile() {

    const [feed, setFeed] = useState("PersonalDetails")
    const {themeMode} = useTheme()

    return (
        <div className='sm:col-span-11 md:col-span-6'>
            <div className='flex justify-around items-center m-2'>
                <Button
                    className={`p-2 focus:outline-none
                        ${feed === 'PersonalDetails' && `${themeMode ? 
                            'text-white border-b-4 hover:border-purple-500 border-purple-500'
                                    : 'text-black border-b-4  hover:border-blue-500 border-blue-500'}`
                                }`}
                    onClick={() => setFeed("PersonalDetails")}>
                    Personal Details
                </Button>
                <Button
                    className={`p-2 focus:outline-none
                        ${feed === 'ChangePassword' && `${themeMode ? 
                            'text-white border-b-4 hover:border-purple-500 border-purple-500'
                                    : 'text-black border-b-4  hover:border-blue-500 border-blue-500'}`
                                }`}
                    onClick={() => setFeed("ChangePassword")}>
                    Change Password
                </Button>
            </div>
            {feed === "PersonalDetails" ? (
                <PersonalDetailsCart />
            ) : <ChangePassword />
            }
        </div>)

}

export default EditProfile
