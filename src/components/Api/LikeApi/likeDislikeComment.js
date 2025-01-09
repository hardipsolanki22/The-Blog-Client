import { axiosInstance } from "../../../Helper/axiosService"

const likeDislikeComment = async ({commentId, type}) => {    
    console.log('id: ', commentId);
    console.log('type: ', type);
    
    const response = await axiosInstance.post(`/like/create-comment-likes/${commentId}?type=${type}`)
    return response.data
}

export default likeDislikeComment