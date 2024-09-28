import React from 'react';
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";

const Hero = () => {
    return (   
        <div
            className={`flex h-screen bg-cover bg-center relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat ${styles.noramlFlex}`}
            style={{
                backgroundImage:
                    "url('/women.jpeg')",
            }}
        >
            <div className={`${styles.section} w-[90%] 800px:w-[75%] bg-[rgba(0,0,0,0.5)] p-6 rounded-lg`}> {/* Added semi-transparent background */}
                <h1
                    className="text-[35px] leading-[1.2] 800px:text-[60px] text-white font-[600] capitalize text-shadow-md" /* Added text shadow */
                    style={{
                        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)", /* Enhanced text-shadow */
                    }}
                >
                    Empowering Women, <br /> Unleashing Potential
                </h1>
                <p className="pt-5 text-[16px] font-[Poppins] font-[400] text-white"
                   style={{
                       textShadow: "1px 1px 2px rgba(0, 0, 0, 0.6)", /* Added text shadow for paragraph */
                   }}
                >
                    Tamkeen is dedicated to uplifting talented women across Pakistan,
                    providing them with a platform to showcase their skills and gain
                    financial independence. From crafts to culinary arts, we enable
                    women to turn their talents into sustainable livelihoods.
                </p>
                <Link to="/products" className="inline-block">
                    <div className={`${styles.button} mt-5`}>
                        <span className="text-[#fff] font-[Poppins] text-[18px]">
                            Explore Now
                        </span>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Hero
// import React from 'react';
// import { Link } from "react-router-dom";
// import styles from "../../../styles/styles";

// const Hero = () => {
//     return (
//         <div className="relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat ${styles.noramlFlex}">
//             {/* Transparent overlay */}
//             <div
//                 className="absolute top-0 left-0 w-full h-full bg-no-repeat"
//                 style={{
//                     backgroundImage: "url(/images/light-neutral-background.jpg)", // Image URL
//                     backgroundSize: 'cover',
//                     backgroundPosition: 'center',
//                     opacity: 0.5,  // Adjust transparency here
//                 }}
//             />
//             <div className={`${styles.section} relative z-10 w-[90%] 800px:w-[60%]`}>
//                 <h1
//                     className="text-[35px] leading-[1.2] 800px:text-[60px] text-[#3d3a3a] font-[600] capitalize"
//                 >
//                     Empowering Women, <br /> Unleashing Potential
//                 </h1>
//                 <p className="pt-5 text-[16px] font-[Poppins] font-[400] text-[#000000ba]">
//                     Tamkeen is dedicated to uplifting talented women across Pakistan,
//                     providing them with a platform to showcase their skills and gain
//                     financial independence. From crafts to culinary arts, we enable
//                     women to turn their talents into sustainable livelihoods.
//                 </p>
//                 <Link to="/products" className="inline-block">
//                     <div className={`${styles.button} mt-5`}>
//                         <span className="text-[#fff] font-[Poppins] text-[18px]">
//                             Explore Now
//                         </span>
//                     </div>
//                 </Link>
//             </div>
//         </div>
//     );
// };

// export default Hero;