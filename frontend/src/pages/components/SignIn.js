import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/api/users/login", {
                email,
                password,
            });
            // If authentication is successful, navigate to the profile page
            navigate(`/Profile/${response.data.id}`);
             
        } catch (error) {
            // Handle authentication error
            setError("Invalid email or password");
        }
    };

    return (
        <div className="py-16">
            <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
                <div className="hidden lg:block lg:w-1/2 bg-cover" style={{ backgroundImage: "url('https://images.pexels.com/photos/1608099/pexels-photo-1608099.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')" }}>
                </div>
                <div className="w-full p-8 lg:w-1/2">
                    <h2 className="text-2xl font-semibold text-gray-700 text-center">FITTRIBE</h2>
                    <p className="text-xl text-gray-600 text-center">Welcome back!</p>
                    <form onSubmit={handleSubmit}>
                        <div className="mt-4">
                            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                            <input
                                id="email"
                                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mt-4">
                            <div className="flex justify-between">
                                <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                                <a href="#" className="text-xs text-gray-500">Forget Password?</a>
                            </div>
                            <input
                                id="password"
                                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                        <div className="mt-8">
                            <button className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600">Login</button>
                        </div>
                    </form>
                    <div className="mt-4 flex items-center justify-between">
                        <span className="border-b w-1/5 md:w-1/4"></span>
                        <Link to="/SignUp" className="text-xs text-gray-500 uppercase">or sign up</Link>
                        <span className="border-b w-1/5 md:w-1/4"></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
