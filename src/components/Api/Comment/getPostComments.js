import { axiosInstance } from "../../../Helper/axiosService"

const  MAX_PAGE_COMMENT = 5 

const getPostCommets = async ({pageParam = 1,}, postId) => {    
    const response = await axiosInstance
                .get(`/comment/get-post-comments/${postId}?page=${pageParam}&limit=${MAX_PAGE_COMMENT}`)
    return response.data
}

export default getPostCommets