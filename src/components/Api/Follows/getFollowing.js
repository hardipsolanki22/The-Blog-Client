import { axiosInstance } from "../../../Helper/axiosService";

const MAX_PAGE_POST = 2
const fetchFollowing = async ({pageParam = 1},userId) => {
    try {
        const response = await axiosInstance
                        .get(`/subcriptions/get-user-followings/${userId}?page=${pageParam}&limit=${MAX_PAGE_POST}`)        
        return response.data
    } catch (error) {
        console.error(error);
        
    }
}

export default fetchFollowing