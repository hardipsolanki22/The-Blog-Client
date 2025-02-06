import { axiosInstance } from "../../../Helpers/axiosService"

const likeDislikeTweet = async ({tweetId, type}) => {        
    const response = await axiosInstance.post(`/like/tweets/${tweetId}?type=${type}`)
    return response.data
}

export default likeDislikeTweet