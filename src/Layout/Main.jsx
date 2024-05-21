import { Outlet, useLocation } from "react-router-dom";
import Navber from "../Pages/Shared/Navber";
import Footer from "../Pages/Shared/Footer";

const Main = () => {
    const location = useLocation();
    const isSignIn = location?.pathname?.includes('sign_in') || location?.pathname?.includes('sign_up');

    return (
        <div>
            {isSignIn || <Navber />}
            <Outlet />
            {isSignIn || <Footer />}
        </div>
    );
};

export default Main;