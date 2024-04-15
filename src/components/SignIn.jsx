import React, { useEffect, useState } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../Firebase/Firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUserData, isAuth } from '../Redux/AppSlice';
import { Client, Account } from "appwrite";
import { v4 as uuidv4 } from 'uuid';


const SignInForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const userId = uuidv4();
    useEffect(() => {
        const dataFromLocal = localStorage.getItem('userData');
        if (dataFromLocal) {
            navigate('/home');
            dispatch(isAuth());
        }
    }, []);
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

    const handelForm = (e) => {
        e.preventDefault();

        // Basic validation
        if (!email || !password) {
            alert("Please fill out both email and password fields.");
            return;
        }

        const client = new Client()
            .setEndpoint('https://cloud.appwrite.io/v1')
            .setProject('65f9677db27078162d8c');
        const account = new Account(client);
        const promise = account.create(`${userId}`, `${email}`, `${password}`);

        promise.then(function (response) {
            const userData = {
                email: email,
                name: "user001",
                imgUrl: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1712812454~exp=1712813054~hmac=739dc79eb95c4fafdafb9f884b39f38de2abce5ce0e531963f7cf0b7f5a914ab",
            };
            if (response.status) {
                setEmail('');
                setPassword('');
                localStorage.setItem('userData', JSON.stringify(userData));
                navigate('/home');
                dispatch(isAuth());
                console.log(response);
            }
        }).catch(function (error) {
            console.log(error);
            // Handle error and provide feedback to the user
            alert("An error occurred. Please try again later.");
        });
    }

    return (
        <div className="flex justify-center items-center h-screen w-5/12 m-auto">
            <form className="bg-[#76ABAE] p-8 shadow-md rounded-md w-full" onSubmit={handelForm}>
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        id="email"
                        name="email"
                        className="mt-1 p-2 w-full border rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
