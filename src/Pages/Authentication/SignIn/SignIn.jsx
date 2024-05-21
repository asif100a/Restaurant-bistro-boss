import { useEffect, useRef, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import useAuth from '../../../Hooks/useAuth';
import { Link } from 'react-router-dom';

const SignIn = () => {
const {signInUser} = useAuth();

    const captchaRef = useRef();
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const handleSubmitForm = async(e) => {
        e.preventDefault();

        const form = new FormData(e.currentTarget);
        const email = form.get('email');
        const password = form.get('password');
        console.table({ email, password });

        try{
            const result = await signInUser(email, password);
            const user = result?.user;
            console.log(user);

        } catch(error) {
            console.error(error);
        }
    };

    const handleSimpleCaptcha = () => {
        const user_captcha_value = captchaRef.current.value;
        
        if(validateCaptcha(user_captcha_value)) {
            setDisabled(false);
        }
        else{
            setDisabled(true);
        }
    };

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col md:flex-row">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Sign in now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmitForm} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="email"
                                className="input input-bordered"
                                required
                            />
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
                                required
                            />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <LoadCanvasTemplate />
                            </label>
                            <input
                                ref={captchaRef}
                                type="text"
                                name="captcha"
                                placeholder="Type the above text"
                                className="input input-bordered"
                                required
                            />
                            <button onClick={handleSimpleCaptcha} className="btn btn-outline btn-info btn-xs mt-3">Validate</button>
                        </div>
                        <div className="form-control mt-6">
                            <input disabled={disabled} type="submit" value="Sign in" className={`btn btn-primary ${disabled && 'cursor-not-allowed'}`} />
                        </div>

                        <div className='flex gap-2'>
                            <p><small>New here?</small></p>
                            <Link to={'/sign_up'}><small className='text-blue-600 hover:underline'>Create an account</small></Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignIn;