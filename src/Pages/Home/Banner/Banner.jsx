import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 

import img1 from '../../../assets/home/01.jpg';
import img2 from '../../../assets/home/02.jpg';
import img3 from '../../../assets/home/03.png';
import img4 from '../../../assets/home/04.jpg';
import img5 from '../../../assets/home/05.png';
import img6 from '../../../assets/home/06.png';

const Banner = () => {
    return (
        <Carousel>
            <div>
                <img src={img1} alt='Banner slider 1' />
            </div>
            <div>
                <img src={img3} alt='Banner slider 3' />
            </div>
            <div>
                <img src={img4} alt='Banner slider 4' />
            </div>
            <div>
                <img src={img5} alt='Banner slider 5' />
            </div>
            <div>
                <img src={img6} alt='Banner slider 6' />
            </div>
            <div>
                <img src={img2} alt='Banner slider 2' />
            </div>
        </Carousel>
    );
};

export default Banner;