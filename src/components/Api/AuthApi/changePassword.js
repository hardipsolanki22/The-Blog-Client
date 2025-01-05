import { axiosInstance } from "../../../Helper/axiosService"

const changePassword = async (data) => {    
    const response = await axiosInstance.patch('/user/change-password', data, {
         headers: {
             "Content-Type": "application/json"
         }
     })
     return response.data
 }

 export default changePassword