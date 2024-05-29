import { MdOutlineDeleteForever } from "react-icons/md";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { TfiWrite } from "react-icons/tfi";
import useMenu from "../../../Hooks/useMenu";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { DNA } from "react-loader-spinner";
import { Link } from "react-router-dom";

const MenageItems = () => {
    const [items, isLoading, refetch] = useMenu();
    const axiosSecure = useAxiosSecure();

    const handleUpdateItem = (id) => {
        console.log(id);
    };

    const handleDeleteItem = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const { data } = await axiosSecure.delete(`/menu/${id}`);
                    console.log(data);

                    if (data?.deletedCount > 0) {
                        refetch();
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                    }

                } catch (error) {
                    console.error(error);
                }
            }
        });
    };

    if (isLoading) {
        return (
            <div className="w-full h-screen flex justify-center items-center">
                <DNA
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="dna-loading"
                    wrapperStyle={{}}
                    wrapperClass="dna-wrapper"
                />
            </div>
        )
    }

    return (
        <div>
            <SectionTitle heading={'Menage all items'} subHeading={'Hurry up'} />

            <div className="overflow-x-auto">
                <div className="flex justify-evenly">
                    <h1 className="text-3xl font-medium">All users: </h1>
                    <h1 className="text-3xl font-medium">Total items: {items.length}</h1>
                    <button className="btn btn-outline hover:bg-[#e9577e] border-[#e9577e] border-2">Pay</button>
                </div>
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Image</th>
                            <th>Item name</th>
                            <th>Price</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            items.map((item, i) => (
                                <tr key={item?._id}>
                                    <td>
                                        {i + 1}
                                    </td>
                                    <td>
                                        <div className="flex items-center">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={item?.image} alt="Food image" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <h4>{item?.name}</h4>
                                        </div>
                                    </td>
                                    <td>
                                        <h4>${item?.price}</h4>
                                    </td>
                                    <td>
                                        <div>
                                            <Link to={`/dashboard/update_item/${item?._id}`}>
                                                <button
                                                    onClick={() => handleUpdateItem(item?._id)}
                                                    className="btn h-fit min-h-fit px-0 bg-white hover:bg-white w-fit min-w-fit shadow-none transform hover:scale-150 border-none">
                                                    <TfiWrite className="w-5 h-5 text-[#57a7e9]" />
                                                </button>
                                            </Link>
                                        </div>
                                    </td>
                                    <th>
                                        <div>
                                            <button
                                                onClick={() => handleDeleteItem(item?._id)}
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

export default MenageItems;