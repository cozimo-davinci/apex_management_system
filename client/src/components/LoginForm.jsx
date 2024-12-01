import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

export default function LoginForm() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://apex-management-system-backend.onrender.com/api/v1/user/login', {
                email,
                password,
            });

            const { accessToken, refreshToken, message } = response.data;

            if (response.data.success && email && password && accessToken) {
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);

                // Show success notification
                toast.success(message || 'Login successful!', {
                    position: 'top-right',
                    transition: 'bounce',
                    autoClose: 3000, // 3 seconds
                });

                // Navigate after a delay to allow the user to see the notification
                setTimeout(() => {
                    navigate('/employee');
                }, 3000);
            } else {
                // Show error notification
                toast.error(message || 'Invalid credentials. Login failed. Please try again.', {
                    position: 'top-right',

                });
            }
        } catch (error) {
            // Show error notification for any server or network errors
            const errorMessage =
                error.response?.data?.message || 'An error occurred during login! Please try again.';
            toast.error(errorMessage, {
                position: 'top-right',

            });
        }
    };

    return (
        <div className="bg-black w-96 h-auto py-8 px-6 rounded-lg shadow-lg shadow-slate-300 
        flex justify-center items-center mx-auto my-20 
        transition-transform duration-300 ease-in-out hover:scale-105
        border-white border-4">
            {/* Toastify Container */}
            <ToastContainer />

            <form>
                <div className="flex flex-col justify-center items-center">
                    <label className="text-white font-semibold text-2xl mt-4">Email</label>
                    <input
                        type="email"
                        value={email}
                        className="w-80 h-10 rounded-md mt-2 px-2"
                        placeholder="salazar@gmail.com"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label className="text-white font-semibold text-2xl mt-4">Password</label>
                    <input
                        type="password"
                        value={password}
                        className="w-80 h-10 rounded-md mt-2 px-2"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        className="bg-orange-500 text-white font-bold w-80 h-10 rounded-md mt-6 hover:bg-blue-600 transition-colors"
                        onClick={handleSubmit}
                    >
                        Login
                    </button>

                    <Link
                        className="mt-5 mb-3 text-xl text-white font-semibold"
                        to="/signup"
                    >
                        Don't have an account?{' '}
                        <span className="text-blue-700 font-bold hover:scale-105">Sign Up</span>
                    </Link>
                </div>
            </form>
        </div>
    );
}
