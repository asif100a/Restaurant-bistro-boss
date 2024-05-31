import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
    const { user, isLoading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        enabled: !isLoading,
        queryFn: async function () {
            const { data } = await axiosSecure(`/users/admin/${user?.email}`);
            return data?.admin;
        }
    });
    return [isAdmin, isAdminLoading];
};

export default useAdmin;