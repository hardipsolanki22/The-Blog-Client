import axios from "axios"
import { axiosInstance } from "../../../Helpers/axiosService"

const searchUser = async (username) => {

    const controller = new AbortController()

    try {
        const response = await axiosInstance.get(`/user/search-user/?username=${username}`, {
            signal: controller.signal,
            headers: {
                "Content-Type": "application/json"
            }
        })

        return response.data
    } catch (error) {
        if (axios.isCancel(error)) {
            console.log(`canceled request: `, error.message);
            return controller.abort()
        }
    }

   
}

export default searchUser