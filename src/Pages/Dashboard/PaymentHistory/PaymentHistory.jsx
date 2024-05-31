import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";

const PaymentHistory = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    console.log(user)

    const { data: payments, error, isError, isLoading } = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/payments/${user?.email}`);
            return data;
        }
    });
    console.log(payments)

    return (
        <div>
            <div className="overflow-x-auto">
                <div className="flex justify-evenly">
                    <h1 className="text-3xl font-medium">Items: </h1>
                    <h1 className="text-3xl font-medium">Total Price: {payments?.length}</h1>
                </div>
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            payments?.map((item, n) => (
                                <tr key={item?._id}>
                                    <td>{n + 1}</td>
                                    <td>
                                        <div>
                                            <h4>{item?.email}</h4>
                                        </div>
                                    </td>
                                    <td>
                                        <h4>${item?.price}</h4>
                                    </td>
                                    <td>
                                        <h4>{item?.status}</h4>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;