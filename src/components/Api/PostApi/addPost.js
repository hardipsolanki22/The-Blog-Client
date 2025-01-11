import {axiosInstance} from '../../../Helpers/axiosService'

const addPost = async (data) => {
    const response = await axiosInstance.post('/post/add-post', data, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })

    return response.data
}

export default addPost