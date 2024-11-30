import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3002/api/v1/user/login',
                {
                    email,
                    password
                }
            );

            const { accessToken, refreshToken, message } = response.data;

            if (response.data.success && email && password && accessToken) {
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);

                console.log('Login successful! Access Token:', accessToken);

                alert(message || "Login successful!");

                navigate('/employee');
            } else {
                alert(message || "Invalid Credentials. Login failed. Please try again.");
            }



        } catch (error) {
            if (error.response) {
                alert(error.response.data.message || "An error occured during login! Please try again")

            } else {
                alert('Server is unreachable. Please try again later.');
            }
        }



    }


    return (
        <div className="bg-emerald-500 w-96 h-auto py-8 px-6 rounded-lg shadow-lg shadow-slate-300 flex justify-center items-center mx-auto my-20 transition-transform duration-300 ease-in-out hover:scale-105">
            <form>
                <div className="flex flex-col justify-center items-center">
                    <label className="text-black font-semibold text-2xl mt-4">Email</label>
                    <input
                        type="email"
                        value={email}
                        className="w-80 h-10 rounded-md mt-2 px-2"
                        placeholder="salazar@gmail.com"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label className="text-black font-semibold text-2xl mt-4">Password</label>
                    <input
                        type="password"
                        value={password}
                        className="w-80 h-10 rounded-md mt-2 px-2"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="bg-blue-500 text-white font-bold w-80 h-10 rounded-md mt-6 hover:bg-blue-600 transition-colors"
                        onClick={handleSubmit}
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
}
