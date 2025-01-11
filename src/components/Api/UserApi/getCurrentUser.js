import { axiosInstance } from "../../../Helpers/axiosService"

const getCurrentUser = async () => {
    const response = await axiosInstance.get('/user/get-user')
    return response.data
}

export default getCurrentUser