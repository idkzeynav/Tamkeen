import React from "react";
import {
    AiFillFacebook,
    AiFillInstagram,
    AiFillYoutube,
    AiOutlineTwitter,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import {
    footercompanyLinks,
    footerProductLinks,
    footerSupportLinks,
} from "../../static/data";

const Footer = () => {
    return (
        <div className="bg-[#000] text-white">
            <div className="md:flex md:justify-between md:items-center sm:px-12 px-4 bg-[#342ac8] py-7">
              
             
            </div>
            <div className="grid grid-cols-1 sm:gird-cols-3 lg:grid-cols-4 gap-6 sm:px-8 px-5 py-16 sm:text-center">
                <ul className="px-5 text-center sm:text-start flex sm:block flex-col items-center">
                    <img
                        src="/images/tamk.png"
                        style={{ width: '150px', height: '70px' }} 
                        alt=""
                       
                    />
                    <br />
                    <p>The home and elements needeed to create beatiful products.</p>
                    
                </ul>

                <ul className="text-center sm:text-start">
                    <h1 className="mb-1 font-semibold">Company</h1>
                    {footerProductLinks.map((link, index) => (
                        <li key={index}>
                            <Link
                                className="text-gray-400 hover:text-teal-400 duration-300
                   text-sm cursor-pointer leading-6"
                                to={link.link}
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>

                <ul className="text-center sm:text-start">
                    <h1 className="mb-1 font-semibold">Shop</h1>
                    {footercompanyLinks.map((link, index) => (
                        <li key={index}>
                            <Link
                                className="text-gray-400 hover:text-teal-400 duration-300
                   text-sm cursor-pointer leading-6"
                                to={link.link}
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>

                <ul className="text-center sm:text-start">
                    <h1 className="mb-1 font-semibold">Support</h1>
                    {footerSupportLinks.map((link, index) => (
                        <li key={index}>
                            <Link
                                className="text-gray-400 hover:text-teal-400 duration-300
                   text-sm cursor-pointer leading-6"
                                to={link.link}
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10
         text-center pt-2 text-gray-400 text-sm pb-8"
            >
                <span>© 2023 Om Pattjoshi. All rights reserved.</span>
                <span>Terms · Privacy Policy</span>
               
            </div>
        </div>
    );
};

export default Footer;