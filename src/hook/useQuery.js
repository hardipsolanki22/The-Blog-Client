import { useEffect, useState } from "react"
import { parseErrorMesaage } from "../Helper/parseErrMsg"

const useQuery = (func, dependency = []) => {

    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const fetchData = (formData) => {
        setError(null)
        func(formData)
            .then((data) => {
                setData(data)
            })
            .catch((error) => setError(error.response?.data?.message))
            .finally(() => setIsLoading(false))
    }

    useEffect(() => {
        fetchData()
    }, [...dependency])

    const refetch = (formData) => fetchData(formData);

    return { error, isLoading, data, refetch }
}

export { useQuery }



