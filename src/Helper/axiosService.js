import axios from "axios"

const url = "/api/v1"

const axiosInstance = axios.create({
    baseURL: url,
    withCredentials: true

})

export {axiosInstance}