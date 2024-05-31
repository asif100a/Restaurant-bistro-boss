import axios from "axios";

const useAxiosPublic = () => {
    const axiosPublic = axios.create({
        baseURL: 'https://restaurant-bistro-boss.vercel.app'
    });

    return axiosPublic;
};

export default useAxiosPublic;