import { axiosInstance } from "../../Helper/axiosService"

const getCurrentUser = async () => {
    const response = await axiosInstance.get('/user/get-user', {
        headers: {
               "Content-Type": "application/json"
        }
    })
    return response.data
}

export default getCurrentUser