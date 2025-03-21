import { axiosInstance } from "../../../Helpers/axiosService"

const forgetPassword = async (data) => {    
    const response = await axiosInstance.post('/users/forger-password', data, {
         headers: {
             "Content-Type": "application/json"
         }
     })
     return response.data
 }

 export default forgetPassword