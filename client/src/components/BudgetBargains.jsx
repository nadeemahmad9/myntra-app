


import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"

const BudgetBargains = () => {
    const containerRef = useRef(null)
    const [activeIndex, setActiveIndex] = useState(0)

    const bargains = [
        {
            id: 1,
            title: "Comfy Casual Shoes",
            price: "UNDER ₹899",
            image: "https://assets.myntassets.com/f_webp,w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2025/JULY/30/MNDBh1LA_f36a8f3448584182acccba3eae5d6291.png",
            bgColor: "bg-blue-100",
            subcategory: "casual-shoes",
        },
        {
            id: 2,
            title: "Deodorants",
            price: "UNDER ₹199",
            image: "https://assets.myntassets.com/f_webp,w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2025/JULY/30/zX3GP9gp_d8f389e3e5bb4f8e9bc55bc97fcff8b0.png",
            bgColor: "bg-green-100",
            subcategory: "deodorants",
        },
        {
            id: 3,
            title: "Breezy Flip Flops",
            price: "UNDER ₹499",
            image: "https://assets.myntassets.com/f_webp,w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2025/JULY/30/IlgrnsQG_2ccd62275792440f9d7f537eeada25a0.png",
            bgColor: "bg-yellow-100",
            subcategory: "flip-flops",
        },
        {
            id: 4,
            title: "Sharp Formal Shoes",
            price: "UNDER ₹899",
            image: "https://assets.myntassets.com/f_webp,w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2025/JULY/30/sAangJB0_da9067a451ef451c9e8174df110c26d6.png",
            bgColor: "bg-gray-100",
            subcategory: "formal-shoes",
        },
        {
            id: 5,
            title: "Trendy Jeans",
            price: "UNDER ₹649",
            image: "https://assets.myntassets.com/f_webp,w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2025/JULY/30/uXOztQzr_f8a3daea1b1a4db696086350b9016c1d.png",
            bgColor: "bg-blue-100",
            subcategory: "jeans",
        },
        {
            id: 6,
            title: "Enticing Perfumes",
            price: "UNDER ₹449",
            image: "https://assets.myntassets.com/f_webp,w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2025/JULY/30/JJmkjCII_f11ea3bd852b494c90e54626646ad4e4.png",
            bgColor: "bg-green-100",
            subcategory: "perfumes",
        },
        {
            id: 7,
            title: "Sporty Footwear",
            price: "UNDER ₹1099",
            image: "https://assets.myntassets.com/f_webp,w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2025/JULY/30/iTkCMr5N_b2a944508df24f91a9a0012b6e3f1153.png",
            bgColor: "bg-red-100",
            subcategory: "sports-shoes",
        },
        {
            id: 8,
            title: "Bedsheets",
            price: "UNDER ₹249",
            image: "https://assets.myntassets.com/f_webp,w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2025/JULY/30/RzIcIoLs_cd6d9c7cf6aa42bd86deb95bd920addd.png",
            bgColor: "bg-orange-100",
            subcategory: "bed-linen",
        },
        {
            id: 9,
            title: "Backpacks",
            price: "UNDER ₹549",
            image: "https://assets.myntassets.com/f_webp,w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2025/JULY/30/E2RRrsUa_43501d2a72874daa894feaa2a503bbad.png",
            bgColor: "bg-orange-100",
            subcategory: "accessories",
        },

        {
            id: 10,
            title: "Casual Tees",
            price: "UNDER ₹999 ₹399",
            image: "https://assets.myntassets.com/f_webp,w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2025/JULY/10/lVr5norO_5a34d51e92074ac8a941d59b682f557b.png",
            bgColor: "bg-orange-100",
            subcategory: "t-shirts",
        },
        {
            id: 11,
            title: "Body Lotion",
            price: "UNDER ₹199",
            image: "https://assets.myntassets.com/f_webp,w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2025/JULY/30/kRiEnFdI_86fd7697c69c42d9a71c41e6ee540aa2.png",
            bgColor: "bg-orange-100",
            subcategory: "grooming",
        },
        {
            id: 12,
            title: "Conditioners",
            price: "UNDER ₹149",
            image: "https://assets.myntassets.com/f_webp,w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2025/JULY/30/DJZd7GUV_74058678952f4b03902330b4979d4026.png",
            bgColor: "bg-orange-100",
            subcategory: "grooming",
        },
        {
            id: 13,
            title: "Face Cleansers",
            price: "UNDER ₹149",
            image: "https://assets.myntassets.com/f_webp,w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2025/JULY/30/HEBEpBvk_da7f846c48f84b93a191eaa02fe77fee.png",
            bgColor: "bg-orange-100",
            subcategory: "grooming",
        },
        {
            id: 14,
            title: "Sunscreens",
            price: "UNDER ₹149",
            image: "https://assets.myntassets.com/f_webp,w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2025/JULY/30/CZMRvXJe_2ca89fb05f014160b7b006be83d53d90.png",
            bgColor: "bg-orange-100",
            subcategory: "grooming",
        },
        {
            id: 15,
            title: "Shaving Foams",
            price: "UNDER ₹149",
            image: "https://assets.myntassets.com/f_webp,w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2025/JULY/30/bXVVov6A_418bfdd0d4434f90b588e39babd8df16.png",
            bgColor: "bg-orange-100",
            subcategory: "grooming",
        },
        {
            id: 16,
            title: "Hair Oil",
            price: "UNDER ₹199",
            image: "https://assets.myntassets.com/f_webp,w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2025/JULY/30/TUv4kOZE_29ebd43e415e4f648b9661b59e9a008e.png",
            bgColor: "bg-orange-100",
            subcategory: "grooming",
        },
        {
            id: 17,
            title: "Headphones",
            price: "UNDER ₹999",
            image: "https://assets.myntassets.com/f_webp,w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2025/JULY/30/MOKIOcbQ_de64ce8935414365bc36165e41f5e71d.png",
            bgColor: "bg-orange-100",
            subcategory: "electronics",
        },
        {
            id: 18,
            title: "Casual Tees",
            price: "UNDER ₹999 ₹399",
            image: "https://assets.myntassets.com/f_webp,w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2025/JULY/10/lVr5norO_5a34d51e92074ac8a941d59b682f557b.png",
            bgColor: "bg-orange-100",
            subcategory: "t-shirts",
        },


    ]
    const itemsPerPage = 5

    // Calculate starting index of each "page"
    const totalPages = Math.ceil(bargains.length / itemsPerPage)


    const activeIndexRef = useRef(0)

    // const scrollToIndex = (index) => {
    //     if (containerRef.current) {
    //         const child = containerRef.current.children[0]?.children[index]
    //         if (child) {
    //             const offsetLeft = child.offsetLeft
    //             containerRef.current.scrollTo({
    //                 left: offsetLeft,
    //                 behavior: "smooth",
    //             })
    //             setActiveIndex(index)
    //             activeIndexRef.current = index
    //         }
    //     }
    // }

    const scrollToPage = (pageIndex) => {
        if (containerRef.current) {
            const container = containerRef.current

            // ✅ Correctly select the first card
            const firstCard = container.children[0]?.children[0]
            const cardWidth = firstCard?.offsetWidth || 200
            const gap = 4  // Adjust based on your Tailwind space-x-* class (space-x-1 = 0.25rem = 4px)

            const scrollAmount = pageIndex * (cardWidth + gap) * itemsPerPage

            container.scrollTo({
                left: scrollAmount,
                behavior: "smooth",
            })

            setActiveIndex(pageIndex)
            activeIndexRef.current = pageIndex
        }
    }





    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         const nextIndex = (activeIndexRef.current + 1) % bargains.length
    //         scrollToIndex(nextIndex)
    //     }, 3000)

    //     return () => clearInterval(interval)
    // }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            const nextPage = (activeIndexRef.current + 1) % totalPages
            scrollToPage(nextPage)
        }, 3000)

        return () => clearInterval(interval)
    }, [])





    return (
        <section className="py-3 bg-white">
            <div className="container mx-auto px-3">
                <motion.h2
                    className="text-3xl md:text-4xl font-bold text-center mb-6"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    BUDGET BARGAINS
                </motion.h2>

                {/* Carousel */}
                <div className="overflow-x-auto overflow-y-hidden hide-scrollbar" ref={containerRef}>
                    <div className="flex space-x-1 min-w-max  px-3">
                        {bargains.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.05 }}
                                className="min-w-[200px]"
                            >
                                <Link to={`/products/subcategory/${item.subcategory}`}>
                                    <div className={`rounded-lg p-3 text-center cursor-pointer hover:shadow-lg transition-shadow`}>
                                        <div className="mb-4">
                                            <img
                                                src={item.image}
                                                // alt={item.title}
                                                className="w-full h-60 object-cover rounded-lg mb-2"
                                            />
                                        </div>
                                        {/* <h3 className="font-semibold text-sm mb-2">{item.title}</h3> */}
                                        {/* <p className="text-xs text-gray-600">{item.price}</p> */}
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Pagination Dots */}
                {/* <div className="flex justify-center mt-6 space-x-2">
                    {bargains.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => scrollToIndex(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${activeIndex === index ? "bg-gray-800 scale-110" : "bg-gray-300"}`}
                        />
                    ))}
                </div> */}

                <div className="flex justify-center mt-6 space-x-2">
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => scrollToPage(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${activeIndex === index ? "bg-gray-800 scale-110" : "bg-gray-300"
                                }`}
                        />
                    ))}
                </div>


            </div>
        </section>
    )
}

export default BudgetBargains


