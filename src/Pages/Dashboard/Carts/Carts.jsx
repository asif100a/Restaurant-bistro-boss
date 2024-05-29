import { MdOutlineDeleteForever } from "react-icons/md";
import useCarts from "../../../Hooks/useCarts";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const Carts = () => {
    const [carts, refetch] = useCarts();
    const axiosSecure = useAxiosSecure();

    // Get the total of item's price
    const totalPrice = carts.reduce((accumulator, currentItem) => accumulator + currentItem?.price, 0);

    // Delete the item from the ui
    const handleDeleteItem = (id) => {
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
                        const { data } = await axiosSecure.delete(`/carts/${id}`);
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
        <div className="">

            {/* Table of data */}
            <div className="overflow-x-auto">
                <div className="flex justify-evenly">
                    <h1 className="text-3xl font-medium">Items: {carts.length}</h1>
                    <h1 className="text-3xl font-medium">Total Price: {totalPrice}</h1>
                    {
                        carts.length ? <Link to={'/dashboard/payment'}>
                            <button disabled={!carts.length} className="btn btn-outline hover:bg-[#e9577e] border-[#e9577e] border-2">Pay</button>
                        </Link> :
                            <button disabled={!carts.length} className="btn btn-outline hover:bg-[#e9577e] border-[#e9577e] border-2">Pay</button>
                    }
                </div>
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            carts.map((item, n) => (
                                <tr key={item?._id}>
                                    <td>{n + 1}</td>
                                    <td>
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={item?.image} />
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <h4>{item?.name}</h4>
                                        </div>
                                    </td>
                                    <td>
                                        <h4>{item?.price}</h4>
                                    </td>
                                    <th>
                                        <div>
                                            <button onClick={() => handleDeleteItem(item?._id)} className="btn h-fit min-h-fit px-0 bg-white hover:bg-white w-fit min-w-fit shadow-none transform hover:scale-150 border-none">
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

export default Carts;