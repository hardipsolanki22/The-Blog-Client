import { axiosInstance } from "../../../Helpers/axiosService"

const deleteComment = async (commentId) => {    
    const response = await axiosInstance.delete(`/comments/${commentId}`)
    return response.data
}

export default deleteComment