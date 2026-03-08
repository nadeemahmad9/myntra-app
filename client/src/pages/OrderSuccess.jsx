import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Package, ArrowRight, ShoppingBag } from "lucide-react";
import confetti from "canvas-confetti"; // Optional: Celebration effect ke liye

const OrderSuccess = () => {
    const { id } = useParams(); // Order ID URL se lene ke liye

    useEffect(() => {
        // 2+ Year Exp Touch: Celebration effect on mount
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#ff3f6c", "#282c3f", "#ffffff"],
        });
    }, []);

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            <div className="max-w-md w-full text-center">
                {/* Animated Icon */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="mb-6 flex justify-center"
                >
                    <div className="bg-green-100 p-4 rounded-full">
                        <CheckCircle size={80} className="text-green-500" />
                    </div>
                </motion.div>

                {/* Success Message */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl font-bold text-gray-900 mb-2"
                >
                    Order Placed!
                </motion.h1>
                <p className="text-gray-500 mb-8">
                    Thank you for shopping with us. Your order has been successfully placed and is being processed.
                </p>

                {/* Order Info Card */}
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-6 mb-8 text-left">
                    <div className="flex justify-between mb-4">
                        <span className="text-gray-500 text-sm">Order ID:</span>
                        <span className="font-mono font-bold text-sm">#{id?.slice(-8).toUpperCase()}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-700">
                        <Package size={18} className="text-pink-500" />
                        <span>Estimated Delivery: <span className="font-bold">By {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toDateString()}</span></span>
                    </div>
                </div>

                {/* Navigation Buttons */}
                <div className="space-y-4">
                    <Link
                        to={`/order/${id}`}
                        className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-4 rounded-lg font-bold hover:bg-gray-800 transition-all"
                    >
                        VIEW ORDER DETAILS <ArrowRight size={18} />
                    </Link>

                    <Link
                        to="/"
                        className="w-full flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-700 py-4 rounded-lg font-bold hover:bg-gray-50 transition-all"
                    >
                        <ShoppingBag size={18} /> CONTINUE SHOPPING
                    </Link>
                </div>

                <p className="mt-8 text-xs text-gray-400">
                    A confirmation email has been sent to your registered email address.
                </p>
            </div>
        </div>
    );
};

export default OrderSuccess;