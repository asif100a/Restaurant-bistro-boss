import PropTypes from 'prop-types';
import FoodCard from '../../../Components/FoodCard/FoodCard';

const OrderTab = ({ items }) => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto'>
            {
                items.map(item => <FoodCard key={item?._id} item={item} />)
            }
        </div>
    );
};

OrderTab.propTypes = {
    items: PropTypes.object
};

export default OrderTab;