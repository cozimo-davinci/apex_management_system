import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

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
                alert(message || "User Created Successfully");
                console.log("User Created Successfully", signUpResponse.data);
                navigate('/login');
            } else {
                // Fallback if success is explicitly false
                alert(message || "User Creation Failed");
                console.log("User Creation Failed", signUpResponse.data);
            }
        } catch (error) {
            // Handle any unexpected errors from the backend
            if (error.response) {
                alert(error.response.data.message || "An error occurred during sign-up.");
                console.log("Sign-up error", error.response.data);
            } else {
                alert("Unable to connect to the server. Please try again later.");
                console.log("Server connection error", error);
            }
        }
    };


    return (
        <div className="bg-emerald-500 w-96 h-auto py-8 px-6 rounded-lg shadow-lg shadow-slate-300 flex justify-center items-center mx-auto my-20 transition-transform duration-300 ease-in-out hover:scale-105">
            <form>
                <div className="flex flex-col justify-center items-center">
                    <label className="text-black font-semibold text-2xl mt-4">Email</label>
                    <input
                        type="email"
                        className="w-80 h-10 rounded-md mt-2 px-2"
                        placeholder="salazar@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label className="text-black font-semibold  text-2xl mt-4">Username</label>
                    <input
                        type='text'
                        className='w-80 h-10 rounded-md mt-2 px-2'
                        placeholder='salazar15'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <label className="text-black font-semibold text-2xl mt-4">Password</label>
                    <input
                        type="password"
                        className="w-80 h-10 rounded-md mt-2 px-2"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}

                    />
                    <button className="bg-blue-500 text-white font-bold w-80 h-10 rounded-md mt-6 hover:bg-blue-600 transition-colors"
                        onClick={handleSignUp}
                    >
                        Sign Up
                    </button>
                </div>
            </form>
        </div>
    )
}
