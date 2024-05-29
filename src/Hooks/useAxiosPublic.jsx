import axios from "axios";

const useAxiosPublic = () => {
    const axiosPublic = axios.create({
        baseURL: 'http://localhost:7000'
    });

    return axiosPublic;
};

export default useAxiosPublic;