import React from 'react'
import {useQuery} from '@tanstack/react-query'

import Button from '../Atom/Button'
import logOutUser from '../Api/logOut'
import { useToast } from '../../Helper/toast'

const { isSuccess,isError } = useQuery({
  queryFn: () => logOutUser,
})

if (isSuccess) {
  useToast.successToast("Logout successfully")
}

if (isError) {
  useToast.errorToast(isError)
}

function LogoutBtn() {
  return (
    <div>
      <Button onClick={logOutUser}>
        Logout
      </Button>
    </div>
  )
}

export default LogoutBtn
