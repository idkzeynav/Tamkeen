// import React, { useState } from 'react'
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import styles from "../../styles/styles";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { server } from "../../server";
// import { toast } from "react-toastify";


// const Login = () => {
//     const navigate = useNavigate()
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("")
//     const [visible, setVisible] = useState(false)

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         await axios
//             .post(
//                 `${server}/user/login-user`,
//                 {
//                     email,
//                     password,
//                 },
//                 { withCredentials: true }
//             ).then((res) => {
//                 toast.success("Login Sucess!")
//                 navigate("/")
//                 window.location.reload(true);
//             })
//             .catch((err) => {
//                 toast.error(err.response.data.message);
//             });
//     };

//     return (
//         <div className='min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
//             <div className='sm:mx-auto sm:w-full sm:max-w-md'>
//                 <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//                     Login to your account
//                 </h2>
//             </div>
//             <div className='mt-8 sm:mx-auto sw:w-full sm:max-w-md'>
//                 <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
//                     <form className='space-y-6' onSubmit={handleSubmit} >
//                         {/* Email */}
//                         <div>
//                             <label htmlFor="email"
//                                 className='block text-sm font-medium text-gray-700'
//                             >
//                                 Email address
//                             </label>
//                             <div className='mt-1'>
//                                 <input type="email"
//                                     name='email'
//                                     autoComplete='email'
//                                     required
//                                     placeholder='Please enter valid email'
//                                     value={email}
//                                     onChange={(e) => setEmail(e.target.value)}
//                                     className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
//                                 />

//                             </div>
//                         </div>
//                         {/* Password */}
//                         <div>
//                             <label htmlFor="password"
//                                 className='block text-sm font-medium text-gray-700'
//                             >
//                                 password
//                             </label>
//                             <div className='mt-1 relative'>
//                                 <input type={visible ? "text" : "password"}
//                                     name='password'
//                                     autoComplete='password'
//                                     required
//                                     value={password}
//                                     onChange={(e) => setPassword(e.target.value)}
//                                     className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
//                                 />
//                                 {visible ? (
//                                     <AiOutlineEye
//                                         className="absolute right-2 top-2 cursor-pointer"
//                                         size={25}
//                                         onClick={() => setVisible(false)}
//                                     />
//                                 ) : (
//                                     <AiOutlineEyeInvisible
//                                         className="absolute right-2 top-2 cursor-pointer"
//                                         size={25}
//                                         onClick={() => setVisible(true)}
//                                     />
//                                 )}

//                             </div>
//                         </div>
//                         {/* password end */}

//                         <div className={`${styles.noramlFlex} justify-between`}>
//                             <div className={`${styles.noramlFlex}`}>
//                                 <input
//                                     type="checkbox"
//                                     name="remember-me"
//                                     id="remember-me"
//                                     className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                                 />
//                                 <label
//                                     htmlFor="remember-me"
//                                     className="ml-2 block text-sm text-gray-900"
//                                 >
//                                     Remember me
//                                 </label>
//                             </div>
//                             <div className='text-sm'>
//                                 <a
//                                     href=".forgot-password"
//                                     className="font-medium text-blue-600 hover:text-blue-500"
//                                 >
//                                     Forgot your password?
//                                 </a>
//                             </div>
//                         </div>
//                         <div>
//                             <button
//                                 type='submit'
//                                 className=' className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"'
//                             >
//                                 Submit
//                             </button>
//                         </div>

//                         <div className={`${styles.noramlFlex} w-full`} >
//                             <h4>Not have any account</h4>
//                             <Link to="/sign-up" className="text-blue-600 pl-2">
//                                 Sign Up
//                             </Link>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Login
import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [visible, setVisible] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        await axios
            .post(
                `${server}/user/login-user`,
                {
                    email,
                    password,
                },
                { withCredentials: true }
            ).then((res) => {
                toast.success("Login Success!");
                navigate("/");
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
                    <h2 className="text-center text-2xl font-bold text-gray-800">Login to your account</h2>

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
                                    className="absolute right-3 top-3 cursor-pointer text-gray-400"
                                    size={20}
                                    onClick={() => setVisible(false)}
                                />
                            ) : (
                                <AiOutlineEyeInvisible
                                    className="absolute right-3 top-3 cursor-pointer text-gray-400"
                                    size={20}
                                    onClick={() => setVisible(true)}
                                />
                            )}
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 transition duration-300"
                        >
                            Login
                        </button>
                    </form>
                    <div className="text-center text-sm text-gray-800">
                        New here? <Link to="/sign-up" className="text-orange-500 hover:underline">Sign up</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;