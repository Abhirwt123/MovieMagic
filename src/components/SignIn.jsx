import React, { useEffect } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../Firebase/Firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUserData, isAuth } from '../Redux/AppSlice';

const SignInForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleGoogleAuth = () => {
        signInWithPopup(auth, provider)
            .then((data) => {
                const userData = {
                    name: data.user.displayName,
                    email: data.user.email,
                    imgUrl: data.user.photoURL,
                    token: data.user.accessToken,
                };
                localStorage.setItem('userData', JSON.stringify(userData));
                dispatch(isAuth());
                dispatch(getUserData(userData));
                navigate('/home');
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        const dataFromLocal = localStorage.getItem('userData');
        if (dataFromLocal) {
            navigate('/home');
        }
    }, [navigate]);

    return (
        <div className="flex justify-center items-center h-screen w-5/12 m-auto">
            <form className="bg-[#FFE6E6] p-8 shadow-md rounded-md w-full">
                <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>


                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-600">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="mt-1 p-2 w-full border rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-600"> Email </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="mt-1 p-2 w-full border rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="mt-1 p-2 w-full border rounded-md" />
                </div>
                <div className="flex items-center justify-center mb-4 border rounded-lg gap-2 py-1 bg-zinc-100 cursor-pointer" onClick={handleGoogleAuth}>
                    <img className="w-8" src="https://www.google.com/images/hpp/ic_wahlberg_product_core_48.png8.png" alt="" />
                    <span>Sign In Using Google</span>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
                    Sign In
                </button>
            </form>
        </div>
    );
};

export default SignInForm;
