import FoodCard from '../../../Components/FoodCard/FoodCard';
import useMenu from '../../../Hooks/useMenu';
import orderImg from '../../../assets/shop/banner2.jpg';
import Cover from '../../Shared/Cover/Cover';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const OrderFood = () => {
    const [items] = useMenu();
    const offereds = items.filter(item => item?.category === 'offered');
    const desserts = items.filter(item => item?.category === 'dessert');
    const pizzas = items.filter(item => item?.category === 'pizza');
    const salads = items.filter(item => item?.category === 'salad');
    const soups = items.filter(item => item?.category === 'soup');

    return (
        <div className='uppercase'>
            <Cover img={orderImg} title={'Order food'} description={'Would you like to try a dish?'} />

            <Tabs className={'mt-24'}>
                <TabList className={'w-fit mx-auto border-b mb-6'}>
                    <Tab>Salad</Tab>
                    <Tab>Pizza</Tab>
                    <Tab>Soup</Tab>
                    <Tab>Dessert</Tab>
                    <Tab>Drinks</Tab>
                </TabList>

                <TabPanel>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto'>
                        {
                            salads.map(item => <FoodCard key={item?._id} item={item} />)
                        }
                    </div>
                </TabPanel>
                <TabPanel>
                    <h2>Any content 2</h2>
                </TabPanel>
                <TabPanel>
                    <h2>Any content 3</h2>
                </TabPanel>
                <TabPanel>
                    <h2>Any content 4</h2>
                </TabPanel>
                <TabPanel>
                    <h2>Any content 5</h2>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default OrderFood;