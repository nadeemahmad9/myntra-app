import { motion } from "framer-motion"
import { Link } from "react-router-dom"

const ShopByCategory = () => {
    const categories = [
        {
            id: 1,
            title: "Ethnic Wear",
            discount: "50-80% OFF",
            image: "/catPic2.png",
            bgColor: "bg-pink-100",
            subcategory: "ethnic-wear",
        },
        {
            id: 2,
            title: "Casual Wear",
            discount: "40-80% OFF",
            image: "/catPic.png",
            bgColor: "bg-yellow-100",
            subcategory: "casual-wear",
        },
        {
            id: 3,
            title: "Men's Activewear",
            discount: "30-70% OFF",
            image: "/catPic3.png",
            bgColor: "bg-blue-100",
            subcategory: "activewear",
        },
        {
            id: 4,
            title: "Women's Activewear",
            discount: "30-70% OFF",
            image: "/catPic4.png",
            bgColor: "bg-green-100",
            subcategory: "activewear",
        },
        {
            id: 5,
            title: "Western Wear",
            discount: "40-80% OFF",
            image: "/catPic5.png",
            bgColor: "bg-purple-100",
            subcategory: "western-wear",
        },
        {
            id: 6,
            title: "Sportswear",
            discount: "30-80% OFF",
            image: "/catPic6.png",
            bgColor: "bg-gray-100",
            subcategory: "sportswear",
        },
        {
            id: 7,
            title: "Loungewear",
            discount: "30-60% OFF",
            image: "/catPic7.png",
            bgColor: "bg-pink-100",
            subcategory: "loungewear",
        },
        {
            id: 8,
            title: "Innerwear",
            discount: "UP TO 70% OFF",
            image: "/catPic8.png",
            bgColor: "bg-red-100",
            subcategory: "innerwear",
        },
        {
            id: 9,
            title: "Watches",
            discount: "UP TO 80% OFF",
            image: "/catPic9.png",
            bgColor: "bg-brown-100",
            subcategory: "watches",
        },
        {
            id: 10,
            title: "grooming",
            discount: "UP TO 60% OFF",
            image: "/catPic10.png",
            bgColor: "bg-yellow-100",
            subcategory: "grooming",
        },

        {
            id: 11,
            title: "Beauty & Makeup",
            discount: "UP TO 60% OFF",
            image: "/catPic11.png",
            bgColor: "bg-pink-200",
            subcategory: "makeup",
        },
        {
            id: 12,
            title: "Kids Wear",
            discount: "50-70% OFF",
            image: "/catPic12.png",
            bgColor: "bg-pink-200",
            subcategory: "boys-clothing",
        },
        {
            id: 13,
            title: "Office Wear",
            discount: "50-70% OFF",
            image: "/catPic13.png",
            bgColor: "bg-pink-200",
            subcategory: "women-clothing",
        },
        {
            id: 14,
            title: "Headphones & sneakers",
            discount: "Up To 70% OFF",
            image: "/catPic14.png",
            bgColor: "bg-pink-200",
            subcategory: "electronics",
        },
        {
            id: 15,
            title: "Trolleys & Luggage Bags",
            discount: "30-70% OFF",
            image: "/catPic15.png",
            bgColor: "bg-pink-200",
            subcategory: "accessories",
        },
        {
            id: 16,
            title: "Eyewear",
            discount: "UPTO 80% OFF",
            image: "/catPic16.png",
            bgColor: "bg-pink-200",
            subcategory: "accessories",
        },
        {
            id: 17,
            title: "Activewear",
            discount: "30-70% OFF",
            image: "/catPic17.png",
            bgColor: "bg-pink-200",
            subcategory: "women-activewear",
        },
        {
            id: 18,
            title: "Activewear",
            discount: "30-70% OFF",
            image: "/catPic18.png",
            bgColor: "bg-pink-200",
            subcategory: "men-activewear",
        },
    ]

    return (
        <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
                <motion.h2
                    className="text-3xl md:text-4xl font-bold text-center mb-8"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    SHOP BY CATEGORY
                </motion.h2>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 ">
                    {categories.map((category, index) => (
                        <motion.div
                            key={category.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            viewport={{ once: true }}
                        // whileHover={{ scale: 1.05 }}
                        >
                            <Link to={`/products/subcategory/${category.subcategory}`}>
                                <div
                                    className={` rounded-md  text-center  cursor-pointer transition-shadow`}
                                >
                                    <div className="mb-6 ">
                                        <img
                                            src={category.image || "/placeholder.svg"}
                                            // alt={category.title}
                                            className="w-full h-60 object-cover rounded-lg mb-2"
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

export default ShopByCategory
