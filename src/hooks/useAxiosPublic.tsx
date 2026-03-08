import axios from "axios";

const axiosPublic = axios.create({
    // baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'
    baseURL: "https://swift-learn.onrender.com/api/v1"
})
const useAxiosPublic = () => {
    return axiosPublic
};

export default useAxiosPublic;