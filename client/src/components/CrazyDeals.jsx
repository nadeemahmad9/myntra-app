// import { motion } from "framer-motion"
// import { Link } from "react-router-dom"

// const CrazyDeals = () => {
//     const deals = [
//         {
//             _id: 1,
//             title: "Urban Steps",
//             subtitle: "FCUK | AEROPOSTALE & More",
//             discount: "MIN. 60% OFF",
//             image: "https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2025/JULY/3/ByK2Fhac_04a44b52202f44e7a163b5e919226f81.png",
//             bgColor: "bg-orange-200",
//             subcategory: "casual-shoes",
//         },
//         {
//             _id: 2,
//             title: "Urban Cool",
//             subtitle: "TIGC | HIGHLANDER",
//             discount: "Min. 70% Off",
//             image: "https://assets.myntassets.com/f_webp,w_98,c_limit,fl_progressive,dpr_2.0/assets/images/2025/JANUARY/10/MSX3QTMF_73993eeee48c472fa4f5c69b3696a0ca.png",
//             bgColor: "bg-teal-800",
//             subcategory: "t-shirts",
//         },
//         {
//             _id: 3,
//             title: "Cool Pairs",
//             subtitle: "U.S. POLO ASSN. & More",
//             discount: "MIN. 45% OFF",
//             image: "https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2025/JULY/3/1koEN8bc_657f670491b44c0d96e65745e9db735c.png",
//             bgColor: "bg-blue-200",
//             subcategory: "casual-shoes",
//         },
//         {
//             _id: 4,
//             title: "Unique Picks",
//             subtitle: "FOSSIL | MICHAEL KORS",
//             discount: "MIN. 30% OFF",
//             image: "https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2025/JULY/3/XikYcqEJ_4cc1519181aa4647b43c235a0bc3c0a7.png",
//             bgColor: "bg-green-200",
//             subcategory: "watches",
//         },
//         {
//             _id: 5,
//             title: "Tech-Savvy Finds",
//             subtitle: "ambrane | SANDISK",
//             discount: "STARTING ₹399",
//             image: "https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2025/JULY/3/TT7w5naG_fe3411b00d074941b8cc6ada5d078ec0.png",
//             bgColor: "bg-orange-300",
//             subcategory: "electronics",

//         },
//     ]

//     return (
//         <section className="py-12 bg-white relative overflow-hidden">
//             {/* Background Pattern */}
//             <div className="absolute inset-0 opacity-5">
//                 <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-transparent to-gray-200 transform -skew-y-12"></div>
//             </div>

//             <div className="container mx-auto px-4 relative">
//                 <motion.div
//                     className="text-center mb-8"
//                     initial={{ opacity: 0, y: 50 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.6 }}
//                     viewport={{ once: true }}
//                 >
//                     <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-2">CRAZY</h2>
//                     <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">DEALS</h3>
//                     <p className="text-lg text-gray-600 flex items-center justify-center">
//                         Prices That Pack A Punch
//                         <span className="ml-2 bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
//                             →
//                         </span>
//                     </p>
//                 </motion.div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
//                     {deals.map((deal, index) => (
//                         <motion.div
//                             key={deal._id}
//                             className={`rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow`}
//                             initial={{ opacity: 0, y: 50 }}
//                             whileInView={{ opacity: 1, y: 0 }}
//                             transition={{ delay: index * 0.1, duration: 0.6 }}
//                             viewport={{ once: true }}
//                             whileHover={{ scale: 1.02 }}

//                         >
//                             <Link to={`/products/subcategory/${deal.subcategory}`}>
//                                 <div className="p-4">
//                                     <img
//                                         src={deal.image || "/placeholder.svg"}
//                                         // alt={deal.title}
//                                         className="w-full h-65 object-cover rounded-md mb-4"
//                                     />
//                                     {/* <div className="bg-white rounded-lg p-3"> */}
//                                     {/* <p className="text-xs text-gray-600 mb-1">{deal.subtitle}</p> */}
//                                     {/* <p className="text-xs text-gray-500 mb-2">& More</p> */}
//                                     {/* <h3 className="font-bold text-sm mb-1">{deal.title}</h3> */}
//                                     {/* <p className="font-bold text-lg">{deal.discount}</p> */}
//                                     {/* </div> */}
//                                 </div>
//                             </Link>
//                         </motion.div>
//                     ))}
//                 </div>

//                 {/* Pagination Dots */}
//                 <div className="flex justify-center mt-8 space-x-2">
//                     {[...Array(5)].map((_, index) => (
//                         <div key={index} className={`w-2 h-2 rounded-full ${index === 0 ? "bg-gray-800" : "bg-gray-300"}`} />
//                     ))}
//                 </div>
//             </div>
//         </section>
//     )
// }

// export default CrazyDeals




// import { useEffect, useRef, useState } from "react"
// import { motion } from "framer-motion"
// import { Link } from "react-router-dom"

// const CrazyDeals = () => {
//     const containerRef = useRef(null)
//     const activeIndexRef = useRef(0)
//     const [activeIndex, setActiveIndex] = useState(0)

//     const deals = [
//         {
//             _id: 1,
//             title: "Urban Steps",
//             subtitle: "FCUK | AEROPOSTALE & More",
//             discount: "MIN. 60% OFF",
//             image: "https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2025/JULY/3/ByK2Fhac_04a44b52202f44e7a163b5e919226f81.png",
//             bgColor: "bg-orange-200",
//             subcategory: "casual-shoes",
//         },
//         {
//             _id: 2,
//             title: "Urban Cool",
//             subtitle: "TIGC | HIGHLANDER",
//             discount: "Min. 70% Off",
//             image: "https://assets.myntassets.com/f_webp,w_98,c_limit,fl_progressive,dpr_2.0/assets/images/2025/JANUARY/10/MSX3QTMF_73993eeee48c472fa4f5c69b3696a0ca.png",
//             bgColor: "bg-teal-800",
//             subcategory: "t-shirts",
//         },
//         {
//             _id: 3,
//             title: "Cool Pairs",
//             subtitle: "U.S. POLO ASSN. & More",
//             discount: "MIN. 45% OFF",
//             image: "https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2025/JULY/3/1koEN8bc_657f670491b44c0d96e65745e9db735c.png",
//             bgColor: "bg-blue-200",
//             subcategory: "casual-shoes",
//         },
//         {
//             _id: 4,
//             title: "Unique Picks",
//             subtitle: "FOSSIL | MICHAEL KORS",
//             discount: "MIN. 30% OFF",
//             image: "https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2025/JULY/3/XikYcqEJ_4cc1519181aa4647b43c235a0bc3c0a7.png",
//             bgColor: "bg-green-200",
//             subcategory: "watches",
//         },
//         {
//             _id: 5,
//             title: "Tech-Savvy Finds",
//             subtitle: "ambrane | SANDISK",
//             discount: "STARTING ₹399",
//             image: "https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2025/JULY/3/TT7w5naG_fe3411b00d074941b8cc6ada5d078ec0.png",
//             bgColor: "bg-orange-300",
//             subcategory: "electronics",
//         },
//     ]

//     const scrollToIndex = (index) => {
//         if (containerRef.current) {
//             const child = containerRef.current.children[0]?.children[index]
//             if (child) {
//                 const offsetLeft = child.offsetLeft
//                 containerRef.current.scrollTo({
//                     left: offsetLeft,
//                     behavior: "smooth",
//                 })
//                 setActiveIndex(index)
//                 activeIndexRef.current = index
//             }
//         }
//     }

//     useEffect(() => {
//         const interval = setInterval(() => {
//             const nextIndex = (activeIndexRef.current + 1) % deals.length
//             scrollToIndex(nextIndex)
//         }, 3000)

//         return () => clearInterval(interval)
//     }, [])

//     return (
//         <section className="py-5 bg-white relative overflow-hidden">
//             {/* Background Pattern */}
//             <div className="absolute inset-0 opacity-5">
//                 <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-transparent to-gray-200 transform -skew-y-12"></div>
//             </div>

//             <div className="container mx-auto px-4 relative">
//                 {/* Headings */}
//                 <motion.div
//                     className="text-center mb-8"
//                     initial={{ opacity: 0, y: 50 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.6 }}
//                     viewport={{ once: true }}
//                 >
//                     <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-2">CRAZY</h2>
//                     <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">DEALS</h3>
//                     <p className="text-lg text-gray-600 flex items-center justify-center">
//                         Prices That Pack A Punch
//                         <span className="ml-2 bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
//                             →
//                         </span>
//                     </p>
//                 </motion.div>

//                 {/* Carousel */}
//                 <div ref={containerRef} className="overflow-x-auto hide-scrollbar scroll-smooth">
//                     <div className="flex space-x-4 min-w-max">
//                         {deals.map((deal, index) => (
//                             <motion.div
//                                 key={deal._id}
//                                 className="min-w-[260px] rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow bg-white"
//                                 initial={{ opacity: 0, y: 50 }}
//                                 whileInView={{ opacity: 1, y: 0 }}
//                                 transition={{ delay: index * 0.1, duration: 0.6 }}
//                                 viewport={{ once: true }}
//                                 whileHover={{ scale: 1.03 }}
//                             >
//                                 <Link to={`/products/subcategory/${deal.subcategory}`}>
//                                     <div className="p-4">
//                                         <img
//                                             src={deal.image}
//                                             alt={deal.title}
//                                             className="w-full h-65  rounded-md mb-4 object-contain"
//                                         />
//                                         {/* Optional content */}
//                                         {/* <h3 className="font-bold text-sm mb-1">{deal.title}</h3>
//                                         <p className="text-xs text-gray-600">{deal.subtitle}</p>
//                                         <p className="text-sm text-red-600 font-bold">{deal.discount}</p> */}
//                                     </div>
//                                 </Link>
//                             </motion.div>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Pagination Dots */}
//                 <div className="flex justify-center mt-8 space-x-2">
//                     {deals.map((_, index) => (
//                         <button
//                             key={index}
//                             onClick={() => scrollToIndex(index)}
//                             className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${activeIndex === index ? "bg-gray-800 scale-110" : "bg-gray-300"}`}
//                         />
//                     ))}
//                 </div>
//             </div>
//         </section>
//     )
// }

// export default CrazyDeals


import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"

const CrazyDeals = () => {
    const containerRef = useRef(null)
    const activeIndexRef = useRef(0)
    const [activeIndex, setActiveIndex] = useState(0)

    const itemsPerPage = 3

    const deals = [
        {
            _id: 1,
            title: "Urban Steps",
            subtitle: "FCUK | AEROPOSTALE & More",
            discount: "MIN. 60% OFF",
            image: "https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2025/JULY/3/ByK2Fhac_04a44b52202f44e7a163b5e919226f81.png",
            bgColor: "bg-orange-200",
            subcategory: "casual-shoes",
        },
        {
            _id: 2,
            title: "Urban Cool",
            subtitle: "TIGC | HIGHLANDER",
            discount: "Min. 70% Off",
            image: "https://assets.myntassets.com/f_webp,w_98,c_limit,fl_progressive,dpr_2.0/assets/images/2025/JANUARY/10/MSX3QTMF_73993eeee48c472fa4f5c69b3696a0ca.png",
            bgColor: "bg-teal-800",
            subcategory: "t-shirts",
        },
        {
            _id: 3,
            title: "Cool Pairs",
            subtitle: "U.S. POLO ASSN. & More",
            discount: "MIN. 45% OFF",
            image: "https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2025/JULY/3/1koEN8bc_657f670491b44c0d96e65745e9db735c.png",
            bgColor: "bg-blue-200",
            subcategory: "casual-shoes",
        },
        {
            _id: 4,
            title: "Unique Picks",
            subtitle: "FOSSIL | MICHAEL KORS",
            discount: "MIN. 30% OFF",
            image: "https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2025/JULY/3/XikYcqEJ_4cc1519181aa4647b43c235a0bc3c0a7.png",
            bgColor: "bg-green-200",
            subcategory: "watches",
        },
        {
            _id: 5,
            title: "Tech-Savvy Finds",
            subtitle: "ambrane | SANDISK",
            discount: "STARTING ₹399",
            image: "https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2025/JULY/3/TT7w5naG_fe3411b00d074941b8cc6ada5d078ec0.png",
            bgColor: "bg-orange-300",
            subcategory: "electronics",
        },
        {
            _id: 6,
            title: "watches",
            subtitle: "",
            discount: "STARTING ₹399",
            image: "https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2025/JULY/23/cPWbFSjw_916cc57064a449249835cd406dea2e06.png",
            bgColor: "bg-orange-300",
            subcategory: "accessories",
        },
        {
            _id: 7,
            title: "Earbuds",
            subtitle: "",
            discount: "STARTING ₹399",
            image: "https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2025/7/27/817f206b-ea51-4e39-8b5b-656f45192af81753595785755-9d95206c-0677-4e64-a0ef-f9659130b54e.png",
            bgColor: "bg-orange-300",
            subcategory: "electronics",
        },
        {
            _id: 8,
            title: "Dresses",
            subtitle: "",
            discount: "STARTING ₹399",
            image: "https://assets.myntassets.com/w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2025/JULY/23/kKAdjKiM_d6307904f635470f953b449859951411.png",
            bgColor: "bg-orange-300",
            subcategory: "dresses",
        },
        {
            _id: 9,
            title: "Denim",
            subtitle: "",
            discount: "STARTING ₹399",
            image: "https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2025/JULY/23/X9DTXwIc_de832eb0d9d7446893a5bc327b4cf8ac.png",
            bgColor: "bg-orange-300",
            subcategory: "denim",
        },
    ]

    const totalPages = Math.ceil(deals.length / itemsPerPage)

    const scrollToPage = (pageIndex) => {
        if (containerRef.current) {
            const firstCard = containerRef.current.children[0]?.children[0]
            if (firstCard) {
                const cardWidth = firstCard.offsetWidth
                const gap = 16 // Tailwind's space-x-4 = 16px
                const scrollAmount = pageIndex * (cardWidth + gap) * itemsPerPage

                containerRef.current.scrollTo({
                    left: scrollAmount,
                    behavior: "smooth",
                })

                setActiveIndex(pageIndex)
                activeIndexRef.current = pageIndex
            }
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            const nextIndex = (activeIndexRef.current + 1) % totalPages
            scrollToPage(nextIndex)
        }, 3000)

        return () => clearInterval(interval)
    }, [totalPages])

    return (
        <section className="py-5 bg-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-transparent to-gray-200 transform -skew-y-12"></div>
            </div>

            <div className="container mx-auto px-4 relative">
                {/* Headings */}
                <motion.div
                    className="text-center mb-8"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-2">CRAZY</h2>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">DEALS</h3>
                    <p className="text-lg text-gray-600 flex items-center justify-center">
                        Prices That Pack A Punch
                        <span className="ml-2 bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                            →
                        </span>
                    </p>
                </motion.div>

                {/* Carousel */}
                <div ref={containerRef} className="overflow-x-auto hide-scrollbar overflow-hidden scroll-smooth">
                    <div className="flex space-x-4 min-w-max">
                        {deals.map((deal, index) => (
                            <motion.div
                                key={deal._id}
                                className="min-w-[260px] rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow bg-white"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.03 }}
                            >
                                <Link to={`/products/subcategory/${deal.subcategory}`}>
                                    <div className="p-4">
                                        <img
                                            src={deal.image}
                                            alt={deal.title}
                                            className="w-full h-65 rounded-md mb-4 object-contain"
                                        />
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Pagination Dots */}
                <div className="flex justify-center mt-8 space-x-2">
                    {Array.from({ length: totalPages }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => scrollToPage(index)}
                            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${activeIndex === index ? "bg-gray-800 scale-110" : "bg-gray-300"}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default CrazyDeals
