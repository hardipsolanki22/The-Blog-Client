import { axiosInstance } from "../../../Helpers/axiosService"

const updateProfile = async (data) => {
    const response = await axiosInstance.patch('/user/update-account-details', data,{
        headers: {
            "Content-Type": "application/json"
        }
    })

    return response.data
}

export default updateProfile