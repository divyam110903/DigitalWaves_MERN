import axios from "axios";

export const axiosInstance=axios.create({
    baseURL:"http://localhost:2200",
    withCredentials:true,
})

export default axiosInstance; 