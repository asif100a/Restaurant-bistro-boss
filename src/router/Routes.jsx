import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home/Home";
import OurMenu from "../Pages/Menu/OurMenu/OurMenu";
import OrderFood from "../Pages/Order/Order/OrderFood";
import SignIn from "../Pages/Authentication/SignIn/SignIn";
import SignUp from "../Pages/Authentication/SignUp/SignUp";
import SecretPage from "../Pages/Shared/SecretPage/SecretPage";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import Carts from "../Pages/Dashboard/Carts/Carts";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import AddItems from "../Pages/Dashboard/AddItems/AddItems";
import MenageItems from "../Pages/Dashboard/MenageItems/MenageItems";
import UpdateItem from "../Pages/Dashboard/MenageItems/UpdateItem";
import AdminRoute from "../PrivateRoute/AdminRoute";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import UserHome from "../Pages/Dashboard/UserHome/UserHome";
import AdminHome from "../Pages/Dashboard/AdminHome/AdminHome";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: '/our_menu',
                element: <OurMenu />
            },
            {
                path: '/order_food/:category',
                element: <OrderFood />
            },
            {
                path: '/sign_in',
                element: <SignIn />
            },
            {
                path: '/sign_up',
                element: <SignUp />
            },
            {
                path: '/secret',
                element: <PrivateRoute><SecretPage /></PrivateRoute>
            },
        ],
    },
    {
        path: '/dashboard',
        element: <Dashboard />,
        errorElement: <ErrorPage />,
        children: [
            // User's routes
            {
                path: '/dashboard/user_home',
                element: <UserHome />
            },
            {
                path: '/dashboard/carts',
                element: <Carts />
            },
            {
                path: '/dashboard/payment',
                element: <Payment />
            },
            {
                path: '/dashboard/payment_history',
                element: <PaymentHistory />
            },

            // Admin routes
            {
                path: '/dashboard/admin_home',
                element: <AdminRoute><AdminHome /></AdminRoute>
            },
            {
                path: '/dashboard/add_items',
                element: <AdminRoute><AddItems /></AdminRoute>
            },
            {
                path: '/dashboard/manage_items',
                element: <AdminRoute><MenageItems /></AdminRoute>
            },
            {
                path: '/dashboard/update_item/:id',
                element: <AdminRoute><UpdateItem /></AdminRoute>,
                loader: ({params}) => fetch(`https://restaurant-bistro-boss.vercel.app/menu/${params.id}`)
            },
            {
                path: '/dashboard/all_users',
                element: <AdminRoute><AllUsers /></AdminRoute>
            },
        ]
    }
]);

export default routes;