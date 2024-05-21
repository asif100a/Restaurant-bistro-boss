import PropTypes from 'prop-types';

const FoodCard = ({ item }) => {
    console.log(item)
    const { name, recipe, image, category, price } = item;

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
                    <button className="btn bg-white bg-opacity-0 border-0 border-b-4 border-amber-600 hover:bg-black shadow-none  hover:text-white uppercase">Add to cart</button>
                </div>
            </div>
        </div>
    );
};

FoodCard.propTypes = {
    item: PropTypes.object
};

export default FoodCard;