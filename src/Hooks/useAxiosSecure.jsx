import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
    baseURL: 'https://restaurant-bistro-boss.vercel.app',
});

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const {signOutUser} = useAuth();

    axiosSecure.interceptors.request.use(function(config) {
        const token = localStorage.getItem('access-token');
        config.headers.authorization = `Bearer ${token}`;
        return config;
    }, function(error) {
        // if error do something
        return Promise.reject(error);
    });

    axiosSecure.interceptors.response.use(function(response) {
        return response;

    }, async function(error) {
        // if error sign out the user and move to the sign in page
        if(error.response.status === 401 || error.response.status === 403) {
            await signOutUser();
            navigate('/sign_in');
        }
        return Promise.reject(error);
    });
    
    return axiosSecure;
};

export default useAxiosSecure;