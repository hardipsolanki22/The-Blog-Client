import { axiosInstance } from "../../../Helpers/axiosService"

const deletePost = async (postId) => {
    const response = await axiosInstance.delete(`/posts/${postId}`)
    return response.data
}

export default deletePost