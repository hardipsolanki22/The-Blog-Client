import {axiosInstance} from '../../../Helper/axiosService'

const updatePost = async (data) => {
    const response = await axiosInstance.post(`/post/edit-post/:id`, data, {
        headers: {
            "Content-Type": "application/json"
        }
    })

    return response.data
}

export default updatePost