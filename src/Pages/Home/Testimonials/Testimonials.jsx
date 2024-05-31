import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'

const Testimonials = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch('https://restaurant-bistro-boss.vercel.app/reviews')
            .then(res => res.json())
            .then(data => setReviews(data));
    }, []);

    return (
        <section className="max-w-5xl mx-auto">
            <SectionTitle
                subHeading={'What Our Client Says'}
                heading={'TESTIMONIALS'}
            />

            <Swiper navigation={true} modules={[Navigation]} className="mySwiper my-6 mb-12">
                {
                    reviews.map(review => <SwiperSlide key={review?._id}>
                        <div className="text-center max-w-3xl mx-auto">
                            <div className="flex justify-center mb-6">
                                <Rating
                                    style={{ maxWidth: 180 }}
                                    value={review?.rating}
                                    readOnly
                                />
                            </div>
                            <img src="" alt="" />
                            <p>{review?.details}</p>
                            <h3 className="text-2xl font-medium text-amber-600 mt-3">{review?.name}</h3>
                        </div>
                    </SwiperSlide>)
                }
            </Swiper>
        </section>
    );
};

export default Testimonials;