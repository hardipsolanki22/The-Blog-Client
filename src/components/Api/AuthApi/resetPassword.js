import { axiosInstance } from "../../../Helpers/axiosService"

const resetPassword = async (requestData) => {     
    const response = await axiosInstance.patch(`/users/reset-password?token=${requestData.token}`, requestData.data, {
         headers: {
             "Content-Type": "application/json"
         }
     })
     return response.data
 }

 export default resetPassword