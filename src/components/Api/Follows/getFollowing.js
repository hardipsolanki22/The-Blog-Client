import { axiosInstance } from "../../../Helpers/axiosService";

const MAX_PAGE_FOLLOWING = 4
const fetchFollowing = async ({pageParam = 1},userId) => {
    try {
        const response = await axiosInstance
                        .get(`/follows/get-user-followings/${userId}?page=${pageParam}&limit=${MAX_PAGE_FOLLOWING}`)        
        return response.data
    } catch (error) {
        console.error(error);
        
    }
}

export default fetchFollowing