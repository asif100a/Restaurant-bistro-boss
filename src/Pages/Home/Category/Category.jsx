import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import slider1 from '../../../assets/home/slide1.jpg';
import slider2 from '../../../assets/home/slide2.jpg';
import slider3 from '../../../assets/home/slide3.jpg';
import slider4 from '../../../assets/home/slide4.jpg';
import slider5 from '../../../assets/home/slide5.jpg';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';

const Category = () => {
    return (
        <section className='max-w-6xl mx-auto'>
                <SectionTitle 
                    subHeading={'From 11:00am to 10:00pm'}
                    heading={'ORDER ONLINE'}
                />
           
            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                centeredSlides={true}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <img src={slider1} alt="Category 1" />
                    <p className='text-white text-4xl uppercase font-semibold text-center -mt-24'>Salads</p>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slider2} alt="Category 2" />
                    <p className='text-white text-4xl uppercase font-semibold text-center -mt-24'>Soups</p>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slider3} alt="Category 3" />
                    <p className='text-white text-4xl uppercase font-semibold text-center -mt-24'>Pizzas</p>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slider4} alt="Category 4" />
                    <p className='text-white text-4xl uppercase font-semibold text-center -mt-24'>Desserts</p>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slider5} alt="Category 5" />
                    <p className='text-white text-4xl uppercase font-semibold text-center -mt-24'>Salads</p>
                </SwiperSlide>
            </Swiper>
        </section>
    );
};

export default Category;