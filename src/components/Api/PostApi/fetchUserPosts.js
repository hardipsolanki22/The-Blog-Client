import { axiosInstance } from "../../../Helper/axiosService"

const   MAX_PAGE_POST = 2  

const fetchUserPosts = async ({pageParam = 1,}, userId) => {
    console.log(`params: ${JSON.stringify(pageParam)}`);
    console.log(`userId: ${userId}`);
    
    const response = await axiosInstance.get(`/post/get-user-all-posts/${userId}
            ?page=${pageParam}&limit=${MAX_PAGE_POST}`)
    return response.data
}

export default fetchUserPosts