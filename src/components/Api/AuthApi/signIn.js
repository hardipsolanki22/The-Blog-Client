import { axiosInstance } from "../../../Helpers/axiosService"

const signInUser = async (data) => {
    const response = await axiosInstance.post('/users/login', data, {
         headers: {
             "Content-Type": "application/json"
         }
     })
     return response.data
 }

 export default signInUser