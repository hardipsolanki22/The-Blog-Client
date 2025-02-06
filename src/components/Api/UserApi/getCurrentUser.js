import { axiosInstance } from "../../../Helpers/axiosService"

const getCurrentUser = async () => {
    const response = await axiosInstance.get('/users/get-user')
    return response.data
}

export default getCurrentUser