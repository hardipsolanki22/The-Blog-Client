import { axiosInstance } from "../../../Helpers/axiosService"

const MAX_PAGE_POSTS = 2  

const fetchAllPosts = async ({pageParam = 1}) => {    
    const response = await axiosInstance.get(`/posts/?page=${pageParam}&limit=${MAX_PAGE_POSTS}`)
    return response.data
}

export default fetchAllPosts