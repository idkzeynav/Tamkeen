import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";

const ShopLogin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [visible, setVisible] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        await axios
            .post(
                `${server}/shop/login-shop`,
                { email, password },
                { withCredentials: true }
            )
            .then((res) => {
                toast.success("Login Success!");
                navigate("/dashboard");
                window.location.reload(true);
            })
            .catch((err) => {
                toast.error(err.response.data.message);
            });
    };

    return (
        <div className="flex h-screen bg-cover bg-center" style={{ backgroundImage: 'url("/bg.png")' }}>
            {/* Left Section */}
            <div className="hidden md:flex w-1/2 h-full justify-end items-end relative">
                <div className="absolute bottom-20 left-10 w-48 h-48 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center">
                    <div className="text-white text-5xl font-bold">
                        تمكين
                    </div>
                </div>
            </div>

            {/* Right Small Login Box */}
            <div className="w-full md:w-1/3 flex justify-center items-center backdrop-blur-sm bg-white/30 p-8 absolute right-16 top-1/4 rounded-lg">
                <div className="w-full max-w-md p-8 space-y-6 bg-white/30 rounded-lg shadow-lg backdrop-blur-lg">
                    <h2 className="text-center text-2xl font-bold text-gray-800">Login to your Shop</h2>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>

                        <div className="relative">
                            <input
                                type={visible ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                            {visible ? (
                                <AiOutlineEye
                                    className="absolute right-2 top-2 cursor-pointer"
                                    size={25}
                                    onClick={() => setVisible(false)}
                                />
                            ) : (
                                <AiOutlineEyeInvisible
                                    className="absolute right-2 top-2 cursor-pointer"
                                    size={25}
                                    onClick={() => setVisible(true)}
                                />
                            )}
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="remember-me"
                                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                                />
                                <label className="ml-2 text-sm text-gray-900">Remember me</label>
                            </div>
                            <div className="text-sm">
                                <a href="/forgot-password" className="font-medium text-orange-600 hover:text-orange-500">
                                    Forgot your password?
                                </a>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-blue-700"
                            >
                                Submit
                            </button>
                        </div>

                        <div className="text-center text-sm text-gray-800">
                            Don't have an account? <Link to="/shop-create" className="text-orange-500 hover:underline">Sign Up</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ShopLogin;