import {axiosInstance} from '../../../Helper/axiosService'

const updatePost = async (postId, data) => {
    const response = await axiosInstance.patch(`/post/update-posts/${postId}`, data, {
        headers: {
            "Content-Type": "application/json"
        }
    })

    return response.data
}

export default updatePost