import { axiosInstance } from "../../../Helper/axiosService"

const getPost = async (postId) => {
   try {
     const response = await axiosInstance.get(`/post/get-posts/${postId}`)
     return response.data
   } catch (error) {
     throw console.error(error);
     
   }
}

export default getPost