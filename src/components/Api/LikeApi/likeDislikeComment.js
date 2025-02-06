import { axiosInstance } from "../../../Helpers/axiosService"

const likeDislikeComment = async ({commentId, type}) => {        
    const response = await axiosInstance.post(`/like/commets/${commentId}?type=${type}`)
    return response.data
}

export default likeDislikeComment