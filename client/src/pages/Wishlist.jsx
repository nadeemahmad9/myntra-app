import { useEffect } from "react"
import { motion } from "framer-motion"
import { Heart, ShoppingBag, Trash2 } from "lucide-react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux" // ✅ Redux hooks
import { removeFromWishlist, fetchWishlist } from "../redux/slices/wishlistSlice" // ✅ Actions
import { addToCart } from "../redux/slices/cartSlice" // ✅ Cart action
import toast from "react-hot-toast"

const Wishlist = () => {
    const dispatch = useDispatch()

    // ✅ Redux state se data nikalna
    const { items: wishlistItems, loading: wishlistLoading } = useSelector((state) => state.wishlist)
    const { isAuthenticated } = useSelector((state) => state.auth)

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(fetchWishlist()) // ✅ Login hai toh wishlist fetch karo
        }
    }, [isAuthenticated, dispatch])

    const handleAddToBag = async (product) => {
        try {
            // Myntra logic: Wishlist se bag mein daalne ke liye default size 'M' ya jo available ho
            const defaultSize = product.sizes?.find((s) => s.available)?.size || "M"

            await dispatch(addToCart({
                productId: product._id,
                qty: 1,
                size: defaultSize
            })).unwrap()

            // 2. Cart mein success hone ke baad, Wishlist se remove karein
            // Yahan 'removeFromWishlist' wahi action hai jo aapne slice mein banaya hai
            await dispatch(removeFromWishlist(product._id)).unwrap();

            toast.success("Added to Bag!")
        } catch (error) {
            toast.error(error || "Error adding to cart")
        }
    }

    const handleRemove = (productId) => {
        dispatch(removeFromWishlist(productId))
            .unwrap()
            .then(() => toast.success("Removed from Wishlist"))
            .catch(() => toast.error("Failed to remove"))
    }

    // 1. Not Authenticated State
    if (!isAuthenticated) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center bg-white px-4">
                <div className="text-center">
                    <Heart className="w-20 h-20 text-gray-200 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-gray-800 mb-2">PLEASE LOG IN</h2>
                    <p className="text-gray-500 mb-6">Login to view items in your wishlist.</p>
                    <Link to="/login" className="inline-block border-2 border-pink-500 text-pink-500 px-10 py-3 rounded font-bold hover:bg-pink-500 hover:text-white transition-all">
                        LOGIN
                    </Link>
                </div>
            </div>
        )
    }

    // 2. Loading State
    if (wishlistLoading) {
        return <div className="min-h-screen flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    }

    // 3. Empty State
    if (!wishlistItems || wishlistItems.length === 0) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center bg-white px-4">
                <div className="text-center">
                    <Heart className="w-20 h-20 text-gray-200 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-gray-800 mb-2">YOUR WISHLIST IS EMPTY</h2>
                    <p className="text-gray-500 mb-6">Add items that you like to your wishlist.</p>
                    <Link to="/" className="inline-block bg-pink-500 text-white px-10 py-3 rounded font-bold hover:bg-pink-600 transition-all shadow-lg">
                        CONTINUE SHOPPING
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-4 py-10">
                <h1 className="text-lg font-bold mb-8 text-gray-800 uppercase tracking-wider">
                    My Wishlist <span className="font-normal text-gray-500">({wishlistItems.length} items)</span>
                </h1>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-8">
                    {wishlistItems.map((item) => (
                        <motion.div
                            key={item._id}
                            className="relative border border-gray-100 group"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            {/* Remove Icon */}
                            <button
                                onClick={() => handleRemove(item._id)}
                                className="absolute top-2 right-2 z-10 p-1.5 bg-white/80 rounded-full hover:bg-white shadow-sm"
                            >
                                <Trash2 className="w-4 h-4 text-gray-500 hover:text-red-500 transition-colors" />
                            </button>

                            <Link to={`/product/${item._id}`}>
                                <div className="aspect-[3/4] overflow-hidden bg-gray-50">
                                    <img
                                        src={item.image || item.images?.[0] || "/placeholder.svg"}
                                        alt={item.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                            </Link>

                            <div className="p-3 border-t">
                                <h3 className="font-bold text-sm text-gray-800 truncate mb-1">{item.brand}</h3>
                                <p className="text-gray-500 text-xs truncate mb-2">{item.name}</p>

                                <div className="flex items-center gap-2 mb-4">
                                    <span className="font-bold text-sm">₹{item.price}</span>
                                    {item.originalPrice && (
                                        <span className="text-gray-400 line-through text-[10px]">₹{item.originalPrice}</span>
                                    )}
                                    {item.discount > 0 && (
                                        <span className="text-orange-400 text-[10px] font-bold">({item.discount}% OFF)</span>
                                    )}
                                </div>

                                <button
                                    onClick={() => handleAddToBag(item)}
                                    className="w-full py-2 border border-pink-500 text-pink-500 text-xs font-bold rounded uppercase hover:bg-pink-50 transition-colors flex items-center justify-center gap-2"
                                >
                                    <ShoppingBag size={14} />
                                    Move to Bag
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Wishlist