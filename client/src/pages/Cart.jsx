// import { motion } from "framer-motion"
// import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
// import { useApp } from "../context/AppContext"

// import { Link, useNavigate } from "react-router-dom"

// const Cart = () => {
//     const { cart, isAuthenticated } = useApp()
//     const navigate = useNavigate()

//     const handleQuantityChange = async (cartItemId, newQuantity) => {
//         if (newQuantity === 0) {
//             await cart.removeFromCart(cartItemId)
//         } else {
//             await cart.updateCartItem(cartItemId, newQuantity)
//         }
//     }

//     const handleCheckout = () => {
//         if (!isAuthenticated) {
//             navigate("/login?redirect=checkout")
//         } else {
//             navigate("/checkout")
//         }
//     }

//     if (cart.loading) {
//         return (
//             <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//                 <div className="text-center">
//                     <div className="spinner mx-auto mb-4"></div>
//                     <p>Loading cart...</p>
//                 </div>
//             </div>
//         )
//     }

//     if (cart.cartItems.length === 0) {
//         return (
//             <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//                 <div className="text-center">
//                     <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-4" />
//                     <h2 className="text-2xl font-bold text-gray-800 mb-2">Your bag is empty</h2>
//                     <p className="text-gray-600 mb-6">Add some products to get started</p>
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
//                 <h1 className="text-2xl font-bold mb-8">Shopping Bag ({cart.cartItems.length} items)</h1>

//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//                     {/* Cart Items */}
//                     <div className="lg:col-span-2 space-y-4">
//                         {cart.cartItems.map((item) => (
//                             <motion.div
//                                 key={`${item.id}-${item.size}`}
//                                 className="bg-white rounded-lg p-4 shadow-sm"
//                                 initial={{ opacity: 0, y: 20 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                             >
//                                 <div className="flex space-x-4">
//                                     <img
//                                         src={item.image || "/placeholder.svg"}
//                                         alt={item.name}
//                                         className="w-24 h-24 object-cover rounded-lg"
//                                     />
//                                     <div className="flex-1">
//                                         <h3 className="font-medium text-lg">{item.product?.brand || "Brand"}</h3>
//                                         <p className="text-gray-600 text-sm mb-2">{item.name}</p>
//                                         <p className="text-sm text-gray-500 mb-2">Size: {item.size}</p>
//                                         <div className="flex items-center justify-between">
//                                             <div className="flex items-center space-x-3">
//                                                 <button
//                                                     onClick={() => handleQuantityChange(item._id, item.qty - 1)}
//                                                     className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50"
//                                                 >
//                                                     <Minus className="w-4 h-4" />
//                                                 </button>
//                                                 <span className="font-medium">{item.qty}</span>
//                                                 <button
//                                                     onClick={() => handleQuantityChange(item._id, item.qty + 1)}
//                                                     className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50"
//                                                 >
//                                                     <Plus className="w-4 h-4" />
//                                                 </button>
//                                             </div>
//                                             <div className="text-right">
//                                                 <p className="font-bold text-lg">₹{item.price * item.qty}</p>
//                                                 <button
//                                                     onClick={() => removeFromCart(item._id)}
//                                                     className="text-red-500 hover:text-red-700 flex items-center text-sm mt-1"
//                                                 >
//                                                     <Trash2 className="w-4 h-4 mr-1" />
//                                                     Remove
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </motion.div>
//                         ))}
//                     </div>

//                     {/* Order Summary */}
//                     <div className="lg:col-span-1">
//                         <div className="bg-white rounded-lg p-6 shadow-sm sticky top-4">
//                             <h2 className="text-xl font-bold mb-4">Order Summary</h2>

//                             <div className="space-y-3 mb-4">
//                                 <div className="flex justify-between">
//                                     <span>Subtotal ({cart.cartItems.reduce((total, item) => total + item.qty, 0)} items)</span>
//                                     <span>₹{cart.getCartTotal()}</span>
//                                 </div>
//                                 <div className="flex justify-between">
//                                     <span>Shipping</span>
//                                     <span className="text-green-600">FREE</span>
//                                 </div>
//                                 <div className="flex justify-between">
//                                     <span>Discount</span>
//                                     <span className="text-green-600">-₹0</span>
//                                 </div>
//                                 <hr />
//                                 <div className="flex justify-between font-bold text-lg">
//                                     <span>Total</span>
//                                     <span>₹{cart.getCartTotal()}</span>
//                                 </div>
//                             </div>

//                             <button
//                                 onClick={handleCheckout}
//                                 className="w-full bg-pink-500 text-white py-3 rounded-lg font-medium hover:bg-pink-600 transition-colors"
//                             >
//                                 {isAuthenticated ? "PROCEED TO CHECKOUT" : "LOGIN TO CHECKOUT"}
//                             </button>

//                             <div className="mt-4 text-center">
//                                 <Link to="/" className="text-pink-500 hover:underline text-sm">
//                                     Continue Shopping
//                                 </Link>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Cart


// import { motion } from "framer-motion"
// import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
// import { useApp } from "../context/AppContext"
// import { Link, useNavigate } from "react-router-dom"

// const Cart = () => {
//     const { cart, isAuthenticated } = useApp()
//     const navigate = useNavigate()

//     const handleQuantityChange = async (cartItemId, newQuantity) => {
//         if (newQuantity === 0) {
//             await cart.removeFromCart(cartItemId)
//         } else {
//             await cart.updateCartItem(cartItemId, newQuantity)
//         }
//     }

//     const handleCheckout = () => {
//         if (!isAuthenticated) {
//             navigate("/login?redirect=checkout")
//         } else {
//             navigate("/checkout")
//         }
//     }

//     if (cart.loading) {
//         return (
//             <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//                 <div className="text-center">
//                     <div className="spinner mx-auto mb-4"></div>
//                     <p>Loading cart...</p>
//                 </div>
//             </div>
//         )
//     }

//     if (cart.cartItems.length === 0) {
//         return (
//             <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//                 <div className="text-center">
//                     <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-4" />
//                     <h2 className="text-2xl font-bold text-gray-800 mb-2">Your bag is empty</h2>
//                     <p className="text-gray-600 mb-6">Add some products to get started</p>
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
//                 <h1 className="text-2xl font-bold mb-8">Shopping Bag ({cart.cartItems.length} items)</h1>

//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//                     {/* Cart Items */}
//                     <div className="lg:col-span-2 space-y-4">
//                         {cart.cartItems.map((item) => (
//                             <motion.div
//                                 key={item._id}
//                                 className="bg-white rounded-lg p-4 shadow-sm"
//                                 initial={{ opacity: 0, y: 20 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                             >
//                                 <div className="flex space-x-4">
//                                     <img
//                                         src={item.image || "/placeholder.svg"}
//                                         alt={item.name}
//                                         className="w-24 h-24 object-cover rounded-lg"
//                                     />
//                                     <div className="flex-1">
//                                         <h3 className="font-medium text-lg">{item.product?.brand || "Brand"}</h3>
//                                         <p className="text-gray-600 text-sm mb-2">{item.name}</p>
//                                         <p className="text-sm text-gray-500 mb-2">Size: {item.size}</p>
//                                         <div className="flex items-center justify-between">
//                                             <div className="flex items-center space-x-3">
//                                                 <button
//                                                     onClick={() => handleQuantityChange(item._id, item.qty - 1)}
//                                                     className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50"
//                                                 >
//                                                     <Minus className="w-4 h-4" />
//                                                 </button>
//                                                 <span className="font-medium">{item.qty}</span>
//                                                 <button
//                                                     onClick={() => handleQuantityChange(item._id, item.qty + 1)}
//                                                     className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50"
//                                                 >
//                                                     <Plus className="w-4 h-4" />
//                                                 </button>
//                                             </div>
//                                             <div className="text-right">
//                                                 <p className="font-bold text-lg">₹{item.price * item.qty}</p>
//                                                 <button
//                                                     onClick={() => cart.removeFromCart(item._id)}
//                                                     className="text-red-500 hover:text-red-700 flex items-center text-sm mt-1"
//                                                 >
//                                                     <Trash2 className="w-4 h-4 mr-1" />
//                                                     Remove
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </motion.div>
//                         ))}
//                     </div>

//                     {/* Order Summary */}
//                     <div className="lg:col-span-1">
//                         <div className="bg-white rounded-lg p-6 shadow-sm sticky top-4">
//                             <h2 className="text-xl font-bold mb-4">Order Summary</h2>

//                             <div className="space-y-3 mb-4">
//                                 <div className="flex justify-between">
//                                     <span>Subtotal ({cart.cartItems.reduce((total, item) => total + item.qty, 0)} items)</span>
//                                     <span>₹{cart.getCartTotal()}</span>
//                                 </div>
//                                 <div className="flex justify-between">
//                                     <span>Shipping</span>
//                                     <span className="text-green-600">FREE</span>
//                                 </div>
//                                 <div className="flex justify-between">
//                                     <span>Discount</span>
//                                     <span className="text-green-600">-₹0</span>
//                                 </div>
//                                 <hr />
//                                 <div className="flex justify-between font-bold text-lg">
//                                     <span>Total</span>
//                                     <span>₹{cart.getCartTotal()}</span>
//                                 </div>
//                             </div>

//                             <button
//                                 onClick={handleCheckout}
//                                 className="w-full bg-pink-500 text-white py-3 rounded-lg font-medium hover:bg-pink-600 transition-colors"
//                             >
//                                 {isAuthenticated ? "PROCEED TO CHECKOUT" : "LOGIN TO CHECKOUT"}
//                             </button>

//                             <div className="mt-4 text-center">
//                                 <Link to="/" className="text-pink-500 hover:underline text-sm">
//                                     Continue Shopping
//                                 </Link>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Cart




// import { motion } from "framer-motion"
// import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
// import { useApp } from "../context/AppContext"
// import { Link, useNavigate } from "react-router-dom"

// const Cart = () => {
//     const { cart, isAuthenticated } = useApp()

//     const navigate = useNavigate()

//     const handleQuantityChange = async (cartItemId, newQuantity) => {
//         if (newQuantity === 0) {
//             await cart.removeFromCart(cartItemId)
//         } else {
//             await cart.updateCartItem(cartItemId, newQuantity)
//         }
//     }

//     const handleCheckout = () => {
//         if (!isAuthenticated) {
//             navigate("/login?redirect=checkout")
//         } else {
//             navigate("/checkout")
//         }
//     }

//     if (cart?.loading) {
//         return (
//             <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//                 <div className="text-center">
//                     <div className="spinner mx-auto mb-4"></div>
//                     <p>Loading cart...</p>
//                 </div>
//             </div>
//         )
//     }

//     const cartItems = cart?.cartItems || []

//     if (cartItems.length === 0) {
//         return (
//             <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//                 <div className="text-center">
//                     <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-4" />
//                     <h2 className="text-2xl font-bold text-gray-800 mb-2">Your bag is empty</h2>
//                     <p className="text-gray-600 mb-6">Add some products to get started</p>
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
//                 <h1 className="text-2xl font-bold mb-8">Shopping Bag ({cartItems.length} items)</h1>

//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//                     {/* Cart Items */}
//                     <div className="lg:col-span-2 space-y-4">
//                         {cartItems.map((item) => (
//                             <motion.div
//                                 key={item._id}
//                                 className="bg-white rounded-lg p-4 shadow-sm"
//                                 initial={{ opacity: 0, y: 20 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                             >
//                                 <div className="flex space-x-4">
//                                     <img
//                                         src={item.image || "/placeholder.svg"}
//                                         alt={item.name}
//                                         className="w-24 h-24 object-cover rounded-lg"
//                                     />
//                                     <div className="flex-1">
//                                         <h3 className="font-medium text-lg">{item.product?.brand || "Brand"}</h3>
//                                         <p className="text-gray-600 text-sm mb-2">{item.name}</p>
//                                         <p className="text-sm text-gray-500 mb-2">Size: {item.size}</p>
//                                         <div className="flex items-center justify-between">
//                                             <div className="flex items-center space-x-3">
//                                                 <button
//                                                     onClick={() => handleQuantityChange(item._id, item.qty - 1)}
//                                                     className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50"
//                                                 >
//                                                     <Minus className="w-4 h-4" />
//                                                 </button>
//                                                 <span className="font-medium">{item.qty}</span>
//                                                 <button
//                                                     onClick={() => handleQuantityChange(item._id, item.qty + 1)}
//                                                     className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50"
//                                                 >
//                                                     <Plus className="w-4 h-4" />
//                                                 </button>
//                                             </div>
//                                             <div className="text-right">
//                                                 <p className="font-bold text-lg">₹{item.price * item.qty}</p>
//                                                 <button
//                                                     onClick={() => cart.removeFromCart(item._id)}
//                                                     className="text-red-500 hover:text-red-700 flex items-center text-sm mt-1"
//                                                 >
//                                                     <Trash2 className="w-4 h-4 mr-1" />
//                                                     Remove
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </motion.div>
//                         ))}
//                     </div>

//                     {/* Order Summary */}
//                     <div className="lg:col-span-1">
//                         <div className="bg-white rounded-lg p-6 shadow-sm sticky top-4">
//                             <h2 className="text-xl font-bold mb-4">Order Summary</h2>

//                             <div className="space-y-3 mb-4">
//                                 <div className="flex justify-between">
//                                     <span>Subtotal ({cartItems.reduce((total, item) => total + item.qty, 0)} items)</span>
//                                     <span>₹{cart.getCartTotal()}</span>
//                                 </div>
//                                 <div className="flex justify-between">
//                                     <span>Shipping</span>
//                                     <span className="text-green-600">FREE</span>
//                                 </div>
//                                 <div className="flex justify-between">
//                                     <span>Discount</span>
//                                     <span className="text-green-600">-₹0</span>
//                                 </div>
//                                 <hr />
//                                 <div className="flex justify-between font-bold text-lg">
//                                     <span>Total</span>
//                                     <span>₹{cart.getCartTotal()}</span>
//                                 </div>
//                             </div>

//                             <button
//                                 onClick={handleCheckout}
//                                 className="w-full bg-pink-500 text-white py-3 rounded-lg font-medium hover:bg-pink-600 transition-colors"
//                             >
//                                 {isAuthenticated ? "PROCEED TO CHECKOUT" : "LOGIN TO CHECKOUT"}
//                             </button>

//                             <div className="mt-4 text-center">
//                                 <Link to="/" className="text-pink-500 hover:underline text-sm">
//                                     Continue Shopping
//                                 </Link>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Cart



// import { motion } from "framer-motion"
// import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
// import { useApp } from "../context/AppContext"
// import { Link, useNavigate } from "react-router-dom"

// const Cart = () => {
//     const { cart, isAuthenticated } = useApp()
//     const navigate = useNavigate()

//     const handleQuantityChange = async (cartItemId, newQuantity) => {
//         if (newQuantity === 0) {
//             await cart.removeFromCart(cartItemId)
//         } else {
//             await cart.updateCartItem(cartItemId, newQuantity)
//         }
//     }

//     const handleCheckout = () => {
//         if (!isAuthenticated) {
//             navigate("/login?redirect=checkout")
//         } else {
//             navigate("/checkout")
//         }
//     }

//     if (cart.loading) {
//         return (
//             <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//                 <div className="text-center">
//                     <div className="spinner mx-auto mb-4"></div>
//                     <p>Loading cart...</p>
//                 </div>
//             </div>
//         )
//     }

//     if (cart.cartItems.length === 0) {
//         return (
//             <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//                 <div className="text-center">
//                     <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-4" />
//                     <h2 className="text-2xl font-bold text-gray-800 mb-2">Your bag is empty</h2>
//                     <p className="text-gray-600 mb-6">Add some products to get started</p>
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
//                 <h1 className="text-2xl font-bold mb-8">Shopping Bag ({cart.cartItems.length} items)</h1>

//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//                     {/* Cart Items */}
//                     <div className="lg:col-span-2 space-y-4">
//                         {cart.cartItems.map((item) => (
//                             <motion.div
//                                 key={item._id}
//                                 className="bg-white rounded-lg p-4 shadow-sm"
//                                 initial={{ opacity: 0, y: 20 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                             >
//                                 <div className="flex space-x-4">
//                                     <img
//                                         src={item.image || "/placeholder.svg"}
//                                         alt={item.name}
//                                         className="w-24 h-24 object-cover rounded-lg"
//                                     />
//                                     <div className="flex-1">
//                                         <h3 className="font-medium text-lg">{item.product?.brand || "Brand"}</h3>
//                                         <p className="text-gray-600 text-sm mb-2">{item.name}</p>
//                                         <p className="text-sm text-gray-500 mb-2">Size: {item.size}</p>
//                                         <div className="flex items-center justify-between">
//                                             <div className="flex items-center space-x-3">
//                                                 <button
//                                                     onClick={() => handleQuantityChange(item._id, item.qty - 1)}
//                                                     className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50"
//                                                 >
//                                                     <Minus className="w-4 h-4" />
//                                                 </button>
//                                                 <span className="font-medium">{item.qty}</span>
//                                                 <button
//                                                     onClick={() => handleQuantityChange(item._id, item.qty + 1)}
//                                                     className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50"
//                                                 >
//                                                     <Plus className="w-4 h-4" />
//                                                 </button>
//                                             </div>
//                                             <div className="text-right">
//                                                 <p className="font-bold text-lg">₹{item.price * item.qty}</p>
//                                                 <button
//                                                     onClick={() => cart.removeFromCart(item._id)}
//                                                     className="text-red-500 hover:text-red-700 flex items-center text-sm mt-1"
//                                                 >
//                                                     <Trash2 className="w-4 h-4 mr-1" />
//                                                     Remove
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </motion.div>
//                         ))}
//                     </div>

//                     {/* Order Summary */}
//                     <div className="lg:col-span-1">
//                         <div className="bg-white rounded-lg p-6 shadow-sm sticky top-4">
//                             <h2 className="text-xl font-bold mb-4">Order Summary</h2>

//                             <div className="space-y-3 mb-4">
//                                 <div className="flex justify-between">
//                                     <span>Subtotal ({cart.cartItems.reduce((total, item) => total + item.qty, 0)} items)</span>
//                                     <span>₹{cart.getCartTotal()}</span>
//                                 </div>
//                                 <div className="flex justify-between">
//                                     <span>Shipping</span>
//                                     <span className="text-green-600">FREE</span>
//                                 </div>
//                                 <div className="flex justify-between">
//                                     <span>Discount</span>
//                                     <span className="text-green-600">-₹0</span>
//                                 </div>
//                                 <hr />
//                                 <div className="flex justify-between font-bold text-lg">
//                                     <span>Total</span>
//                                     <span>₹{cart.getCartTotal()}</span>
//                                 </div>
//                             </div>

//                             <button
//                                 onClick={handleCheckout}
//                                 className="w-full bg-pink-500 text-white py-3 rounded-lg font-medium hover:bg-pink-600 transition-colors"
//                             >
//                                 {isAuthenticated ? "PROCEED TO CHECKOUT" : "LOGIN TO CHECKOUT"}
//                             </button>

//                             <div className="mt-4 text-center">
//                                 <Link to="/" className="text-pink-500 hover:underline text-sm">
//                                     Continue Shopping
//                                 </Link>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Cart


// import { motion } from "framer-motion"
// import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
// import { useApp } from "../context/AppContext"
// import { Link, useNavigate } from "react-router-dom"

// const Cart = () => {
//     const { cart, isAuthenticated } = useApp()
//     const navigate = useNavigate()

//     const handleQuantityChange = async (cartItemId, newQuantity) => {
//         if (newQuantity === 0) {
//             await cart.removeFromCart(cartItemId)
//         } else {
//             await cart.updateCartItem(cartItemId, newQuantity)
//         }
//     }

//     const handleCheckout = () => {
//         if (!isAuthenticated) {
//             navigate("/login?redirect=checkout")
//         } else {
//             navigate("/checkout")
//         }
//     }

//     if (cart.loading) {
//         return (
//             <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//                 <div className="text-center">
//                     <div className="spinner mx-auto mb-4"></div>
//                     <p>Loading cart...</p>
//                 </div>
//             </div>
//         )
//     }

//     if (cart.cartItems.length === 0) {
//         return (
//             <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//                 <div className="text-center">
//                     <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-4" />
//                     <h2 className="text-2xl font-bold text-gray-800 mb-2">Your bag is empty</h2>
//                     <p className="text-gray-600 mb-6">Add some products to get started</p>
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
//                 <h1 className="text-2xl font-bold mb-8">Shopping Bag ({cart.cartItems.length} items)</h1>

//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//                     {/* Cart Items */}
//                     <div className="lg:col-span-2 space-y-4">
//                         {cart.cartItems.map((item) => (
//                             <motion.div
//                                 key={item._id}
//                                 className="bg-white rounded-lg p-4 shadow-sm"
//                                 initial={{ opacity: 0, y: 20 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                             >
//                                 <div className="flex space-x-4">
//                                     <img
//                                         src={item.image || "/placeholder.svg"}
//                                         alt={item.name}
//                                         className="w-24 h-24 object-cover rounded-lg"
//                                     />
//                                     <div className="flex-1">
//                                         <h3 className="font-medium text-lg">{item.product?.brand || "Brand"}</h3>
//                                         <p className="text-gray-600 text-sm mb-2">{item.name}</p>
//                                         <p className="text-sm text-gray-500 mb-2">Size: {item.size}</p>
//                                         <div className="flex items-center justify-between">
//                                             <div className="flex items-center space-x-3">
//                                                 <button
//                                                     onClick={() => handleQuantityChange(item._id, item.qty - 1)}
//                                                     className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50"
//                                                 >
//                                                     <Minus className="w-4 h-4" />
//                                                 </button>
//                                                 <span className="font-medium">{item.qty}</span>
//                                                 <button
//                                                     onClick={() => handleQuantityChange(item._id, item.qty + 1)}
//                                                     className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50"
//                                                 >
//                                                     <Plus className="w-4 h-4" />
//                                                 </button>
//                                             </div>
//                                             <div className="text-right">
//                                                 <p className="font-bold text-lg">₹{item.price * item.qty}</p>
//                                                 <button
//                                                     onClick={() => cart.removeFromCart(item._id)}
//                                                     className="text-red-500 hover:text-red-700 flex items-center text-sm mt-1"
//                                                 >
//                                                     <Trash2 className="w-4 h-4 mr-1" />
//                                                     Remove
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </motion.div>
//                         ))}
//                     </div>

//                     {/* Order Summary */}
//                     <div className="lg:col-span-1">
//                         <div className="bg-white rounded-lg p-6 shadow-sm sticky top-4">
//                             <h2 className="text-xl font-bold mb-4">Order Summary</h2>

//                             <div className="space-y-3 mb-4">
//                                 <div className="flex justify-between">
//                                     <span>Subtotal ({cart.cartItems.reduce((total, item) => total + item.qty, 0)} items)</span>
//                                     <span>₹{cart.getCartTotal()}</span>
//                                 </div>
//                                 <div className="flex justify-between">
//                                     <span>Shipping</span>
//                                     <span className="text-green-600">FREE</span>
//                                 </div>
//                                 <div className="flex justify-between">
//                                     <span>Discount</span>
//                                     <span className="text-green-600">-₹0</span>
//                                 </div>
//                                 <hr />
//                                 <div className="flex justify-between font-bold text-lg">
//                                     <span>Total</span>
//                                     <span>₹{cart.getCartTotal()}</span>
//                                 </div>
//                             </div>

//                             <button
//                                 onClick={handleCheckout}
//                                 className="w-full bg-pink-500 text-white py-3 rounded-lg font-medium hover:bg-pink-600 transition-colors"
//                             >
//                                 {isAuthenticated ? "PROCEED TO CHECKOUT" : "LOGIN TO CHECKOUT"}
//                             </button>

//                             <div className="mt-4 text-center">
//                                 <Link to="/" className="text-pink-500 hover:underline text-sm">
//                                     Continue Shopping
//                                 </Link>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Cart


// import { motion } from "framer-motion"
// import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
// import { useApp } from "../context/AppContext"
// import { Link, useNavigate } from "react-router-dom"

// const Cart = () => {
//     const { cart, isAuthenticated } = useApp()
//     const navigate = useNavigate()

//     const handleQuantityChange = async (cartItemId, newQuantity) => {
//         if (newQuantity === 0) {
//             await cart.removeFromCart(cartItemId)
//         } else {
//             await cart.updateQuantity(cartItemId, newQuantity)
//         }
//     }

//     const handleCheckout = () => {
//         if (!isAuthenticated) {
//             navigate("/login?redirect=checkout")
//         } else {
//             navigate("/checkout")
//         }
//     }

//     if (cart.loading) {
//         return (
//             <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//                 <div className="text-center">
//                     <div className="spinner mx-auto mb-4"></div>
//                     <p>Loading cart...</p>
//                 </div>
//             </div>
//         )
//     }

//     if (!cart || !Array.isArray(cart.items) || cart.items.length === 0) {
//         return (
//             <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//                 <div className="text-center">
//                     <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-4" />
//                     <h2 className="text-2xl font-bold text-gray-800 mb-2">Your bag is empty</h2>
//                     <p className="text-gray-600 mb-6">Add some products to get started</p>
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
//                 <h1 className="text-2xl font-bold mb-8">Shopping Bag ({cart.items.length} items)</h1>

//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//                     {/* Cart Items */}
//                     <div className="lg:col-span-2 space-y-4">
//                         {cart.items.map((item) => (
//                             <motion.div
//                                 key={item._id}
//                                 className="bg-white rounded-lg p-4 shadow-sm"
//                                 initial={{ opacity: 0, y: 20 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                             >
//                                 <div className="flex space-x-4">
//                                     <img src={item.image || item.product?.image || "/placeholder.svg"}

//                                         alt={item.product.name}
//                                         className="w-24 h-24 object-cover rounded-lg"
//                                     />
//                                     <div className="flex-1">
//                                         <h3 className="font-medium text-lg">{item.product.brand}</h3>
//                                         <p className="text-gray-600 text-sm mb-2">{item.product.name}</p>
//                                         <p className="text-sm text-gray-500 mb-2">Size: {item.size}</p>
//                                         <div className="flex items-center justify-between">
//                                             <div className="flex items-center space-x-3">
//                                                 <button
//                                                     onClick={() => handleQuantityChange(item._id, item.qty - 1)}
//                                                     className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50"
//                                                 >
//                                                     <Minus className="w-4 h-4" />
//                                                 </button>
//                                                 <span className="font-medium">{item.qty}</span>
//                                                 <button
//                                                     onClick={() => handleQuantityChange(item._id, item.qty + 1)}
//                                                     className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50"
//                                                 >
//                                                     <Plus className="w-4 h-4" />
//                                                 </button>
//                                             </div>
//                                             <div className="text-right">
//                                                 <p className="font-bold text-lg">₹{item.product.price * item.qty}</p>
//                                                 <button
//                                                     onClick={() => cart.removeFromCart(item._id)}
//                                                     className="text-red-500 hover:text-red-700 flex items-center text-sm mt-1"
//                                                 >
//                                                     <Trash2 className="w-4 h-4 mr-1" />
//                                                     Remove
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </motion.div>
//                         ))}
//                     </div>

//                     {/* Order Summary */}
//                     <div className="lg:col-span-1">
//                         <div className="bg-white rounded-lg p-6 shadow-sm sticky top-4">
//                             <h2 className="text-xl font-bold mb-4">Order Summary</h2>

//                             <div className="space-y-3 mb-4">
//                                 <div className="flex justify-between">
//                                     <span>Subtotal ({cart.getCartItemsCount()} items)</span>
//                                     <span>₹{cart.getCartTotal()}</span>
//                                 </div>
//                                 <div className="flex justify-between">
//                                     <span>Shipping</span>
//                                     <span className="text-green-600">FREE</span>
//                                 </div>
//                                 <div className="flex justify-between">
//                                     <span>Discount</span>
//                                     <span className="text-green-600">-₹0</span>
//                                 </div>
//                                 <hr />
//                                 <div className="flex justify-between font-bold text-lg">
//                                     <span>Total</span>
//                                     <span>₹{cart.getCartTotal()}</span>
//                                 </div>
//                             </div>

//                             <button
//                                 onClick={handleCheckout}
//                                 className="w-full bg-pink-500 text-white py-3 rounded-lg font-medium hover:bg-pink-600 transition-colors"
//                             >
//                                 {isAuthenticated ? "PROCEED TO CHECKOUT" : "LOGIN TO CHECKOUT"}
//                             </button>

//                             <div className="mt-4 text-center">
//                                 <Link to="/" className="text-pink-500 hover:underline text-sm">
//                                     Continue Shopping
//                                 </Link>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Cart



// import { motion } from "framer-motion"
// import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
// import { useApp } from "../context/AppContext"
// import { Link, useNavigate } from "react-router-dom"

// const Cart = () => {
//     const {
//         cart,
//         isAuthenticated,
//         updateCartItem,
//         removeFromCart,
//         getCartTotal,
//         getCartItemsCount,
//         cartLoading,
//     } = useApp()
//     const navigate = useNavigate()

//     const handleQuantityChange = async (cartItemId, newQuantity) => {
//         if (newQuantity === 0) {
//             await removeFromCart(cartItemId)
//         } else {
//             await updateCartItem(cartItemId, newQuantity)
//         }
//     }

//     const handleCheckout = () => {
//         if (!isAuthenticated) {
//             navigate("/login?redirect=checkout")
//         } else {
//             navigate("/checkout")
//         }
//     }

//     if (cartLoading) {
//         return (
//             <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//                 <div className="text-center">
//                     <div className="spinner mx-auto mb-4"></div>
//                     <p>Loading cart...</p>
//                 </div>
//             </div>
//         )
//     }

//     if (!cart || !Array.isArray(cart.items) || cart.items.length === 0) {
//         return (
//             <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//                 <div className="text-center">
//                     <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-4" />
//                     <h2 className="text-2xl font-bold text-gray-800 mb-2">Your bag is empty</h2>
//                     <p className="text-gray-600 mb-6">Add some products to get started</p>
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
//                 <h1 className="text-2xl font-bold mb-8">Shopping Bag ({cart.items.length} items)</h1>

//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//                     {/* Cart Items */}
//                     <div className="lg:col-span-2 space-y-4">
//                         {cart.items.map((item) => {
//                             <motion.div
//                                 key={item._id}
//                                 className="bg-white rounded-lg p-4 shadow-sm"
//                                 initial={{ opacity: 0, y: 20 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                             >
//                                 <div className="flex space-x-4">
//                                     <img
//                                         src={item.image || item.product?.image || "/placeholder.svg"}
//                                         alt={item.product?.name || item.name || "Product"}
//                                         className="w-24 h-24 object-cover rounded-lg"
//                                     />
//                                     <div className="flex-1">
//                                         <h3 className="font-medium text-lg">{item.product?.brand || item.brand}</h3>
//                                         <p className="text-gray-600 text-sm mb-2">{item.product?.name || item.name}</p>
//                                         <p className="text-sm text-gray-500 mb-2">Size: {item.size}</p>
//                                         <div className="flex items-center justify-between">
//                                             <div className="flex items-center space-x-3">
//                                                 <button
//                                                     onClick={() => handleQuantityChange(item._id, item.qty - 1)}
//                                                     className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50"
//                                                 >
//                                                     <Minus className="w-4 h-4" />
//                                                 </button>
//                                                 <span className="font-medium">{item.qty}</span>
//                                                 <button
//                                                     onClick={() => handleQuantityChange(item._id, item.qty + 1)}
//                                                     className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50"
//                                                 >
//                                                     <Plus className="w-4 h-4" />
//                                                 </button>
//                                             </div>
//                                             <div className="text-right">
//                                                 <p className="font-bold text-lg">₹{item.product?.price * item.qty}</p>
//                                                 <button
//                                                     onClick={() => removeFromCart(item._id)}
//                                                     className="text-red-500 hover:text-red-700 flex items-center text-sm mt-1"
//                                                 >
//                                                     <Trash2 className="w-4 h-4 mr-1" />
//                                                     Remove
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>

//                             </motion.div>

//                         })}
//                     </div>

//                     {/* Order Summary */}
//                     <div className="lg:col-span-1">
//                         <div className="bg-white rounded-lg p-6 shadow-sm sticky top-4">
//                             <h2 className="text-xl font-bold mb-4">Order Summary</h2>

//                             <div className="space-y-3 mb-4">
//                                 <div className="flex justify-between">
//                                     <span>Subtotal ({getCartItemsCount()} items)</span>
//                                     <span>₹{getCartTotal()}</span>
//                                 </div>
//                                 <div className="flex justify-between">
//                                     <span>Shipping</span>
//                                     <span className="text-green-600">FREE</span>
//                                 </div>
//                                 <div className="flex justify-between">
//                                     <span>Discount</span>
//                                     <span className="text-green-600">-₹0</span>
//                                 </div>
//                                 <hr />
//                                 <div className="flex justify-between font-bold text-lg">
//                                     <span>Total</span>
//                                     <span>₹{getCartTotal()}</span>
//                                 </div>
//                             </div>

//                             <button
//                                 onClick={handleCheckout}
//                                 className="w-full bg-pink-500 text-white py-3 rounded-lg font-medium hover:bg-pink-600 transition-colors"
//                             >
//                                 {isAuthenticated ? "PROCEED TO CHECKOUT" : "LOGIN TO CHECKOUT"}
//                             </button>

//                             <div className="mt-4 text-center">
//                                 <Link to="/" className="text-pink-500 hover:underline text-sm">
//                                     Continue Shopping
//                                 </Link>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Cart



import { motion } from "framer-motion"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import { useCart } from "../context/CartContext"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const Cart = () => {
    const {
        items: cartItems,
        updateCartItem,       // ✅ FIXED HERE
        removeFromCart,
        getCartItemsCount,
        getTotalPrice,
        loading: cartLoading,
    } = useCart();

    const { user: isAuthenticated } = useAuth();

    const navigate = useNavigate()

    const handleQuantityChange = async (ItemId, newQuantity) => {
        if (newQuantity === 0) {
            await removeFromCart(ItemId)
        } else {
            await updateCartItem(ItemId, newQuantity)
        }
    }

    const handleCheckout = () => {
        if (!isAuthenticated) {
            navigate("/login?redirect=checkout")
        } else {
            navigate("/checkout")
        }
    }

    if (cartLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="spinner mx-auto mb-4"></div>
                    <p>Loading cart...</p>
                </div>
            </div>
        )
    }

    if (!Array.isArray(cartItems) || cartItems.length === 0) {


        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Your bag is empty</h2>
                    <p className="text-gray-600 mb-6">Add some products to get started</p>
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
                <h1 className="text-2xl font-bold mb-8">Shopping Bag ({cartItems.length} items)</h1>


                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.map((item) => (


                            <motion.div
                                key={item._id}
                                className="bg-white rounded-lg p-4 shadow-sm"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >

                                <div className="flex space-x-4">
                                    <img
                                        src={item.image || item.product?.image || "/placeholder.svg"}
                                        alt={item.product?.name || item.name || "Product"}
                                        className="w-24 h-24 object-cover rounded-lg"
                                    />
                                    <div className="flex-1">
                                        <h3 className="font-medium text-lg">{item.product?.brand || item.brand}</h3>
                                        <p className="text-gray-600 text-sm mb-2">{item.product?.name || item.name}</p>
                                        <p className="text-sm text-gray-500 mb-2">Size: {item.size}</p>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <button
                                                    onClick={() => handleQuantityChange(item._id, item.qty - 1)}
                                                    className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50"
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="font-medium">{item.qty}</span>
                                                <button
                                                    onClick={() => handleQuantityChange(item._id, item.qty + 1)}
                                                    className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <div className="text-right">
                                                {/* <p className="font-bold text-lg">₹{item.product?.price * item.qty}</p> */}
                                                <p className="font-medium text-gray-800">
                                                    ₹{(Number(item.price || 0) * Number(item.qty || 1)).toFixed(2)}
                                                </p>

                                                <button
                                                    onClick={() => removeFromCart(item._id)}
                                                    className="text-red-500 hover:text-red-700 flex items-center text-sm mt-1"
                                                >
                                                    <Trash2 className="w-4 h-4 mr-1" />
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}

                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg p-6 shadow-sm sticky top-4">
                            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

                            <div className="space-y-3 mb-4">
                                <div className="flex justify-between">
                                    <span>Subtotal ({getCartItemsCount()} items)</span>
                                    <span>₹{getTotalPrice()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span className="text-green-600">FREE</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Discount</span>
                                    <span className="text-green-600">-₹0</span>
                                </div>
                                <hr />
                                <div className="flex justify-between font-bold text-lg">
                                    <span>Total</span>
                                    <span>₹{getTotalPrice()}</span>
                                </div>
                            </div>

                            <button
                                onClick={handleCheckout}
                                className="w-full bg-pink-500 text-white py-3 rounded-lg font-medium hover:bg-pink-600 transition-colors"
                            >
                                {isAuthenticated ? "PROCEED TO CHECKOUT" : "LOGIN TO CHECKOUT"}
                            </button>

                            <div className="mt-4 text-center">
                                <Link to="/" className="text-pink-500 hover:underline text-sm">
                                    Continue Shopping
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart


