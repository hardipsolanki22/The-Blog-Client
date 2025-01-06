import {axiosInstance} from '../../../Helper/axiosService'

const updatePost = async (post) => {
    const response = await axiosInstance.patch(`/post/update-posts/${post._id}`, post.data, {
        headers: {
            "Content-Type": "application/json"
        }
    })

    return response.data
}

export default updatePost