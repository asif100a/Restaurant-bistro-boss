import { Outlet } from "react-router-dom";
import Navber from "../Pages/Shared/Navber";
import Footer from "../Pages/Shared/Footer";

const Main = () => {
    return (
        <div>
            <Navber />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Main;