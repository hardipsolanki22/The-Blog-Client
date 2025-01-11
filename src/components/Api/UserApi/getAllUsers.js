import { axiosInstance } from "../../../Helpers/axiosService"

const getAllUsers = async () => {
    const response = await axiosInstance.get('/user/get-all-users', {
        headers: {
               "Content-Type": "application/json"
        }
    })
    return response.data
}

export default getAllUsers