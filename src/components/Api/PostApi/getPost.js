import { axiosInstance } from "../../../Helpers/axiosService"

const getPost = async (postId) => {
   try {
     const response = await axiosInstance.get(`/posts/${postId}`)
     return response.data
   } catch (error) {
     throw console.error(error);
     
   }
}

export default getPost