


import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CategoryHero = ({ data }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    if (!Array.isArray(data) || data.length === 0) {
        return null; // or return a loading spinner
    }

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % data.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + data.length) % data.length);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % data.length);
        }, 5000); // Auto-slide every 5 seconds

        return () => clearInterval(interval); // Cleanup on unmount
    }, [data.length]);

    const current = data[currentSlide];

    return (
        <div className="relative w-[1250px] h-[400px] overflow-hidden top-1">
            <motion.div
                className="absolute inset-0 object-contain bg-cover bg-center transition-all duration-1000"
                style={{ backgroundImage: `url(${current.image})` }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                {/* <div className="bg-opacity-40 w-full h-full flex items-center">
                    <div className="container mx-auto px-4 py-12 text-white">
                        <motion.div
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                        >
                            <h1 className="text-3xl md:text-5xl font-bold mb-4">{current.title}</h1>
                            <h2 className="text-xl md:text-2xl mb-4">{current.subtitle}</h2>
                            <h3 className="text-4xl md:text-6xl font-bold text-yellow-300 mb-4">{current.discount}</h3>
                            <p className="text-lg mb-6">{current.description}</p>
                            <motion.button
                                className="bg-white text-gray-800 px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {current.buttonText}
                            </motion.button>
                        </motion.div>
                    </div>
                </div> */}
            </motion.div>

            {/* Arrows */}
            <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-opacity-30 hover:bg-opacity-50 rounded-full p-2 z-10">
                <ChevronLeft className="w-6 h-6 text-black" />
            </button>
            <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-opacity-30 hover:bg-opacity-50 rounded-full p-2 z-10">
                <ChevronRight className="w-6 h-6 text-black" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                {data.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full ${index === currentSlide ? "bg-white" : "bg-gray-400"} transition-all`}
                    />
                ))}
            </div>
        </div>
    );
};

export default CategoryHero;
