import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home/Home";
import OurMenu from "../Pages/Menu/OurMenu/OurMenu";
import OrderFood from "../Pages/Order/Order/OrderFood";

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
                path: '/order_food',
                element: <OrderFood />
            },
        ],
    },
]);

export default routes;