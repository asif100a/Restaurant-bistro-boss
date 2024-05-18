import PropTypes from 'prop-types';

const FoodCard = ({ item }) => {
    console.log(item)
    const { name, recipe, image, category, price } = item;

    return (
        <div className="rounded-md shadow-md w-auto dark:bg-gray-50 dark:text-gray-800">

            <div className='relative'>
                <img src={image} alt="Food image" className="object-cover object-center w-full h-72 dark:bg-gray-500" />
                <p className=''>${price}</p>
            </div>

            <div className="p-3">
                <h1 className="text-xl font-medium">{name}</h1>
                <p>{recipe}</p>
                <button className="btn uppercase">Add to cart</button>
            </div>
        </div>
    );
};

FoodCard.propTypes = {
    item: PropTypes.object
};

export default FoodCard;