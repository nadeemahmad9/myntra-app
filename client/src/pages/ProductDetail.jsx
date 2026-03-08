// import { useEffect, useState } from "react"
// import { useParams, Link, useNavigate } from "react-router-dom"
// import { useDispatch, useSelector } from "react-redux"
// import { motion } from "framer-motion"
// import { Heart, Star, Truck, RotateCcw, Shield, ShoppingBag } from "lucide-react"
// import { listProductDetails, resetProductState } from "../redux/slices/productSlice"
// import { addToCart } from "../redux/slices/cartSlice" // ✅ Action imported
// import { toggleWishlist } from "../redux/slices/wishlistSlice" // ✅ Action imported
// import toast from "react-hot-toast"

// const ProductDetail = () => {
//     const { id } = useParams()
//     const dispatch = useDispatch()
//     const navigate = useNavigate()

//     // Redux State
//     const { product, loading, error } = useSelector((state) => state.products)
//     const { isAuthenticated } = useSelector((state) => state.auth)
//     const { wishlist } = useSelector((state) => state.wishlist || { wishlist: [] })

//     // Local UI State
//     const [selectedSize, setSelectedSize] = useState("")
//     const [selectedImage, setSelectedImage] = useState(0)
//     const [pincode, setPincode] = useState("")

//     useEffect(() => {
//         dispatch(listProductDetails(id))
//         return () => dispatch(resetProductState())
//     }, [dispatch, id])

//     // ✅ Add to Cart Handler
//     // ✅ Add to Cart Handler (Updated with Safety Checks)
//     const handleAddToBag = () => {
//         if (!isAuthenticated) {
//             toast.error("Please login to add items to bag");
//             navigate("/login");
//             return;
//         }

//         if (!selectedSize) {
//             toast.error("Please select a size first");
//             return;
//         }

//         // Safety check for image
//         const productImage = product.images && product.images.length > 0
//             ? product.images[0]
//             : (product.image || "");

//         const cartData = {
//             productId: product._id, // ✅ Matches controller's destructuring
//             name: product.name,
//             price: product.price,
//             image: productImage, // ✅ Guaranteed string
//             qty: 1,
//             size: selectedSize
//         };

//         dispatch(addToCart(cartData))
//             .unwrap()
//             .then(() => {
//                 // Myntra Style Custom Toast
//                 toast.success("Added to Bag", {
//                     icon: '🛍️',
//                     style: {
//                         borderRadius: '4px',
//                         background: '#333',
//                         color: '#fff',
//                         fontSize: '14px'
//                     }
//                 });
//             })
//             .catch((err) => {
//                 toast.error(err || "Failed to add to bag");
//             });
//     };

//     // ✅ Wishlist Toggle Handler
//     const handleWishlist = () => {
//         if (!isAuthenticated) {
//             toast.error("Please login to use wishlist")
//             navigate("/login")
//             return
//         }
//         dispatch(toggleWishlist(product._id))
//             .unwrap()
//             .then(() => toast.success("Wishlist updated!"))
//     }

//     const isItemInWishlist = wishlist?.some(item => item._id === product._id)

//     if (loading) return (
//         <div className="min-h-screen flex items-center justify-center">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-pink-500"></div>
//         </div>
//     )

//     if (error) return <div className="p-10 text-center text-red-500 font-bold">{error}</div>
//     if (!product?._id) return null

//     return (
//         <div className="min-h-screen bg-white">
//             <div className="bg-gray-50 py-3 border-b border-gray-100">
//                 <div className="container mx-auto px-4 text-sm text-gray-500">
//                     <Link to="/" className="hover:text-pink-500">Home</Link>
//                     <span className="mx-2">/</span>
//                     <span className="font-medium text-gray-800 uppercase tracking-tight">{product.brand}</span>
//                 </div>
//             </div>

//             <div className="container mx-auto px-4 py-8">
//                 <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

//                     {/* Left: Images */}
//                     <div className="lg:col-span-7 flex flex-col md:flex-row gap-4">
//                         <div className="order-2 md:order-1 flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto max-h-[600px] scrollbar-hide">
//                             {(product.images?.length > 0 ? product.images : [product.image]).map((img, i) => (
//                                 <img
//                                     key={i}
//                                     src={img}
//                                     className={`w-16 h-20 md:w-20 md:h-24 object-cover cursor-pointer border-2 transition-all ${selectedImage === i ? 'border-pink-500 shadow-sm' : 'border-transparent opacity-70 hover:opacity-100'}`}
//                                     onClick={() => setSelectedImage(i)}
//                                     alt={`view-${i}`}
//                                 />
//                             ))}
//                         </div>

//                         {/* Left: Images (Thumbnails) */}
//                         <div className="hidden md:flex flex-col gap-2">
//                             {/* Agar images array hai toh loop chalao, varna single image ko array bana kar dikhao */}
//                             {(product.images?.length > 0 ? product.images : [product.image]).map((img, i) => (
//                                 img && ( // Ensure img exists
//                                     <img
//                                         key={i}
//                                         src={img}
//                                         className={`w-20 h-24 object-cover cursor-pointer border-2 transition-all ${selectedImage === i ? 'border-pink-500 shadow-sm' : 'border-transparent opacity-70 hover:opacity-100'
//                                             }`}
//                                         onClick={() => setSelectedImage(i)}
//                                         alt="thumbnail"
//                                     />
//                                 )
//                             ))}
//                         </div>
//                         <div className="order-1 md:order-2 flex-1 bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center">
//                             <motion.img
//                                 initial={{ opacity: 0, scale: 0.95 }}
//                                 animate={{ opacity: 1, scale: 1 }}
//                                 key={selectedImage}
//                                 src={product.images?.[selectedImage] || product.image}
//                                 className="w-full h-full max-h-[650px] object-contain mix-blend-multiply"
//                             />
//                         </div>
//                     </div>

//                     {/* Right: Info */}
//                     <div className="lg:col-span-5 space-y-5">
//                         <div className="space-y-1">
//                             <h1 className="text-2xl font-bold text-gray-900 uppercase tracking-wide">{product.brand}</h1>
//                             <p className="text-xl text-gray-500 font-light">{product.name}</p>

//                             <div className="flex items-center mt-3 border border-gray-200 w-fit px-3 py-1 rounded-sm font-bold text-sm bg-white hover:border-gray-400 transition-colors cursor-pointer">
//                                 {product.rating} <Star size={14} className="ml-1 fill-green-600 text-green-600" />
//                                 <span className="ml-2 text-gray-400 font-normal border-l pl-2"> {product.numReviews} Ratings</span>
//                             </div>
//                         </div>

//                         <hr className="border-gray-100" />

//                         <div className="space-y-1">
//                             <div className="flex items-center gap-3">
//                                 <span className="text-2xl font-bold text-gray-800">₹{product.price}</span>
//                                 <span className="text-xl text-gray-400 line-through font-light">MRP ₹{product.originalPrice}</span>
//                                 <span className="text-xl text-orange-500 font-bold">({product.discount}% OFF)</span>
//                             </div>
//                             <p className="text-green-600 font-bold text-xs tracking-wide">INCLUSIVE OF ALL TAXES</p>
//                         </div>

//                         {/* Size Selection */}
//                         <div className="space-y-4 py-2">
//                             <div className="flex justify-between items-center">
//                                 <h3 className="font-bold text-gray-800 tracking-tight">SELECT SIZE</h3>
//                                 <button className="text-pink-500 font-bold text-xs hover:underline">SIZE CHART →</button>
//                             </div>
//                             <div className="flex flex-wrap gap-3">
//                                 {product.sizes?.map((s) => (
//                                     <button
//                                         key={s.size}
//                                         disabled={!s.available}
//                                         onClick={() => setSelectedSize(s.size)}
//                                         className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-all
//                                             ${selectedSize === s.size ? 'border-pink-500 text-pink-500 bg-pink-50' : 'border-gray-200 hover:border-pink-500'}
//                                             ${!s.available && 'bg-gray-100 text-gray-300 border-gray-100 cursor-not-allowed line-through'}
//                                         `}
//                                     >
//                                         {s.size}
//                                     </button>
//                                 ))}
//                             </div>
//                         </div>

//                         {/* Actions */}
//                         <div className="flex gap-4 pt-4">
//                             <motion.button
//                                 whileTap={{ scale: 0.95 }}
//                                 onClick={handleAddToBag}
//                                 className="flex-1 bg-pink-500 text-white py-4 rounded-md font-bold flex items-center justify-center gap-3 hover:bg-pink-600 shadow-lg shadow-pink-100 transition-all"
//                             >
//                                 <ShoppingBag size={20} /> ADD TO BAG
//                             </motion.button>

//                             <motion.button
//                                 whileTap={{ scale: 0.95 }}
//                                 onClick={handleWishlist}
//                                 className={`flex-1 border-2 py-4 rounded-md font-bold flex items-center justify-center gap-3 transition-all
//                                     ${isItemInWishlist ? 'border-gray-800 bg-gray-800 text-white' : 'border-gray-300 text-gray-800 hover:border-gray-800'}
//                                 `}
//                             >
//                                 <Heart size={20} className={isItemInWishlist ? 'fill-white' : ''} />
//                                 {isItemInWishlist ? 'WISHLISTED' : 'WISHLIST'}
//                             </motion.button>
//                         </div>

//                         {/* Delivery */}
//                         <div className="space-y-4 pt-6">
//                             <div className="flex items-center gap-2 font-bold text-gray-800">
//                                 <Truck size={20} /> DELIVERY OPTIONS
//                             </div>
//                             <div className="relative w-full max-w-sm">
//                                 <input
//                                     type="text"
//                                     placeholder="Enter pincode"
//                                     className="w-full border-2 border-gray-200 p-3 rounded-md text-sm focus:outline-none focus:border-pink-500 transition-colors"
//                                     value={pincode}
//                                     onChange={(e) => setPincode(e.target.value)}
//                                 />
//                                 <button className="absolute right-3 top-3 text-pink-500 font-bold text-sm hover:text-pink-600">Check</button>
//                             </div>
//                             <p className="text-xs text-gray-500">Please enter PIN code to check delivery time & Pay on Delivery Availability</p>
//                         </div>

//                         <div className="grid grid-cols-1 gap-4 pt-4 border-t border-gray-100">
//                             <div className="flex items-center gap-4 text-sm text-gray-700">
//                                 <div className="p-2 bg-gray-50 rounded-full"><Shield size={18} className="text-gray-400" /></div>
//                                 <span>100% Original Products</span>
//                             </div>
//                             <div className="flex items-center gap-4 text-sm text-gray-700">
//                                 <div className="p-2 bg-gray-50 rounded-full"><RotateCcw size={18} className="text-gray-400" /></div>
//                                 <span>Easy 7 days returns and exchanges</span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default ProductDetail


import { useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { motion } from "framer-motion"
import { Heart, Star, Truck, RotateCcw, Shield, ShoppingBag, ChevronRight } from "lucide-react"
import { listProductDetails, resetProductState } from "../redux/slices/productSlice"
import { addToCart } from "../redux/slices/cartSlice"
import { toggleWishlist } from "../redux/slices/wishlistSlice"
import toast from "react-hot-toast"

const ProductDetail = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { product, loading, error } = useSelector((state) => state.products)
    const { isAuthenticated } = useSelector((state) => state.auth)
    const { wishlist } = useSelector((state) => state.wishlist || { wishlist: [] })

    const [selectedSize, setSelectedSize] = useState("")
    const [pincode, setPincode] = useState("")

    useEffect(() => {
        dispatch(listProductDetails(id))
        window.scrollTo(0, 0)
        return () => dispatch(resetProductState())
    }, [dispatch, id])

    const handleAddToBag = () => {
        if (!isAuthenticated) {
            toast.error("Please login to add items to bag")
            navigate("/login")
            return
        }
        if (!selectedSize) {
            toast.error("Please select a size first")
            return
        }

        const productImage = product.images?.[0] || product.image || ""

        const cartData = {
            productId: product._id,
            name: product.name,
            price: product.price,
            image: productImage,
            qty: 1,
            size: selectedSize
        }

        dispatch(addToCart(cartData))
            .unwrap()
            .then(() => {
                toast.success("Added to Bag", {
                    icon: '🛍️',
                    style: { borderRadius: '4px', background: '#333', color: '#fff' }
                })
            })
            .catch((err) => toast.error(err || "Failed to add to bag"))
    }

    const handleWishlist = () => {
        if (!isAuthenticated) {
            toast.error("Please login to use wishlist")
            navigate("/login")
            return
        }
        dispatch(toggleWishlist(product._id))
            .unwrap()
            .then(() => toast.success("Wishlist updated!"))
    }

    const isItemInWishlist = wishlist?.some(item => item._id === product._id)

    if (loading) return (
        <div className="h-[80vh] flex items-center justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-pink-500"></div>
        </div>
    )

    if (error) return <div className="p-20 text-center text-red-500 font-bold">{error}</div>
    if (!product?._id) return null

    // Image list logic
    const productImages = product.images?.length > 0 ? product.images : [product.image]

    return (
        <div className="min-h-screen bg-white pb-20">
            {/* Breadcrumbs */}
            <div className="px-10 py-4 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                    <Link to="/" className="hover:text-black">Home</Link> <ChevronRight size={12} />
                    <span className="font-bold text-black uppercase">{product.brand}</span>
                </div>
            </div>

            <div className="max-w-[1300px] mx-auto px-4 lg:px-10">
                <div className="flex flex-col lg:flex-row gap-10">

                    {/* Left: Image Grid (Myntra Style) */}
                    <div className="lg:w-[60%] grid grid-cols-1 md:grid-cols-2 gap-3">
                        {productImages.map((img, i) => (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: i * 0.1 }}
                                key={i}
                                className="overflow-hidden bg-gray-50 aspect-[3/4]"
                            >
                                <img
                                    src={img}
                                    alt={`view-${i}`}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 cursor-zoom-in"
                                />
                            </motion.div>
                        ))}
                    </div>

                    {/* Right: Info Section (Sticky) */}
                    <div className="lg:w-[40%] lg:sticky lg:top-24 h-fit space-y-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 uppercase tracking-tight">{product.brand}</h1>
                            <p className="text-xl text-gray-500 font-medium">{product.name}</p>

                            {/* Rating */}
                            <div className="inline-flex items-center mt-4 px-3 py-1 border border-gray-200 rounded-sm font-bold text-sm bg-white hover:border-gray-400 transition-all cursor-pointer">
                                {product.rating} <Star size={14} className="ml-1 fill-green-600 text-green-600" />
                                <span className="ml-2 text-gray-400 font-normal border-l pl-2"> {product.numReviews} Ratings</span>
                            </div>
                        </div>

                        <hr className="border-gray-100" />

                        {/* Price */}
                        <div className="space-y-1">
                            <div className="flex items-center gap-3">
                                <span className="text-2xl font-bold text-gray-800">₹{product.price}</span>
                                <span className="text-xl text-gray-400 line-through font-light">MRP ₹{product.originalPrice || product.price + 500}</span>
                                <span className="text-xl text-orange-500 font-bold">({product.discount || 20}% OFF)</span>
                            </div>
                            <p className="text-green-600 font-bold text-xs">inclusive of all taxes</p>
                        </div>

                        {/* Size Selection */}
                        {/* Size Selection Section */}
                        <div className="space-y-4 pt-2">
                            <div className="flex justify-between items-center">
                                <h3 className="font-bold text-gray-800 text-sm">SELECT SIZE</h3>
                                <button className="text-pink-500 font-bold text-xs hover:underline uppercase">Size Chart</button>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {product.sizes?.map((s) => (
                                    <button
                                        key={s.size}
                                        disabled={!s.available}
                                        onClick={() => setSelectedSize(s.size)}
                                        className={`
                    /* ✅ Circle Fix: Fixed height but flexible min-width */
                    h-12 min-w-[3rem] px-2 rounded-full border flex items-center justify-center 
                    text-sm font-bold transition-all duration-200
                    
                    /* Active/Selected State */
                    ${selectedSize === s.size
                                                ? 'border-pink-500 text-pink-500 ring-1 ring-pink-500 bg-pink-50'
                                                : 'border-gray-300 hover:border-pink-500 text-gray-700'}
                    
                    /* Out of Stock State */
                    ${!s.available ? 'bg-gray-50 text-gray-300 border-gray-200 cursor-not-allowed' : 'cursor-pointer'}
                `}
                                    >
                                        {/* Agar size "Out of Stock" hai toh Myntra style mein diagonal line dikhane ke liye */}
                                        <span className="relative">
                                            {s.size}
                                            {!s.available && (
                                                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gray-300 -rotate-45"></div>
                                            )}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Primary Actions */}
                        <div className="flex gap-4 pt-4">
                            <button
                                onClick={handleAddToBag}
                                className="flex-[1.5] bg-pink-500 text-white py-4 rounded font-bold flex items-center justify-center gap-3 hover:bg-pink-600 transition-all uppercase"
                            >
                                <ShoppingBag size={20} /> Add to Bag
                            </button>

                            <button
                                onClick={handleWishlist}
                                className={`flex-1 border border-gray-300 py-4 rounded font-bold flex items-center justify-center gap-3 transition-all uppercase
                                    ${isItemInWishlist ? 'bg-gray-800 text-white border-gray-800' : 'hover:border-black text-gray-800'}
                                `}
                            >
                                <Heart size={20} className={isItemInWishlist ? 'fill-white' : ''} />
                                {isItemInWishlist ? 'Wishlisted' : 'Wishlist'}
                            </button>
                        </div>

                        {/* Delivery Section */}
                        <div className="space-y-4 pt-6">
                            <h3 className="font-bold text-gray-800 flex items-center gap-2">
                                <Truck size={18} /> DELIVERY OPTIONS
                            </h3>
                            <div className="relative border border-gray-200 rounded max-w-xs">
                                <input
                                    type="text"
                                    placeholder="Enter pincode"
                                    className="w-full p-3 pr-16 text-sm outline-none"
                                    value={pincode}
                                    onChange={(e) => setPincode(e.target.value)}
                                />
                                <button className="absolute right-3 top-3 text-pink-500 font-bold text-sm">Check</button>
                            </div>
                            <p className="text-xs text-gray-500">Please enter PIN code to check delivery time</p>
                        </div>

                        {/* Product Info Bullet Points */}
                        <div className="space-y-3 pt-6 border-t border-gray-100">
                            <div className="flex items-center gap-3 text-sm">
                                <Shield size={18} className="text-gray-400" />
                                <span>100% Original Products</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <RotateCcw size={18} className="text-gray-400" />
                                <span>Easy 7 days returns and exchanges</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ProductDetail