import { axiosInstance } from "../../../Helpers/axiosService";

const MAX_PAGE_FOLLOWERS = 4
const fetchFollowers = async ({pageParam = 1},userId) => {
    try {
        const response = await axiosInstance
                        .get(`/subcriptions/get-user-followers/${userId}?page=${pageParam}&limit=${MAX_PAGE_FOLLOWERS}`)        
        return response.data
    } catch (error) {
        console.error(error);
        
    }
}

export default fetchFollowers