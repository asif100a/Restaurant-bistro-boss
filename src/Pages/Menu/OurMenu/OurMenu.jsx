import { Helmet } from "react-helmet-async";
import Cover from "../../Shared/Cover/Cover";
import CoverImg from '../../../assets/menu/banner3.jpg';
import useMenu from "../../../Hooks/useMenu";
import MenuCategory from "../MenuCategory/MenuCategory";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import dessertImg from '../../../assets/menu/dessert-bg.jpeg';
import pizzaImg from '../../../assets/menu/pizza-bg.jpg';
import saladImg from '../../../assets/menu/salad-bg.jpg';
import soupImg from '../../../assets/menu/soup-bg.jpg';

const OurMenu = () => {
    const [items] = useMenu();
    const offereds = items.filter(item => item?.category === 'offered');
    const desserts = items.filter(item => item?.category === 'dessert');
    const pizzas = items.filter(item => item?.category === 'pizza');

    return (
        <div>
            <Helmet>
                <title>Our menu-Restaurant Bistro Boss</title>
            </Helmet>

            {/* Main cover */}
            <Cover
                key={CoverImg}
                img={CoverImg}
                title={'Our menu'}
                description={'Would you like to try a dish?'}
            />

            <div className="mt-16">
                {/* Offered items */}
                <SectionTitle subHeading={"Don't miss"} heading={"TODAY'S OFFER"} />
                <MenuCategory
                    item={offereds}
                    btn={'ORDER YOUR FAVOURITE FOOD'}
                />

                {/* Dessert items */}
                <MenuCategory
                    item={desserts}
                    btn={'ORDER YOUR FAVOURITE FOOD'}
                    CoverImg={dessertImg}
                    title={'dessert'}
                    description={'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'}
                />

                {/* Pizza items */}
                <MenuCategory
                    item={pizzas}
                    btn={'ORDER YOUR FAVOURITE FOOD'}
                    CoverImg={pizzaImg}
                    title={'pizza'}
                    description={'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'}
                />

                {/* Salad items */}
                <MenuCategory
                    item={desserts}
                    btn={'ORDER YOUR FAVOURITE FOOD'}
                    CoverImg={saladImg}
                    title={'salad'}
                    description={'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'}
                />
                {/* Soup items */}
                <MenuCategory
                    item={desserts}
                    btn={'ORDER YOUR FAVOURITE FOOD'}
                    CoverImg={soupImg}
                    title={'soup'}
                    description={'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'}
                />
            </div>

        </div>
    );
};

export default OurMenu;