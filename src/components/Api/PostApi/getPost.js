import { axiosInstance } from "../../../Helper/axiosService"

const getPost = async () => {
    const response = await axiosInstance.get(`/post/get-posts:${postId}`)
    return response.data
}

export default getPost