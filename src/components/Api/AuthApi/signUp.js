import { axiosInstance } from "../../../Helpers/axiosService";

const registerUser = async (data) => {
    const response = await axiosInstance.post('/users/register',data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
    return response.data;
}


export default registerUser