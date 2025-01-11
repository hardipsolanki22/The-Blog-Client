import React, { useState } from 'react'

import PersonalDetailsCart from './PersonalDetailsCart'
import ChangePassword from '../Auth/ChangePassword'
import Button from '../Atoms/Button'

function EditProfile() {

    const [feed, setFeed] = useState("PersonalDetails")

    return (
        <div className='sm:col-span-11 md:col-span-6 border-y '>
            <div className='flex justify-around items-center m-2'>
                <Button
                    className={`p-2 text-black bg-white ${feed === 'following' && 'bg-sky-900 text-white'}`}
                    onClick={() => setFeed("PersonalDetails")}>
                    Personal Details
                </Button>
                <Button
                    className="p-2 text-black bg-white"
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
