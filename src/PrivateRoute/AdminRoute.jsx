import PropTypes from "prop-types";
import useAuth from "../Hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import { DNA } from "react-loader-spinner";
import useAdmin from "../Hooks/useAdmin";

const AdminRoute = ({children}) => {
    const { user, isLoading } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

    if (isLoading || isAdminLoading) {
        return (
            <div className="w-full h-screen flex justify-center items-center">
                <DNA
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="dna-loading"
                    wrapperStyle={{}}
                    wrapperClass="dna-wrapper"
                />
            </div>
        );
    }

    if (user && isAdmin) {
        return children;
    }
    return <Navigate to={'/'} state={{ from: location }} replace={true} />;
};

AdminRoute.propTypes = {
    children: PropTypes.node
};

export default AdminRoute;