import { motion } from "framer-motion"
import { Link } from "react-router-dom"

const CategoryProducts = ({ title, categories }) => {
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
                    {title}
                </motion.h2>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                    {Array.isArray(categories) &&
                        categories.map((category, index) => (
                            <motion.div
                                key={category.id || index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <Link
                                    to={`/products/subcategory/${category.subcategory || category.title.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                                >
                                    <div className="rounded-md text-center cursor-pointer transition-shadow">
                                        <div className="mb-6">
                                            <img
                                                src={category.image || "/placeholder.svg"}
                                                alt={category.title}
                                                className="w-full h-70 object-contain rounded-lg mb-2"
                                            />
                                        </div>

                                    </div>
                                </Link>
                            </motion.div>
                        ))}

                </div>
            </div>
        </section>
    )
}

export default CategoryProducts
