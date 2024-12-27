import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'


function Protected({children, authentication = true}) {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)

    // const authStatus = useSelector(state => state.auth.status)
    const authStatus = true

    useEffect(() => {
        if (authentication && authStatus !== authentication) {
            navigate('/login')
        } else if(!authentication && authStatus !== authentication) {
            navigate('/')
        }
        setLoading(false)
    }, [authStatus, navigate, authentication])

  return !loading ? (children) : <><h1>Loading...</h1></>
}

export default Protected
