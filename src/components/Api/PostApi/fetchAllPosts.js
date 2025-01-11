import { axiosInstance } from "../../../Helpers/axiosService"

const   MAX_PAGE_POST = 2  

const fetchAllPosts = async ({pageParam = 1}) => {

    console.log(`pageParams: ${JSON.stringify(pageParam)}`);
    

    const response = await axiosInstance.get(`/post/get-all-posts?page=${pageParam}&limit=${MAX_PAGE_POST}`)
    return response.data
}

export default fetchAllPosts