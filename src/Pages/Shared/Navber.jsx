import { IoMdContact } from "react-icons/io";
import { Link, NavLink } from "react-router-dom";

const Navber = () => {
    const navLinks = <>
        <NavLink to={'/'} className="px-3 py-2 mx-3 mt-2 text-white transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Home</NavLink>
        <NavLink to={'/contact_us'} className="px-3 py-2 mx-3 mt-2 text-white transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Contact us</NavLink>
        <NavLink to={'/dashboard'} className="px-3 py-2 mx-3 mt-2 text-white transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Dashboard</NavLink>
        <NavLink to={'/our_menu'} className="px-3 py-2 mx-3 mt-2 text-white transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Our menu</NavLink>
        <NavLink to={'/order_food/salad'} className="px-3 py-2 mx-3 mt-2 text-white transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Order food</NavLink>

    </>;

    return (
        <nav className="bg-black bg-opacity-25 text-white shadow dark:bg-gray-800 fixed z-20 w-screen">
            <div className="container px-6 py-4 mx-auto">
                <div className="lg:flex lg:items-center lg:justify-between">
                    <div className="flex items-center justify-between">
                        <Link to={'/'} className="text-3xl font-semibold">
                            Restaurant Bistro Boss
                        </Link>

                        <div className="flex lg:hidden">
                            <button type="button" className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400" aria-label="toggle menu">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
                                </svg>

                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className="absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center">
                        <div className="flex flex-col -mx-6 lg:flex-row lg:items-center lg:mx-8">
                            {navLinks}
                        </div>

                        <div className="flex items-center mt-4 lg:mt-0">
                            <Link to={'/sign_in'}>
                                <button className="hidden btn btn-outline mx-4 text-white transition-colors duration-300 transform lg:block dark:text-gray-200  dark:hover:text-gray-400 focus:text-gray-700 dark:focus:text-gray-400 focus:outline-none" aria-label="show notifications">
                                    Sign in
                                </button>
                            </Link>

                            <Link to={'sign_up'}>
                                <button className="hidden btn btn-outline mx-4 text-white transition-colors duration-300 transform lg:block dark:text-gray-200  dark:hover:text-gray-400 focus:text-gray-700 dark:focus:text-gray-400 focus:outline-none" aria-label="show notifications">
                                    Sign up
                                </button>
                            </Link>
                        </div>

                        {

                            <div className="flex items-center mt-4 lg:mt-0 hidden">
                                <button className="hidden mx-4 text-white transition-colors duration-300 transform lg:block dark:text-gray-200  dark:hover:text-gray-400 focus:text-gray-700 dark:focus:text-gray-400 focus:outline-none" aria-label="show notifications">
                                    Sign out
                                </button>

                                <button type="button" className="flex items-center focus:outline-none" aria-label="toggle profile dropdown">
                                    <IoMdContact className="w-10 h-10" />
                                </button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navber;