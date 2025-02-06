import {axiosInstance} from '../../../Helpers/axiosService'

const updatePost = async (post) => {
    const response = await axiosInstance.patch(`/posts/${post._id}`, post.data, {
        headers: {
            "Content-Type": "application/json"
        }
    })

    return response.data
}

export default updatePost