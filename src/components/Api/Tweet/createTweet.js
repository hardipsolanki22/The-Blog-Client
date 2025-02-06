import { axiosInstance } from "../../../Helpers/axiosService";

const createTweet = async (data) => {
    const response = await axiosInstance.post('/tweets/', data, {
        headers: {
            "Content-Type": "application/json"
        }
    })

    return response.data
}

export default createTweet