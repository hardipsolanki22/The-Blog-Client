
import { axiosInstance } from "../../../Helpers/axiosService";   

const logOutUser = async () => {
    const response = await axiosInstance.post("/users/logout",{}, {
        headers: {
            "Content-Type": "application/json"
        }
    });

    return response.data;
}

export default logOutUser