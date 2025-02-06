import { axiosInstance } from "../../../Helpers/axiosService"

const MAX_PAGE_POST = 2  

const fetchFollowingPost = async ({pageParam = 1,}, userId) => {
    const response = await axiosInstance
                .get(`posts/follow/posts?page=${pageParam}&limit=${MAX_PAGE_POST}`)
    return response.data
}

export default fetchFollowingPost