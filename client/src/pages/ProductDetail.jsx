// import { useState, useEffect } from "react"
// import { useParams, Link } from "react-router-dom"
// import { motion } from "framer-motion"
// import { Heart, Star, Truck, RotateCcw, Shield } from "lucide-react"
// import { useCart } from "../context/CartContext"

// const ProductDetail = () => {
//     const { id } = useParams()
//     const { addToCart } = useCart()
//     const [product, setProduct] = useState(null)
//     const [selectedSize, setSelectedSize] = useState("")
//     const [selectedImage, setSelectedImage] = useState(0)
//     const [pincode, setPincode] = useState("")
//     const [isWishlisted, setIsWishlisted] = useState(false)

//     // Mock product data
//     const mockProduct = {
//         id: 1,
//         name: "The Lifestyle Co Men Blue Slim Fit Mid-Rise Clean Look Stretchable Jeans",
//         brand: "Roadster",
//         price: 644,
//         originalPrice: 1499,
//         discount: 57,
//         rating: 4.0,
//         reviews: 821,
//         images: [
//             "/placeholder.svg?height=600&width=400",
//             "/placeholder.svg?height=600&width=400",
//             "/placeholder.svg?height=600&width=400",
//             "/placeholder.svg?height=600&width=400",
//         ],
//         sizes: [
//             { size: "28", available: true },
//             { size: "30", available: true },
//             { size: "32", available: true },
//             { size: "34", available: false },
//             { size: "36", available: false },
//         ],
//         description: "Blue mid-rise jeans, has a button and zip closure, 4 pockets, clean look with no fade",
//         features: ["100% Original Products", "Pay on delivery might be available", "Easy 7 days returns and exchanges"],
//         offers: [
//             {
//                 title: "Best Price",
//                 subtitle: "Rs. 418",
//                 description: "Applicable on: Orders above Rs. 699 (only on first purchase)",
//                 code: "MYNTRASAVE",
//             },
//             {
//                 title: "10% Discount on IDFC FIRST SWYP Credit Card",
//                 description: "Min Spend ₹850, Max Discount ₹350",
//             },
//             {
//                 title: "10% Discount on HSBC Credit Cards",
//                 description: "Min Spend ₹3000, Max Discount ₹1500",
//             },
//         ],
//         specifications: [
//             { key: "Fit", value: "Slim Fit" },
//             { key: "Length", value: "Regular" },
//             { key: "Pattern", value: "Solid" },
//             { key: "Occasion", value: "Casual" },
//             { key: "Wash Care", value: "Machine Wash" },
//         ],
//     }

//     useEffect(() => {
//         // Simulate API call
//         setProduct(mockProduct)
//     }, [id])

//     const handleAddToBag = () => {
//         if (!selectedSize) {
//             alert("Please select a size")
//             return
//         }

//         addToCart({
//             id: product.id,
//             name: product.name,
//             brand: product.brand,
//             price: product.price,
//             image: product.images[0],
//             size: selectedSize,
//         })

//         alert("Added to bag successfully!")
//     }

//     const handleWishlist = () => {
//         setIsWishlisted(!isWishlisted)
//     }

//     if (!product) {
//         return <div className="flex justify-center items-center h-screen">Loading...</div>
//     }

//     return (
//         <div className="min-h-screen bg-white">
//             {/* Breadcrumb */}
//             <div className="bg-gray-50 py-3">
//                 <div className="container mx-auto px-4">
//                     <nav className="text-sm text-gray-600">
//                         <Link to="/" className="hover:text-pink-500">
//                             Home
//                         </Link>
//                         <span className="mx-2">/</span>
//                         <Link to="/clothing" className="hover:text-pink-500">
//                             Clothing
//                         </Link>
//                         <span className="mx-2">/</span>
//                         <Link to="/men-clothing" className="hover:text-pink-500">
//                             Men Clothing
//                         </Link>
//                         <span className="mx-2">/</span>
//                         <Link to="/jeans" className="hover:text-pink-500">
//                             Jeans
//                         </Link>
//                         <span className="mx-2">/</span>
//                         <span className="font-medium">Roadster Jeans → More By Roadster</span>
//                     </nav>
//                 </div>
//             </div>

//             <div className="container mx-auto px-4 py-6">
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//                     {/* Product Images */}
//                     <div className="space-y-4">
//                         <motion.div
//                             className="aspect-square bg-gray-100 rounded-lg overflow-hidden"
//                             initial={{ opacity: 0 }}
//                             animate={{ opacity: 1 }}
//                         >
//                             <img
//                                 src={product.images[selectedImage] || "/placeholder.svg"}
//                                 alt={product.name}
//                                 className="w-full h-full object-cover"
//                             />
//                         </motion.div>

//                         <div className="grid grid-cols-4 gap-2">
//                             {product.images.map((image, index) => (
//                                 <button
//                                     key={index}
//                                     onClick={() => setSelectedImage(index)}
//                                     className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 ${selectedImage === index ? "border-pink-500" : "border-transparent"
//                                         }`}
//                                 >
//                                     <img
//                                         src={image || "/placeholder.svg"}
//                                         alt={`Product ${index + 1}`}
//                                         className="w-full h-full object-cover"
//                                     />
//                                 </button>
//                             ))}
//                         </div>
//                     </div>

//                     {/* Product Details */}
//                     <div className="space-y-6">
//                         <div>
//                             <h1 className="text-2xl font-bold text-gray-800 mb-2">{product.brand}</h1>
//                             <p className="text-gray-600 mb-4">{product.name}</p>

//                             <div className="flex items-center mb-4">
//                                 <div className="flex items-center bg-green-100 px-2 py-1 rounded">
//                                     <span className="text-sm font-medium">{product.rating}</span>
//                                     <Star className="w-4 h-4 text-green-600 ml-1 fill-current" />
//                                 </div>
//                                 <span className="text-sm text-gray-500 ml-2">| {product.reviews} Ratings</span>
//                             </div>
//                         </div>

//                         {/* Price */}
//                         <div className="border-b pb-4">
//                             <div className="flex items-center space-x-3">
//                                 <span className="text-2xl font-bold">₹{product.price}</span>
//                                 <span className="text-lg text-gray-500 line-through">MRP ₹{product.originalPrice}</span>
//                                 <span className="text-lg text-orange-500 font-medium">({product.discount}% OFF)</span>
//                             </div>
//                             <p className="text-sm text-green-600 mt-1">inclusive of all taxes</p>
//                         </div>

//                         {/* Size Selection */}
//                         <div>
//                             <div className="flex items-center justify-between mb-3">
//                                 <h3 className="font-medium">SELECT SIZE</h3>
//                                 <button className="text-pink-500 text-sm hover:underline">SIZE CHART →</button>
//                             </div>
//                             <div className="flex space-x-3">
//                                 {product.sizes.map((sizeOption) => (
//                                     <button
//                                         key={sizeOption.size}
//                                         onClick={() => sizeOption.available && setSelectedSize(sizeOption.size)}
//                                         disabled={!sizeOption.available}
//                                         className={`w-12 h-12 border rounded-full flex items-center justify-center text-sm font-medium ${selectedSize === sizeOption.size
//                                                 ? "border-pink-500 bg-pink-50 text-pink-500"
//                                                 : sizeOption.available
//                                                     ? "border-gray-300 hover:border-gray-400"
//                                                     : "border-gray-200 text-gray-400 cursor-not-allowed line-through"
//                                             }`}
//                                     >
//                                         {sizeOption.size}
//                                     </button>
//                                 ))}
//                             </div>
//                         </div>

//                         {/* Add to Bag */}
//                         <div className="flex space-x-4">
//                             <motion.button
//                                 onClick={handleAddToBag}
//                                 className="flex-1 bg-pink-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-pink-600 transition-colors flex items-center justify-center"
//                                 whileHover={{ scale: 1.02 }}
//                                 whileTap={{ scale: 0.98 }}
//                             >
//                                 🛍️ ADD TO BAG
//                             </motion.button>
//                             <motion.button
//                                 onClick={handleWishlist}
//                                 className={`px-6 py-3 border rounded-lg font-medium transition-colors flex items-center ${isWishlisted
//                                         ? "border-pink-500 text-pink-500 bg-pink-50"
//                                         : "border-gray-300 text-gray-700 hover:border-gray-400"
//                                     }`}
//                                 whileHover={{ scale: 1.02 }}
//                                 whileTap={{ scale: 0.98 }}
//                             >
//                                 <Heart className={`w-5 h-5 mr-2 ${isWishlisted ? "fill-current" : ""}`} />
//                                 WISHLIST
//                             </motion.button>
//                         </div>

//                         {/* Delivery Options */}
//                         <div className="border-t pt-4">
//                             <div className="flex items-center mb-3">
//                                 <Truck className="w-5 h-5 mr-2" />
//                                 <h3 className="font-medium">DELIVERY OPTIONS</h3>
//                             </div>
//                             <div className="flex space-x-2 mb-3">
//                                 <input
//                                     type="text"
//                                     placeholder="Enter pincode"
//                                     value={pincode}
//                                     onChange={(e) => setPincode(e.target.value)}
//                                     className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
//                                 />
//                                 <button className="px-4 py-2 text-pink-500 border border-pink-500 rounded-lg hover:bg-pink-50">
//                                     Check
//                                 </button>
//                             </div>
//                             <p className="text-sm text-gray-600 mb-4">
//                                 Please enter PIN code to check delivery time & Pay on Delivery Availability
//                             </p>

//                             <div className="space-y-2 text-sm">
//                                 <div className="flex items-center">
//                                     <Shield className="w-4 h-4 mr-2 text-green-600" />
//                                     <span>100% Original Products</span>
//                                 </div>
//                                 <div className="flex items-center">
//                                     <Truck className="w-4 h-4 mr-2 text-blue-600" />
//                                     <span>Pay on delivery might be available</span>
//                                 </div>
//                                 <div className="flex items-center">
//                                     <RotateCcw className="w-4 h-4 mr-2 text-orange-600" />
//                                     <span>Easy 7 days returns and exchanges</span>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Best Offers */}
//                         <div className="border-t pt-4">
//                             <div className="flex items-center mb-3">
//                                 <span className="font-medium">BEST OFFERS</span>
//                                 <span className="ml-2">🏷️</span>
//                             </div>
//                             <div className="space-y-3">
//                                 {product.offers.map((offer, index) => (
//                                     <div key={index} className="border border-gray-200 rounded-lg p-3">
//                                         <div className="flex items-start justify-between">
//                                             <div className="flex-1">
//                                                 <h4 className="font-medium text-sm">{offer.title}</h4>
//                                                 {offer.subtitle && <p className="text-lg font-bold text-green-600">{offer.subtitle}</p>}
//                                                 <p className="text-xs text-gray-600 mt-1">{offer.description}</p>
//                                                 {offer.code && <p className="text-xs text-pink-500 mt-1">Coupon code: {offer.code}</p>}
//                                             </div>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default ProductDetail


// import { useState, useEffect } from "react"
// import { useParams, Link } from "react-router-dom"
// import { motion } from "framer-motion"
// import { Heart, Star, Truck, RotateCcw, Shield } from "lucide-react"
// import { useCart } from "../context/CartContext"
// import { useWishlist } from "../context/WishlistContext"
// import { getProductById } from "../data/products"

// const ProductDetail = () => {
//     const { id } = useParams()
//     const { addToCart } = useCart()
//     const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
//     const [product, setProduct] = useState(null)
//     const [selectedSize, setSelectedSize] = useState("")
//     const [selectedImage, setSelectedImage] = useState(0)
//     const [pincode, setPincode] = useState("")

//     useEffect(() => {
//         const fetchProduct = async () => {
//             try {
//                 const data = await api.get(`/products/${id}`)
//                 setProduct(data)
//             } catch (err) {
//                 console.error("Failed to fetch product:", err)
//             }
//         }
//         fetchProduct()
//     }, [id])

//     const handleAddToBag = () => {
//         if (!selectedSize) {
//             alert("Please select a size")
//             return
//         }

//         addToCart(product._id, 1, selectedSize)
//         // 1 is quantity

//         console.log("Adding to cart:", product)

//         alert("Added to bag successfully!")
//     }

//     const handleWishlist = () => {
//         if (isInWishlist(product.id)) {
//             removeFromWishlist(product.id)
//         } else {
//             addToWishlist({
//                 id: product.id,
//                 name: product.name,
//                 brand: product.brand,
//                 price: product.price,
//                 originalPrice: product.originalPrice,
//                 image: product.image,
//                 discount: product.discount,
//             })
//         }
//     }

//     if (!product) {
//         return <div className="flex justify-center items-center h-screen">Product not found</div>
//     }

//     return (
//         <div className="min-h-screen bg-white">
//             {/* Breadcrumb */}
//             <div className="bg-gray-50 py-3">
//                 <div className="container mx-auto px-4">
//                     <nav className="text-sm text-gray-600">
//                         <Link to="/" className="hover:text-pink-500">
//                             Home
//                         </Link>
//                         <span className="mx-2">/</span>
//                         <Link to={`/products/${product.category}`} className="hover:text-pink-500">
//                             {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
//                         </Link>
//                         <span className="mx-2">/</span>
//                         <span className="font-medium">
//                             {product.brand} → {product.name}
//                         </span>
//                     </nav>
//                 </div>
//             </div>

//             <div className="container mx-auto px-4 py-6">
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//                     {/* Product Images */}
//                     <div className="space-y-4">
//                         <motion.div
//                             className="aspect-square bg-gray-100 rounded-lg overflow-hidden"
//                             initial={{ opacity: 0 }}
//                             animate={{ opacity: 1 }}
//                         >
//                             <img
//                                 src={product.images[selectedImage] || product.image || "/placeholder.svg"}
//                                 alt={product.name}
//                                 className="w-full h-full object-cover"
//                             />
//                         </motion.div>

//                         <div className="grid grid-cols-4 gap-2">
//                             {product.images.map((image, index) => (
//                                 <button
//                                     key={index}
//                                     onClick={() => setSelectedImage(index)}
//                                     className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 ${selectedImage === index ? "border-pink-500" : "border-transparent"
//                                         }`}
//                                 >
//                                     <img
//                                         src={image || "/placeholder.svg"}
//                                         alt={`Product ${index + 1}`}
//                                         className="w-full h-full object-cover"
//                                     />
//                                 </button>
//                             ))}
//                         </div>
//                     </div>

//                     {/* Product Details */}
//                     <div className="space-y-6">
//                         <div>
//                             <h1 className="text-2xl font-bold text-gray-800 mb-2">{product.brand}</h1>
//                             <p className="text-gray-600 mb-4">{product.name}</p>

//                             <div className="flex items-center mb-4">
//                                 <div className="flex items-center bg-green-100 px-2 py-1 rounded">
//                                     <span className="text-sm font-medium">{product.rating}</span>
//                                     <Star className="w-4 h-4 text-green-600 ml-1 fill-current" />
//                                 </div>
//                                 <span className="text-sm text-gray-500 ml-2">| {product.reviews} Ratings</span>
//                             </div>
//                         </div>

//                         {/* Price */}
//                         <div className="border-b pb-4">
//                             <div className="flex items-center space-x-3">
//                                 <span className="text-2xl font-bold">₹{product.price}</span>
//                                 <span className="text-lg text-gray-500 line-through">MRP ₹{product.originalPrice}</span>
//                                 <span className="text-lg text-orange-500 font-medium">({product.discount}% OFF)</span>
//                             </div>
//                             <p className="text-sm text-green-600 mt-1">inclusive of all taxes</p>
//                         </div>

//                         {/* Size Selection */}
//                         <div>
//                             <div className="flex items-center justify-between mb-3">
//                                 <h3 className="font-medium">SELECT SIZE</h3>
//                                 <button className="text-pink-500 text-sm hover:underline">SIZE CHART →</button>
//                             </div>
//                             <div className="flex flex-wrap gap-3">
//                                 {product.sizes.map((sizeOption) => (
//                                     <button
//                                         key={sizeOption.size}
//                                         onClick={() => sizeOption.available && setSelectedSize(sizeOption.size)}
//                                         disabled={!sizeOption.available}
//                                         className={`px-4 py-2 border rounded-lg text-sm font-medium ${selectedSize === sizeOption.size
//                                             ? "border-pink-500 bg-pink-50 text-pink-500"
//                                             : sizeOption.available
//                                                 ? "border-gray-300 hover:border-gray-400"
//                                                 : "border-gray-200 text-gray-400 cursor-not-allowed line-through"
//                                             }`}
//                                     >
//                                         {sizeOption.size}
//                                     </button>
//                                 ))}
//                             </div>
//                         </div>

//                         {/* Add to Bag */}
//                         <div className="flex space-x-4">
//                             <motion.button
//                                 onClick={handleAddToBag}
//                                 className="flex-1 bg-pink-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-pink-600 transition-colors flex items-center justify-center"
//                                 whileHover={{ scale: 1.02 }}
//                                 whileTap={{ scale: 0.98 }}
//                             >
//                                 🛍️ ADD TO BAG
//                             </motion.button>
//                             <motion.button
//                                 onClick={handleWishlist}
//                                 className={`px-6 py-3 border rounded-lg font-medium transition-colors flex items-center ${isInWishlist(product.id)
//                                     ? "border-pink-500 text-pink-500 bg-pink-50"
//                                     : "border-gray-300 text-gray-700 hover:border-gray-400"
//                                     }`}
//                                 whileHover={{ scale: 1.02 }}
//                                 whileTap={{ scale: 0.98 }}
//                             >
//                                 <Heart className={`w-5 h-5 mr-2 ${isInWishlist(product.id) ? "fill-current" : ""}`} />
//                                 WISHLIST
//                             </motion.button>
//                         </div>

//                         {/* Delivery Options */}
//                         <div className="border-t pt-4">
//                             <div className="flex items-center mb-3">
//                                 <Truck className="w-5 h-5 mr-2" />
//                                 <h3 className="font-medium">DELIVERY OPTIONS</h3>
//                             </div>
//                             <div className="flex space-x-2 mb-3">
//                                 <input
//                                     type="text"
//                                     placeholder="Enter pincode"
//                                     value={pincode}
//                                     onChange={(e) => setPincode(e.target.value)}
//                                     className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
//                                 />
//                                 <button className="px-4 py-2 text-pink-500 border border-pink-500 rounded-lg hover:bg-pink-50">
//                                     Check
//                                 </button>
//                             </div>
//                             <p className="text-sm text-gray-600 mb-4">
//                                 Please enter PIN code to check delivery time & Pay on Delivery Availability
//                             </p>

//                             <div className="space-y-2 text-sm">
//                                 <div className="flex items-center">
//                                     <Shield className="w-4 h-4 mr-2 text-green-600" />
//                                     <span>100% Original Products</span>
//                                 </div>
//                                 <div className="flex items-center">
//                                     <Truck className="w-4 h-4 mr-2 text-blue-600" />
//                                     <span>Pay on delivery might be available</span>
//                                 </div>
//                                 <div className="flex items-center">
//                                     <RotateCcw className="w-4 h-4 mr-2 text-orange-600" />
//                                     <span>Easy 7 days returns and exchanges</span>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Product Description */}
//                         <div className="border-t pt-4">
//                             <h3 className="font-medium mb-2">PRODUCT DETAILS</h3>
//                             <p className="text-sm text-gray-600">{product.description}</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default ProductDetail


import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Heart, Star, Truck, RotateCcw, Shield } from "lucide-react"
import { useApp } from "../context/AppContext"
import { productService } from "../services/productService"
import toast from "react-hot-toast"

const ProductDetail = () => {
    const { id } = useParams()
    const { addToWishlist, removeFromWishlist, isInWishlist, isAuthenticated, addToCart } = useApp()

    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [selectedSize, setSelectedSize] = useState("")
    const [selectedImage, setSelectedImage] = useState(0)
    const [pincode, setPincode] = useState("")


    // useEffect(() => {
    //     const fetchProduct = async () => {
    //         try {
    //             setLoading(true)
    //             const productData = await productService.getProductById(id)
    //             setProduct(productData)
    //         } catch (error) {
    //             toast.error("Failed to fetch product details")
    //             console.error("Error fetching product:", error)
    //         } finally {
    //             setLoading(false)
    //         }
    //     }

    //     fetchProduct()
    // }, [id])

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const response = await productService.getProductById(id); // ✅ Get the actual product data
                setProduct(response.data); // ✅ Only the data, not the entire response
                console.log(response);

            } catch (error) {
                toast.error("Failed to fetch product details");
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);


    const handleAddToBag = async () => {
        if (!isAuthenticated) {
            toast.error("Please login to add items to cart")
            return
        }

        if (!selectedSize) {
            toast.error("Please select a size")
            return
        }

        try {
            await addToCart(product._id, 1, selectedSize)
        } catch (error) {
            console.error("Error adding to cart:", error)
        }
    }

    const handleWishlist = async () => {
        if (!isAuthenticated) {
            toast.error("Please login to add items to wishlist")
            return
        }

        try {
            if (isInWishlist(product._id)) {
                await removeFromWishlist(product._id)
            } else {
                await addToWishlist(product._id)
            }

        } catch (error) {
            console.error("Error updating wishlist:", error)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <div className="spinner mx-auto mb-4"></div>
                    <p>Loading product details...</p>
                </div>
            </div>
        )
    }

    if (!product) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Product not found</h2>
                    <Link to="/" className="text-pink-500 hover:underline">
                        Go back to home
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Breadcrumb */}
            <div className="bg-gray-50 py-3">
                <div className="container mx-auto px-4">
                    <nav className="text-sm text-gray-600">
                        <Link to="/" className="hover:text-pink-500">
                            Home
                        </Link>
                        <span className="mx-2">/</span>
                        {/* <Link to={`/products/${product.category || "products"}`} className="hover:text-pink-500">
                            {product.category.name || "Products"}
                        </Link> */}
                        <Link to={`/products/${product.category?.slug || "products"}`}>
                            {product.category?.name || "Products"}
                        </Link>

                        <span className="mx-2">/</span>
                        <span className="font-medium">
                            {product.brand} → {product.name}
                        </span>
                    </nav>
                </div>
            </div>

            <div className="container mx-auto px-4 py-2">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Product Images */}
                    <div className="space-y-4">
                        <motion.div
                            className=" bg-gray-100 rounded-lg overflow-hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            {/* <img
                                src={product.images[selectedImage] || "/placeholder.svg"}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            /> */}
                            <img
                                src={product.images?.[selectedImage] || "/placeholder.svg"}
                                alt={product.name || "Product Image"}
                                className="w-full h-full object-contain"
                            />

                        </motion.div>

                        <div className="grid grid-cols-4 gap-2">
                            {/* {product.images.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(index)}
                                    className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 ${selectedImage === index ? "border-pink-500" : "border-transparent"
                                        }`}
                                >
                                    <img
                                        src={image || "/placeholder.svg"}
                                        alt={`Product ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))} */}

                            {Array.isArray(product.images) && product.images.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(index)}
                                    className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 ${selectedImage === index ? "border-pink-500" : "border-transparent"
                                        }`}
                                >
                                    <img
                                        src={image || "/placeholder.svg"}
                                        alt={`Product ${index + 1}`}
                                        className="w-full h-48 object-cover "
                                    />
                                </button>
                            ))}

                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="space-y-6">
                        {/* <div>
                            <h1 className="text-2xl font-bold text-gray-800 mb-2">{product.brand}</h1>
                            <p className="text-gray-600 mb-4">{product.name}</p>

                            <div className="flex items-center mb-4">
                                <div className="flex items-center bg-green-100 px-2 py-1 rounded">
                                    <span className="text-sm font-medium">{product.rating}</span>
                                    <Star className="w-4 h-4 text-green-600 ml-1 fill-current" />
                                </div>
                                <span className="text-sm text-gray-500 ml-2">| {product.numReviews} Ratings</span>
                            </div>
                        </div> */}

                        <div>
                            <h1 className="text-2xl font-bold text-gray-800 mb-2">{product.brand}</h1>
                            <p className="text-gray-600 mb-4">{product.name}</p>

                            <div className="flex items-center mb-4">
                                <div className="flex items-center bg-green-100 px-2 py-1 rounded">
                                    <span className="text-sm font-medium">{product.rating}</span>
                                    <Star className="w-4 h-4 text-green-600 ml-1 fill-current" />
                                </div>
                                <span className="text-sm text-gray-500 ml-2">
                                    | {product.reviews?.length} Ratings

                                </span>
                            </div>
                        </div>


                        {/* Price */}
                        {/* <div className="border-b pb-4">
                            <div className="flex items-center space-x-3">
                                <span className="text-2xl font-bold">₹{product.price}</span>
                                <span className="text-lg text-gray-500 line-through">MRP ₹{product.originalPrice}</span>
                                <span className="text-lg text-orange-500 font-medium">({product.discount}% OFF)</span>
                            </div>
                            <p className="text-sm text-green-600 mt-1">inclusive of all taxes</p>
                        </div> */}

                        {product?.price && (
                            <div className="border-b pb-4">
                                <div className="flex items-center space-x-3">
                                    <span className="text-2xl font-bold">₹{product.price}</span>
                                    {product.originalPrice && (
                                        <span className="text-lg text-gray-500 line-through">
                                            MRP ₹{product.originalPrice}
                                        </span>
                                    )}
                                    {product.discount && (
                                        <span className="text-lg text-orange-500 font-medium">
                                            ({product.discount}% OFF)
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm text-green-600 mt-1">inclusive of all taxes</p>
                            </div>
                        )}


                        {/* Size Selection */}
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="font-medium">SELECT SIZE</h3>
                                <button className="text-pink-500 text-sm hover:underline">SIZE CHART →</button>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {/* {product.sizes.map((sizeOption) => (
                                    <button
                                        key={sizeOption.size}
                                        onClick={() => sizeOption.available && setSelectedSize(sizeOption.size)}
                                        disabled={!sizeOption.available}
                                        className={`px-4 py-2 border rounded-lg text-sm font-medium ${selectedSize === sizeOption.size
                                            ? "border-pink-500 bg-pink-50 text-pink-500"
                                            : sizeOption.available
                                                ? "border-gray-300 hover:border-gray-400"
                                                : "border-gray-200 text-gray-400 cursor-not-allowed line-through"
                                            }`}
                                    >
                                        {sizeOption.size}
                                    </button>
                                ))} */}

                                {Array.isArray(product.sizes) && product.sizes.map((sizeOption) => (
                                    <button
                                        key={sizeOption.size}
                                        onClick={() => sizeOption.available && setSelectedSize(sizeOption.size)}
                                        disabled={!sizeOption.available}
                                        className={`px-4 py-2 border rounded-lg text-sm font-medium ${selectedSize === sizeOption.size
                                            ? "border-pink-500 bg-pink-50 text-pink-500"
                                            : sizeOption.available
                                                ? "border-gray-300 hover:border-gray-400"
                                                : "border-gray-200 text-gray-400 cursor-not-allowed line-through"
                                            }`}
                                    >
                                        {sizeOption.size}
                                    </button>
                                ))}

                            </div>
                        </div>

                        {/* Add to Bag */}
                        <div className="flex space-x-4">
                            <motion.button
                                onClick={handleAddToBag}
                                className="flex-1 bg-pink-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-pink-600 transition-colors flex items-center justify-center"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                🛍️ ADD TO BAG
                            </motion.button>
                            <motion.button
                                onClick={handleWishlist}
                                className={`px-6 py-3 border rounded-lg font-medium transition-colors flex items-center ${isInWishlist(product._id)
                                    ? "border-pink-500 text-pink-500 bg-pink-50"
                                    : "border-gray-300 text-gray-700 hover:border-gray-400"
                                    }`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Heart className={`w-5 h-5 mr-2 ${isInWishlist(product._id) ? "fill-current" : ""}`} />
                                WISHLIST
                            </motion.button>
                        </div>

                        {/* Delivery Options */}
                        <div className="border-t pt-4">
                            <div className="flex items-center mb-3">
                                <Truck className="w-5 h-5 mr-2" />
                                <h3 className="font-medium">DELIVERY OPTIONS</h3>
                            </div>
                            <div className="flex space-x-2 mb-3">
                                <input
                                    type="text"
                                    placeholder="Enter pincode"
                                    value={pincode}
                                    onChange={(e) => setPincode(e.target.value)}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                                />
                                <button className="px-4 py-2 text-pink-500 border border-pink-500 rounded-lg hover:bg-pink-50">
                                    Check
                                </button>
                            </div>
                            <p className="text-sm text-gray-600 mb-4">
                                Please enter PIN code to check delivery time & Pay on Delivery Availability
                            </p>

                            <div className="space-y-2 text-sm">
                                <div className="flex items-center">
                                    <Shield className="w-4 h-4 mr-2 text-green-600" />
                                    <span>100% Original Products</span>
                                </div>
                                <div className="flex items-center">
                                    <Truck className="w-4 h-4 mr-2 text-blue-600" />
                                    <span>Pay on delivery might be available</span>
                                </div>
                                <div className="flex items-center">
                                    <RotateCcw className="w-4 h-4 mr-2 text-orange-600" />
                                    <span>Easy 7 days returns and exchanges</span>
                                </div>
                            </div>
                        </div>

                        {/* Product Description */}
                        <div className="border-t pt-4">
                            <h3 className="font-medium mb-2">PRODUCT DETAILS</h3>
                            <p className="text-sm text-gray-600">{product.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail
