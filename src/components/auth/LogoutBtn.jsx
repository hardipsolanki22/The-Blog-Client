import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'
import { faSignOut } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'


import Button from '../Atoms/Button'
import logOutUser from '../Api/AuthApi/logOut'
import { useToast } from '../../Helpers/toast'
import { logout } from '../../featured/authSlice'

function LogoutBtn() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const queryClient = useQueryClient()

  const { mutateAsync } = useMutation({
    mutationFn: logOutUser,
    onSuccess: () => {
      queryClient.clear()
      dispatch(logout())
      useToast.successToast("Logout successfully")
      navigate("/login")
    },

    onError: (error) => {
      useToast.errorToast(error.message)
    }

  })

  // const logOutHandler = async () => {
  //   await mutateAsync()
  // }

  return (
    <div>
      <Button className='md:px-4 md:py-2 sm:px-2 sm:py-1 rounded-lg
       hover:bg-white hover:text-black transition flex
        duration-500 focus:outline-none md:text-xl md:font-semibold'
        bgColor='bg-black'
        textColor='text-white'
        onClick={async () => await mutateAsync()}>
          <FontAwesomeIcon icon={faSignOut} />
=      <span className='md:block sm:hidden ml-2'>Logout</span>
      </Button>
    </div>
  )
}

export default LogoutBtn
