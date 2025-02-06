import { axiosInstance } from "../../../Helpers/axiosService"

const MAX_PAGE_COMMENTS = 5 

const getPostCommets = async ({pageParam = 1,}, postId) => {    
    const response = await axiosInstance
                .get(`/comments/posts/${postId}?page=${pageParam}&limit=${MAX_PAGE_COMMENTS}`)
    return response.data
}

export default getPostCommets