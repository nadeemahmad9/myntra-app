// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// const LuxeDealsProducts = [
//     {
//         id: 1,
//         name: "Oversized T-Shirt",
//         image: "/banner4.webp",
//     },
//     {
//         id: 2,
//         name: "LED Strip Lights",
//         image: "/genz2.webp",
//     },
//     {
//         id: 3,
//         name: "Tinted Lip Balm",
//         image: "/genz3.webp",
//     },
//     {
//         id: 4,
//         name: "K-pop Album",
//         image: "/genz4.webp",
//     },
//     {
//         id: 5,
//         name: "Bluetooth Speaker",
//         image: "/genz5.webp",
//     },
// ];

// const LuxeDeals = () => {
//     const [index, setIndex] = useState(0);

//     const nextSlide = () => {
//         setIndex((prev) => (prev + 1) % LuxeDealsProducts.length);
//     };

//     const prevSlide = () => {
//         setIndex((prev) => (prev - 1 + LuxeDealsProducts.length) % LuxeDealsProducts.length);
//     };

//     useEffect(() => {
//         const interval = setInterval(nextSlide, 4000);
//         return () => clearInterval(interval);
//     }, []);

//     return (
//         <div className="w-full max-w-8xl mx-auto px-4 py-8">
//             <div className="relative overflow-hidden rounded-2xl shadow-lg">
//                 <AnimatePresence mode="wait">
//                     <motion.div
//                         key={LuxeDealsProducts[index].id}
//                         initial={{ opacity: 0, x: 100 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         exit={{ opacity: 0, x: -100 }}
//                         transition={{ duration: 0.5 }}
//                         className="relative w-full h-[300px] sm:h-[400px] bg-cover bg-center flex items-center justify-center"
//                         style={{
//                             backgroundImage: `url(${LuxeDealsProducts[index].image})`,
//                         }}
//                     >
//                         <div className="bg-black bg-opacity-40 px-6 py-3 rounded-md text-white text-xl font-semibold">
//                             {LuxeDealsProducts[index].name}
//                         </div>
//                     </motion.div>
//                 </AnimatePresence>

//                 {/* Navigation Arrows */}
//                 <button
//                     onClick={prevSlide}
//                     className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/60 hover:bg-white p-2 rounded-full"
//                 >
//                     ❮
//                 </button>
//                 <button
//                     onClick={nextSlide}
//                     className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/60 hover:bg-white p-2 rounded-full"
//                 >
//                     ❯
//                 </button>
//             </div>

//             {/* Dots */}
//             <div className="flex justify-center gap-2 mt-4">
//                 {LuxeDealsProducts.map((_, i) => (
//                     <button
//                         key={i}
//                         onClick={() => setIndex(i)}
//                         className={`h-3 w-3 rounded-full transition-all ${i === index ? "bg-black w-6" : "bg-gray-400"
//                             }`}
//                     ></button>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default LuxeDeals;

// components/LuxeDeals.jsx
import React from 'react';
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

// const brands = [
//     {
//         img: 'https://assets.myntassets.com/f_webp,w_108,c_limit,fl_progressive,dpr_2.0/assets/images/2020/11/9/ab69d015-a975-4bda-990c-49e68938f6b31604926460802-19-FavBrands-AllenSollyJuniors.jpg',
//         link: 'http://localhost:5173/kids',
//     },
//     {
//         img: 'https://assets.myntassets.com/f_webp,w_108,c_limit,fl_progressive,dpr_2.0/assets/images/2020/11/9/ab69d015-a975-4bda-990c-49e68938f6b31604926460802-19-FavBrands-AllenSollyJuniors.jpg',
//         link: 'https://www.myntra.com/hrx',
//     },
//     {
//         img: 'https://assets.myntassets.com/f_webp,w_108,c_limit,fl_progressive,dpr_2.0/assets/images/2020/11/9/ab69d015-a975-4bda-990c-49e68938f6b31604926460802-19-FavBrands-AllenSollyJuniors.jpg',
//         link: 'https://www.myntra.com/nike',
//     },
//     {
//         img: 'https://assets.myntassets.com/f_webp,w_108,c_limit,fl_progressive,dpr_2.0/assets/images/2020/11/9/ab69d015-a975-4bda-990c-49e68938f6b31604926460802-19-FavBrands-AllenSollyJuniors.jpg',
//         link: 'https://www.myntra.com/wrogn',
//     },
//     {
//         img: 'https://assets.myntassets.com/f_webp,w_108,c_limit,fl_progressive,dpr_2.0/assets/images/2020/11/9/ab69d015-a975-4bda-990c-49e68938f6b31604926460802-19-FavBrands-AllenSollyJuniors.jpg',
//         link: 'https://www.myntra.com/puma',
//     },
//     {
//         img: 'https://assets.myntassets.com/f_webp,w_108,c_limit,fl_progressive,dpr_2.0/assets/images/2020/11/9/ab69d015-a975-4bda-990c-49e68938f6b31604926460802-19-FavBrands-AllenSollyJuniors.jpg',
//         link: 'https://www.myntra.com/uspolo',
//     },
//     {
//         img: 'https://assets.myntassets.com/f_webp,w_108,c_limit,fl_progressive,dpr_2.0/assets/images/2020/11/9/ab69d015-a975-4bda-990c-49e68938f6b31604926460802-19-FavBrands-AllenSollyJuniors.jpg',
//         link: 'https://www.myntra.com/uspolo',
//     },


// ];

// const LuxeDeals = () => {
//     // const settings = {
//     //     dots: true,
//     //     infinite: true,
//     //     speed: 500,
//     //     slidesToShow: 4,
//     //     slidesToScroll: 1,
//     //     autoplay: false,
//     //     autoplaySpeed: 2000,
//     //     responsive: [
//     //         {
//     //             breakpoint: 768,
//     //             settings: {
//     //                 slidesToShow: 2,
//     //             },
//     //         },
//     //         {
//     //             breakpoint: 480,
//     //             settings: {
//     //                 slidesToShow: 1,
//     //             },
//     //         },
//     //     ],
//     // };

//     return (
//         <div className="max-w-7xl mx-auto p-3  grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8  ">
//             <h2 className="text-2xl font-bold mt-4  w-full">Top Brands</h2>
//             {/* <Slider {...settings}> */}
//             {brands.map((brand, index) => (
//                 <div key={index} className="p-2 w-full">
//                     <a href={brand.link} target="_blank" rel="noopener noreferrer">
//                         <img
//                             src={brand.img}
//                             alt="Brand"
//                             className=" w-40 h-50 object-contain  rounded-full mb-2 mt-15  transition-transform duration-300 hover:scale-105  "
//                         />
//                     </a>
//                 </div>
//             ))}
//             {/* </Slider> */}
//         </div>
//     );
// };

// export default LuxeDeals;


import { motion } from "framer-motion"
import { Link } from "react-router-dom"

const LuxeDeals = () => {
    const brands = [
        {
            img: 'https://assets.myntassets.com/f_webp,w_108,c_limit,fl_progressive,dpr_2.0/assets/images/2020/11/9/ab69d015-a975-4bda-990c-49e68938f6b31604926460802-19-FavBrands-AllenSollyJuniors.jpg',
            link: 'http://localhost:5173/kids',
        },
        {
            img: 'https://assets.myntassets.com/f_webp,w_108,c_limit,fl_progressive,dpr_2.0/assets/images/2020/11/9/fee6018d-c5dd-44b7-b1d1-9b994c1ae1e21604926460545-13-FavBrands-UCB.jpg',
            link: 'https://www.myntra.com/hrx',
        },
        {
            img: 'https://assets.myntassets.com/f_webp,w_108,c_limit,fl_progressive,dpr_2.0/assets/images/2020/11/9/4d3f0e9d-1b7a-458e-b05b-75d1f51db0411604926460628-15-FavBrands-NautiNati.jpg',
            link: 'https://www.myntra.com/nike',
        },
        {
            img: 'https://assets.myntassets.com/f_webp,w_108,c_limit,fl_progressive,dpr_2.0/assets/images/2020/11/9/a505cf6b-beab-4bea-ba8d-06d7302486761604926460589-14-FavBrands-USPA.jpg',
            link: 'https://www.myntra.com/wrogn',
        },
        {
            img: 'https://assets.myntassets.com/f_webp,w_108,c_limit,fl_progressive,dpr_2.0/assets/images/2020/11/10/5843d479-8331-4c70-9e44-796b984a258e1604993081657-17-FavBrands-MiniKlub--1-.jpg',
            link: 'https://www.myntra.com/puma',
        },
        {
            img: 'https://assets.myntassets.com/f_webp,w_108,c_limit,fl_progressive,dpr_2.0/assets/images/2020/11/20/dc3e538c-bdbe-4df6-b38d-e628f1b18e211605856135445-ShopBybrands-lilpicks.jpg',
            link: 'https://www.myntra.com/uspolo',
        },
        {
            img: 'https://assets.myntassets.com/f_webp,w_108,c_limit,fl_progressive,dpr_2.0/assets/images/2020/11/9/0bb2a638-7a84-4e75-bbbb-152140d32fd51604926460667-16-FavBrands-Peppermint.jpg',
            link: 'https://www.myntra.com/uspolo',
        },
        {
            img: 'https://assets.myntassets.com/f_webp,w_108,c_limit,fl_progressive,dpr_2.0/assets/images/2020/11/9/7a43b5cc-7b14-465a-9043-153fe35fb4d91604926460506-12-FavBrands-Gini_Jony.jpg',
            link: 'https://www.myntra.com/uspolo',
        },
        {
            img: 'https://assets.myntassets.com/f_webp,w_108,c_limit,fl_progressive,dpr_2.0/assets/images/2020/11/9/4f79cccf-f8af-4a41-b531-a02ffc8bb1151604926460459-11-FavBrands-YK.jpg',
            link: 'https://www.myntra.com/uspolo',
        },


    ];

    return (
        <section className="py-10 bg-white">
            <div className="container mx-auto px-4">
                <motion.h2
                    className="text-2xl md:text-2xl font-bold mx-12 mb-8"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    FAVOURITE BRANDS
                </motion.h2>

                <div className="w-fit grid grid-cols-2 md:grid-cols-4 lg:grid-cols-9 ">
                    {brands.map((brand, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            viewport={{ once: true }}
                        // whileHover={{ scale: 1.05 }}
                        >
                            <Link to={`/products/subcategory/${brand.subcategory}`}>
                                <div
                                    className={` rounded-md  text-center  cursor-pointer transition-shadow`}
                                >
                                    <div className="mb-6 ">
                                        <img
                                            src={brand.img || "/placeholder.svg"}
                                            // alt={category.title}
                                            className="w-35 h-35 object-cover  rounded-lg mb-2 mt-3"
                                        />
                                    </div>
                                    {/* <h3 className="font-semibold text-sm mb-1">{category.title}</h3> */}
                                    {/* <p className="text-xs font-bold text-gray-800">{category.discount}</p> */}
                                    {/* <p className="text-xs text-gray-600 mt-1">Shop Now</p> */}
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default LuxeDeals
