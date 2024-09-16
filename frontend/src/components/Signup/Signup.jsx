import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { RxAvatar } from "react-icons/rx";

const Signup = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [visible, setVisible] = useState(false);
    const [avatar, setAvatar] = useState(null);

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        setAvatar(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !email || !password) {
            toast.error("Please fill in all fields.");
            return;
        }

        const config = { headers: { "Content-Type": "multipart/form-data" } };
        const newForm = new FormData();
        newForm.append("file", avatar);
        newForm.append("name", name);
        newForm.append("email", email);
        newForm.append("password", password);

        try {
            const response = await axios.post(`${server}/user/create-user`, newForm, config);
            toast.success(response.data.message);
            setName("");
            setEmail("");
            setPassword("");
            setAvatar(null);
            navigate("/login");
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred. Please try again.");
        }
    };

    return (
        <div className="flex h-screen bg-cover bg-center" style={{ backgroundImage: 'url("/bg.png")', backgroundSize: 'cover' }}>
            {/* Left Section */}
            <div className="hidden md:flex w-1/2 h-full justify-end items-end relative">
                <div className="absolute bottom-20 left-10 w-48 h-48 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center">
                    <div className="text-white text-5xl font-bold">
                        تمكين
                    </div>
                </div>
            </div>

            {/* Right Signup Box */}
            <div className="w-full md:w-1/3 flex justify-center items-center backdrop-blur-sm bg-white/30 p-8 absolute right-16 top-20 rounded-lg">
                <div className="w-full max-w-md p-8 space-y-6 bg-white/30 rounded-lg shadow-lg backdrop-blur-lg">
                    <h2 className="text-center text-3xl font-bold text-gray-800">Register as new user</h2>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>
                        <div>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>
                        <div className="relative">
                            <input
                                type={visible ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                            {visible ? (
                                <AiOutlineEye
                                    className="absolute right-3 top-3 cursor-pointer text-gray-400"
                                    size={24}
                                    onClick={() => setVisible(false)}
                                />
                            ) : (
                                <AiOutlineEyeInvisible
                                    className="absolute right-3 top-3 cursor-pointer text-gray-400"
                                    size={24}
                                    onClick={() => setVisible(true)}
                                />
                            )}
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="inline-block h-10 w-10 rounded-full overflow-hidden">
                                {avatar ? (
                                    <img
                                        src={URL.createObjectURL(avatar)}
                                        alt="avatar"
                                        className="h-full w-full object-cover rounded-full"
                                    />
                                ) : (
                                    <RxAvatar className="h-10 w-10 text-gray-400" />
                                )}
                            </span>
                            <label
                                htmlFor="file-input"
                                className="cursor-pointer px-4 py-2 bg-gray-200 text-gray-700 font-medium text-sm rounded-md shadow-sm hover:bg-gray-300"
                            >
                                Upload Avatar
                                <input
                                    type="file"
                                    id="file-input"
                                    accept=".jpg,.jpeg,.png"
                                    onChange={handleFileInputChange}
                                    className="sr-only"
                                />
                            </label>
                        </div>
                        <button
                            type="submit"
                            className="w-full py-3 px-4 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 transition duration-300"
                        >
                            Register
                        </button>
                    </form>
                    <div className="text-center text-sm text-gray-800">
                        Already have an account? <Link to="/login" className="text-orange-500 hover:underline">Sign In</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;