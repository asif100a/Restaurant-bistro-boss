import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { DNA } from "react-loader-spinner";

const PrivateRoute = ({ children }) => {
    const { user, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) {
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

    if (user) {
        return children;
    }
    return <Navigate to={'/sign_in'} state={{ from: location }} replace={true} />;
};

PrivateRoute.propTypes = {
    children: PropTypes.node
};

export default PrivateRoute;