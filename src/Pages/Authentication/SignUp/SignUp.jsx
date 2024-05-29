import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import SocialLogin from "../../../Components/SocialLogin/SocialLogin";

const SignUp = () => {
    const { signUpUser, updateUserProfile } = useAuth();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const { email, password, name, photo_url } = data;
        try {
            const result = await signUpUser(email, password);
            await updateUserProfile(name, photo_url);
            reset();
            console.log(result);
            if (result?.user) {
                // Create use entry in the database
                const userInfo = {
                    name,
                    email,
                };
                // Send user to the back-end
                try {
                    const { data } = await axiosPublic.post('/users', userInfo);
                    if (data?.insertedId) {
                        // Reset the field after sign up
                        reset();
                        // Show a success message if user successfully created
                        Swal.fire({
                            title: "Successful",
                            text: "You have signed up successfylly",
                            icon: "success"
                        });
                        navigate('/');
                    }

                } catch (error) {
                    console.error(error);
                }
            }

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <Helmet>
                <title>Sign up - Restaurant Bistro Boss</title>
            </Helmet>

            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col md:flex-row">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Sign up your account</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Write your name here..."
                                    className="input input-bordered"
                                    {...register("name", { required: true })}
                                />
                                {errors.name && <span className="text-red-600">This field is required</span>}

                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    type="text"
                                    name="photo_url"
                                    placeholder="Write your photo url here..."
                                    className="input input-bordered"
                                    {...register("photo_url", { required: true })}
                                />
                                {errors.name && <span className="text-red-600">This field is required</span>}

                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="email"
                                    className="input input-bordered"
                                    {...register("email", { required: true })}
                                />
                                {errors.email && <span className="text-red-600">This field is required</span>}

                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="password"
                                    className="input input-bordered"
                                    {...register("password", { required: true, minLength: 6, maxLength: 18, pattern: /[A-Z]+[a-z]/ })}
                                />
                                {errors.password?.type === 'required' && <span className="text-red-600">This field is required</span>}
                                {errors.password?.type === 'minLength' && <span className="text-red-600">Please provide at least 6 character of password</span>}
                                {errors.password?.type === 'maxLength' && <span className="text-red-600">You can provide at most 18 character of password</span>}
                                {errors.password?.type === 'pattern' && <span className="text-red-600">Please provide at least one character of uppercase and lowercase</span>}

                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <input type="submit" value="Sign up" className="btn btn-primary" />
                            </div>

                            <div className="flex">
                                <p><small>Already have an account?</small></p>
                                <Link to={'/sign_in'} className="text-blue-600 hover:underline"><small>Sign in now</small></Link>
                            </div>

                            {/* Set a divider */}
                            <div className="divider divider-info">Social sign in</div>

                            {/* Sign in with social sign in */}
                        <SocialLogin />
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;