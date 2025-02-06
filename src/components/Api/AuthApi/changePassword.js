import { axiosInstance } from "../../../Helpers/axiosService"

const changePassword = async (data) => {    
    const response = await axiosInstance.patch('/users/change-password', data, {
         headers: {
             "Content-Type": "application/json"
         }
     })
     return response.data
 }

 export default changePassword