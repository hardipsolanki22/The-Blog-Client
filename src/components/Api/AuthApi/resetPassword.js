import { axiosInstance } from "../../../Helper/axiosService"

const resetPassword = async (requestData) => { 

    console.log(`token: ${requestData.token}`);
    console.log(`data: ${JSON.stringify(requestData.data)}`);
    
    
    const response = await axiosInstance.patch(`/user/reset-password?token=${requestData.token}`, requestData.data, {
         headers: {
             "Content-Type": "application/json"
         }
     })
     return response.data
 }

 export default resetPassword