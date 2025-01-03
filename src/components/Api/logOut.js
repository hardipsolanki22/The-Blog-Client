
import {axiosInstance} from "../../Api";    

const logOutUser = async () => {
    const response = await axiosInstance.post("/user/logout", {
        header: {
            "Content-Type": "application/json"
        }
    });

    return response.data;
}

export default logOutUser