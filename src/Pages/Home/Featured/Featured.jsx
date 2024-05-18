import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import featuredImg from '../../../assets/home/featured.jpg';

const Featured = () => {
    const backgroundImg = {
        backgroundImage: `url(${featuredImg})`,
        height: '600px',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    };

    return (
        <section style={backgroundImg} className="h-[600px] bg-fixed flex flex-col justify-center my-12">
            <div className="bg-black bg-opacity-40 h-[600px] text-white">
                <SectionTitle
                    subHeading={'Check it out'}
                    heading={'FEATURED ITEMS'}
                />

                <div className="max-w-4xl mx-auto flex gap-6 text-white">
                    <div>
                        <img src={featuredImg} alt="Fetured image" />
                    </div>
                    <div className="space-y-2">
                        <p className="text-lg">April 25, 2024</p>
                        <h4 className="text-xl uppercase">Where can I get some?</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam eveniet, sapiente veniam corrupti ducimus tempore, itaque accusantium qui deleniti nemo cum. Voluptatem itaque magnam adipisci necessitatibus quisquam reiciendis sint obcaecati!</p>

                        <div className="pt-8">
                            <button className="btn bg-white bg-opacity-0 border-0 border-b-4 hover:bg-white shadow-none text-white hover:text-black">Order now </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Featured;