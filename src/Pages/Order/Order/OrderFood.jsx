import useMenu from '../../../Hooks/useMenu';
import orderImg from '../../../assets/shop/banner2.jpg';
import Cover from '../../Shared/Cover/Cover';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import OrderTab from '../OrderTab/OrderTab';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

const OrderFood = () => {
    const categories = ['salad', 'pizza', 'soup', 'dessert', 'drinks'];
    const { category } = useParams();
    const initialIndex = categories.indexOf(category);
    const [tabIndex, setTabIndex] = useState(initialIndex)
    console.log(tabIndex);


    const [items] = useMenu();
    const desserts = items.filter(item => item?.category === 'dessert');
    const pizzas = items.filter(item => item?.category === 'pizza');
    const salads = items.filter(item => item?.category === 'salad');
    const soups = items.filter(item => item?.category === 'soup');
    const drinks = items.filter(item => item?.category === 'drinks');

    return (
        <div className='uppercase'>
            <Helmet>
                <title>Food order-Restaurant Bistro Boss</title>
            </Helmet>

            <Cover img={orderImg} title={'Order food'} description={'Would you like to try a dish?'} />

            <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)} className={'mt-24'}>
                <TabList className={'w-fit mx-auto border-b mb-6'}>
                    <Tab>Salad</Tab>
                    <Tab>Pizza</Tab>
                    <Tab>Soup</Tab>
                    <Tab>Dessert</Tab>
                    <Tab>Drinks</Tab>
                </TabList>

                <TabPanel>
                    <OrderTab items={salads} />
                </TabPanel>
                <TabPanel>
                    <OrderTab items={pizzas} />
                </TabPanel>
                <TabPanel>
                    <OrderTab items={soups} />
                </TabPanel>
                <TabPanel>
                    <OrderTab items={desserts} />
                </TabPanel>
                <TabPanel>
                    <OrderTab items={drinks} />
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default OrderFood;