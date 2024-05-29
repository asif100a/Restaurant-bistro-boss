import { useQuery } from "@tanstack/react-query";
import { MdOutlineDeleteForever } from "react-icons/md";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaUsersGear } from "react-icons/fa6";
import Swal from "sweetalert2";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const { data } = await axiosSecure('/users');
            return data;
        }
    });

    // Make user to admin
    const handleMakeAdmin = async(user) => {
        const id = user?._id;
        const name = user?.name;

        try {
            const { data } = await axiosSecure.patch(`/users/admin/${id}`);
            console.log(data);
            if (data.modifiedCount > 0) {
                refetch();

                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `${name} has added to your cart`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch(error) {
            console.error(error);
        }
    };

    // Delete the specific user
    const handleDeleteUser = (id) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {

                // Delete the item
                const deleteItem = async () => {
                    try {
                        const { data } = await axiosSecure.delete(`/users/${id}`);
                        console.log(data)
                        if (data?.deletedCount > 0) {
                            refetch();
                            swalWithBootstrapButtons.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }

                    } catch (error) {
                        console.error(error);
                    }
                };

                deleteItem();
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelled",
                    text: "Your imaginary file is safe :)",
                    icon: "error"
                });
            }
        });
    };

    return (
        <div>
            {/* Table of data */}
            <div className="overflow-x-auto">
                <div className="flex justify-evenly">
                    <h1 className="text-3xl font-medium">All users: </h1>
                    <h1 className="text-3xl font-medium">Total users: {users.length}</h1>
                    <button className="btn btn-outline hover:bg-[#e9577e] border-[#e9577e] border-2">Pay</button>
                </div>
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, n) => (
                                <tr key={user?._id}>
                                    <td>
                                        {n + 1}
                                    </td>
                                    <td>
                                        <div>
                                            <h4>{user?.name}</h4>
                                        </div>
                                    </td>
                                    <td>
                                        <h4>{user?.email}</h4>
                                    </td>
                                    <td>
                                        <div>
                                            {
                                                user?.role === 'admin' ? <p className="text-emerald-600 font-semibold">Admin</p>
                                                    : <button
                                                        onClick={() => handleMakeAdmin(user)}
                                                        className="btn h-fit min-h-fit px-0 bg-white hover:bg-white w-fit min-w-fit shadow-none transform hover:scale-150 border-none">
                                                        <FaUsersGear className="w-6 h-6 text-[#57a7e9]" />
                                                    </button>
                                            }
                                        </div>
                                    </td>
                                    <th>
                                        <div>
                                            <button
                                                onClick={() => handleDeleteUser(user?._id)}
                                                className="btn h-fit min-h-fit px-0 bg-white hover:bg-white w-fit min-w-fit shadow-none transform hover:scale-150 border-none">
                                                <MdOutlineDeleteForever className="w-6 h-6 text-[#e9577e]" />
                                            </button>
                                        </div>
                                    </th>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;