import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { DNA } from 'react-loader-spinner'


function AuthLayout({ children, authentication = true }) {
    const authStatus = useSelector(state => state.auth.status)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (authentication && authStatus !== authentication) {
            navigate('/login')
        } else if (!authentication && authStatus !== authentication) {
            navigate('/')
        }
        setLoading(false)
    }, [authStatus, navigate, authentication])

    return !loading ? (children) : (<div className='h-screen w-full flex flex-col justify-center items-center'>
        <DNA />
        <p className='text-2xl font-semibold text-white'>The Blog is waiting</p>
    </div>)
}

export default AuthLayout

