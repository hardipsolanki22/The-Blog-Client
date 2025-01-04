import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {useSelector} from 'react-redux'


function Protected({ children, authentication = true }) {

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

    return !loading ? (children) : <><h1>Loading...</h1></>
}

export default Protected
