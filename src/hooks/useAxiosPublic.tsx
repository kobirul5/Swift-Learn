import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://swift-learn-server-fnu4.vercel.app'
})
const useAxiosPublic = () => {
    return axiosPublic
};

export default useAxiosPublic;