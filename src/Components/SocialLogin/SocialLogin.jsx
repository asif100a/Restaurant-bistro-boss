import { FcGoogle } from "react-icons/fc";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useLocation, useNavigate } from "react-router-dom";

const SocialLogin = () => {
    const {googleSignIn} = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const location = useLocation();
    const to = location?.state?.from?.pathname;

    const handleGoogleSignIn = async() => {
        try{
            const result = await googleSignIn();
            console.log(result);
            const user = result?.user;

            if(user){
                Swal.fire({
                    icon: "success",
                    title: "Successful",
                    text: "You have signed in successfully",
                });
                
                // Navigate user to the home or spesific route
                navigate(to ||'/');
            }

            if(user) {
                const name = user?.displayName;
                const email = user?.email
                const userInfo = {
                    name,
                    email
                };

                // Save user to the database
                try{
                    const {data} = await axiosPublic.post('/users', userInfo);
                    console.log(data);
                    
                } catch(error){
                    console.error(error.message);
                }
            }
        } catch(error) {
            console.error(error);
        }
    };
    return (
        <div className="w-full border">
            <button onClick={handleGoogleSignIn} className="btn w-full text-lg">
                <FcGoogle className="mr-2 text-2xl" />
                Google
            </button>
        </div>
    );
};

export default SocialLogin;