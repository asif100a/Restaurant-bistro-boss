import PropTypes from 'prop-types';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useCarts from '../../Hooks/useCarts';

const FoodCard = ({ item }) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation(); 
    const axiosSecure = useAxiosSecure()
    const [, refetch] = useCarts();

    const { _id, name, recipe, image, category, price } = item;

    const handleAddToCart = async () => {
        const email = user?.email;
        if (email) {
            const cartItem = {
                foodId: _id,
                email: email,
                name,
                image,
                price
            };

            try {
                const { data } = await axiosSecure.post('/carts', cartItem);
                console.log(data);
                if (data?.insertedId) {
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: `${name} has added to your cart`,
                        showConfirmButton: false,
                        timer: 1500
                    });

                    // Refetch the carts to update the count of carts
                    refetch();
                }
            }
            catch (error) {
                console.error(error);
            }
        }
        else {
            Swal.fire({
                title: "You are not signed in!",
                text: "Please sign in before add to cart",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Sign in"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/sign_in', { state: { from: location } });
                }
            });
        }
    };


    return (
        <div className="rounded-md shadow-md w-auto dark:bg-gray-50 dark:text-gray-800">

            <div className='relative'>
                <img src={image} alt="Food image" className="object-cover object-center w-full h-72 dark:bg-gray-500" />
                <p className='absolute top-6 right-6 bg-slate-800 text-white px-2 rounded-md'>${price}</p>
            </div>

            <div className="p-3">
                <h1 className="text-xl font-medium text-center">{name}</h1>
                <p>{recipe}</p>
                <div className='text-center'>
                    <button
                        onClick={handleAddToCart}
                        className="btn bg-white bg-opacity-0 border-0 border-b-4 border-amber-600 hover:bg-black shadow-none  hover:text-white uppercase"
                    >Add to cart</button>
                </div>
            </div>
        </div>
    );
};

FoodCard.propTypes = {
    item: PropTypes.object
};

export default FoodCard;