// import { motion } from "framer-motion"
// import { Heart, ShoppingBag } from "lucide-react"
// import { useWishlist } from "../context/WishlistContext"
// import { useCart } from "../context/CartContext"
// import { Link } from "react-router-dom"

// const Wishlist = () => {
//     const { wishlist, removeFromWishlist } = useWishlist()
//     const { addToCart } = useCart()

//     const handleAddToBag = (product) => {
//         addToCart({
//             id: product.id,
//             name: product.name,
//             brand: product.brand,
//             price: product.price,
//             image: product.image,
//             size: "M", // Default size, user can change in cart
//         })
//         alert("Added to bag successfully!")
//     }

//     if (wishlist.items.length === 0) {
//         return (
//             <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//                 <div className="text-center">
//                     <Heart className="w-24 h-24 text-gray-300 mx-auto mb-4" />
//                     <h2 className="text-2xl font-bold text-gray-800 mb-2">Your wishlist is empty</h2>
//                     <p className="text-gray-600 mb-6">Save your favorite items here</p>
//                     <Link to="/" className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors">
//                         Continue Shopping
//                     </Link>
//                 </div>
//             </div>
//         )
//     }

//     return (
//         <div className="min-h-screen bg-gray-50">
//             <div className="container mx-auto px-4 py-8">
//                 <h1 className="text-2xl font-bold mb-8">My Wishlist ({wishlist.items.length} items)</h1>

//                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                     {wishlist.items.map((product, index) => (
//                         <motion.div
//                             key={product.id}
//                             className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
//                             initial={{ opacity: 0, y: 20 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ delay: index * 0.1 }}
//                         >
//                             <div className="relative">
//                                 <Link to={`/product/${product.id}`}>
//                                     <img
//                                         src={product.image || "/placeholder.svg"}
//                                         alt={product.name}
//                                         className="w-full h-48 object-cover"
//                                     />
//                                 </Link>
//                                 <button
//                                     onClick={() => removeFromWishlist(product.id)}
//                                     className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-gray-50"
//                                 >
//                                     <Heart className="w-5 h-5 text-red-500 fill-current" />
//                                 </button>
//                                 <div className="absolute top-2 left-2 bg-white rounded-full px-2 py-1">
//                                     <span className="text-xs font-bold text-green-600">{product.discount}% OFF</span>
//                                 </div>
//                             </div>

//                             <div className="p-4">
//                                 <h3 className="font-medium text-sm mb-1">{product.brand}</h3>
//                                 <p className="text-xs text-gray-600 mb-2 line-clamp-2">{product.name}</p>
//                                 <div className="flex items-center mb-3">
//                                     <span className="text-sm font-bold">Rs. {product.price}</span>
//                                     <span className="text-xs text-gray-500 line-through ml-2">Rs. {product.originalPrice}</span>
//                                 </div>
//                                 <button
//                                     onClick={() => handleAddToBag(product)}
//                                     className="w-full bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition-colors flex items-center justify-center text-sm"
//                                 >
//                                     <ShoppingBag className="w-4 h-4 mr-2" />
//                                     Add to Bag
//                                 </button>
//                             </div>
//                         </motion.div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Wishlist


import { useEffect } from "react"
import { motion } from "framer-motion"
import { Heart, ShoppingBag, Trash2 } from "lucide-react"
import { useApp } from "../context/AppContext"
import { Link } from "react-router-dom"

const Wishlist = () => {
    const { wishlistItems, wishlistLoading, removeFromWishlist, addToCart, isAuthenticated } = useApp()

    useEffect(() => {
        if (!isAuthenticated) {
            return
        }
    }, [isAuthenticated])



    const handleAddToBag = async (product) => {
        try {
            // Assuming default size for wishlist items
            const defaultSize = product.sizes?.find((s) => s.available)?.size || "M"
            await addToCart(product._id, 1, defaultSize)
        } catch (error) {
            console.error("Error adding to cart:", error)
        }
    }

    const handleRemoveFromWishlist = async (productId) => {
        try {
            await removeFromWishlist(productId)
        } catch (error) {
            console.error("Error removing from wishlist:", error)
        }
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <Heart className="w-24 h-24 text-gray-300 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Please login to view your wishlist</h2>
                    <Link to="/login" className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors">
                        Login
                    </Link>
                </div>
            </div>
        )
    }

    if (wishlistLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="spinner mx-auto mb-4"></div>
                    <p>Loading wishlist...</p>
                </div>
            </div>
        )
    }

    if (!wishlistItems?.length) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <Heart className="w-24 h-24 text-gray-300 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Your wishlist is empty</h2>
                    <p className="text-gray-600 mb-6">Add some products to your wishlist</p>
                    <Link to="/" className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors">
                        Continue Shopping
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-8">My Wishlist ({wishlistItems.length} items)</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {wishlistItems.map((item) => (
                        <motion.div
                            key={item._id}
                            className="bg-white rounded-lg shadow-sm overflow-hidden"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ y: -5 }}
                        >
                            <div className="relative">
                                <img
                                    src={item.images?.[0] || "/placeholder.svg"}
                                    alt={item.name}
                                    className="w-full h-64 object-cover"
                                />
                                <button
                                    onClick={() => handleRemoveFromWishlist(item._id)}
                                    className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
                                >
                                    <Trash2 className="w-4 h-4 text-red-500" />
                                </button>
                            </div>

                            <div className="p-4">
                                <h3 className="font-medium text-lg mb-1">{item.brand}</h3>
                                <p className="text-gray-600 text-sm mb-2 line-clamp-2">{item.name}</p>

                                <div className="flex items-center space-x-2 mb-3">
                                    <span className="font-bold text-lg">₹{item.price}</span>
                                    {item.originalPrice && (
                                        <>
                                            <span className="text-gray-500 line-through text-sm">₹{item.originalPrice}</span>
                                            <span className="text-green-600 text-sm">({item.discount}% OFF)</span>
                                        </>
                                    )}
                                </div>

                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleAddToBag(item)}
                                        className="flex-1 bg-pink-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-pink-600 transition-colors flex items-center justify-center"
                                    >
                                        <ShoppingBag className="w-4 h-4 mr-1" />
                                        Add to Bag
                                    </button>
                                    <Link
                                        to={`/product/${item._id}`}
                                        className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                                    >
                                        View
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Wishlist
