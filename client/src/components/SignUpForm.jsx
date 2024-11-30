import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignUpForm() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = async (e) => {
        e.preventDefault();

        try {
            // Make the API request
            const signUpResponse = await axios.post('http://localhost:3002/api/v1/user/signup', {
                email,
                username,
                password,
            });

            // Destructure the response
            const { success, accessToken, refreshToken, message } = signUpResponse.data;

            if (success) {
                // Save tokens
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);

                // Notify and navigate
                toast.success(message || 'User created successfully!', {
                    position: 'top-right',
                    autoClose: 3000, // 3 seconds
                });

                // Navigate after a short delay
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            } else {
                // Show error notification
                toast.error(message || 'User creation failed.', {
                    position: 'top-right',
                });
            }
        } catch (error) {
            // Handle backend errors
            const errorMessage =
                error.response?.data?.message || 'An error occurred during sign-up.';
            toast.error(errorMessage, {
                position: 'top-right',
            });
        }
    };

    return (
        <div
            className="bg-black w-96 h-auto 
        py-8 px-6 rounded-lg shadow-lg shadow-slate-300 
        flex justify-center items-center mx-auto my-20 
        transition-transform duration-300 ease-in-out hover:scale-105
        border-white border-4"
        >
            {/* Toastify Container */}
            <ToastContainer />

            <form>
                <div className="flex flex-col justify-center items-center">
                    <label className="text-white font-semibold text-2xl mt-4">Email</label>
                    <input
                        type="email"
                        className="w-80 h-10 rounded-md mt-2 px-2"
                        placeholder="salazar@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label className="text-white font-semibold  text-2xl mt-4">Username</label>
                    <input
                        type="text"
                        className="w-80 h-10 rounded-md mt-2 px-2"
                        placeholder="salazar15"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <label className="text-white font-semibold text-2xl mt-4">Password</label>
                    <input
                        type="password"
                        className="w-80 h-10 rounded-md mt-2 px-2"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        className="bg-orange-500 text-white font-bold w-80 h-10 rounded-md mt-6 hover:bg-blue-600 transition-colors"
                        onClick={handleSignUp}
                    >
                        Sign Up
                    </button>

                    <Link className="mt-5 mb-3 text-xl text-white font-semibold" to="/login">
                        Already have an account?{' '}
                        <span className="text-blue-700 font-bold hover:scale-105">Sign In</span>
                    </Link>
                </div>
            </form>
        </div>
    );
}
