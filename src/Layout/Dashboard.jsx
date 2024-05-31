import { CiBookmarkCheck, CiViewList } from "react-icons/ci";
import { GiShoppingCart, GiStarsStack } from "react-icons/gi";
import { IoCalendarNumberOutline, IoHomeOutline } from "react-icons/io5";
import { RiMenuUnfold2Line } from "react-icons/ri";
import { TfiHome } from "react-icons/tfi";
import { NavLink, Outlet } from "react-router-dom";
import useCarts from "../Hooks/useCarts";
import { BiSolidContact } from "react-icons/bi";
import { FaUtensils } from "react-icons/fa";
import { LuBookLock } from "react-icons/lu";
import { FaUsersLine } from "react-icons/fa6";
import useAdmin from "../Hooks/useAdmin";

const Dashboard = () => {
    const [carts] = useCarts();

    // TODO: get isAdmin from the database
    const [isAdmin] = useAdmin();
    // const isAdmin = true;

    return (
        <div className="flex">
            {/* Dashboard side bar */}
            <div className="text-64 min-h-screen bg-amber-500 px-3">
                <ul className="menu">
                    {
                        isAdmin ? <>
                            <li>
                                <NavLink to={'/dashboard/admin_home'}><IoHomeOutline className="w-6 h-6" /> Admin home</NavLink>
                            </li>
                            <li>
                                <NavLink to={'/dashboard/add_items'}><FaUtensils className="w-5 h-5" /> Add items</NavLink>
                            </li>
                            <li>
                                <NavLink to={'/dashboard/manage_items'}><CiViewList className="w-6 h-6" /> Manage items</NavLink>
                            </li>
                            <li>
                                <NavLink to={'/dashboard/manage_bookings'}><LuBookLock className="w-5 h-5" /> Manage bookings</NavLink>
                            </li>
                            <li>
                                <NavLink to={'/dashboard/all_users'}><FaUsersLine className="w-6 h-6" /> All users</NavLink>
                            </li>
                        </>
                            :
                            <>
                                <li>
                                    <NavLink to={'/dashboard/user_home'}><IoHomeOutline className="w-6 h-6" /> User home</NavLink>
                                </li>
                                <li>
                                    <NavLink to={'/dashboard/reservation'}><IoCalendarNumberOutline className="w-6 h-6" /> User reservation</NavLink>
                                </li>
                                <li>
                                    <NavLink to={'/dashboard/carts'}><GiShoppingCart className="w-6 h-6" /> My carts ({carts.length})</NavLink>
                                </li>
                                <li>
                                    <NavLink to={'/dashboard/add_review'}><GiStarsStack className="w-6 h-6" /> Add review</NavLink>
                                </li>
                                <li>
                                    <NavLink to={'/dashboard/payment_history'}><CiBookmarkCheck className="w-6 h-6" /> Payment history</NavLink>
                                </li>
                            </>
                    }

                    {/* Shared NavLinks */}
                    <div className="divider"></div>
                    <li>
                        <NavLink to={'/'}><TfiHome className="w-6 h-6" /> Home</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/our_menu'}><RiMenuUnfold2Line className="w-6 h-6" /> Our menu</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/contact'}><BiSolidContact className="w-6 h-6" /> Contact</NavLink>
                    </li>
                </ul>
            </div>
            {/* Dashboard content */}
            <div className="flex-1 p-3">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;