import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile
} from 'firebase/auth';
import auth from '../firebase/firebase.config';
import useAxiosPublic from '../Hooks/useAxiosPublic';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const axiosPublic = useAxiosPublic();

    // Sign in with social media
    const googleProvider = new GoogleAuthProvider();

    // Sign up user with email & password
    const signUpUser = (email, password) => {
        setIsLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // Sign in user with email & password
    const signInUser = (email, password) => {
        setIsLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Sign in user with google 
    const googleSignIn = () => {
        setIsLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    // Update user with name & photoURL
    const updateUserProfile = (name, photo_url) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo_url
        });
    };

    // Sign out the user
    const signOutUser = () => {
        setIsLoading(true);
        return signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            const userEmail = currentUser?.email;

            // Implement jwt athorization
            if (currentUser) {
                const jwtAuth = async () => {
                    try {
                        const { data } = await axiosPublic.post('/jwt', {email: userEmail});
                        console.log(data);

                        // Set token in the localStorage
                        if (data?.token) {
                            localStorage.setItem('access-token', data?.token);
                        }

                    } catch (error) {
                        console.error(error);
                    }
                }
                jwtAuth();

            } else {
                localStorage.removeItem('access-token');
            }

            setIsLoading(false);

           
        })

        return () => {
            unsubscribe();
        };
    }, [axiosPublic]);

    const authInfo = {
        user,
        isLoading,
        signUpUser,
        signInUser,
        googleSignIn,
        signOutUser,
        updateUserProfile
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node
};

export default AuthProvider;