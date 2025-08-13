import { motion } from "framer-motion"
import { Link } from "react-router-dom"

const CategoryDeals = ({ title, deals }) => {
    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
                <motion.h2
                    className="text-3xl md:text-4xl font-bold text-center mb-8"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    {title}
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                    {deals.map((category, index) => (
                        <motion.div
                            key={category.id}
                            className={`${category.bgColor} rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow`}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.02 }}
                        >
                            <Link
                                to={`/products/subcategory/${category.subcategory || category.title.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                            >
                                <div className="p-6 ">
                                    <img
                                        src={category.image || "/placeholder.svg"}
                                        alt={category.title}
                                        className="w-full h-48 object-contain rounded-lg mb-4"
                                    />
                                    <div className="bg-white rounded-lg p-4">
                                        {/* <p className="text-xs text-gray-600 mb-2">{deal.subtitle}</p>
                                    <h3 className="font-bold text-lg mb-2">{deal.title}</h3>
                                    <p className="font-bold text-xl text-red-600">{deal.discount}</p> */}
                                    </div>
                                </div>
                            </Link>
                        </motion.div>

                    ))}
                </div>

                {/* Pagination Dots */}
                {/* <div className="flex justify-center mt-8 space-x-2">
                    {[...Array(4)].map((_, index) => (
                        <div key={index} className={`w-2 h-2 rounded-full ${index === 0 ? "bg-gray-800" : "bg-gray-300"}`} />
                    ))}
                </div> */}


            </div>
        </section>
    )
}

export default CategoryDeals