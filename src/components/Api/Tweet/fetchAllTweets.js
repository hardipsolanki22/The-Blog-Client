import { axiosInstance } from "../../../Helpers/axiosService";

const MAX_PAGE_TWEETS = 5
const fetchAllTweets = async ({pageParam = 1}) => {

    const response = await axiosInstance.get(`/tweets/?page=${pageParam}&limit=${MAX_PAGE_TWEETS}`, {
        headers: {
            "Content-Type": "application/json"
        }
    })

    return response.data
}

export default fetchAllTweets