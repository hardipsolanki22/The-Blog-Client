import { axiosInstance } from "../../Helper/axiosService"

const signInUser = async (data) => {

    console.log(`loginData: ${JSON.stringify(data)}`);
    
    const response = await axiosInstance.post('/user/login', data, {
         headers: {
             "Content-Type": "application/json"
         }
     })
     return response.data
 }

 export default signInUser