import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home/Home";
import OurMenu from "../Pages/Menu/OurMenu/OurMenu";
import OrderFood from "../Pages/Order/Order/OrderFood";
import SignIn from "../Pages/Authentication/SignIn/SignIn";
import SignUp from "../Pages/Authentication/SignUp/SignUp";

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
        ],
    },
]);

export default routes;