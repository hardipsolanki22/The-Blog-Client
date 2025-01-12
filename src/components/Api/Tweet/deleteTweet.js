import { axiosInstance } from "../../../Helpers/axiosService";

const deleteTweet = async (tweetId) => {
    const response = await axiosInstance.delete(`/tweet/delete-tweets/${tweetId}`, {
        headers: {
            "Content-Type": "application/json"
        }
    })

    return response.data
}

export default deleteTweet