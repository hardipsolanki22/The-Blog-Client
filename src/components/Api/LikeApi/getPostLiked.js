import { axiosInstance } from "../../../Helpers/axiosService"

const  MAX_PAGE_POST = 5 

const getPostLikes = async ({pageParam = 1,}, postId) => {    
    const response = await axiosInstance
                .get(`/like/posts/${postId}?page=${pageParam}&limit=${MAX_PAGE_POST}`)
    return response.data
}

export default getPostLikes