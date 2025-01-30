import axios from "axios"

const url = "https://blog-api-d2uc.onrender.com/api/v1"

// const url = "http://localhost:8000/api/v1"

const axiosInstance = axios.create({
    baseURL: url,
    withCredentials: true

})

export {axiosInstance}