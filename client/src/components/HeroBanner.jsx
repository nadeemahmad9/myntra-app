

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const BannerData = [
    {
        id: 1,
        image: "/banner4.webp",
    },
    {
        id: 2,
        image: "https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/7/25/179e278f-77ee-44c2-bf39-9f00b0cd08e01658752429301-Handbags_Desk.jpg",
    },
    {
        id: 3,
        image: "https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2025/6/23/c3beb3ae-6895-458f-b1e0-f97becf05c5d1750618551514-Desktop-Banner--2---1-.png",
    },
    {
        id: 4,
        image: "https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/31/4031994d-9092-4aa7-aea1-f52f2ae5194f1654006594976-Activewear_DK.jpg",
    },
    {
        id: 5,
        image: "https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/6/27/53b4daed-cd2c-4111-86c5-14f737eceb351656325318973-Handbags_Desk.jpg",
    },
];

const HeroBanner = () => {
    const [index, setIndex] = useState(0);

    const nextSlide = () => {
        setIndex((prev) => (prev + 1) % BannerData.length);
    };

    const prevSlide = () => {
        setIndex((prev) => (prev - 1 + BannerData.length) % BannerData.length);
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full max-w-8xl mx-auto px-4 py-8">
            <div className="relative overflow-hidden  rounded-xl shadow-lg">
                <AnimatePresence mode="wait">

                    <motion.div
                        key={BannerData[index].id}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.5 }}
                        className="relative w-[1200] h-[300px] md:h-[300px] sm:h-[100px]  bg-cover bg-center flex items-center justify-center "
                        style={{
                            backgroundImage: `url(${BannerData[index].image})`,
                        }}
                    >
                        <div className="flex space-x-4 mt-50  ">

                            {/* <motion.button
                                className="bg-transparent backdrop-blur-3xl text-pink-700   px-6 py-3 rounded-full font-bold"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Link to="/men">  Shop Now</Link>
                            </motion.button> */}
                        </div>

                        {/* <div className="bg-black bg-opacity-40 px-6 py-3 rounded-md text-white text-xl font-semibold">
                            {BannerData[index].name}
                        </div> */}
                    </motion.div>




                </AnimatePresence>

                {/* Navigation Arrows */}
                <button
                    onClick={prevSlide}
                    className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/60 hover:bg-white p-2 rounded-full"
                >
                    ❮
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/60 hover:bg-white p-2 rounded-full"
                >
                    ❯
                </button>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-4">
                {BannerData.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setIndex(i)}
                        className={`h-3 w-3 rounded-full transition-all ${i === index ? "bg-black w-6" : "bg-gray-400"
                            }`}
                    ></button>
                ))}

            </div>
            <div className="relative z-30  ">

                {/* 7.5% Additional Cashback* On Flipkart Axis Bank Credit Card */}
                <img className="w-full  " src="https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2025/7/30/901204ec-4ea6-4c02-9c84-a0fd518316081753879522791-Bank-Flip-Main-2.gif" alt="" />
            </div>
        </div>
    );
};

export default HeroBanner;

