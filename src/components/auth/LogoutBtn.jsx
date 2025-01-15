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
      <Button className='px-4 py-2 rounded-lg
       hover:bg-white hover:text-black transition
        duration-500 focus:outline-none'
        bgColor='bg-black'
        textColor='text-white'
        onClick={async () => await mutateAsync()}>
        <span className='mr-2'>
          <FontAwesomeIcon icon={faSignOut} />
        </span>
        Logout
      </Button>
    </div>
  )
}

export default LogoutBtn
