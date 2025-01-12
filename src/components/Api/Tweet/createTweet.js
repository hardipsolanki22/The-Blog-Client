import { axiosInstance } from "../../../Helpers/axiosService";

const createTweet = async (data) => {
    const response = await axiosInstance.post('/tweet/create-tweet', data, {
        headers: {
            "Content-Type": "application/json"
        }
    })

    return response.data
}

export default createTweet