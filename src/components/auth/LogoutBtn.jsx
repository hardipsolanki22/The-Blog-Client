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
import { useTheme } from '../Contexts/theme'

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

  const { themeMode } = useTheme()

  return (
    <div>
      <button className={`md:px-4 md:py-2 sm:px-2 sm:py-1 rounded-lg border text-center
                transition flex duration-150 focus:outline-none md:text-xl md:font-semibold
                 ${themeMode ? 'hover:bg-purple-500 bg-inherit text-white hover:text-white border-slate-400'
                :' hover:bg-blue-500 hover:text-white text-black border-slate-600'}           
           `}
        onClick={async () => await mutateAsync()}>
        <FontAwesomeIcon icon={faSignOut} />
        <span className='md:block sm:hidden ml-2'>Logout</span>
      </button>
    </div >
  )
}

export default LogoutBtn
