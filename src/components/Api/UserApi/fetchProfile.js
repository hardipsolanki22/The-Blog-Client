import { axiosInstance } from "../../../Helpers/axiosService"

const fetchUserProfile = async (username) => {
    const response = await axiosInstance.get(`/users/${username}`, {
        headers: {
            "Content-Type": "application/json"
        }
    })

    return response.data
}

export default fetchUserProfile