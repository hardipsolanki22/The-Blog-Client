import axios from "axios"

const url = "http://localhost:8000/api/v1"

const axiosInstance = axios.create({
    baseURL: url,
    withCredentials: true

})

export {axiosInstance}