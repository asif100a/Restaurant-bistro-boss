import Cover from '../../Shared/Cover/Cover';
import MenuItem from '../../Shared/MenuItem/MenuItem';
import PropTypes from 'prop-types';

const MenuCategory = ({ item, btn, CoverImg, title, description }) => {
    return (
        <div className='mt-16'>
            {
                title && (
                    <Cover
                        key={CoverImg}
                        img={CoverImg}
                        title={title}
                        description={description}
                    />)
            }

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto mt-12">
                {
                    item.map(item => <MenuItem key={item?._id} item={item} />)
                }
            </div>

            <div className="pt-8 flex justify-center items-center">
                <button className="btn bg-white bg-opacity-0 border-0 border-b-4 border-black hover:bg-black shadow-none  hover:text-white">{btn}</button>
            </div>
        </div>
    );
};

MenuCategory.propTypes = {
    item: PropTypes.object,
    btn: PropTypes.string,
    CoverImg: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
};

export default MenuCategory;