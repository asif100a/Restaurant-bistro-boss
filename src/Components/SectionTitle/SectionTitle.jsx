import PropTypes from 'prop-types';

const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className='mx-auto text-center my-12'>
            <p className='text-base font-normal text-amber-600'>---{subHeading}---</p>
            <h2 className='text-3xl font-normal mt-4 pt-4 border-t-2 border-dashed w-72 mx-auto'>{heading}</h2>
        </div>
    );
};

SectionTitle.propTypes = {
    heading: PropTypes.string,
    subHeading: PropTypes.string
};

export default SectionTitle;