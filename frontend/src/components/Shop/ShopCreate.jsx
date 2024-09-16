import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { RxAvatar } from 'react-icons/rx';

const ShopCreate = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState();
    const [address, setAddress] = useState("");
    const [zipCode, setZipCode] = useState();
    const [avatar, setAvatar] = useState();
    const [password, setPassword] = useState("");
    const [visible, setVisible] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const config = { headers: { "Content-Type": "multipart/form-data" } };

        const newForm = new FormData();
        newForm.append("file", avatar);
        newForm.append("name", name);
        newForm.append("email", email);
        newForm.append("password", password);
        newForm.append("zipCode", zipCode);
        newForm.append("address", address);
        newForm.append("phoneNumber", phoneNumber);

        axios
            .post(`${server}/shop/create-shop`, newForm, config)
            .then((res) => {
                toast.success(res.data.message);
                setName("");
                setEmail("");
                setPassword("");
                setAvatar();
                setZipCode();
                setAddress("");
                setPhoneNumber();
            })
            .catch((error) => {
                toast.error(error.response.data.message);
            });
        navigate("/shop-login");
    };

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        setAvatar(file);
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

            {/* Right Small Registration Box */}
            <div className="w-full md:w-1/3 flex justify-center items-center backdrop-blur-sm bg-white/30 p-8 absolute right-16 top-7 rounded-lg">
                <div className="w-full max-w-md p-8 space-y-6 bg-white/30 rounded-lg shadow-lg backdrop-blur-lg">
                    <h2 className="text-center text-2xl font-bold text-gray-800">Register as a seller</h2>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <input
                                type="text"
                                name="name"
                                placeholder="Shop Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>

                        <div>
                            <input
                                type="number"
                                name="phone-number"
                                placeholder="Phone Number"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>

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

                        <div>
                            <input
                                type="text"
                                name="address"
                                placeholder="Address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>

                        <div>
                            <input
                                type="number"
                                name="zipcode"
                                placeholder="Zip Code"
                                value={zipCode}
                                onChange={(e) => setZipCode(e.target.value)}
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

                        <div className="flex items-center space-x-4">
                            <label htmlFor="file-input" className="cursor-pointer flex items-center">
                                <RxAvatar className="h-8 w-8" />
                                <span className="ml-2 text-sm text-gray-700">Upload Avatar</span>
                                <input
                                    type="file"
                                    id="file-input"
                                    name="avatar"
                                    onChange={handleFileInputChange}
                                    className="sr-only"
                                />
                            </label>
                            {avatar && (
                                <img
                                    src={URL.createObjectURL(avatar)}
                                    alt="avatar"
                                    className="h-8 w-8 rounded-full object-cover"
                                />
                            )}
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
                        Already have an account? <Link to="/shop-login" className="text-orange-500 hover:underline">Sign In</Link>
                    </div>
                       
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ShopCreate;