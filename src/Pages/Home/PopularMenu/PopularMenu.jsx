import { useEffect, useState } from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import useMenu from "../../../Hooks/useMenu";

const PopularMenu = () => {
    const [items] = useMenu();
    const popularItems = items.filter(item => item?.category === 'popular');

    // const [items, setItems] = useState([]);
    // useEffect(() => {
    //     fetch('/menu.json')
    //         .then(res => res.json())
    //         .then(data => {
    //             const menuItems = data?.filter(item => item.category === 'popular');
    //             setItems(menuItems);
    //         })
    // }, []);

    return (
        <section>
            <SectionTitle
                subHeading={'From our menu'}
                heading={'POPULAR ITEMS'}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
                {
                    popularItems.map(item => <MenuItem key={item?._id} item={item} />)
                }
            </div>

            <div className="pt-8 flex justify-center items-center">
                <button className="btn bg-white bg-opacity-0 border-0 border-b-4 border-black hover:bg-black shadow-none  hover:text-white">View full menu</button>
            </div>
        </section>
    );
};

export default PopularMenu;