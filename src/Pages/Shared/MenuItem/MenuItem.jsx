import PropTypes from 'prop-types';

const MenuItem = ({item}) => {
    const {name, recipe, image, category, price} = item;

    return (
        <div className='flex gap-3'>
            <div>
                <img src={image} alt="Recipe image" className='w-32 h-24 rounded-r-[200px] rounded-b-[200px]' />
            </div>
            <div>
                <h4 className='text-lg font-medium'>{name}---------</h4>
                <p>{recipe}</p>
            </div>
            <div>
                <p className='text-amber-600'>${price}</p>
            </div>
        </div>
    );
};

MenuItem.propTypes = {
    item: PropTypes.object
};

export default MenuItem;