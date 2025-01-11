
import { axiosInstance } from "../../../Helpers/axiosService";   

const logOutUser = async () => {
    const response = await axiosInstance.post("/user/logout",{}, {
        headers: {
            "Content-Type": "application/json"
        }
    });

    return response.data;
}

export default logOutUser