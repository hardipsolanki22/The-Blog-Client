import { axiosInstance } from "../../../Helper/axiosService"

const deleteComment = async (commentId) => {    
    const response = await axiosInstance.delete(`/comment/delete-comments/${commentId}`)
    return response.data
}

export default deleteComment